import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Loader } from "../../components";
// import { useGlobalContext } from "../../context/GlobalProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const AuthLayout = () => {
  // const { loading, isLogged } = useGlobalContext();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isUserLoggedIn);
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

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
