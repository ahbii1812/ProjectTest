import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  View,
} from 'react-native';
import {
  COLORS,
  DEFAULT_SPACING,
  SCREEN_PADDING,
  SHADOW_STYLE,
} from '../../theme/theme';
import AppHeader from '../../components/AppHeader';
import { useCallback, useEffect, useState } from 'react';
import { AppDispatch } from '../../store/store';
import {
  getNowPlayingMovieList,
  getPopularMovieList,
  getUpcomingMovieList,
  MovieCategory,
  movieSelector,
} from '../../store/MovieSlice';
import MovieItemBox, { MovieDetails } from '../../components/MovieItemBox';
import DropdownPicker from '../../components/DropdownPicker';
import TextInputField from '../../components/TextInputField';
import CTAButton from '../../components/CTAButton';
import { useSelector } from 'react-redux';
import AppText from '../../components/AppText';

export default function HomeScreen() {
  const [category, setCategory] = useState<MovieCategory>('now_playing');
  const [data, setData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const {
    getNowPlayingMovieListObj,
    getPopularMovieListObj,
    getUpcomingMovieListObj,
  } = useSelector(movieSelector);

  useEffect(() => {
    fetchData();
  }, []);

  const categoryFetchers = {
    now_playing: getNowPlayingMovieList,
    popular: getPopularMovieList,
    upcoming: getUpcomingMovieList,
  };

  const fetchData = () => {
    const fetcher = categoryFetchers[category];
    if (!fetcher) return;
    AppDispatch(fetcher({ page: 1 })).then(({ meta, payload, error }: any) => {
      setRefreshing(false);
      if (meta.requestStatus === 'fulfilled') {
        setData(payload.results);
      }
      if (meta.requestStatus === 'rejected') {
        Alert.alert('Request Failed', error.message);
      }
    });
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const onCategoryChange = (value: MovieCategory) => {
    setCategory(value);
    setData([]);
    const fetcher = categoryFetchers[value];
    if (!fetcher) return;
    AppDispatch(fetcher({ page: 1 })).then(({ meta, payload, error }: any) => {
      if (meta.requestStatus === 'fulfilled') {
        setData(payload.results);
      }
      if (meta.requestStatus === 'rejected') {
        Alert.alert('Request Failed', error.message);
      }
    });
  };

  const renderContent = () => {
    const statusMap = {
      now_playing: getNowPlayingMovieListObj.status,
      popular: getPopularMovieListObj.status,
      upcoming: getUpcomingMovieListObj.status,
    };

    const status = statusMap[category];

    if (status === 'rejected') {
      return (
        <View style={{ alignItems: 'center' }}>
          <AppText>Unable to retrieve data</AppText>
          <AppText variant="Date-Time-Placeholder">
            Pull down to refresh
          </AppText>
        </View>
      );
    }

    if (status === 'succeeded') {
      return <AppText>No movie to display</AppText>;
    }

    return <ActivityIndicator />;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: COLORS.white,
              padding: SCREEN_PADDING,
              paddingTop: 0,
              ...SHADOW_STYLE,
            }}
          >
            <AppHeader />
            <DropdownPicker
              itemList={[
                { label: 'Now Playing', value: 'now_playing' },
                { label: 'Upcoming', value: 'upcoming' },
                { label: 'Popular', value: 'popular' },
              ]}
              value={category}
              setValue={newValue => onCategoryChange(newValue as MovieCategory)}
            />
            <View style={{ height: DEFAULT_SPACING }} />
            <TextInputField
              value={searchValue}
              onChangeText={text => setSearchValue(() => text)}
              placeholder="Search ...."
              autoFocus={false}
              returnKeyType="done"
            />
            <View style={{ height: DEFAULT_SPACING }} />
            <CTAButton text="Search" onPress={() => {}} />
            <View style={{ height: DEFAULT_SPACING }} />
          </View>
        }
        extraData={data}
        data={data || []}
        renderItem={({ item }: { item: MovieDetails }) => (
          <MovieItemBox item={item} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View
            style={{
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {renderContent()}
          </View>
        }
      />
    </SafeAreaView>
  );
}
