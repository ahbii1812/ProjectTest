import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { AppDispatch } from '../../store/store';
import {
  getMovieCredit,
  getMovieDetails,
  getRecommendedMovie,
  movieSelector,
} from '../../store/MovieSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomNavigatorList } from '../../navigator/CustomNavHook';
import { COLORS, DEFAULT_SPACING, SHADOW_STYLE } from '../../theme/theme';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import NavigationHeader from '../../components/NavigationHeader';
import { useSelector } from 'react-redux';

type Props = NativeStackScreenProps<CustomNavigatorList, 'Movie Detail'>;

export default function MovieDetail({ route }: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const { movieId } = route.params;
  const { getMovieDetailObj, getMovieCreditObj, getRecommendedMovieObj } =
    useSelector(movieSelector);
  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = async () => {
    try {
      const detailsResult: any = await AppDispatch(
        getMovieDetails({ movieId }),
      );

      if (detailsResult.meta.requestStatus === 'rejected') {
        throw detailsResult.error;
      }

      const creditResult: any = await AppDispatch(getMovieCredit({ movieId }));

      if (creditResult.meta.requestStatus === 'rejected') {
        throw creditResult.error;
      }

      const recommendedResult: any = await AppDispatch(
        getRecommendedMovie({ movieId }),
      );

      if (recommendedResult.meta.requestStatus === 'rejected') {
        throw recommendedResult.error;
      }
    } catch (error: any) {
      Alert.alert('Request Failed', error?.message || 'Something went wrong');
    }
    setRefreshing(false);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMovieData();
  }, []);

  const getGenres = useMemo(() => {
    const type: any = [];
    if (getMovieDetailObj.status === 'succeeded') {
      getMovieDetailObj.payload.genres?.map((item: any) => {
        type.push(item.name);
      });
      return type.toString().replace(/,/g, ', ');
    }
    return '';
  }, [getMovieDetailObj.status]);

  const getDirectorName = useMemo(() => {
    if (getMovieCreditObj.status === 'succeeded') {
      const director = getMovieCreditObj.payload?.crew?.find(
        (item: any) => item.job === 'Director',
      );
      return director?.original_name;
    }
    return null;
  }, [getMovieCreditObj.status]);

  const getWriterName = useMemo(() => {
    if (getMovieCreditObj.status === 'succeeded') {
      const writer = getMovieCreditObj.payload?.crew?.find(
        (item: any) => item.job === 'Novel',
      );
      return writer?.original_name;
    }
    return null;
  }, [getMovieCreditObj.status]);

  const renderContent = useMemo(() => {
    if (
      getMovieCreditObj.status === 'succeeded' &&
      getMovieDetailObj.status === 'succeeded'
    ) {
      return (
        <View>
          <View style={{ backgroundColor: COLORS.theme }}>
            <View style={{ backgroundColor: 'rgba(0,0,0,0.15)' }}>
              <NavigationHeader
                title={`${getMovieDetailObj.payload?.title}(${
                  getMovieDetailObj.payload?.release_date?.split('-')[0]
                })`}
              />
              <View style={styles.PosterDetailContainer}>
                <Image
                  style={{ width: 110, height: 135 }}
                  resizeMode="cover"
                  source={{
                    uri: `${process.env.API_IMAGE_DOMAIN}/w500${getMovieDetailObj.payload?.poster_path}`,
                  }}
                />
                <View style={{ width: DEFAULT_SPACING }} />
                <View style={styles.DetailsContainer}>
                  <View style={styles.PG13Container}>
                    <AppText variant="Movie-Detail-Value">
                      {getMovieDetailObj.payload?.adult ? 'M 18' : 'PG 13'}
                    </AppText>
                  </View>
                  <AppText variant="Movie-Detail-Value">
                    {`${getMovieDetailObj.payload?.release_date}(${
                      getMovieDetailObj.payload?.origin_country[0]
                    }) • ${Math.floor(
                      getMovieDetailObj.payload?.runtime / 60,
                    )}h ${getMovieDetailObj.payload?.runtime % 60}mins`}
                  </AppText>
                  <AppText variant="Movie-Detail-Value">{getGenres}</AppText>
                  <View style={{ flexDirection: 'row' }}>
                    <AppText variant="Movie-Detail-Label">{`Status: `}</AppText>
                    <AppText variant="Movie-Detail-Value">
                      {getMovieDetailObj.payload?.status}
                    </AppText>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <AppText variant="Movie-Detail-Label">{`Original Language: `}</AppText>
                    <AppText variant="Movie-Detail-Value">
                      {getMovieDetailObj.payload?.original_language.toUpperCase()}
                    </AppText>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ padding: DEFAULT_SPACING }}>
              <View style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    width: '50%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <AppText variant="Movie-Detail-Label">
                    {getMovieDetailObj.payload?.vote_average}
                  </AppText>
                  <View style={{ height: DEFAULT_SPACING }} />
                  <AppText variant="Movie-Detail-Label">Avg. Rating</AppText>
                </View>
                <View style={{ width: '50%' }}>
                  <AppText variant="Movie-Detail-Label">
                    {getDirectorName}
                  </AppText>
                  <AppText variant="Movie-Detail-Value">
                    Director, Writer
                  </AppText>
                  <View style={{ height: DEFAULT_SPACING }} />
                  <AppText variant="Movie-Detail-Label">
                    {getWriterName}
                  </AppText>
                  <AppText variant="Movie-Detail-Value">Writer</AppText>
                </View>
              </View>
              <View style={{ height: DEFAULT_SPACING }} />
              <View style={{ height: DEFAULT_SPACING }} />
              <AppText
                style={{
                  fontStyle: 'italic',
                  fontSize: 20,
                  color: COLORS.white,
                }}
              >{`${getMovieDetailObj.payload?.tagline}`}</AppText>
              <View style={{ height: DEFAULT_SPACING }} />
              <AppText variant="Overview-Label">Overview</AppText>
              <View style={{ height: DEFAULT_SPACING }} />
              <AppText variant="Movie-Detail-Value">
                {getMovieDetailObj.payload?.overview}
              </AppText>
              <View style={{ height: DEFAULT_SPACING }} />
              <View style={{ height: DEFAULT_SPACING }} />
            </View>
          </View>
          <View style={{ height: DEFAULT_SPACING }} />
          <View style={{ height: DEFAULT_SPACING }} />
          <AppText style={styles.SectionTitle}>Top Billed Cast</AppText>
          <FlatList
            contentContainerStyle={{ padding: 20 }}
            horizontal
            data={getMovieCreditObj.payload?.cast || []}
            renderItem={({ item, index }) => (
              <View style={styles.CastMemberContainer}>
                <Image
                  resizeMode="cover"
                  style={styles.CastMemberImg}
                  source={{
                    uri: `${process.env.API_IMAGE_DOMAIN}/w500${item.profile_path}`,
                  }}
                />

                <View style={{ padding: DEFAULT_SPACING }}>
                  <AppText style={{ fontWeight: 'bold' }}>
                    {item.character}
                  </AppText>
                  <AppText>{item.name}</AppText>
                </View>
              </View>
            )}
          />
          <View style={{ height: DEFAULT_SPACING }} />
          <View style={{ height: DEFAULT_SPACING }} />
          {getRecommendedMovieObj.payload?.results?.length > 0 && (
            <AppText style={styles.SectionTitle}>Recommedations</AppText>
          )}
          <FlatList
            contentContainerStyle={{ padding: 20 }}
            horizontal
            data={getRecommendedMovieObj.payload?.results || []}
            renderItem={({ item, index }) => (
              <View style={styles.RecommendationContainer}>
                <Image
                  resizeMode="cover"
                  style={styles.RecommendationImg}
                  source={{
                    uri: `${process.env.API_IMAGE_DOMAIN}/w200${item.backdrop_path}`,
                  }}
                />

                <View
                  style={{
                    padding: DEFAULT_SPACING,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <AppText style={{ fontWeight: 'bold' }}>{item.title}</AppText>
                  <AppText>{`${item.popularity.toFixed(2)}%`}</AppText>
                </View>
              </View>
            )}
          />
        </View>
      );
    }

    if (
      getMovieCreditObj.status === 'rejected' ||
      getMovieDetailObj.status === 'rejected'
    ) {
      return (
        <View style={{ minHeight: 300 }}>
          <NavigationHeader isBlackColor />
          <View style={styles.CenteredContainer}>
            <AppText>Unable to retrieve data</AppText>
            <AppText variant="Date-Time-Placeholder">
              Pull down to refresh
            </AppText>
          </View>
        </View>
      );
    }

    return (
      <View style={{ minHeight: 300 }}>
        <NavigationHeader isBlackColor />
        <View style={styles.CenteredContainer}>
          <ActivityIndicator />
        </View>
      </View>
    );
  }, [getMovieDetailObj.status, getMovieCreditObj.status]);

  // getMovieDetailObj, getMovieCreditObj
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={['DUMMY']}
        ListHeaderComponent={<AppHeader />}
        stickyHeaderHiddenOnScroll
        stickyHeaderIndices={[0]}
        renderItem={({ item, index }) => (
          <View key={index}>{renderContent}</View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  CastMemberContainer: {
    ...SHADOW_STYLE,
    backgroundColor: COLORS.white,
    marginHorizontal: DEFAULT_SPACING / 2,
    width: 150,
    borderRadius: 8,
  },
  CastMemberImg: {
    width: 150,
    height: 154,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  RecommendationContainer: {
    ...SHADOW_STYLE,
    backgroundColor: COLORS.white,
    marginHorizontal: DEFAULT_SPACING / 2,
    width: 300,
    borderRadius: 8,
  },
  RecommendationImg: {
    width: 300,
    height: 154,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  PG13Container: {
    borderWidth: 1,
    borderColor: COLORS.white,
    paddingHorizontal: DEFAULT_SPACING,
    paddingVertical: DEFAULT_SPACING - 5,
    borderRadius: 5,
  },
  PosterDetailContainer: {
    padding: DEFAULT_SPACING,
    flexDirection: 'row',
    paddingVertical: DEFAULT_SPACING * 2,
  },
  DetailsContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  SectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: DEFAULT_SPACING * 2,
  },
  CenteredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
