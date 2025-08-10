import { Image, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import { useNavigation } from '@react-navigation/native';
import { ReactNode } from 'react';
import { DEFAULT_SPACING } from '../theme/theme';

interface NavigationBar {
  title?: string;
  back?: boolean;
  rightIcon?: ReactNode;
  onPressRightIcon?: () => void;
  transparent?: boolean;
  disableBack?: boolean;
  isBlackColor?: boolean;
}
export default function NavigationHeader({
  title,
  back = true,
  rightIcon,
  transparent = false,
  disableBack = false,
  isBlackColor = false,
}: NavigationBar) {
  const navigator = useNavigation();
  const getLeftButton = () => {
    if (back && navigator.canGoBack()) {
      return (
        <TouchableOpacity
          disabled={disableBack}
          style={{ padding: DEFAULT_SPACING, opacity: disableBack ? 0.5 : 1 }}
          onPress={() => navigator.goBack()}
        >
          <Image
            source={require('./../assets/left-arrow.png')}
            style={{
              width: 25,
              height: 25,
              tintColor: isBlackColor ? '#000000' : '#FFFFFF',
            }}
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={{ padding: DEFAULT_SPACING }}>
        <View style={{ height: 25, width: 25 }} />
      </View>
    );
  };

  const getRightButton = () => {
    // PADING : 10
    if (rightIcon) {
      return rightIcon;
    }
    return (
      <View style={{ padding: DEFAULT_SPACING }}>
        <View style={{ height: 25, width: 25 }} />
      </View>
    );
  };

  return (
    <View
      style={{
        width: '100%',
        minHeight: 55,
        paddingTop: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
      }}
    >
      {getLeftButton()}
      {title && (
        <AppText
          style={{ color: isBlackColor ? '#000000' : '#FFFFFF' }}
          variant="Navigatior-Title"
        >
          {title}
        </AppText>
      )}
      {getRightButton()}
    </View>
  );
}
