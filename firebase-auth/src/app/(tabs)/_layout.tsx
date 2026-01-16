import Entypo from "@expo/vector-icons/Entypo";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const _layout = () => {
  return (
    <SafeAreaProvider>
      <Tabs screenOptions={{}}>
        <Tabs.Screen
          name="index"
          options={{ title: "Home", headerShown: false, href: null }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarActiveTintColor: "red",
            tabBarIcon: () => {
              return <Entypo name="home" size={24} color="red" />;
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarActiveTintColor: "red",
            tabBarIcon: () => {
              return <Entypo name="user" size={24} color="red" />;
            },
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
