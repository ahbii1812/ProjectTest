import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, DEFAULT_SPACING } from '../../theme/theme';
import AppHeader from '../../components/AppHeader';
import AppText from '../../components/AppText';
import NavigationHeader from '../../components/NavigationHeader';
import MiniDropdown from '../../components/MiniDropdown';
import { useEffect, useMemo, useState } from 'react';
import MovieItemBox, { MovieDetails } from '../../components/MovieItemBox';
import { getData, storeData } from '../../store/LocalStorage';
import { LOCAL_STORAGE_KEY } from '../../store/LocalStorageKey';
import { useFocusEffect } from '@react-navigation/native';
import { AppDispatch } from '../../store/store';
import { getUserDetails, userSelector } from '../../store/UserSlice';
import { useSelector } from 'react-redux';

type Sorting = 'alphabetical' | 'rating' | 'release date';

export default function WishlistScreen() {
  const [sortBy, setSortBy] = useState<Sorting>('alphabetical');
  const [wishlist, setWishlist] = useState<MovieDetails[]>([]);
  const [isAsc, setIsAsc] = useState<boolean>(true);
  const { getUserDetailsObj } = useSelector(userSelector);

  useEffect(() => {
    AppDispatch(getUserDetails());
  }, []);

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
            <View style={{ backgroundColor: COLORS.darkTheme }}>
              <NavigationHeader transparent />

              <View style={styles.UserInfoContainer}>
                <View style={styles.AvatarContainer}>
                  <AppText style={styles.AvatarLabel}>
                    {getUserDetailsObj.payload?.username[0] || 'U'}
                  </AppText>
                </View>
                <View style={{ width: DEFAULT_SPACING }} />
                <View>
                  <AppText variant="Button-Label">
                    {getUserDetailsObj.payload?.username || 'Username'}
                  </AppText>
                  {/* No Info from API */}
                  <AppText variant="Movie-Detail-Label">
                    Joined Aug 2025
                  </AppText>
                </View>
              </View>
            </View>

            <View style={{ padding: DEFAULT_SPACING }}>
              <AppText variant="Button-Label" style={{ color: '#000000' }}>
                My Watchlist
              </AppText>
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

const styles = StyleSheet.create({
  AvatarContainer: {
    width: 75,
    height: 75,
    backgroundColor: '#9747FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  UserInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 130,
    paddingHorizontal: 30,
    marginTop: -30,
  },
  AvatarLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
