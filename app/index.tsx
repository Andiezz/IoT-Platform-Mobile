import { StatusBar } from 'expo-status-bar';
import { Redirect } from 'expo-router';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

const Welcome = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );
  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  } else {
    return <Redirect href="/" />;
  }
};

export default Welcome;
