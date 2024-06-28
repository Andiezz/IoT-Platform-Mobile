import { StatusBar } from "expo-status-bar";
import { Redirect, router, Tabs } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import { icons } from "../../constants";
import { Loader } from "../../components";
import { dispatch, RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Badge, IconButton } from "react-native-paper";
import LogoutButton from "@/components/LogoutButton";
import { logoutAC } from "@/store/slices/auth";

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
          { fontWeight: `${focused ? "500" : "300"}` },
        ]}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isUserLoggedIn
  );
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#FFA001",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopWidth: 1,
            borderTopColor: "#232533",
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
            title: "Thing Center",
            headerShown: true,
            headerStyle: { backgroundColor: "#161622" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Thing"
                focused={focused}
              />
            ),
            headerRight: () => (
              <View style={{ position: "relative" }}>
                <Badge
                  style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}
                >
                  3
                </Badge>
                <IconButton
                  onPress={() => router.push("/notification")}
                  icon={"bell"}
                  iconColor="#fff"
                ></IconButton>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: true,
            headerStyle: { backgroundColor: "#161622" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              />
            ),
            headerRight: () => (
              <View style={{ position: "relative" }}>
                <Badge
                  style={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}
                >
                  3
                </Badge>
                <IconButton
                  onPress={() => router.push("/notification")}
                  icon={"bell"}
                  iconColor="#fff"
                ></IconButton>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: true,
            headerStyle: { backgroundColor: "#161622" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
            headerRight: () => (
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ position: "relative" }}>
                  <Badge
                    style={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      zIndex: 10,
                    }}
                  >
                    3
                  </Badge>
                  <IconButton
                    onPress={() => router.push("/notification")}
                    icon={"bell"}
                    iconColor="#fff"
                  ></IconButton>
                </View>
                <IconButton
                  onPress={() => {
                    dispatch(logoutAC());
                    router.replace("/sign-in");
                  }}
                  icon={"logout"}
                  iconColor="#ff0000"
                />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: "Notification",
            headerShown: true,
            headerStyle: { backgroundColor: "#161622" },
            headerTitleStyle: { color: "white" },
            headerTintColor: "white",
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    width: "auto",
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
