import { icons } from "@/constants";
import { logoutAC } from "@/store/slices/auth";
import { dispatch } from "@/store/store";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

const LogoutButton = () => {
  const logout = async () => {
    dispatch(logoutAC());
    router.replace("/sign-in");
  };
  return (
    <TouchableOpacity onPress={logout} style={styles.logoutContainer}>
      <Image
        source={icons.logout}
        resizeMode="contain"
        style={styles.iconLogout}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  logoutContainer: {
    display: "flex",
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  iconLogout: {
    width: 30,
    height: 30,
  },
});
export default LogoutButton;
