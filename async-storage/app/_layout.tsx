import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Rootlayout = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userEmail = await AsyncStorage.getItem("userEmail");
      if (userEmail) {
        router.replace("/home"); // user already logged in
      } else {
        router.replace("/login"); // user not logged in
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <Stack screenOptions={{ headerShown: false }}></Stack>;
};

export default Rootlayout;

const styles = StyleSheet.create({});
