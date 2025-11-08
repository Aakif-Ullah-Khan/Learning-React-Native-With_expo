import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 2000);
  }, []);
  return (
    <SafeAreaView>
      <Text>Onboarding</Text>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
