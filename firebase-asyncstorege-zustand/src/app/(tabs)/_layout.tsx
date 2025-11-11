import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tabslayout = () => {
  return (
    <SafeAreaProvider>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{ headerShown: false, href: null }}
        />
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: () => {
              return <AntDesign name="home" size={24} color="black" />;
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "profile",
            tabBarIcon: () => {
              return <Feather name="user" size={24} color="black" />;
            },
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
};

export default Tabslayout;

const styles = StyleSheet.create({});
