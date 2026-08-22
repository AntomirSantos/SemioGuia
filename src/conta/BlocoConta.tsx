import { useCallback, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { useTema } from '../design/ThemeContext';
import { Rotulo } from '../design/Rotulo';
import { espaco, fonte, raio, tipo } from '../design/tokens';
import { useConta } from './AuthContext';
import { syncDisponivel } from './firebaseApp';
import { useSync } from '../sync/orquestrador';

const TEXTO_INDISPONIVEL = 'Sincronização indisponível nesta versão.';
const TEXTO_CARREGANDO = 'Carregando conta…';
const TEXTO_CONVITE = 'Crie uma conta para sincronizar seu progresso entre aparelhos.';
const TEXTO_LGPD =
  'Só o seu e-mail é coletado, usado apenas para sincronizar o progresso entre aparelhos. ' +
  'Você pode excluir a conta e os dados quando quiser.';
const TEXTO_AVISO_EXCLUSAO =
  'Isso apaga sua conta e todo o progresso sincronizado. Essa ação não pode ser desfeita.';
const ERRO_ACAO_GENERICO = 'Não foi possível completar a ação. Tente de novo.';

function mensagemDeErro(erro: unknown): string {
  return erro instanceof Error && erro.message ? erro.message : ERRO_ACAO_GENERICO;
}

function textoStatusSync(sincronizando: boolean, erro: string | null, ultimaSync: number | null): string {
  if (sincronizando) return 'Sincronizando…';
  if (erro) return erro;
  if (ultimaSync !== null) {
    const minutos = Math.floor((Date.now() - ultimaSync) / 60000);
    return minutos < 1 ? 'Sincronizado agora mesmo' : `Sincronizado há ${minutos} min`;
  }
  return 'Ainda não sincronizado';
}

function Campo({
  valor,
  onAlterar,
  rotulo,
  senha,
}: {
  valor: string;
  onAlterar: (v: string) => void;
  rotulo: string;
  senha?: boolean;
}) {
  const { paleta, escala } = useTema();
  return (
    <TextInput
      value={valor}
      onChangeText={onAlterar}
      placeholder={rotulo}
      placeholderTextColor={paleta.tinta2}
      secureTextEntry={senha}
      autoCapitalize="none"
      autoCorrect={false}
      accessibilityLabel={rotulo}
      style={{
        minHeight: 44,
        borderRadius: raio.m,
        borderWidth: 1,
        borderColor: paleta.linha,
        backgroundColor: paleta.superficie,
        paddingHorizontal: espaco.m,
        fontFamily: fonte.corpo,
        fontSize: Math.round(tipo.corpo * escala),
        color: paleta.tinta,
        marginBottom: espaco.s,
      }}
    />
  );
}

function Botao({
  rotulo,
  onPress,
  variante = 'primario',
  desabilitado,
}: {
  rotulo: string;
  onPress: () => void;
  variante?: 'primario' | 'secundario' | 'perigo';
  desabilitado?: boolean;
}) {
  const { paleta } = useTema();
  const cores = {
    primario: { fundo: paleta.acento, texto: paleta.superficie },
    secundario: { fundo: paleta.superficie2, texto: paleta.acentoTinta },
    perigo: { fundo: paleta.erroFundo, texto: paleta.erro },
  }[variante];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!desabilitado }}
      onPress={onPress}
      disabled={desabilitado}
      style={{
        minHeight: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cores.fundo,
        borderRadius: raio.m,
        paddingHorizontal: espaco.l,
        opacity: desabilitado ? 0.6 : 1,
        marginBottom: espaco.s,
      }}
    >
      <Text style={{ fontFamily: fonte.corpoBold, fontSize: tipo.corpo, color: cores.texto }}>{rotulo}</Text>
    </Pressable>
  );
}

function Cartao({ children }: { children: React.ReactNode }) {
  const { paleta } = useTema();
  return (
    <View
      style={{
        backgroundColor: paleta.superficie2,
        borderRadius: raio.m,
        padding: espaco.l,
        marginBottom: espaco.s,
      }}
    >
      {children}
    </View>
  );
}

function Corpo({ children }: { children: string }) {
  const { paleta, escala } = useTema();
  return (
    <Text
      style={{
        fontFamily: fonte.corpo,
        fontSize: Math.round(tipo.small * escala),
        color: paleta.tinta2,
        marginBottom: espaco.m,
      }}
    >
      {children}
    </Text>
  );
}

function TextoErro({ children }: { children: string }) {
  const { paleta, escala } = useTema();
  return (
    <Text
      style={{
        fontFamily: fonte.corpo,
        fontSize: Math.round(tipo.small * escala),
        color: paleta.erro,
        marginBottom: espaco.s,
      }}
    >
      {children}
    </Text>
  );
}

function BlocoSemSessao() {
  const { entrar, criarConta, entrarComGoogle } = useConta();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function executar(acao: () => Promise<void>) {
    setErro(null);
    setEnviando(true);
    try {
      await acao();
    } catch (e) {
      setErro(mensagemDeErro(e));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <Corpo>{TEXTO_CONVITE}</Corpo>
      <Campo rotulo="E-mail" valor={email} onAlterar={setEmail} />
      <Campo rotulo="Senha" valor={senha} onAlterar={setSenha} senha />
      {erro ? <TextoErro>{erro}</TextoErro> : null}
      <Botao rotulo="Entrar" desabilitado={enviando} onPress={() => executar(() => entrar(email, senha))} />
      <Botao
        rotulo="Criar conta"
        variante="secundario"
        desabilitado={enviando}
        onPress={() => executar(() => criarConta(email, senha))}
      />
      <Botao
        rotulo="Entrar com Google"
        variante="secundario"
        desabilitado={enviando}
        onPress={() => executar(() => entrarComGoogle())}
      />
      <Corpo>{TEXTO_LGPD}</Corpo>
    </>
  );
}

function BlocoComSessao({ email }: { email: string | null }) {
  const { paleta, escala } = useTema();
  const { sair, excluirConta } = useConta();
  const { sincronizando, erro: erroSync, ultimaSync, sincronizarAgora } = useSync();
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erroAcao, setErroAcao] = useState<string | null>(null);

  async function executar(acao: () => Promise<void>) {
    setErroAcao(null);
    setEnviando(true);
    try {
      await acao();
    } catch (e) {
      setErroAcao(mensagemDeErro(e));
    } finally {
      setEnviando(false);
    }
  }

  const status = textoStatusSync(sincronizando, erroSync, ultimaSync);

  return (
    <>
      <Text
        style={{
          fontFamily: fonte.corpoBold,
          fontSize: Math.round(tipo.corpo * escala),
          color: paleta.tinta,
          marginBottom: espaco.xs,
        }}
      >
        {email ?? ''}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: espaco.m }}>
        <Text
          style={{
            fontFamily: fonte.corpo,
            fontSize: Math.round(tipo.small * escala),
            color: erroSync ? paleta.erro : paleta.tinta2,
            marginRight: espaco.s,
          }}
        >
          {status}
        </Text>
        {erroSync ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => sincronizarAgora({ forcar: true })}
            style={{ minHeight: 44, justifyContent: 'center' }}
          >
            <Text
              style={{
                fontFamily: fonte.corpoBold,
                fontSize: Math.round(tipo.small * escala),
                color: paleta.acentoTinta,
              }}
            >
              Tentar de novo
            </Text>
          </Pressable>
        ) : null}
      </View>

      {erroAcao ? <TextoErro>{erroAcao}</TextoErro> : null}

      <Botao rotulo="Sair" variante="secundario" desabilitado={enviando} onPress={() => executar(() => sair())} />

      {!confirmandoExclusao ? (
        <Botao rotulo="Excluir conta" variante="perigo" onPress={() => setConfirmandoExclusao(true)} />
      ) : (
        <Cartao>
          <Corpo>{TEXTO_AVISO_EXCLUSAO}</Corpo>
          <Botao rotulo="Cancelar" variante="secundario" onPress={() => setConfirmandoExclusao(false)} />
          <Botao
            rotulo="Confirmar exclusão"
            variante="perigo"
            desabilitado={enviando}
            onPress={() => executar(() => excluirConta())}
          />
        </Cartao>
      )}
    </>
  );
}

export function BlocoConta() {
  const disponivel = syncDisponivel();
  const { usuario, carregando } = useConta();
  const { sincronizarAgora } = useSync();

  // Gatilho "foco no Perfil" (Task 6 brief): reentra em foco tenta
  // sincronizar; `sincronizarAgora` já é no-op sem sessão/config e respeita
  // o debounce de 30s por conta própria.
  useFocusEffect(
    useCallback(() => {
      sincronizarAgora().catch(() => {});
    }, [sincronizarAgora]),
  );

  let conteudo: React.ReactNode;
  if (!disponivel) {
    conteudo = <Corpo>{TEXTO_INDISPONIVEL}</Corpo>;
  } else if (carregando) {
    conteudo = <Corpo>{TEXTO_CARREGANDO}</Corpo>;
  } else if (!usuario) {
    conteudo = <BlocoSemSessao />;
  } else {
    conteudo = <BlocoComSessao email={usuario.email} />;
  }

  return (
    <View style={{ marginBottom: espaco.l }}>
      <Rotulo texto="Conta" style={{ marginBottom: espaco.s }} />
      {conteudo}
    </View>
  );
}
