import { Platform } from 'react-native';
import * as Haptics from 'expo-haptics';

// Micro-recompensa tátil (didática 2026-09): um toque físico curto no
// acerto, no erro e no fecho da revisão — só no aparelho, nunca na web.
// Fire-and-forget: háptica indisponível (aparelho sem motor, permissão,
// simulador) jamais pode derrubar o fluxo do quiz.
function disparar(tipo: Haptics.NotificationFeedbackType) {
  if (Platform.OS === 'web') return;
  Haptics.notificationAsync(tipo).catch(() => {});
}

export function hapticaAcerto() {
  disparar(Haptics.NotificationFeedbackType.Success);
}

export function hapticaErro() {
  disparar(Haptics.NotificationFeedbackType.Error);
}

export function hapticaConclusao() {
  disparar(Haptics.NotificationFeedbackType.Success);
}
