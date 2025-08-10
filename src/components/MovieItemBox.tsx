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
}
export default function MovieItemBox({ item }: { item: MovieDetails }) {
  const navigator = useCustomNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigator.navigate(SCREEN_KEY.MOVIE_DETAIL, { movieId: item.id })
      }
    >
      <Image
        style={styles.posterImg}
        resizeMode="contain"
        source={{
          uri: `${process.env.API_IMAGE_DOMAIN}/w200${item.poster_path}`,
        }}
      />
      <View style={styles.textBox}>
        <AppText variant="Movie-Title">{item.title}</AppText>
        <AppText variant="Date-Time-Placeholder">{item.release_date}</AppText>
        <AppText numberOfLines={2} style={{ marginTop: DEFAULT_SPACING }}>
          {item.overview}
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
