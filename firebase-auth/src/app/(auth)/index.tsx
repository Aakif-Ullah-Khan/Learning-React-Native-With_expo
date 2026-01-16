import { router } from "expo-router";
import React from "react";
import {
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
import { auth } from "@/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      router.replace("/(tabs)/home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
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
              Login
            </Text>

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
                marginBottom: 25,
              }}
            />

            {/* Login Button */}
            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF",
                height: 50,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 15,
              }}
              onPress={handleLogin}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                {loading ? "Loading..." : "Login"}
              </Text>
            </TouchableOpacity>

            {/* Register Link */}
            <TouchableOpacity
              onPress={() => {
                router.replace("/(auth)/register");
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#007AFF",
                  fontSize: 16,
                  marginTop: 10,
                }}
              >
                Create a new account?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
