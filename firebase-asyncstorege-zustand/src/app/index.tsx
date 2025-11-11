import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Onboarding = () => {
  setTimeout(() => {
    router.replace("/(tabs)");
  }, 3000);
  return (
    <View className="flex-1 justify-center items-center ">
      <Text>Onboarding</Text>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
