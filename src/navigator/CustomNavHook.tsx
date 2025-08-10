import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREEN_KEY } from '../constants/ScreenKey';

export type CustomNavigatorList = {
  [SCREEN_KEY.BOTTOM_NAV]: undefined;
  [SCREEN_KEY.HOME]: undefined;
  [SCREEN_KEY.MOVIE_DETAIL]: { movieId: number };
  [SCREEN_KEY.WISHLIST]: undefined;
};

export default function useCustomNavigation() {
  return useNavigation<NativeStackNavigationProp<CustomNavigatorList>>();
}
