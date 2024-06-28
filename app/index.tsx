import { StatusBar } from "expo-status-bar";
import { Redirect, router } from "expo-router";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton, Loader } from "../components";
// import { useGlobalContext } from "../context/GlobalProvider";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Welcome = () => {
  // const { loading, isLogged } = useGlobalContext();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );
  if (!isAuthenticated) {
    return <Redirect href="/sign-in" />;
  } else {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={{ height: "100%" }}>
      {/* <Loader isLoading={loading} /> */}

      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View>
          <Text>
            Discover Endless{"\n"}
            Possibilities with{" "}
          </Text>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
