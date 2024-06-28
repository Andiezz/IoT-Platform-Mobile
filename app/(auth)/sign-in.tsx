import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { images } from '../../constants';
// import { useGlobalContext } from "../../context/GlobalProvider";
import { colors } from '@/assets/styles';
import AuthLayout from '@/layouts/AuthLayout';
import ScreenContainer from '@/layouts/ScreenContainer';
import AppText from '@/components/AppText';
import styles from './Auth.style';
import InputPassword from '@/components/InputPassword';
import AppButton from '@/components/AppButton';
import Input from '@/components/Input';
import { forgotPasswordAPI, loginAPI } from '@/api/api';
import { dispatch } from '@/store/store';
import { loginAC } from '@/store/slices/auth';
import logo from '@/assets/images/logo2.png';
import { StackNavigationProp } from '@react-navigation/stack';

const SignIn = () => {
  // const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [errorMessage, setErrorMessage] = useState<any>();

  const handleForgotPassword = async () => {
    try {
      setErrorMessage('');
      setIsSubmitting(true);
      const res = await forgotPasswordAPI({ email: userName });
    } catch (error: any) {
      setErrorMessage(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const result = await loginAPI({
        email: userName,
        password: password,
      });
      dispatch(await loginAC(result.data));
      router.push('/home');
    } catch (error: any) {
      setErrorMessage(error);
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <ScreenContainer padding={0} addSafeAreaPadding={4}>
        <View style={styles.imageContainer}>
          <Image
            source={images.logo}
            resizeMode="contain"
            style={styles.imageLogo}
          />
        </View>
        <View style={styles.phoneNumberContainer}>
          <Input
            placeholder={'Username'}
            containerStyle={errorMessage ? styles.inputError : styles.input}
            value={userName}
            onChangeText={setUserName}
            textAlign={'left'}
          />
        </View>
        <View style={styles.formContainer}>
          <InputPassword
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
            containerStyle={errorMessage ? styles.inputError : styles.input}
            textAlign={'left'}
          />
          <AppText style={styles.error2}>
            {!!errorMessage && (
              <View style={styles.error}>
                {<Text>{JSON.stringify(errorMessage?.response?.message)}</Text>}
              </View>
            )}
          </AppText>
          <View style={styles.forgotPasswordContainer}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <AppText style={{ color: 'white' }}>Forgot password?</AppText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.footerButtonContainer}>
          <AppButton
            title={'Login'}
            type="primary"
            buttonStyle={styles.signInButton}
            isSubmitting={isSubmitting}
            onPress={handleSubmit}
            disabled={!userName || !password}
          />
        </View>
      </ScreenContainer>
    </AuthLayout>
  );
};

export default SignIn;
