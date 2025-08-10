import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import { COLORS, DEFAULT_SPACING, SHADOW_STYLE } from '../theme/theme';
import useCustomNavigation from '../navigator/CustomNavHook';
import { SCREEN_KEY } from '../constants/ScreenKey';

export interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  id: number;
  vote_average: number;
}
export default function MovieItemBox({
  item,
  onRemoveFromWishList,
  isWishList,
}: {
  item: MovieDetails;
  onRemoveFromWishList?: (id: number) => void;
  isWishList?: boolean;
}) {
  const navigator = useCustomNavigation();
  const { title, overview, poster_path, release_date, id } = item;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigator.navigate(SCREEN_KEY.MOVIE_DETAIL, { movieId: id })
      }
    >
      {isWishList && onRemoveFromWishList && (
        <TouchableOpacity
          onPress={() => onRemoveFromWishList(id)}
          style={{
            zIndex: 999,
            padding: DEFAULT_SPACING,
            position: 'absolute',
            right: DEFAULT_SPACING,
            top: DEFAULT_SPACING,
          }}
        >
          <Image
            source={require('../assets/remove.png')}
            style={{ width: 10, height: 10 }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Image
        style={styles.posterImg}
        resizeMode="contain"
        source={{
          uri: `${process.env.API_IMAGE_DOMAIN}/w200${poster_path}`,
        }}
      />
      <View style={styles.textBox}>
        <AppText variant="SemiBody">{title}</AppText>
        <AppText variant="RegularBody2Placeholder">{release_date}</AppText>
        <AppText numberOfLines={2} style={{ marginTop: DEFAULT_SPACING }}>
          {overview}
        </AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    margin: DEFAULT_SPACING,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    ...SHADOW_STYLE,
  },
  posterImg: {
    width: 85,
    height: 125,
  },
  textBox: {
    padding: DEFAULT_SPACING,
    flexShrink: 1,
    justifyContent: 'center',
  },
});
