// expo-network depende de módulo nativo ausente no ambiente de teste. O mock
// devolve um aparelho conectado, que é o caso normal: os testes que precisam
// simular a falta de rede sobrescrevem `useNetworkState` com jest.mock.

export function useNetworkState() {
  return { isConnected: true, isInternetReachable: true, type: 'WIFI' };
}

export async function getNetworkStateAsync() {
  return { isConnected: true, isInternetReachable: true, type: 'WIFI' };
}
