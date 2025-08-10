import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { COLORS, SCREEN_PADDING } from '../../theme/theme';
import AppHeader from '../../components/AppHeader';
import { useEffect } from 'react';
import { AppDispatch } from '../../store/store';
import { getNowPlayingMovie, movieSelector } from '../../store/MovieSlice';
import MovieItemBox, { MovieDetails } from '../../components/MovieItemBox';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const { getNowPlayingMovieObj } = useSelector(movieSelector);
  useEffect(() => {
    AppDispatch(getNowPlayingMovie()).then(error => {
      console.log('WJ :: ', error);
    });
  }, []);

  if (getNowPlayingMovieObj.status !== 'succeeded') return;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: SCREEN_PADDING }}
        ListHeaderComponent={<AppHeader />}
        data={getNowPlayingMovieObj.payload.results}
        renderItem={({ item }: { item: MovieDetails }) => (
          <MovieItemBox item={item} />
        )}
      />
    </SafeAreaView>
  );
}
