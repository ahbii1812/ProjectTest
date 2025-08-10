import { Image, View } from 'react-native';
import { COLORS } from '../theme/theme';

export default function AppHeader() {
  return (
    <View
      style={{
        marginBottom: 10,
        alignItems: 'center',
        width: '100%',
        backgroundColor: COLORS.white,
      }}
    >
      <Image
        source={require('../assets/Logo.png')}
        style={{ width: 80 }}
        resizeMode="contain"
      />
    </View>
  );
}
