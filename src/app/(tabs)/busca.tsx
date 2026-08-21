import { Text } from 'react-native';
import { Tela } from '../../design/Tela';
import { useTema } from '../../design/ThemeContext';
import { fonte, tipo } from '../../design/tokens';

export default function Busca() {
  const { paleta } = useTema();
  return (
    <Tela>
      <Text style={{ fontFamily: fonte.display, fontSize: tipo.h1, color: paleta.tinta }}>
        Busca
      </Text>
    </Tela>
  );
}
