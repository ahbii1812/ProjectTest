import { Text, TextProps } from 'react-native';

export default function AppText({
  children,
  variant,
  ...props
}: {
  children: string;
  variant?: 'Movie-Title' | 'Date-Time-Placeholder' | undefined;
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
  return <Text {...props}>{children}</Text>;
}
