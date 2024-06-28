import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';

type Props = {
  backgroundColor?: string;
  children?: ReactNode;
  padding?: number;
  addSafeAreaPadding?: number;
};

const ScreenContainer = ({
  backgroundColor,
  children,
  padding = 16,
  addSafeAreaPadding,
}: Props) => {
  const top = useSafeAreaInsets().top;

  const incomingStyle = [
    { flex: 1 },
    backgroundColor ? { backgroundColor } : {},
    { padding: padding },
    addSafeAreaPadding ? { paddingTop: addSafeAreaPadding + top } : {},
    { overflow: 'visible' },
  ] as any;
  return <View style={incomingStyle}>{children}</View>;
};

export default ScreenContainer;
