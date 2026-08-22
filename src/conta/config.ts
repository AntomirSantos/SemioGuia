// Config pública do Firebase Web SDK (não é segredo — ver docs do Firebase).
// COMMITADO com `null`: o autor substitui pelo objeto do console do Firebase
// depois de criar o projeto. Enquanto for `null`, a sincronização fica
// indisponível e o app funciona normalmente em modo local.
export interface FirebaseConfigApp {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
}

export const firebaseConfig: FirebaseConfigApp | null = null;
