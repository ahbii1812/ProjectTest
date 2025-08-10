import { Text, TextProps } from 'react-native';

export default function AppText({
  children,
  variant = null,
  ...props
}: {
  children: string;
  variant?:
    | 'Movie-Title'
    | 'Date-Time-Placeholder'
    | 'Picker-Selected'
    | 'Button-Label'
    | null;
} & TextProps) {
  if (variant === 'Movie-Title') {
    return <Text style={{ fontWeight: '600', fontSize: 16 }}>{children}</Text>;
  }

  if (variant === 'Date-Time-Placeholder') {
    return (
      <Text style={{ color: '#999999', fontSize: 14 }} {...props}>
        {children}
      </Text>
    );
  }

  if (variant === 'Picker-Selected') {
    return (
      <Text style={{ color: '#FFFFFF', fontSize: 14 }} {...props}>
        {children}
      </Text>
    );
  }

  if (variant === 'Button-Label') {
    return (
      <Text
        style={{ color: '#FFFFFF', fontSize: 20, fontWeight: '700' }}
        {...props}
      >
        {children}
      </Text>
    );
  }

  return (
    <Text style={{ fontSize: 14 }} {...props}>
      {children}
    </Text>
  );
}
