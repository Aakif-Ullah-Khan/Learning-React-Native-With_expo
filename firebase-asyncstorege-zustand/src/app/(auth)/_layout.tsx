import { Stack } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Authlayout = () => {
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}
      ></Stack>
    </SafeAreaProvider>
  );
};

export default Authlayout;

const styles = StyleSheet.create({});
