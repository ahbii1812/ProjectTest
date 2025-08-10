import { View } from 'react-native';
import { DEFAULT_SPACING } from '../theme/theme';

export default function Spacer({
  oriental = 'vertical',
}: {
  oriental?: 'vertical' | 'horizontal';
}) {
  if (oriental === 'horizontal') {
    return <View style={{ width: DEFAULT_SPACING }} />;
  }
  return <View style={{ height: DEFAULT_SPACING }} />;
}
