import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Platform } from 'react-native';
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from 'firebase/auth';
import { obterAuth, syncDisponivel } from './firebaseApp';
import { mapearErroAuth } from './errosAuth';

const ERRO_SYNC_NAO_CONFIGURADA = 'Sincronização não configurada';
const ERRO_GOOGLE_NATIVO =
  'Login com Google ainda não está disponível no app nativo — chega em uma próxima versão. Use e-mail e senha por enquanto.';

export interface UsuarioConta {
  uid: string;
  email: string | null;
}

interface ContaContexto {
  usuario: UsuarioConta | null;
  carregando: boolean;
  criarConta(email: string, senha: string): Promise<void>;
  entrar(email: string, senha: string): Promise<void>;
  entrarComGoogle(): Promise<void>;
  sair(): Promise<void>;
  excluirConta(): Promise<void>;
}

function paraUsuarioConta(usuario: User): UsuarioConta {
  return { uid: usuario.uid, email: usuario.email };
}

// Todo erro de chamada ao SDK (createUserWithEmailAndPassword, signIn*,
// deleteUser, ...) passa por aqui antes de sair do Provider: nunca deixamos o
// texto técnico do Firebase (em inglês) vazar para a UI.
function erroMapeado(erro: unknown): Error {
  const codigo =
    typeof erro === 'object' && erro !== null && 'code' in erro
      ? String((erro as { code: unknown }).code)
      : '';
  return new Error(mapearErroAuth(codigo));
}

const Ctx = createContext<ContaContexto | null>(null);

/**
 * Contexto de conta opcional: a sincronização (config do Firebase) pode estar
 * indisponível — o app inteiro funciona em modo local nesse caso. Aqui, sem
 * config, o provider monta normalmente com `usuario: null` e
 * `carregando: false`, e toda ação rejeita com a mensagem pt-BR de
 * "Sincronização não configurada" em vez de tentar tocar o SDK.
 *
 * `apagarDados`, se fornecido, é chamado com o uid ANTES de `deleteUser`: as
 * regras do Firestore exigem usuário autenticado para apagar os próprios
 * documentos, então apagar a conta primeiro deixaria os dados órfãos e
 * inacessíveis (Task 6 injeta o apagador real).
 *
 * CONSEQUÊNCIA dessa ordem: se `apagarDados` tiver sucesso mas `deleteUser`
 * falhar depois (o caso mais comum é `auth/requires-recent-login`, exigindo
 * reautenticação), os dados de servidor do usuário já foram apagados
 * enquanto a conta Auth continua existindo — `excluirConta()` rejeita, mas
 * o estado local `usuario` permanece o mesmo (só `onAuthStateChanged` o
 * altera), então a UI segue mostrando a pessoa "logada". Por isso o
 * `apagarDados` injetado PRECISA ser idempotente: reentrar e chamar
 * `excluirConta()` de novo (depois de reautenticar) tem que tolerar dados
 * já ausentes sem lançar. Contrato obrigatório para a implementação da
 * Task 6.
 */
export function AuthProvider({
  children,
  apagarDados,
}: {
  children: ReactNode;
  apagarDados?: (uid: string) => Promise<void>;
}) {
  const disponivel = syncDisponivel();
  const [usuario, setUsuario] = useState<UsuarioConta | null>(null);
  const [carregando, setCarregando] = useState(disponivel);

  useEffect(() => {
    if (!disponivel) return;
    const auth = obterAuth();
    return onAuthStateChanged(auth, (usuarioSdk) => {
      setUsuario(usuarioSdk ? paraUsuarioConta(usuarioSdk) : null);
      setCarregando(false);
    });
  }, [disponivel]);

  const criarConta = useCallback(
    async (email: string, senha: string) => {
      if (!disponivel) throw new Error(ERRO_SYNC_NAO_CONFIGURADA);
      let credencial;
      try {
        credencial = await createUserWithEmailAndPassword(obterAuth(), email, senha);
      } catch (erro) {
        throw erroMapeado(erro);
      }
      try {
        // Não bloqueia o uso: falha ao enviar o e-mail de verificação não
        // impede a conta recém-criada de continuar.
        await sendEmailVerification(credencial.user);
      } catch {
        // silencioso de propósito
      }
    },
    [disponivel],
  );

  const entrar = useCallback(
    async (email: string, senha: string) => {
      if (!disponivel) throw new Error(ERRO_SYNC_NAO_CONFIGURADA);
      try {
        await signInWithEmailAndPassword(obterAuth(), email, senha);
      } catch (erro) {
        throw erroMapeado(erro);
      }
    },
    [disponivel],
  );

  const entrarComGoogle = useCallback(async () => {
    if (!disponivel) throw new Error(ERRO_SYNC_NAO_CONFIGURADA);
    if (Platform.OS !== 'web') {
      throw new Error(ERRO_GOOGLE_NATIVO);
    }
    try {
      await signInWithPopup(obterAuth(), new GoogleAuthProvider());
    } catch (erro) {
      throw erroMapeado(erro);
    }
  }, [disponivel]);

  const sair = useCallback(async () => {
    if (!disponivel) throw new Error(ERRO_SYNC_NAO_CONFIGURADA);
    try {
      await signOut(obterAuth());
    } catch (erro) {
      throw erroMapeado(erro);
    }
  }, [disponivel]);

  const excluirConta = useCallback(async () => {
    if (!disponivel) throw new Error(ERRO_SYNC_NAO_CONFIGURADA);
    const auth = obterAuth();
    const usuarioAtual = auth.currentUser;
    if (!usuarioAtual) throw new Error(mapearErroAuth(''));
    try {
      if (apagarDados) {
        await apagarDados(usuarioAtual.uid);
      }
      await deleteUser(usuarioAtual);
    } catch (erro) {
      throw erroMapeado(erro);
    }
  }, [disponivel, apagarDados]);

  const valor = useMemo<ContaContexto>(
    () => ({ usuario, carregando, criarConta, entrar, entrarComGoogle, sair, excluirConta }),
    [usuario, carregando, criarConta, entrar, entrarComGoogle, sair, excluirConta],
  );

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useConta(): ContaContexto {
  const v = useContext(Ctx);
  if (!v) throw new Error('useConta requer AuthProvider');
  return v;
}
