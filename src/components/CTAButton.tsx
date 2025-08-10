import { TouchableOpacity } from 'react-native';
import AppText from './AppText';
import { COLORS, DEFAULT_SPACING } from '../theme/theme';

export default function CTAButton({
  text,
  onPress,
}: {
  text: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: DEFAULT_SPACING,
        backgroundColor: COLORS.theme,
        marginTop: DEFAULT_SPACING,
      }}
    >
      <AppText variant="Button-Label">{text}</AppText>
    </TouchableOpacity>
  );
}
