import { HeartPulse, Stethoscope, Wind, type LucideIcon } from 'lucide-react-native';

// Mapa "chave do YAML (campo `icone`)" → componente lucide. Adicionar aqui
// conforme novos sistemas entrarem no conteúdo.
const mapaIcones: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  'heart-pulse': HeartPulse,
  wind: Wind,
};

export function obterIcone(chave: string): LucideIcon {
  return mapaIcones[chave] ?? Stethoscope;
}
