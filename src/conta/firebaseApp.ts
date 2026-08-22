import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';

import { firebaseConfig as configPadrao, type FirebaseConfigApp } from './config';

const ERRO_SYNC_NAO_CONFIGURADA = 'Sincronização não configurada';

let configAtual: FirebaseConfigApp | null = configPadrao;
let appInstancia: FirebaseApp | null = null;
let authInstancia: Auth | null = null;
let dbInstancia: Firestore | null = null;

/**
 * Usado SÓ em teste: injeta (ou remove, com `null`) a config do Firebase e
 * reseta o estado interno (app/auth/db) para isolar cada teste. Não exportar
 * em nenhum barrel de produção.
 */
export function _setConfigParaTeste(cfg: FirebaseConfigApp | null): void {
  configAtual = cfg;
  appInstancia = null;
  authInstancia = null;
  dbInstancia = null;
}

export function syncDisponivel(): boolean {
  return configAtual !== null;
}

export function obterApp(): FirebaseApp {
  if (configAtual === null) {
    throw new Error(ERRO_SYNC_NAO_CONFIGURADA);
  }
  if (!appInstancia) {
    appInstancia = initializeApp(configAtual);
  }
  return appInstancia;
}

export function obterAuth(): Auth {
  if (configAtual === null) {
    throw new Error(ERRO_SYNC_NAO_CONFIGURADA);
  }
  if (!authInstancia) {
    authInstancia = getAuth(obterApp());
  }
  return authInstancia;
}

export function obterDb(): Firestore {
  if (configAtual === null) {
    throw new Error(ERRO_SYNC_NAO_CONFIGURADA);
  }
  if (!dbInstancia) {
    dbInstancia = getFirestore(obterApp());
  }
  return dbInstancia;
}
