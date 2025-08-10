/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { Platform, SafeAreaView, View } from 'react-native';
import RootNavigator from './src/navigator/RootNavigator';
import { COLORS } from './src/theme/theme';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

function App() {
  return (
    <Provider store={store}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          paddingTop: Platform.OS === 'android' ? 65 : 0,
        }}
      >
        <RootNavigator />
      </View>
    </Provider>
  );
}

export default App;
