import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import useAppStore from "../zustand/useAppStore "; // ✅ Fixed import

export default function ProfileScreen() {
  const { profile, setProfile, setImageUri } = useAppStore();

  // 📝 Local state for form inputs
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSave = () => {
    if (!validateEmail(email)) {
      Alert.alert(
        "Invalid Email",
        `The email "${email}" is not valid. Please try again.`
      );
      return;
    }
    setProfile(name, email); // ✅ Update if valid
    Alert.alert("Success", "Profile updated successfully!");
  };

  // 📸 Pick Image From Gallery
  const pickProfileImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); // ✅ Save globally in Zustand
    }
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Profile Screen
      </Text>

      {/* Profile Image */}
      <TouchableOpacity onPress={pickProfileImage}>
        {profile.imageUri ? (
          <Image
            source={{ uri: profile.imageUri }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              marginBottom: 15,
              borderWidth: 2,
              borderColor: "#ccc",
            }}
          />
        ) : (
          <View
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#e0e0e0",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ color: "#555" }}>Pick Image</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Display Profile Data */}
      <View
        style={{
          marginBottom: 30,
          alignItems: "center",
          padding: 15,
          backgroundColor: "#fff",
          borderRadius: 10,
          width: "90%",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18 }}>Name: {profile.name}</Text>
        <Text style={{ fontSize: 16, color: "gray" }}>
          Email: {profile.email}
        </Text>
      </View>

      {/* Edit Form */}
      <View style={{ width: "90%" }}>
        <TextInput
          style={{
            height: 45,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 15,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
          }}
          placeholder="Enter Name"
          onChangeText={setName}
        />

        <TextInput
          style={{
            height: 45,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 15,
            paddingHorizontal: 10,
            backgroundColor: "#fff",
          }}
          placeholder="Enter Email"
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <Button title="Save Profile" onPress={handleSave} />
      </View>
    </View>
  );
}
