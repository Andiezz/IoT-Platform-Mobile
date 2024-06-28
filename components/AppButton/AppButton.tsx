import React, {ReactNode} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';

import AppText from '@/components/AppText';
import {textStyles, colors} from '@/assets/styles';

interface Props {
  title: string | ReactNode;
  type?: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  icon?: React.ReactNode;
  buttonStyle?: object;
  textStyle?: object;
  iconStyle?: object;
  onPress: (event: GestureResponderEvent) => void;
}

const AppButton = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
  iconStyle,
  type,
  icon,
  disabled = false,
  isSubmitting = false,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.container,
        disabled ? styles.disabled : styles.primary,
        buttonStyle,
      ]}
      onPress={onPress}
      disabled={disabled || isSubmitting}>
      <AppText
        style={[
          styles.text,
          type === 'white' ? {color: colors.MainColor} : null,
          textStyle,
        ]}
        numberOfLines={undefined}>
        {title}
      </AppText>
      <View style={[styles.iconContainer, iconStyle]}>{!!icon && icon}</View>
      <ActivityIndicator
        size="small"
        animating={isSubmitting}
        style={styles.loading}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    borderRadius: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: {
    backgroundColor: colors.MainColor,
  },
  success: {
    backgroundColor: colors.SuccessMain,
  },
  danger: {
    backgroundColor: colors.ErrorMain,
  },
  white: {
    backgroundColor: colors.White,
    borderColor: colors.MainColor,
    borderWidth: 1,
  },
  disabled: {
    backgroundColor: colors.SecondaryLight,
  },
  text: {
    ...textStyles.HeadingH4Bold,
    color: colors.White,
    textAlign: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 14,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AppButton;
