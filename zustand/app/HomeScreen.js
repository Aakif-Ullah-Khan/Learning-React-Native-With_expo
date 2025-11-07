import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";

import useAppStore from "../zustand/useAppStore ";

export default function HomeScreen() {
  const { profile, setProfile, setImageUri } = useAppStore();

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        {profile.imageUri ? (
          <Image
            source={{ uri: profile.imageUri }}
            style={styles.avatar}
            contentFit="cover"
          />
        ) : (
          <View
            style={[
              styles.avatar,
              {
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#eee",
              },
            ]}
          >
            <Ionicons name="person-circle-outline" size={50} color="#aaa" />
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
        </View>
        <Ionicons name="settings-outline" size={24} color="black" />
      </View>
      {/* Add more content here if needed */}
      <Text style={{ textAlign: "center", marginTop: 20, color: "#555" }}>
        Welcome to the Home Screen! This is a simple profile card example using
        Zustand for state management.
      </Text>
      <Text style={{ textAlign: "center", marginTop: 10, color: "#555" }}>
        You can update your profile picture and information from other screens.
      </Text>
      {/* go to profile screen to change name and email */}
      <Text style={{ textAlign: "center", marginTop: 10, color: "#555" }}>
        go to upload screen to change profile picture
      </Text>

      <Link href="/ProfileScreen" style={{ marginTop: 20 }}>
        <Text
          style={{
            textAlign: "center",
            color: "#4f8ef7",
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Go to Profile Screen
        </Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "#f6f8fa",
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    borderWidth: 2,
    borderColor: "#4f8ef7",
  },
  info: { flex: 1 },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#222",
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
});
