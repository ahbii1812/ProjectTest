import { Image, StyleSheet, View } from 'react-native';
import AppText from './AppText';
import { COLORS, DEFAULT_SPACING, SHADOW_STYLE } from '../theme/theme';

export interface MovieDetails {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  id: string;
}
export default function MovieItemBox({ item }: { item: MovieDetails }) {
  console.log('WJ :: ', item);
  return (
    <View style={styles.container}>
      <Image
        style={styles.posterImg}
        resizeMode="contain"
        source={{
          uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
        }}
      />
      <View style={styles.textBox}>
        <AppText variant="Movie-Title">{item.title}</AppText>
        <AppText variant="Date-Time-Placeholder">{item.release_date}</AppText>
        <AppText numberOfLines={2} style={{ marginTop: DEFAULT_SPACING }}>
          {item.overview}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    marginVertical: DEFAULT_SPACING,
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
