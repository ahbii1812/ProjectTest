import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

export default function AppText({
  children,
  variant = null,
  style,
  ...props
}: {
  style?: StyleProp<TextStyle>;
  children: string;
  variant?:
    | 'Movie-Title'
    | 'Movie-Detail-Label'
    | 'Movie-Detail-Value'
    | 'Date-Time-Placeholder'
    | 'Picker-Selected'
    | 'Button-Label'
    | 'Navigatior-Title'
    | 'Overview-Label'
    | null;
} & TextProps) {
  if (variant === 'Navigatior-Title') {
    return (
      <Text
        ellipsizeMode="tail"
        numberOfLines={2}
        {...props}
        style={[
          {
            textAlign: 'center',
            width: '80%',
            fontWeight: '600',
            fontSize: 20,
            color: '#FFFFFF',
          },
          style,
        ]}
      >
        {children}
      </Text>
    );
  }

  if (variant === 'Movie-Detail-Label') {
    return (
      <Text
        style={[{ fontWeight: '600', fontSize: 14, color: '#FFFFFF' }, style]}
      >
        {children}
      </Text>
    );
  }
  if (variant === 'Movie-Detail-Value') {
    return (
      <Text
        style={[{ fontWeight: '400', fontSize: 14, color: '#FFFFFF' }, style]}
      >
        {children}
      </Text>
    );
  }

  if (variant === 'Movie-Title') {
    return (
      <Text style={[{ fontWeight: '600', fontSize: 16 }, style]}>
        {children}
      </Text>
    );
  }

  if (variant === 'Date-Time-Placeholder') {
    return (
      <Text style={[{ color: '#999999', fontSize: 14 }, style]} {...props}>
        {children}
      </Text>
    );
  }

  if (variant === 'Picker-Selected') {
    return (
      <Text style={[{ color: '#FFFFFF', fontSize: 14 }, style]} {...props}>
        {children}
      </Text>
    );
  }

  if (variant === 'Button-Label') {
    return (
      <Text
        style={[{ color: '#FFFFFF', fontSize: 20, fontWeight: '700' }, style]}
        {...props}
      >
        {children}
      </Text>
    );
  }

  if (variant === 'Overview-Label') {
    return (
      <Text
        style={[
          {
            color: '#FFFFFF',
            fontSize: 24,
            fontWeight: '700',
          },
          style,
        ]}
        {...props}
      >
        {children}
      </Text>
    );
  }

  return (
    <Text style={[{ fontSize: 14 }, style]} {...props}>
      {children}
    </Text>
  );
}
