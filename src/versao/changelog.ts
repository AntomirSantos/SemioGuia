import { VERSAO_APP } from '../config/versao';

// Changelog do app (beta §9.8): esta lista é a FONTE ÚNICA, o CHANGELOG.md
// na raiz é gerado dela por `npm run changelog`, e o cartão "O que mudou"
// lê as linhas da entrada mais recente. A cada publicação em gh-pages:
// bump em src/config/versao.ts + nova entrada aqui + `npm run changelog`.

export interface EntradaChangelog {
  versao: string;
  data: string; // YYYY-MM-DD da publicação em gh-pages
  linhas: string[];
}

export const CHANGELOG: EntradaChangelog[] = [
  {
    versao: '1.2.30',
    data: '2026-09-06',
    linhas: [
      'Quinze casos clínicos novos: pancreatite, colangite, hemorragia digestiva alta, endocardite, tamponamento cardíaco, síndrome compartimental, fasciíte necrosante, celulite orbitária, pré-eclâmpsia grave, crise tireotóxica, insuficiência adrenal aguda, síndrome da cauda equina, epiglotite na criança, intoxicação por agrotóxico e estado de mal epiléptico',
      'O acervo chega a 47 casos, com oito no abdome e seis no cardiovascular, sempre com a decisão resolvida pelo exame à beira do leito',
      'Vários deles ensinam armadilhas de conduta: nitrato no infarto de ventrículo direito, diurético no tamponamento, elevar o membro na síndrome compartimental, iodo antes do antitireoidiano e atropina guiada pela pupila em vez do pulmão',
    ],
  },
  {
    versao: '1.2.29',
    data: '2026-09-06',
    linhas: [
      'Vinte casos clínicos novos, os mais emblemáticos de cada especialidade: infarto com dor atípica, dissecção de aorta, edema agudo, embolia pulmonar, pneumotórax hipertensivo, asma quase fatal, os quatro tipos restantes de abdome agudo, anafilaxia, sepse no idoso, cetoacidose, acidente vascular na janela, hemorragia subaracnóidea, trombose venosa, artrite séptica, desidratação grave no lactente, risco de suicídio e glaucoma agudo',
      'O acervo passou de 12 para 32 casos, e todos os 12 sistemas agora têm mais de um caminho para treinar',
      'Cada caso aberto mostra o selo de revisão pendente, e a fila de conferência do autor está registrada em docs/casos-para-revisao.md',
    ],
  },
  {
    versao: '1.2.28',
    data: '2026-09-06',
    linhas: [
      'Questões e casos clínicos agora têm cada um a sua tela, organizadas como o modo plantão: busca instantânea, grupos por sistema e linhas que abrem no lugar',
      'A aba Estudar virou a porta de entrada: a revisão que venceu hoje e os dois caminhos, com a conta do acervo em cada um',
      'Os checklists ficaram com aba exclusiva, e cada roteiro de lá pode virar estação de prática sem sair da tela',
    ],
  },
  {
    versao: '1.2.27',
    data: '2026-09-06',
    linhas: [
      'A aba Estudar foi reorganizada em quatro blocos: o que venceu hoje, quiz por sistema, casos clínicos e estações OSCE',
      'Quiz e estações agora vêm agrupados por sistema em linhas que abrem e fecham: 12 linhas em vez de 55, com a média das rodadas de cada sistema',
      'Um sumário no topo salta direto para a seção, e os casos aparecem na ordem do exame com o sistema de origem',
    ],
  },
  {
    versao: '1.2.26',
    data: '2026-09-06',
    linhas: [
      'O estridor agora é gravação clínica real (HF_Lung_V1), com seis ciclos inspiratórios rotulados; a faixa de tom real ficou registrada no próprio tópico',
      'Metade dos 20 sons do app já é gravação real; o garimpo por um sopro contínuo verdadeiro no CirCor deu negativo e está documentado',
      'A busca por fontes abertas para galopes, atritos e sons traqueais foi registrada: nenhuma licença disponível passa no critério do guia, e as pistas ficaram anotadas para o autor',
    ],
  },
  {
    versao: '1.2.25',
    data: '2026-09-06',
    linhas: [
      'Os sons cardíacos principais agora são gravações clínicas reais: bulhas normais, sopro sistólico ejetivo, sopro de regurgitação e sopro diastólico (CirCor DigiScope, PhysioNet, ODC-BY 1.0)',
      'As gravações vêm de crianças e adolescentes de campanhas de rastreio no Nordeste do Brasil, e o aviso do player declara a origem',
      'Nove dos 20 sons do app já são reais; galopes, desdobramento de B2, ruflar, sopro contínuo e atritos seguem sintetizados por falta de rótulo nos datasets abertos',
    ],
  },
  {
    versao: '1.2.24',
    data: '2026-09-05',
    linhas: [
      'O texto agora afirma direto, sem citar as obras no corpo dos tópicos e casos; a bibliografia completa vive na aba Perfil',
      'Nove casos clínicos novos, um por sistema: derrame pleural, apendicite, meningite, isquemia aguda, joelho agudo, nódulo cervical, escroto agudo, delirium e a consulta de anamnese (total: 12)',
      'A revisão espaçada ganhou flashcards dos 186 sinais do plantão, semeados ao marcar o tópico como estudado',
      'O player de ausculta ganhou um fonocardiograma: o desenho do som acompanha o que você ouve',
      'Estertores finos e grossos agora são gravações clínicas reais (dataset aberto HF_Lung_V1, CC BY 4.0)',
    ],
  },
  {
    versao: '1.2.23',
    data: '2026-09-05',
    linhas: [
      'Exame completo da cabeça aos pés: os 53 checklists em sequência única, com relatório final do que ficou de fora',
      'A busca ignora acentos dos dois lados e aprendeu os apelidos de enfermaria: rebote, punhopercussão, clubbing, wheezing, estase jugular e dezenas de outros',
      'Cada item esquecido no relatório leva direto à parte do tópico que o ensina',
    ],
  },
  {
    versao: '1.2.22',
    data: '2026-09-05',
    linhas: [
      'Plantão e Checklists ganharam abas próprias na barra de navegação, saindo da aba Guia',
      'A busca ficou incisiva: digitar Blumberg agora traz o próprio Sinal de Blumberg (e os checklists também aparecem), não só o título do tópico',
      'Do plantão, dos checklists e da busca, o tópico abre exatamente na parte do material que fala do achado',
    ],
  },
  {
    versao: '1.2.21',
    data: '2026-09-05',
    linhas: [
      'Tela nova de checklists: os 53 roteiros de exame do guia em um só lugar, por sistema, com itens marcáveis para conferir o que faltou',
      'A ausculta ficou educada: tocar um som para o anterior, nada mais se sobrepõe, e cada clique concede cerca de 10 segundos de escuta',
      'Cada checklist mostra o placar (quantos itens faltam), tem botão de refazer e salta ao tópico de origem',
    ],
  },
  {
    versao: '1.2.20',
    data: '2026-09-05',
    linhas: [
      'Sinal das pontas corrigido: caminhar na ponta dos pés testa S1 (flexão plantar) e nos calcanhares testa L4/L5 (dorsiflexão)',
      'A verificação na fonte mostrou contradição interna: o parágrafo do capítulo de lombalgia inverte o pareamento que a Tabela 2 da mesma obra sustenta',
      'Tópico da coluna e verbete do plantão mudaram juntos, com a divergência registrada no texto e no adendo para o autor',
    ],
  },
  {
    versao: '1.2.19',
    data: '2026-09-05',
    linhas: [
      'O plantão está completo: 186 verbetes, com os 86 que faltavam escritos a partir do texto revisado dos tópicos',
      'Entraram os testes do ombro e do joelho, as marchas, as fácies, os sinais vasculares, a torção testicular, o papiledema e o reflexo de Moro',
      'O que as fontes declaram em desuso ou só nomeiam (Schober, Lhermitte, Brodie-Trendelenburg, Perthès) ficou de fora, com o motivo registrado para o autor',
    ],
  },
  {
    versao: '1.2.18',
    data: '2026-09-04',
    linhas: [
      'O modo plantão quase triplicou: de 36 para 100 verbetes de sinais, todos derivados do texto já revisado dos tópicos',
      'Entraram Babinski, Romberg, Kernig e Brudzinski, os ritmos respiratórios, os sons adventícios, os sinais da ascite, Lachman, Patrick e muito mais',
      'Os verbetes ganharam destaques em negrito nas partes decisivas: o achado, o divisor diagnóstico e a urgência saltam aos olhos',
    ],
  },
  {
    versao: '1.2.17',
    data: '2026-09-04',
    linhas: [
      'Modo plantão redesenhado: os sinais agora aparecem agrupados por sistema, na ordem craniocaudal do guia',
      'Cada sinal é uma linha compacta que abre ao toque: o achado, o significado, as causas em lista e o salto ao tópico',
      'Na busca, até três resultados já chegam abertos; folhear ficou leve e ler continua um gesto seu',
    ],
  },
  {
    versao: '1.2.16',
    data: '2026-09-04',
    linhas: [
      'A rota da palpação hepática foi redesenhada: rótulos fora do desenho, margem livre à esquerda, nada mais se sobrepõe',
      'As legendas das ilustrações agora são justificadas, como o restante da prosa de leitura',
      'Retoque na seta da cauda de Spence na ilustração do exame das mamas',
    ],
  },
  {
    versao: '1.2.15',
    data: '2026-09-04',
    linhas: [
      'Modo plantão: "achei um sinal no exame, e agora?", busca instantânea do achado ao significado, às causas e ao tópico',
      'Quatro ilustrações novas onde não havia nenhuma: rota da palpação hepática, curvas de instalação dos 3 Ds (animadas), territórios da mama e a ordem do exame da criança',
      'Reparos de pontuação em dez trechos que a remoção dos travessões havia embaralhado',
    ],
  },
  {
    versao: '1.2.14',
    data: '2026-09-04',
    linhas: [
      'A prosa de leitura agora é justificada, alinhada nas duas margens como página de livro',
      'Vale para os tópicos, os casos clínicos, as explicações do quiz e as descrições de ausculta',
      'No Android, a hifenização automática evita espaços exagerados na coluna estreita',
    ],
  },
  {
    versao: '1.2.13',
    data: '2026-09-04',
    linhas: [
      'Revisão de estilo em todo o guia: os travessões saíram de cena, no lugar deles vírgulas, dois-pontos e parênteses',
      'Mais de sete mil ocorrências reescritas, dos tópicos aos casos, passando por títulos, legendas e ilustrações',
      'Um vigia novo no build garante que o sinal não volta em nenhum texto futuro',
    ],
  },
  {
    versao: '1.2.12',
    data: '2026-09-04',
    linhas: [
      'Os quatro sons respiratórios normais completos: traqueal, brônquico e broncovesicular entram ao lado do murmúrio vesicular',
      'O tópico de sopros ganha a referência normal: ouça o TUM-TA limpo antes de cada sopro ocupar o seu lugar',
      '20 sons no total; a tabela dos normais agora se escuta linha a linha',
    ],
  },
  {
    versao: '1.2.11',
    data: '2026-09-04',
    linhas: [
      'Três sons agora são gravações clínicas reais: murmúrio vesicular, sibilos e roncos (dataset aberto HF_Lung_V1, licença CC BY 4.0)',
      'Selecionados pelos rótulos clínicos do dataset e por verificação espectral; o player identifica gravação real × som sintetizado',
      'Proveniência e licença documentadas no repositório; estridor e estertores permanecem sintetizados, fiéis ao texto',
    ],
  },
  {
    versao: '1.2.10',
    data: '2026-09-04',
    linhas: [
      'Timbre dos sons respiratórios corrigido para o grave que o texto descreve (~100 Hz no murmúrio vesicular)',
      'O ajuste veio de uma auditoria numérica dos próprios arquivos contra os parâmetros do texto revisado',
      'Nenhum outro som mudou: picos e intervalos conferidos antes e depois',
    ],
  },
  {
    versao: '1.2.9',
    data: '2026-09-04',
    linhas: [
      'Segunda leva de ausculta: 9 sons novos, 17 no total, cobrindo todos os fenômenos sonoros que o texto descreve',
      'No coração: galope por B4, desdobramento de B2 com a respiração marcando as fases, regurgitação, ruflar, sopro contínuo e atrito pericárdico',
      'No pulmão: roncos, estridor (o espelho inspiratório do sibilo) e atrito pleural',
    ],
  },
  {
    versao: '1.2.8',
    data: '2026-09-04',
    linhas: [
      'Ausculta dentro do tópico: 8 sons sintetizados tocáveis, bulhas, galope, sopros sistólico e diastólico, murmúrio, sibilos e estertores',
      'As ilustrações temporais agora se desenham: sopros no ciclo, ondas do pulso venoso, curvas térmicas e os ritmos respiratórios (novos, com Cheyne-Stokes)',
      'Micro-recompensas sóbrias no quiz: check que se desenha, toque háptico no celular e o fecho "Revisão do dia encerrada"',
    ],
  },
  {
    versao: '1.2.7',
    data: '2026-09-04',
    linhas: [
      'Caso-relâmpago em todos os 55 tópicos: um parágrafo-caso com uma decisão única no fim da leitura',
      'Você escolhe, o desfecho aparece: errar também ensina, e a escolha vale pela tentativa',
      'É a ponte entre a leitura e os três casos clínicos ramificados',
    ],
  },
  {
    versao: '1.2.6',
    data: '2026-09-04',
    linhas: [
      'Toda razão de verossimilhança citada agora vem traduzida: o quanto o achado move a probabilidade, regra vigiada pelo build',
      'Novo no Perfil: "Imagens do guia", o glossário das analogias com nome próprio, do rio sem obstáculos ao quadril que mente',
      'Cada imagem leva ao tópico em que ela nasce',
    ],
  },
  {
    versao: '1.2.5',
    data: '2026-09-04',
    linhas: [
      'Todos os 55 tópicos ganham uma cena clínica de abertura, uma pergunta "Pense antes de seguir" e o fecho "Em três linhas"',
      'A pergunta do meio da leitura esconde a resposta até você tentar de cabeça: recuperação ativa dentro do texto',
      'Nada mudou no conteúdo revisado: os blocos novos derivam do texto já fechado pelo autor',
    ],
  },
  {
    versao: '1.2.4',
    data: '2026-09-04',
    linhas: [
      'Ícone definitivo do app: "S" serifado em papel sobre vinho, como capa de livro',
      'Splash na paleta editorial, com variante própria para o tema escuro',
      'Favicon e ícones adaptativos do Android refeitos na mesma marca',
    ],
  },
  {
    versao: '1.2.3',
    data: '2026-09-04',
    linhas: [
      'Revisão do autor encerrada: os 86 itens do checklist estão fechados',
      'Livedo reticular corrigido pela literatura: a malha cianótica circunda centros pálidos',
      'Flegmasias com as formas consagradas (alba dolens e cerulea dolens)',
    ],
  },
  {
    versao: '1.2.2',
    data: '2026-09-04',
    linhas: [
      'Cabeça e pescoço com lados eleitos pela hierarquia: anisocoria e enoftalmia por McGee, Rinne por intensidade, palpação da tireoide pelo movimento',
      'Manobra de oclusão arterial transitória entra nas manobras dinâmicas dos sopros',
      'Casos clínicos e periodicidades de rastreamento endossados pelo autor',
    ],
  },
  {
    versao: '1.2.1',
    data: '2026-09-04',
    linhas: [
      'Triagem de literatura concluída nos 12 sistemas: todos os 55 tópicos agora "Revisado"',
      'Selo "Em revisão pelo autor" sai do app inteiro',
      'Valores conferidos na literatura aberta e nas obras de referência, com divergências atribuídas',
    ],
  },
  {
    versao: '1.2.0',
    data: '2026-09-04',
    linhas: [
      'Anamnese e exame físico geral revisados pela literatura: 19 tópicos agora "Revisado" na home',
      'Quiz cobra só o nível básico, sem viés de resposta longa; cores de sistema re-otimizadas para daltonismo',
      'Duas ilustrações novas: padrões de perda sensitiva e membro ameaçado × inviável',
    ],
  },
  {
    versao: '1.1.3',
    data: '2026-09-03',
    linhas: [
      'Hierarquia editorial completa: McGee primeiro, Semiologia Clínica como desempate',
      'Guia adota: Traube semilunar, escala de pulso 0 a 3+, reflexos 0, ++++, faixas de FR da criança',
      'Também: espéculo na paciente com hímen perfurado (SC), posições do toque retal e ITB de McGee',
    ],
  },
  {
    versao: '1.1.2',
    data: '2026-09-03',
    linhas: [
      'Regra editorial do autor: em conflito direto entre fontes, prevalece McGee',
      'Joelho passa a adotar flexão normal de 130°; relógio de Wolf-Klein sem ajuste por escolaridade',
      'Dez divergências do checklist fechadas com a posição contrária mantida e atribuída',
    ],
  },
  {
    versao: '1.1.1',
    data: '2026-09-03',
    linhas: [
      'Cardiovascular e respiratório revisados: selo "Em revisão" removido e marcador "Revisado" na home',
      'Valores de evidência conferidos com a literatura; divergências entre fontes citadas ao lado dos números',
      'Nada mudou de direção: os achados do guia foram confirmados',
    ],
  },
  {
    versao: '1.1.0',
    data: '2026-09-03',
    linhas: [
      'Onboarding com data da prova e plano de estudo diário na home',
      'Compartilhar resultado das estações OSCE e feedback dentro do app',
      'Abrir links diretos de tópicos sem aviso de erro (correção do #418)',
    ],
  },
  {
    versao: '1.0.0',
    data: '2026-09-02',
    linhas: [
      'Guia completo: 12 sistemas e 55 tópicos, da anamnese à criança',
      'Design Editorial (tipografia serifada, papel e tinta) com animações',
      'Quiz, revisão espaçada, estações OSCE e 3 casos clínicos',
    ],
  },
];

/** As N linhas mais recentes (da entrada do topo) para o cartão da home. */
export function linhasMaisRecentes(entradas: EntradaChangelog[], n = 3): string[] {
  return entradas[0]?.linhas.slice(0, n) ?? [];
}

export function gerarMarkdownChangelog(entradas: EntradaChangelog[]): string {
  const corpo = entradas
    .map((e) => `## ${e.versao} (${e.data})\n\n${e.linhas.map((l) => `- ${l}`).join('\n')}\n`)
    .join('\n');
  return `# Changelog\n\nUma entrada por publicação em gh-pages, a mais recente primeiro.\nGerado de \`src/versao/changelog.ts\` por \`npm run changelog\`: edite lá.\n\n${corpo}`;
}

/** Consistência: a entrada mais recente deve ser a versão corrente do app. */
export function changelogConsistente(entradas: EntradaChangelog[]): boolean {
  return entradas[0]?.versao === VERSAO_APP;
}
