import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../config/firebaseconfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await AsyncStorage.setItem("email", result.user.email as string);

      router.replace("/main");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        value={email}
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        value={password}
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />

      <TouchableOpacity style={styles.btn} onPress={login}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
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
