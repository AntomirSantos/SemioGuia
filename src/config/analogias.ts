// Imagens do guia (didática 2026-09): as analogias recorrentes do conteúdo,
// com nome próprio — quando a imagem mental tem nome, ela vira vocabulário
// do curso. Cada entrada aponta o tópico onde a imagem nasce; a lista
// alimenta o mini-glossário "Imagens do guia" no Perfil. Curadoria manual:
// só entram imagens que existem literalmente no texto revisado.

export interface ImagemDoGuia {
  nome: string;
  descricao: string;
  topicoId: string;
  topicoTitulo: string;
}

export const IMAGENS_DO_GUIA: ImagemDoGuia[] = [
  {
    nome: 'O rio sem obstáculos',
    descricao: 'O sangue em fluxo laminar corre como um rio de leito limpo; quando surgem turbilhões, nascem os sopros.',
    topicoId: 'aparelho-cardiovascular/exame-cardiaco/sopros-cardiacos',
    topicoTitulo: 'Sopros cardíacos',
  },
  {
    nome: 'Uma escada, um corte',
    descricao: 'A intensidade da febre sobe em degraus (febrícula, moderada, alta) e o corte de 37,8 °C marca onde a febre do adulto começa.',
    topicoId: 'exame-fisico-geral/sinais-vitais/temperatura-e-frequencia-respiratoria',
    topicoTitulo: 'Temperatura e frequência respiratória',
  },
  {
    nome: 'O manômetro do pescoço',
    descricao: 'A jugular interna direita é o manômetro improvisado da pressão venosa central: a altura da coluna é a medida.',
    topicoId: 'aparelho-cardiovascular/exame-cardiaco/pulso-venoso-jugular-e-turgencia',
    topicoTitulo: 'Pulso venoso jugular e turgência',
  },
  {
    nome: 'O título do capítulo',
    descricao: 'A queixa principal anuncia, curta como um título; a história da doença atual é o capítulo que o desenvolve.',
    topicoId: 'anamnese/entrevista-clinica/queixa-principal-e-hda',
    topicoTitulo: 'Queixa principal e HDA',
  },
  {
    nome: 'Dom Quixote e Sancho Pança',
    descricao: 'O longilíneo é Dom Quixote, o brevilíneo é Sancho Pança — e o biotipo diz onde procurar as vísceras.',
    topicoId: 'exame-fisico-geral/avaliacao-geral/ectoscopia',
    topicoTitulo: 'Ectoscopia',
  },
  {
    nome: 'O gato que ronrona',
    descricao: 'O frêmito catário: a vibração de um sopro intenso sob a mão lembra o ronronar de um gato.',
    topicoId: 'aparelho-cardiovascular/exame-cardiaco/inspecao-e-palpacao-do-precordio',
    topicoTitulo: 'Inspeção e palpação do precórdio',
  },
  {
    nome: 'A traqueia de passarinho',
    descricao: 'A artéria radial endurecida e tortuosa da mediosclerose, sentida pelos dedos como uma traqueia de passarinho.',
    topicoId: 'exame-fisico-geral/sinais-vitais/frequencia-cardiaca-e-pulso',
    topicoTitulo: 'Frequência cardíaca e pulso',
  },
  {
    nome: 'Dói–come–passa',
    descricao: 'O ritmo da úlcera duodenal: a dor cede quando o alimento chega — a exceção à regra de que a dor piora quando o órgão trabalha.',
    topicoId: 'anamnese/entrevista-clinica/queixa-principal-e-hda',
    topicoTitulo: 'Queixa principal e HDA',
  },
  {
    nome: 'O filtro que deixa passar os graves',
    descricao: 'O pulmão normal transmite as frequências baixas e retém as altas — é o princípio único por trás do frêmito e da ressonância vocal.',
    topicoId: 'aparelho-respiratorio/exame-do-torax/palpacao-do-torax',
    topicoTitulo: 'Palpação do tórax',
  },
  {
    nome: 'O quadril que mente',
    descricao: 'Profunda demais para doer onde mora, a coxofemoral manda a queixa para a virilha, a coxa e o joelho.',
    topicoId: 'sistema-osteoarticular/exame-osteoarticular/quadril-e-joelho',
    topicoTitulo: 'Quadril e joelho',
  },
  {
    nome: 'O grito de socorro do miocárdio',
    descricao: 'O ritmo de galope por B3 patológica — a imagem é de Porto — sempre aponta comprometimento importante do músculo cardíaco.',
    topicoId: 'aparelho-cardiovascular/exame-cardiaco/ausculta-cardiaca',
    topicoTitulo: 'Ausculta cardíaca',
  },
];
