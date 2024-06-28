import React, {ReactNode, useState} from 'react';
import {TextInput, View, StyleSheet, TextInputProps} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {colors, textStyles} from '@/assets/styles';
// import {IconEye, IconEyeOff} from '@tabler/icons-react-native';

type Props = {
  containerStyle?: object | [];
  icon?: ReactNode;
  editable?: boolean;
  textAlign?: string;
} & TextInputProps;

const InputPassword = ({
  containerStyle,
  icon,
  editable = true,
  textAlign = 'center',
  ...props
}: Props) => {
  const [hidePassword, setHidePassword] = useState(true);

  const toggleEye = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <View style={containerStyle}>
      <View style={styles.inputContainer}>
        <TextInput
          {...props}
          style={styles.input}
          editable={editable}
          secureTextEntry={hidePassword}
          textContentType="password"
          placeholderTextColor={colors.Gray}
          textAlign={textAlign}
        />
        <TouchableOpacity onPress={toggleEye}>
          {/* {hidePassword && (
            <IconEye size={20} />
          )}
          {!hidePassword && (
            <IconEyeOff size={20} />
          )} */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffff",
  },
  input: {
    flex: 1,
    height: 32,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 0,
    paddingBottom: 0,
    ...textStyles.BodyParagraphLargeRegular,
    color: colors.LightTextPrimary,
    backgroundColor: "#ffff",
  },
  error: {
    ...textStyles.BodyParagraphLargeRegular,
    color: colors.ErrorMain,
    marginTop: 2,
  },
});

export default InputPassword;
