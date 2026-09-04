// Mock de teste do expo-audio (mapeado em jest.config.js): o módulo real
// exige o nativo ExpoAudio, ausente no jest. Oferece um player único e
// espiável: os testes podem assertar play()/pause() e o estado exposto.

export const __mockPlayer = {
  play: jest.fn(),
  pause: jest.fn(),
  seekTo: jest.fn(async () => {}),
  remove: jest.fn(),
  loop: false,
  playing: false,
};

export function __resetMockPlayer() {
  __mockPlayer.play.mockClear();
  __mockPlayer.pause.mockClear();
  __mockPlayer.loop = false;
  __mockPlayer.playing = false;
}

export function useAudioPlayer() {
  return __mockPlayer;
}

export function useAudioPlayerStatus() {
  return { playing: __mockPlayer.playing, currentTime: 0, duration: 6.4, isLoaded: true };
}
