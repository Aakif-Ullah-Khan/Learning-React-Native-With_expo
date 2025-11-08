import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const Tabslayout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ href: null }} />
      <Tabs.Screen
        name="home"
        options={{ title: "Home", headerShown: false }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
    </Tabs>
  );
};

export default Tabslayout;

const styles = StyleSheet.create({});
