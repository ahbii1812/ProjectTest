import { Image, View } from 'react-native';

export default function AppHeader() {
  return (
    <View style={{ marginVertical: 10, alignItems: 'center' }}>
      <Image
        source={require('../assets/Logo.png')}
        style={{ width: 80 }}
        resizeMode="contain"
      />
    </View>
  );
}
