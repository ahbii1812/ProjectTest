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
import { useCallback, useEffect, useMemo, useState } from 'react';
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
import { LOCAL_STORAGE_KEY } from '../../store/LocalStorageKey';
import { getData, storeData } from '../../store/LocalStorage';
import Spacer from '../../components/Spacer';

type Sorting = 'alphabetical' | 'rating' | 'release date' | null;

export default function HomeScreen() {
  const [category, setCategory] = useState<MovieCategory>('now_playing');
  const [sortBy, setSortBy] = useState<Sorting>(null);

  const [data, setData] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [tempSearch, setTempSearch] = useState<string>('');
  const {
    getNowPlayingMovieListObj,
    getPopularMovieListObj,
    getUpcomingMovieListObj,
  } = useSelector(movieSelector);

  useEffect(() => {
    getData(LOCAL_STORAGE_KEY.CATEGORY_PREFERENCE).then(i => {
      if (i) {
        setCategory(() => i);
        fetchData(i);
      } else {
        fetchData(category);
      }
    });
    getData(LOCAL_STORAGE_KEY.SORTING_PREFERENCE).then(i => {
      if (i) {
        setSortBy(() => i);
      }
    });
  }, []);

  const categoryFetchers = {
    now_playing: getNowPlayingMovieList,
    popular: getPopularMovieList,
    upcoming: getUpcomingMovieList,
  };

  const fetchData = (category: MovieCategory) => {
    const fetcher = categoryFetchers[category];
    if (!fetcher) return;
    AppDispatch(fetcher({ page: 1 })).then(({ meta, payload, error }: any) => {
      setRefreshing(false);
      if (meta.requestStatus === 'fulfilled') {
        setData(() => payload.results);
      }
      if (meta.requestStatus === 'rejected') {
        Alert.alert('Request Failed', error.message);
      }
    });
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(category);
  }, []);

  const onCategoryChange = (value: MovieCategory) => {
    setSearchValue(() => '');
    setTempSearch(() => '');
    setCategory(() => value);
    setData(() => []);
    storeData(LOCAL_STORAGE_KEY.CATEGORY_PREFERENCE, value);
    const fetcher = categoryFetchers[value];
    if (!fetcher) return;
    AppDispatch(fetcher({ page: 1 })).then(({ meta, payload, error }: any) => {
      if (meta.requestStatus === 'fulfilled') {
        setData(() => payload.results);
      }
      if (meta.requestStatus === 'rejected') {
        Alert.alert('Request Failed', error.message);
      }
    });
  };

  const filteredData = useMemo(() => {
    const filtered =
      data.filter((item: MovieDetails) =>
        item.title.toLowerCase().includes(tempSearch.toLowerCase()),
      ) || [];
    const sorted = [...filtered];

    if (sortBy === 'alphabetical') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'release date') {
      sorted.sort(
        (a, b) =>
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime(),
      );
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => b.vote_average - a.vote_average);
    }

    return sorted;
  }, [data, tempSearch, sortBy]);

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
          <AppText variant="RegularBody2Placeholder">
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
            <Spacer />
            <DropdownPicker
              placeholder="Sort by"
              itemList={[
                { label: 'Alphabetical', value: 'alphabetical' },
                { label: 'Rating', value: 'rating' },
                { label: 'Release Date', value: 'release date' },
              ]}
              value={sortBy as string}
              setValue={newValue => {
                setSortBy(newValue as Sorting);
                storeData(LOCAL_STORAGE_KEY.SORTING_PREFERENCE, newValue);
              }}
            />
            <Spacer />
            <TextInputField
              value={searchValue}
              onChangeText={text => {
                if (text === '') {
                  setTempSearch(() => text);
                }
                setSearchValue(() => text);
              }}
              placeholder="Search ...."
              autoFocus={false}
              returnKeyType="done"
            />
            <Spacer />
            <CTAButton
              text="Search"
              onPress={() => setTempSearch(searchValue)}
            />
            <Spacer />
          </View>
        }
        extraData={filteredData}
        data={filteredData}
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
