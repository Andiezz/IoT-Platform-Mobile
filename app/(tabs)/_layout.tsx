import { StatusBar } from 'expo-status-bar';
import { Redirect, router, Tabs } from 'expo-router';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { icons } from '../../constants';
import { dispatch, RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { Badge, IconButton } from 'react-native-paper';
import { logoutAC } from '@/store/slices/auth';
import { getUserInfoAPI } from '@/api/api';
import { UserResponseModel } from '@/api/types';
import { ISocketService } from '@/utility/socket';
import { Storage, STORAGE_KEYS } from '@/utility/storage';
import useService from '@/utility/use-service';
import { useState, useEffect, useRef } from 'react';
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';
import * as Notifications from 'expo-notifications';
import { decode } from 'html-entities';
import Constants from 'expo-constants';
import * as Device from 'expo-device';

interface IconProps {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
}
const TabIcon = ({ icon, color, name, focused }: IconProps) => {
  return (
    <View style={iconStyles.iconWrapper}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={iconStyles.icon}
      />
      <Text
        style={[
          { color: color },
          iconStyles.textFocused,
          { fontWeight: `${focused ? '500' : '300'}` },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

// notification
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

async function sendPushNotification(
  expoPushToken: string,
  title: string,
  body: string,
  data: any
) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: title,
    body: body,
    data: data,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError(
        'Permission not granted to get push token for push notification!'
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId ??
      '19e00bf4-294d-4a49-9d77-155e69e378f0';
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

function htmlToText(htmlString: string) {
  // Decode HTML entities
  const decodedString = decode(htmlString);

  // Use a regular expression to remove HTML tags
  const plainText = decodedString.replace(/<\/?[^>]+(>|$)/g, '');

  return plainText;
}

const TabLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  const [token, setToken] = useState<any>();
  const [user, setUser] = useState<UserResponseModel>();
  const [message, setMessage] = useState<any>(null);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  const socketService: ISocketService = useService('socketService');

  const getUserInfo = async () => {
    const res = await getUserInfoAPI();
    setUser(res.data);
  };

  useEffect(() => {
    if (message) {
      // Toast.show({
      //   type: ALERT_TYPE.WARNING,
      //   title: 'Warning',
      //   textBody: 'Parameters in warning threshold',
      // });
      sendPushNotification(
        expoPushToken,
        'Warning',
        'Parameters in warning threshold',
        message
      );
    }
  }, [message]);

  useEffect(() => {
    getUserInfo();
    const getToken = async () => {
      const token: any = await Storage.getItem(STORAGE_KEYS.token);
      setToken(token);
    };
    getToken();
  }, []);

  useEffect(() => {
    if (user && token) {
      console.log('user', user);
      socketService.authToken = token?.token;
      socketService.connect();
      console.log(`/notification/${user.id}`);
      socketService.subscribeEvent(
        `/notification/${user.id}`,
        async (messageData: any) => {
          console.log('messageData', messageData);
          const message = htmlToText(messageData?.data?.content);
          console.log('message', message);
          setMessage(message);
        }
      );
    }
    return () => {
      socketService.dispose();
    };
  }, [user, token]);

  // notification
  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token ?? ''))
      .catch((error) => setExpoPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification as any);
      }) as any;

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      }) as any;

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  function scheduleNotification() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Notification Title',
        body: 'Notification Body',
        data: { userName: 'Andiezz' },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 1,
            borderTopColor: '#232533',
            height: 84,
          },
        }}
      >
        <Tabs.Screen
          name="(thing)"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="(home)"
          options={{
            href: null,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="thing-center"
          options={{
            title: 'Thing Center',
            headerShown: true,
            headerStyle: { backgroundColor: '#161622' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Thing"
                focused={focused}
              />
            ),
            headerRight: () => (
              <View style={{ position: 'relative' }}>
                <Badge
                  style={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }}
                >
                  3
                </Badge>
                <IconButton
                  onPress={() => router.push('/notification')}
                  icon={'bell'}
                  iconColor="#fff"
                ></IconButton>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: true,
            headerStyle: { backgroundColor: '#161622' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
            headerRight: () => (
              <View style={{ position: 'relative' }}>
                <Badge
                  style={{ position: 'absolute', top: 5, right: 5, zIndex: 10 }}
                >
                  3
                </Badge>
                <IconButton
                  onPress={() => router.push('/notification')}
                  icon={'bell'}
                  iconColor="#fff"
                ></IconButton>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: true,
            headerStyle: { backgroundColor: '#161622' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
            headerRight: () => (
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ position: 'relative' }}>
                  <Badge
                    style={{
                      position: 'absolute',
                      top: 5,
                      right: 5,
                      zIndex: 10,
                    }}
                  >
                    3
                  </Badge>
                  <IconButton
                    onPress={() => router.push('/notification')}
                    icon={'bell'}
                    iconColor="#fff"
                  ></IconButton>
                </View>
                <IconButton
                  onPress={() => {
                    dispatch(logoutAC());
                    router.replace('/sign-in');
                  }}
                  icon={'logout'}
                  iconColor="#ff0000"
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: 'Notification',
            headerShown: true,
            headerStyle: { backgroundColor: '#161622' },
            headerTitleStyle: { color: 'white' },
            headerTintColor: 'white',
            href: null,
          }}
        />
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

const iconStyles = StyleSheet.create({
  iconWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    width: 'auto',
    gap: 2,
  },
  icon: {
    width: 24,
    height: 24,
  },
  textFocused: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default TabLayout;
