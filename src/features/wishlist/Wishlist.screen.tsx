import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, DEFAULT_SPACING } from '../../theme/theme';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import NavigationHeader from '../../components/NavigationHeader';
import MiniDropdown from '../../components/MiniDropdown';
import { useMemo, useState } from 'react';
import MovieItemBox, { MovieDetails } from '../../components/MovieItemBox';
import { getData, storeData } from '../../store/LocalStorage';
import { LOCAL_STORAGE_KEY } from '../../store/LocalStorageKey';
import { useFocusEffect } from '@react-navigation/native';

type Sorting = 'alphabetical' | 'rating' | 'release date';

export default function WishlistScreen() {
  const [sortBy, setSortBy] = useState<Sorting>('alphabetical');
  const [wishlist, setWishlist] = useState<MovieDetails[]>([]);
  const [isAsc, setIsAsc] = useState<boolean>(true);

  useFocusEffect(() => {
    getData(LOCAL_STORAGE_KEY.WISHLIST).then((list: MovieDetails[]) => {
      if (list) {
        setWishlist(list);
      }
    });
  });

  const onRemoveWishListItem = (id: number) => {
    const newArr = wishlist.filter(list => list.id !== id);
    setWishlist(item => newArr);
    storeData(LOCAL_STORAGE_KEY.WISHLIST, newArr);
  };

  const sortedData: MovieDetails[] = useMemo(() => {
    const sorted = [...wishlist];

    if (sortBy === 'alphabetical') {
      sorted.sort((a, b) => {
        const result = a.title.localeCompare(b.title);
        return isAsc ? result : -result;
      });
    } else if (sortBy === 'release date') {
      sorted.sort((a, b) => {
        const result =
          new Date(a.release_date).getTime() -
          new Date(b.release_date).getTime();
        return isAsc ? result : -result;
      });
    } else if (sortBy === 'rating') {
      sorted.sort((a, b) => {
        const result = a.vote_average - b.vote_average;
        return isAsc ? result : -result;
      });
    }

    return sorted;
  }, [wishlist, sortBy, isAsc]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <FlatList
        stickyHeaderIndices={[0]}
        stickyHeaderHiddenOnScroll
        ListHeaderComponent={
          <View style={{ backgroundColor: COLORS.white }}>
            <AppHeader />
            <NavigationHeader isBlackColor title="My Watchlist" />
            <View style={{ padding: DEFAULT_SPACING }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <AppText style={{ color: COLORS.placeholder }}>
                  Filter by:
                </AppText>
                <View style={{ width: DEFAULT_SPACING }} />
                <MiniDropdown
                  value={sortBy}
                  setValue={newValue => setSortBy(newValue as Sorting)}
                  itemList={[
                    { label: 'Alphabetical', value: 'alphabetical' },
                    { label: 'Rating', value: 'rating' },
                    { label: 'Release Date', value: 'release date' },
                  ]}
                />
                <View style={{ width: DEFAULT_SPACING }} />
                <AppText style={{ color: COLORS.placeholder }}>
                  Order by:
                </AppText>
                <TouchableOpacity
                  style={{ padding: DEFAULT_SPACING }}
                  onPress={() => setIsAsc(i => !i)}
                >
                  <Image
                    source={require('../../assets/order-arrow.png')}
                    style={{
                      width: 15,
                      height: 15,
                      transform: [{ rotate: isAsc ? '180deg' : '0deg' }],
                    }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <View style={{ width: DEFAULT_SPACING }} />
              </View>
            </View>
          </View>
        }
        extraData={sortedData}
        data={sortedData}
        renderItem={({ item }: { item: MovieDetails }) => (
          <MovieItemBox
            item={item}
            isWishList={true}
            onRemoveFromWishList={id => onRemoveWishListItem(id)}
          />
        )}
        ListEmptyComponent={
          <View
            style={{
              height: 300,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AppText>No wishlist has been added</AppText>
          </View>
        }
      />
    </SafeAreaView>
  );
}
