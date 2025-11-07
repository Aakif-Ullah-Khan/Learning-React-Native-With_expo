import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

const Login = () => {
  useEffect(() => {
    const checkLogin = async () => {
      const email = await AsyncStorage.getItem("email");
      if (email) {
        router.replace("/main");
      } else {
        router.replace("/login");
      }
    };
    checkLogin();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
  },
  btn: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});
