# Gera um baralho do Anki (.apkg) a partir do conteúdo JÁ COMPILADO do app.
#
# Regra que justifica o script existir: nenhuma afirmação clínica é escrita
# aqui. Cada carta sai de um bloco do conteúdo revisado
# (assets/generated/content.json), então o baralho herda a revisão do autor e
# se regenera inteiro quando o conteúdo muda.
#
# Uso: python3 scripts/gerar-anki.py [saida.apkg]
# Requer genanki (pip install genanki).
#
# A organização dos baralhos espelha o app: um baralho por sistema, na ordem
# craniocaudal, e dentro dele um subbaralho por modo de estudo (os mesmos
# nomes que o aluno vê nas abas).
import hashlib
import html
import json
import os
import re
import sys

import genanki

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTEUDO = os.path.join(RAIZ, 'assets', 'generated', 'content.json')
SONS = os.path.join(RAIZ, 'assets', 'sons')
BASE_WEB = 'https://antomirsantos.github.io/SemioGuia'

# Identificadores fixos: mudar quebra a atualização dos baralhos de quem já
# importou uma versão anterior.
ID_BASICO = 1607392319
ID_ESCOLHA = 1607392320
ID_AUSCULTA = 1607392321
ID_DECK_RAIZ = 2059400110

# ------------------------------------------------------------------ markdown

def para_html(texto: str) -> str:
    """O subconjunto de Markdown que o conteúdo usa: negrito, itálico e quebras."""
    t = html.escape(texto.strip())
    t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t, flags=re.S)
    t = re.sub(r'(?<![\*\w])\*(?!\s)(.+?)(?<!\s)\*(?!\*)', r'<i>\1</i>', t, flags=re.S)
    t = re.sub(r'`(.+?)`', r'<code>\1</code>', t, flags=re.S)
    t = re.sub(r'\n{2,}', '</p><p>', t)
    t = t.replace('\n', '<br>')
    return f'<p>{t}</p>'


def lista_html(itens, ordenada=False) -> str:
    tag = 'ol' if ordenada else 'ul'
    linhas = ''.join(f'<li>{para_html(i)}</li>' for i in itens)
    return f'<{tag}>{linhas}</{tag}>'


def limpar_tag(valor: str) -> str:
    return re.sub(r'[^a-z0-9-]+', '-', valor.lower()).strip('-')


# ------------------------------------------------------------------- estilos

CSS = """
.card {
  font-family: Georgia, 'Iowan Old Style', 'Source Serif 4', serif;
  font-size: 19px;
  line-height: 1.62;
  color: #111111;
  background-color: #FBFAF7;
  text-align: left;
  padding: 18px 20px;
}
.contexto {
  font-family: -apple-system, 'Public Sans', 'Segoe UI', sans-serif;
  font-size: 11px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #6B6B6B;
  margin-bottom: 14px;
}
.pergunta { font-size: 21px; }
.regra { border: 0; border-top: 2.5px solid #111111; margin: 18px 0 14px; }
.rotulo {
  font-family: -apple-system, 'Public Sans', 'Segoe UI', sans-serif;
  font-size: 11px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: #6B6B6B;
  margin: 16px 0 4px;
}
.correta { color: #1F6F4A; font-weight: bold; }
.alternativas { padding-left: 20px; }
.fonte {
  font-family: -apple-system, 'Public Sans', 'Segoe UI', sans-serif;
  font-size: 12px;
  color: #6B6B6B;
  margin-top: 18px;
}
.fonte a { color: #8E1F2F; text-decoration: none; }
p { margin: 0 0 10px; }
ul, ol { margin: 0 0 10px; padding-left: 22px; }
li { margin-bottom: 4px; }
b { color: #111111; }
code { font-family: ui-monospace, Menlo, Consolas, monospace; font-size: 0.9em; }
.nightMode.card, .night_mode .card { color: #ECEAE5; background-color: #14161A; }
.nightMode .contexto, .night_mode .contexto,
.nightMode .rotulo, .night_mode .rotulo,
.nightMode .fonte, .night_mode .fonte { color: #9C9C9C; }
.nightMode .regra, .night_mode .regra { border-top-color: #ECEAE5; }
.nightMode b, .night_mode b { color: #ECEAE5; }
.nightMode .correta, .night_mode .correta { color: #63C08C; }
.nightMode .fonte a, .night_mode .fonte a { color: #E08A98; }
"""

RODAPE = """
<div class="fonte">{{Fonte}}{{#Link}}<br><a href="{{Link}}">Abrir no SemioGuia</a>{{/Link}}</div>
"""

MODELO_BASICO = genanki.Model(
    ID_BASICO,
    'SemioGuia Básico',
    fields=[
        {'name': 'Frente'},
        {'name': 'Verso'},
        {'name': 'Extra'},
        {'name': 'Contexto'},
        {'name': 'Fonte'},
        {'name': 'Link'},
    ],
    templates=[{
        'name': 'Frente para verso',
        'qfmt': '<div class="contexto">{{Contexto}}</div><div class="pergunta">{{Frente}}</div>',
        'afmt': '<div class="contexto">{{Contexto}}</div><div class="pergunta">{{Frente}}</div>'
                '<hr class="regra">{{Verso}}{{#Extra}}{{Extra}}{{/Extra}}' + RODAPE,
    }],
    css=CSS,
)

MODELO_ESCOLHA = genanki.Model(
    ID_ESCOLHA,
    'SemioGuia Múltipla escolha',
    fields=[
        {'name': 'Pergunta'},
        {'name': 'Alternativas'},
        {'name': 'Correta'},
        {'name': 'Explicacao'},
        {'name': 'Contexto'},
        {'name': 'Fonte'},
        {'name': 'Link'},
    ],
    templates=[{
        'name': 'Decidir',
        'qfmt': '<div class="contexto">{{Contexto}}</div><div class="pergunta">{{Pergunta}}</div>{{Alternativas}}',
        'afmt': '<div class="contexto">{{Contexto}}</div><div class="pergunta">{{Pergunta}}</div>'
                '<hr class="regra"><div class="rotulo">Resposta</div><div class="correta">{{Correta}}</div>'
                '<div class="rotulo">Por quê</div>{{Explicacao}}' + RODAPE,
    }],
    css=CSS,
)

MODELO_AUSCULTA = genanki.Model(
    ID_AUSCULTA,
    'SemioGuia Ausculta',
    fields=[
        {'name': 'Som'},
        {'name': 'Titulo'},
        {'name': 'Descricao'},
        {'name': 'Contexto'},
        {'name': 'Fonte'},
        {'name': 'Link'},
    ],
    templates=[{
        'name': 'Reconhecer o som',
        'qfmt': '<div class="contexto">{{Contexto}}</div>'
                '<div class="pergunta">Que achado de ausculta é este?</div>{{Som}}',
        'afmt': '<div class="contexto">{{Contexto}}</div>{{Som}}'
                '<hr class="regra"><div class="pergunta"><b>{{Titulo}}</b></div>{{Descricao}}' + RODAPE,
    }],
    css=CSS,
)

# --------------------------------------------------------------------- decks

# Os nomes espelham os modos do app. A ordem é a craniocaudal do guia, e o
# número na frente existe porque o Anki ordena baralhos alfabeticamente.
SUBBARALHOS = {
    'sinal': 'Plantão (sinais)',
    'quiz': 'Questões',
    'pense': 'Recuperação ativa',
    'resumo': 'Em três linhas',
    'roteiro': 'Roteiros e manobras',
    'relampago': 'Casos relâmpago',
    'som': 'Ausculta',
}

decks = {}


def id_estavel(nome: str) -> int:
    """O hash() do Python muda a cada processo; aqui o id precisa ser o mesmo
    em toda geração, para que reimportar atualize os baralhos em vez de criar
    cópias."""
    digest = hashlib.sha1(nome.encode('utf-8')).hexdigest()[:12]
    return 1_000_000_000 + int(digest, 16) % 1_000_000_000


def deck_de(sistema, chave):
    nome = f'SemioGuia::{sistema["ordem"]:02d} {sistema["titulo"]}::{SUBBARALHOS[chave]}'
    if nome not in decks:
        decks[nome] = genanki.Deck(id_estavel(nome), nome)
    return decks[nome]


def nota_basica(deck, guid, frente, verso, extra, contexto, fonte, link, tags):
    nota = genanki.Note(
        model=MODELO_BASICO,
        fields=[frente, verso, extra, contexto, fonte, link],
        tags=tags,
        guid=genanki.guid_for(guid),
    )
    deck.add_note(nota)


def gerar(saida: str) -> None:
    with open(CONTEUDO, encoding='utf-8') as f:
        conteudo = json.load(f)

    midias = []
    contagem = {}

    def contar(chave):
        contagem[chave] = contagem.get(chave, 0) + 1

    for sistema in sorted(conteudo['sistemas'], key=lambda s: s['ordem']):
        for capitulo in sistema['capitulos']:
            for topico in capitulo['topicos']:
                contexto = f'{sistema["titulo"]} · {topico["titulo"]}'
                link = f'{BASE_WEB}/topico/{topico["id"]}'
                fonte = 'Fonte: ' + html.escape('; '.join(topico.get('referencias', [])))
                base_tags = [
                    f'SemioGuia::sistema::{limpar_tag(sistema["id"])}',
                    f'SemioGuia::topico::{limpar_tag(topico["id"].split("/")[-1])}',
                ]

                for indice, bloco in enumerate(topico['blocos']):
                    tipo = bloco['tipo']
                    ident = f'{topico["id"]}#{indice}'
                    nivel = bloco.get('nivel', 'basico')
                    tags = base_tags + [f'SemioGuia::nivel::{nivel}']

                    if tipo == 'sinal':
                        contar('sinal')
                        nota_basica(
                            deck_de(sistema, 'sinal'),
                            f'sinal:{topico["id"]}:{bloco["nome"]}',
                            f'<b>{html.escape(bloco["nome"])}</b><br>'
                            '<span style="font-size:15px">O que é, o que significa e o que considerar?</span>',
                            f'<div class="rotulo">O achado</div>{para_html(bloco["descricao"])}'
                            f'<div class="rotulo">O que significa</div>{para_html(bloco["significado"])}',
                            f'<div class="rotulo">Causas a considerar</div>{lista_html(bloco["causas"])}',
                            contexto,
                            fonte,
                            f'{link}?ancora=sinal%3A{bloco["nome"].replace(" ", "%20")}',
                            tags + ['SemioGuia::tipo::sinal'],
                        )

                    elif tipo == 'pense':
                        contar('pense')
                        nota_basica(
                            deck_de(sistema, 'pense'), f'pense:{ident}',
                            para_html(bloco['pergunta']), para_html(bloco['resposta']), '',
                            contexto, fonte, link, tags + ['SemioGuia::tipo::pense'],
                        )

                    elif tipo == 'resumo':
                        contar('resumo')
                        nota_basica(
                            deck_de(sistema, 'resumo'), f'resumo:{ident}',
                            f'<b>{html.escape(topico["titulo"])}</b><br>'
                            '<span style="font-size:15px">O tópico em três linhas.</span>',
                            lista_html(bloco['linhas']), '',
                            contexto, fonte, link, tags + ['SemioGuia::tipo::resumo'],
                        )

                    elif tipo == 'checklist':
                        contar('roteiro')
                        nota_basica(
                            deck_de(sistema, 'roteiro'), f'checklist:{ident}',
                            f'<b>{html.escape(bloco["titulo"])}</b><br>'
                            '<span style="font-size:15px">Quais itens, na ordem?</span>',
                            lista_html(bloco['itens'], ordenada=True), '',
                            contexto, fonte, link, tags + ['SemioGuia::tipo::checklist'],
                        )

                    elif tipo == 'manobra':
                        contar('roteiro')
                        extra = (f'<div class="rotulo">O que observar</div>{para_html(bloco["observar"])}'
                                 if bloco.get('observar') else '')
                        nota_basica(
                            deck_de(sistema, 'roteiro'), f'manobra:{ident}',
                            f'<b>{html.escape(bloco["titulo"])}</b><br>'
                            '<span style="font-size:15px">Quais os passos, na ordem?</span>',
                            lista_html(bloco['passos'], ordenada=True), extra,
                            contexto, fonte, link, tags + ['SemioGuia::tipo::manobra'],
                        )

                    elif tipo == 'quiz':
                        for pergunta in bloco['perguntas']:
                            contar('quiz')
                            letras = 'ABCDE'
                            alternativas = ''.join(
                                f'<li>{html.escape(alt)}</li>' for alt in pergunta['alternativas'])
                            correta = pergunta['alternativas'][pergunta['corretaIndex']]
                            nota = genanki.Note(
                                model=MODELO_ESCOLHA,
                                fields=[
                                    para_html(pergunta['enunciado']),
                                    f'<ol class="alternativas" type="A">{alternativas}</ol>',
                                    f'{letras[pergunta["corretaIndex"]]}. {html.escape(correta)}',
                                    para_html(pergunta['explicacao']),
                                    contexto, fonte, link,
                                ],
                                tags=tags + ['SemioGuia::tipo::questao'],
                                guid=genanki.guid_for(f'quiz:{pergunta["id"]}'),
                            )
                            deck_de(sistema, 'quiz').add_note(nota)

                    elif tipo == 'relampago':
                        contar('relampago')
                        letras = 'ABCD'
                        opcoes = ''.join(f'<li>{html.escape(o)}</li>' for o in bloco['opcoes'])
                        correta = bloco['opcoes'][bloco['corretaIndex']]
                        nota = genanki.Note(
                            model=MODELO_ESCOLHA,
                            fields=[
                                f'{para_html(bloco["caso"])}<div class="rotulo">A decisão</div>'
                                f'{para_html(bloco["pergunta"])}',
                                f'<ol class="alternativas" type="A">{opcoes}</ol>',
                                f'{letras[bloco["corretaIndex"]]}. {html.escape(correta)}',
                                para_html(bloco['desfecho']),
                                contexto, fonte, link,
                            ],
                            tags=tags + ['SemioGuia::tipo::relampago'],
                            guid=genanki.guid_for(f'relampago:{ident}'),
                        )
                        deck_de(sistema, 'relampago').add_note(nota)

                    elif tipo == 'som':
                        arquivo = os.path.join(SONS, f'{bloco["arquivo"]}.wav')
                        if not os.path.exists(arquivo):
                            continue
                        contar('som')
                        if arquivo not in midias:
                            midias.append(arquivo)
                        nota = genanki.Note(
                            model=MODELO_AUSCULTA,
                            fields=[
                                f'[sound:{bloco["arquivo"]}.wav]',
                                html.escape(bloco['titulo']),
                                para_html(bloco['descricao']),
                                contexto,
                                'Procedência e licença de cada som: assets/sons/LICENCAS.md do '
                                'repositório do SemioGuia. Gravações reais: HF_Lung_V1 (CC BY 4.0) '
                                'e CirCor DigiScope (ODC-BY 1.0), com modificações declaradas.',
                                link,
                            ],
                            tags=tags + ['SemioGuia::tipo::som'],
                            guid=genanki.guid_for(f'som:{ident}'),
                        )
                        deck_de(sistema, 'som').add_note(nota)

    # Carta de rosto: de onde veio o baralho e o que ele não cobre.
    raiz = genanki.Deck(ID_DECK_RAIZ, 'SemioGuia')
    total = sum(contagem.values())
    versao = 'sem versão'
    caminho_versao = os.path.join(RAIZ, 'src', 'config', 'versao.ts')
    if os.path.exists(caminho_versao):
        achado = re.search(r"VERSAO_APP\s*=\s*'([^']+)'", open(caminho_versao, encoding='utf-8').read())
        if achado:
            versao = achado.group(1)
    nota_basica(
        raiz, 'semioguia:leia-me',
        '<b>SemioGuia, baralho de semiologia</b><br>'
        '<span style="font-size:15px">De onde vieram estas cartas?</span>',
        f'<p>Todas saíram do conteúdo revisado do aplicativo SemioGuia, versão {versao}, '
        f'gerado por <code>scripts/gerar-anki.py</code>. São {total} cartas dos 12 sistemas, '
        'organizadas do jeito que o app organiza: um baralho por sistema, na ordem craniocaudal, '
        'e dentro dele um subbaralho por modo de estudo.</p>'
        '<p>O texto é autoral, ancorado em quatro obras de referência citadas no rodapé de cada '
        'carta. Reimportar uma versão nova atualiza as cartas existentes em vez de duplicá-las, '
        'e o seu histórico de revisão é preservado.</p>',
        '<div class="rotulo">O que não está aqui</div>'
        '<p>Os 67 casos clínicos ramificados, que são decisões encadeadas e não perguntas de '
        'memória, e as ilustrações, que dependem do app. Ambos ficam no SemioGuia.</p>',
        'SemioGuia', 'Material educacional. Não substitui o julgamento clínico.',
        BASE_WEB, ['SemioGuia::leia-me'],
    )

    pacote = genanki.Package([raiz] + [decks[n] for n in sorted(decks)])
    pacote.media_files = midias
    pacote.write_to_file(saida)

    print(f'gerado {saida}')
    print(f'  baralhos: {len(decks) + 1}')
    for chave, rotulo in SUBBARALHOS.items():
        if contagem.get(chave):
            print(f'  {rotulo}: {contagem[chave]}')
    print(f'  total de cartas: {total + 1} (com a carta de rosto)')
    print(f'  arquivos de áudio: {len(midias)}')


if __name__ == '__main__':
    gerar(sys.argv[1] if len(sys.argv) > 1 else os.path.join(RAIZ, 'SemioGuia.apkg'))
