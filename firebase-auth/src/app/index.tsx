import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Login or Create a new account to continue
        </Text>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => router.push("/(auth)")}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        {/* Register Button */}
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => router.push("/(auth)/register")}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  innerContainer: {
    alignItems: "center",
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
    textAlign: "center",
  },

  loginBtn: {
    backgroundColor: "#007AFF",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  loginText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  registerBtn: {
    borderWidth: 2,
    borderColor: "#007AFF",
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
  },

  registerText: {
    fontSize: 18,
    color: "#007AFF",
    textAlign: "center",
    fontWeight: "bold",
  },
});
