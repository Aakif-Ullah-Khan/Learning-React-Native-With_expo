import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const Home = () => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("userEmail");
    router.replace("/login");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "pink",
      }}
    >
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>Home</Text>
      <TouchableOpacity onPress={handleLogout} style={{ marginTop: 20 }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
