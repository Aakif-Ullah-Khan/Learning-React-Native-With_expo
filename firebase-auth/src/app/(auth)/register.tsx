import { router } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// firebase imports
import { auth, db } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState(null);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please enter email and password");
    }
    setLoading(true);
    try {
      // 1️ Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // 2️ Save user data in Firestore (users collection)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        name: name,
        password: password,
        createdAt: new Date(),
      });
      console.log("Registered user:", user.email);

      // 3️ Redirect to Home
      router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 25,
          }}
          keyboardShouldPersistTaps="handled"
        >
          <View>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "bold",
                marginBottom: 30,
                textAlign: "center",
              }}
            >
              Register
            </Text>

            {/* Name */}
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Full Name</Text>
            <TextInput
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                paddingHorizontal: 15,
                marginBottom: 20,
              }}
            />

            {/* Email */}
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Email</Text>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                paddingHorizontal: 15,
                marginBottom: 20,
              }}
            />

            {/* Password */}
            <Text style={{ fontSize: 16, marginBottom: 5 }}>Password</Text>
            <TextInput
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                height: 50,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                paddingHorizontal: 15,
                marginBottom: 20,
              }}
            />

            {/* Register Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF",
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
              }}
              onPress={handleRegister}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                {loading ? (
                  <ActivityIndicator color="#ffffff" size={14} />
                ) : (
                  <Text>Register</Text>
                )}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <TouchableOpacity
              onPress={() => {
                router.replace("/(auth)");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#007AFF",
                  fontSize: 16,
                }}
              >
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
