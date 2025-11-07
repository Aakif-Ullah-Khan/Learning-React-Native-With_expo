import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/images/Animation/girl-setting-favorite-button-in-website.json")}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Text style={styles.title}>🏠 Home</Text>
      <Text style={styles.subtitle}>
        Welcome! You’ve completed onboarding 🎉
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // take full screen
    justifyContent: "center", // center vertically
    alignItems: "center", // center horizontally
    backgroundColor: "#f9f9f9", // soft background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  lottie: {
    width: "100%",
    height: 300,
  },
});
