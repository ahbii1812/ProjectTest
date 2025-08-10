import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../features/home/Home.screen';
import { SCREEN_KEY } from '../constants/ScreenKey';
import WishlistScreen from '../features/wishlist/Wishlist.screen';
import { COLORS } from '../theme/theme';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_KEY.HOME}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.darkTheme, // 👈 Custom background color
          borderTopColor: 'transparent',
        },
        tabBarActiveTintColor: COLORS.theme, // Active icon/text color
        tabBarInactiveTintColor: COLORS.white, // Inactive icon/text color
        tabBarIcon: ({ color, size }) => {
          if (route.name === SCREEN_KEY.HOME) {
            return (
              <Image
                resizeMode="contain"
                source={require(`../assets/home.png`)}
                style={{ width: size, height: size, tintColor: color }}
              />
            );
          }
          return (
            <Image
              resizeMode="contain"
              source={require(`../assets/bookmark.png`)}
              style={{ width: size, height: size, tintColor: color }}
            />
          );
        },
      })}
    >
      <Tab.Screen name={SCREEN_KEY.HOME} component={HomeScreen} />
      <Tab.Screen name={SCREEN_KEY.WISHLIST} component={WishlistScreen} />
    </Tab.Navigator>
  );
}
