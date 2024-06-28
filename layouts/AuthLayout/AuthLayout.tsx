import {ReactNode} from 'react';
import {View, StatusBar} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors} from '@/assets/styles';

type Props = {
  children: ReactNode;
};

const AuthLayout = ({children}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.ShadesWhite,
        justifyContent: 'center',
        paddingTop: useSafeAreaInsets().top,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.ShadesWhite} />
      {children}
    </View>
  );
};

export default AuthLayout;
