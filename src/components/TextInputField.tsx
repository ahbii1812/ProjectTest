import { TextInput, TextInputProps, View } from 'react-native';
import { COLORS, FIELD_HEIGHT, SHADOW_STYLE } from '../theme/theme';

export default function TextInputField({ ...props }: TextInputProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor="#999999"
      style={{
        padding: 8,
        backgroundColor: COLORS.white,
        ...SHADOW_STYLE,
        borderRadius: 8,
        height: FIELD_HEIGHT,
      }}
    />
  );
}
