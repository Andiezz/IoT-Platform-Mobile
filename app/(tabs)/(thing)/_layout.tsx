import 'react-native-url-polyfill/auto';
import { Stack } from 'expo-router';

const ThingLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="thing/[id]"
        options={{
          title: 'Thing Detail',
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#161622' },
        }}
      />
      <Stack.Screen
        name="update-thing/[id]"
        options={{
          title: 'Update Thing',
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#161622' },
        }}
      />
      <Stack.Screen
        name="update-param"
        options={{
          title: 'Update Parameter',
          headerTitleStyle: { color: 'white' },
          headerTintColor: 'white',
          headerStyle: { backgroundColor: '#161622' },
        }}
      />
    </Stack>
  );
};

export default ThingLayout;
