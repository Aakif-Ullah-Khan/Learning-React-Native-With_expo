import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../../../store/userStore";

const Home = () => {
  // Replace with actual user data source
  const { user } = useUserStore();
  const name = user?.name || "Guest";
  const email = user?.email || "No email found";
  const phone = user?.phone || "No phone found";
  const gender = user?.gender || "No gender found";
  const age = user?.age || "No age found";

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Welcome to Home</Text>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.value}>{name}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>phone:</Text>
          <Text style={styles.value}>{phone}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>gender:</Text>
          <Text style={styles.value}>{gender}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>age:</Text>
          <Text style={styles.value}>{age}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{email}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  userInfo: {
    flexDirection: "row",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
});
