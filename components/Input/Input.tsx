import React from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
  ColorValue,
} from 'react-native';

import {colors, textStyles} from '@/assets/styles';

interface Props extends TextInputProps {
  containerStyle?: [] | object;
  style?: object;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  editable?: boolean;
  textColor?: ColorValue | undefined;
  placeholderCenter?: 'center' | 'left' | 'right' | undefined;
}

const Input = ({
  containerStyle,
  style,
  icon,
  endIcon,
  editable = true,
  placeholderCenter = 'left',
  textColor = colors.LightTextPrimary,
  ...props
}: Props) => (
  <View style={containerStyle}>
    <View style={styles.inputContainer}>
      {!!icon && icon}
      <TextInput
        {...props}
        style={[
          styles.input,
          style,
          {color: textColor},
          !!icon ? styles.withIcon : null,
          endIcon ? styles.withEndIcon : null,
          {
            textAlign: placeholderCenter === 'center' ? 'center' : 'auto',
            lineHeight: undefined,
          },
        ]}
        placeholderTextColor={colors.LightTextSecondary}
        editable={editable}
      />
      {!!endIcon && endIcon}
    </View>
  </View>
);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.White,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    minHeight: 38,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'auto',
    ...textStyles.BodyParagraphLargeRegular,
  },
  withIcon: {
    paddingLeft: 12,
  },
  withEndIcon: {
    paddingRight: 12,
  },
  error: {
    ...textStyles.BodyParagraphLargeRegular,
    color: colors.ErrorMain,
    marginTop: 2,
  },
});

export default Input;
