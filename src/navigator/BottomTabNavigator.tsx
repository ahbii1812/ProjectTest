import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/home/Home.screen';
import { SCREEN_KEY } from '../constants/ScreenKey';
import WishlistScreen from '../features/wishlist/Wishlist.screen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_KEY.HOME}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={SCREEN_KEY.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN_KEY.WISHLIST} component={WishlistScreen} />
    </Tab.Navigator>
  );
}
