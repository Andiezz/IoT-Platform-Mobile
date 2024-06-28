import {colors} from '@/assets/styles';
import * as React from 'react';
import {Text, TextProps} from 'react-native';

interface Props extends TextProps {
  style?: [] | object;
  numberOfLines?: number;
  children: string | React.ReactNode;
}

const AppText = ({style, numberOfLines = 1, children, ...props}: Props) => {
  const defaultStyle = {color: colors.Black};
  const incomingStyle = Array.isArray(style) ? style : style ? [style] : [];
  return (
    <Text
      {...props}
      style={[defaultStyle, ...incomingStyle]}
      numberOfLines={!numberOfLines ? 1 : numberOfLines}>
      {children}
    </Text>
  );
};

export default React.memo(AppText);
