import {
  ClipboardList,
  Grid3x3,
  HeartPulse,
  ScanFace,
  Stethoscope,
  Wind,
  type LucideIcon,
} from 'lucide-react-native';

// Mapa "chave do YAML (campo `icone`)" → componente lucide. Adicionar aqui
// conforme novos sistemas entrarem no conteúdo.
const mapaIcones: Record<string, LucideIcon> = {
  stethoscope: Stethoscope,
  'heart-pulse': HeartPulse,
  wind: Wind,
  'clipboard-list': ClipboardList,
  'grid-3x3': Grid3x3,
  'scan-face': ScanFace,
};

export function obterIcone(chave: string): LucideIcon {
  return mapaIcones[chave] ?? Stethoscope;
}
