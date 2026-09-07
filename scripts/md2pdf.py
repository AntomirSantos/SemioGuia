# Gera um PDF de um documento do docs/ na identidade editorial do app:
# Libre Bodoni nos títulos, Public Sans no corpo, filete de 2,5px em tinta sob
# o título e a paleta Vital. Serve para levar um relatório do repositório para
# fora dele, no papel ou no celular, sem perder a cara do SemioGuia.
#
# Uso: python3 scripts/md2pdf.py docs/<arquivo>.md <saida>.pdf "<rodapé>"
# Requer reportlab (pip install reportlab). Suporta títulos, parágrafos com
# negrito e código, listas numeradas e com marcador, tabelas e blocos de
# código: o subconjunto de Markdown que os documentos do projeto usam.
import re, sys, html
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_JUSTIFY
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Table, TableStyle, Preformatted, KeepTogether)

import os
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
G = os.path.join(RAIZ, 'node_modules', '@expo-google-fonts')
pdfmetrics.registerFont(TTFont('Bodoni', os.path.join(G, 'libre-bodoni/700Bold/LibreBodoni_700Bold.ttf')))
pdfmetrics.registerFont(TTFont('Sans', os.path.join(G, 'public-sans/400Regular/PublicSans_400Regular.ttf')))
pdfmetrics.registerFont(TTFont('SansBold', os.path.join(G, 'public-sans/700Bold/PublicSans_700Bold.ttf')))
pdfmetrics.registerFont(TTFont('SansSemi', os.path.join(G, 'public-sans/600SemiBold/PublicSans_600SemiBold.ttf')))
pdfmetrics.registerFontFamily('Sans', normal='Sans', bold='SansBold')

TINTA = colors.HexColor('#111111'); TINTA2 = colors.HexColor('#6B6B6B')
LINHA = colors.HexColor('#DDDDDD'); VINHO = colors.HexColor('#8E1F2F')
PAPEL = colors.HexColor('#FBFAF7')

est = {
 'h1': ParagraphStyle('h1', fontName='Bodoni', fontSize=26, leading=30, textColor=TINTA),
 'sub': ParagraphStyle('sub', fontName='Sans', fontSize=10.5, leading=15, textColor=TINTA2, spaceAfter=14),
 'h2': ParagraphStyle('h2', fontName='Bodoni', fontSize=15.5, leading=19, textColor=TINTA, spaceBefore=18, spaceAfter=6),
 'h3': ParagraphStyle('h3', fontName='SansBold', fontSize=10.2, leading=14, textColor=TINTA, spaceBefore=12, spaceAfter=4),
 'p': ParagraphStyle('p', fontName='Sans', fontSize=9.6, leading=14.5, textColor=TINTA, alignment=TA_JUSTIFY, spaceAfter=6),
 'li': ParagraphStyle('li', fontName='Sans', fontSize=9.6, leading=14.5, textColor=TINTA, leftIndent=13, bulletIndent=2, spaceAfter=3),
 'cel': ParagraphStyle('cel', fontName='Sans', fontSize=8.6, leading=12, textColor=TINTA),
 'celb': ParagraphStyle('celb', fontName='SansSemi', fontSize=8.6, leading=12, textColor=TINTA),
 'cod': ParagraphStyle('cod', fontName='Courier', fontSize=8.4, leading=11.6, textColor=TINTA),
}

def inline(s):
    s = html.escape(s)
    s = re.sub(r'\*\*(.+?)\*\*', r'<font name="SansSemi">\1</font>', s)
    s = re.sub(r'`(.+?)`', r'<font name="Courier" size="8.8">\1</font>', s)
    return s

def tabela(linhas):
    dados = []
    for i, ln in enumerate(linhas):
        e = est['celb'] if i == 0 else est['cel']
        dados.append([Paragraph(inline(c), e) for c in ln])
    n = max(len(l) for l in dados)
    largura = 166 * mm
    if n == 2: cols = [largura*0.34, largura*0.66]
    elif n == 3: cols = [largura*0.28, largura*0.24, largura*0.48]
    else: cols = [largura/n]*n
    tb = Table(dados, colWidths=cols, repeatRows=1)
    tb.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4), ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 5), ('RIGHTPADDING', (0,0), (-1,-1), 5),
        ('LINEBELOW', (0,0), (-1,-2), 0.4, LINHA),
        ('LINEBELOW', (0,0), (-1,0), 1.0, TINTA),
        ('BACKGROUND', (0,0), (-1,0), PAPEL),
    ]))
    return tb

def montar(md):
    fluxo = []
    linhas = md.split('\n')
    i = 0
    primeiro_h1 = True
    while i < len(linhas):
        ln = linhas[i]
        if ln.startswith('```'):
            corpo = []
            i += 1
            while i < len(linhas) and not linhas[i].startswith('```'):
                corpo.append(linhas[i]); i += 1
            i += 1
            bloco = Preformatted('\n'.join(corpo), est['cod'])
            caixa = Table([[bloco]], colWidths=[166*mm])
            caixa.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),PAPEL),
                                       ('BOX',(0,0),(-1,-1),0.4,LINHA),
                                       ('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10),
                                       ('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8)]))
            fluxo += [Spacer(1,4), caixa, Spacer(1,8)]
            continue
        if ln.startswith('|'):
            tab = []
            while i < len(linhas) and linhas[i].startswith('|'):
                celulas = [c.strip() for c in linhas[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r':?-{2,}:?', c) for c in celulas):
                    tab.append(celulas)
                i += 1
            fluxo += [Spacer(1,3), tabela(tab), Spacer(1,9)]
            continue
        if ln.startswith('### '):
            fluxo.append(Paragraph(inline(ln[4:]), est['h3'])); i += 1; continue
        if ln.startswith('## '):
            fluxo.append(Paragraph(inline(ln[3:]), est['h2'])); i += 1; continue
        if ln.startswith('# '):
            fluxo.append(Paragraph(inline(ln[2:]), est['h1']))
            if primeiro_h1:
                fr = Table([['']], colWidths=[166*mm], rowHeights=[2.5])
                fr.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),TINTA),('TOPPADDING',(0,0),(-1,-1),0),('BOTTOMPADDING',(0,0),(-1,-1),0)]))
                fluxo += [Spacer(1,4), fr, Spacer(1,8)]
                primeiro_h1 = False
            i += 1; continue
        m = re.match(r'^(\d+)\. (.+)$', ln)
        if m:
            texto = m.group(2)
            while i+1 < len(linhas) and linhas[i+1].startswith('   ') and linhas[i+1].strip():
                texto += ' ' + linhas[i+1].strip(); i += 1
            fluxo.append(Paragraph(inline(texto), est['li'], bulletText=m.group(1)+'.')); i += 1; continue
        if ln.startswith('- '):
            texto = ln[2:]
            while i+1 < len(linhas) and linhas[i+1].startswith('  ') and linhas[i+1].strip():
                texto += ' ' + linhas[i+1].strip(); i += 1
            fluxo.append(Paragraph(inline(texto), est['li'], bulletText='•')); i += 1; continue
        if ln.strip() == '':
            i += 1; continue
        par = [ln.strip()]
        while i+1 < len(linhas) and linhas[i+1].strip() and not re.match(r'^(#|\||-\s|\d+\.\s|```)', linhas[i+1]):
            par.append(linhas[i+1].strip()); i += 1
        fluxo.append(Paragraph(inline(' '.join(par)), est['p'])); i += 1
    return fluxo

def gerar(entrada, saida, rodape_txt):
    md = open(entrada).read()
    def rodape(canvas, doc):
        canvas.saveState(); canvas.setFont('Sans', 7.6); canvas.setFillColor(TINTA2)
        canvas.drawString(22*mm, 13*mm, rodape_txt)
        canvas.drawRightString(188*mm, 13*mm, str(doc.page))
        canvas.setStrokeColor(LINHA); canvas.setLineWidth(0.4); canvas.line(22*mm, 16.5*mm, 188*mm, 16.5*mm)
        canvas.restoreState()
    doc = BaseDocTemplate(saida, pagesize=A4, leftMargin=22*mm, rightMargin=22*mm,
                          topMargin=20*mm, bottomMargin=22*mm, title=rodape_txt, author='Antomir Santos')
    doc.addPageTemplates([PageTemplate(id='p', frames=[Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height)], onPage=rodape)])
    doc.build(montar(md))
    print('gerado', saida)

if __name__ == '__main__':
    gerar(sys.argv[1], sys.argv[2], sys.argv[3])
