import { SafeAreaView } from 'react-native-safe-area-context';
import { View, StyleSheet, Text } from 'react-native';
import { UserResponseModel } from '@/api/types';
import { colors, textStyles } from '@/assets/styles';
import { useEffect, useState } from 'react';
import { getUserInfoAPI } from '@/api/api';
import { Avatar } from 'react-native-paper';

const Profile = () => {
  const [user, setUser] = useState<UserResponseModel>();
  const [loading, setLoading] = useState<boolean>(false);

  const getUserInfo = async () => {
    setLoading(true);
    const res = await getUserInfoAPI();
    setUser(res.data);
    setLoading(false);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!loading && (
        <View style={styles.wrapper}>
          <Avatar.Text
            size={48}
            label={`${user?.firstName.charAt(0).toUpperCase()}${user?.lastName
              .charAt(0)
              .toUpperCase()}`}
          />
          <Text style={{ marginTop: 10, fontSize: 24 }}>
            {user?.firstName + ' ' + user?.lastName}
          </Text>
          <Text>{user?.email}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 12,
    paddingHorizontal: 4,
    color: '#ffff',
  },
  logoutContainer: {
    display: 'flex',
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  iconLogout: {
    width: 30,
    height: 30,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.SecondaryLight,
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#575c7e',
  },
  avatar: {
    width: '90%',
    height: '90%',
    borderRadius: 8,
  },
  text: {
    color: colors.White,
    ...textStyles.HeadingH3Medium,
  },
});
export default Profile;
