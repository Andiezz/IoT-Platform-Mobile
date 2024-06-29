import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { STORAGE_KEYS, Storage } from '@/utility/storage';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import { useEffect } from 'react';

const getToken = async () => {
  const token: any = await Storage.getItem(STORAGE_KEYS.token);
  return token;
};

const AuthLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );

  useEffect(() => {
    getToken().then((token) => {
      if (token?.token) {
        return <Redirect href="/home" />;
      }
    }).catch((error) => {
      console.log('error', error);
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: 'Error',
        textBody: error,
      });
    });
  }, []);
  
  if (isAuthenticated) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
