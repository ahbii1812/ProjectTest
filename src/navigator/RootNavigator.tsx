import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MovieDetail from '../features/movie-detail/MovieDetail.screen';
import { SCREEN_KEY } from '../constants/ScreenKey';
import BottomTabNavigator from './BottomTabNavigator';
import { COLORS } from '../theme/theme';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={SCREEN_KEY.BOTTOM_NAV}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={SCREEN_KEY.BOTTOM_NAV}
          component={BottomTabNavigator}
        />
        <Stack.Screen name={SCREEN_KEY.MOVIE_DETAIL} component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
