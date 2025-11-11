import { Stack, useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import "../../global.css";
import { auth, db } from "../config/firebaseConfig";
import useUserStore from "../store/userStore";
import { getUserFromStorage, saveUserToStorage } from "../utils/storage";

const RootLayout = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  // const [user, setUser] = useState(null);
  const setUser = useUserStore((state) => state.setUser);
  useEffect(() => {
    const checkLogin = async () => {
      try {
        // 1️⃣ Try to load from AsyncStorage (offline support)
        const storedUser = await getUserFromStorage();

        if (storedUser) {
          setUser(storedUser);
          router.replace("/(tabs)");
          setLoading(false);
          return;
        }

        // 2️⃣ If not found, check Firebase Auth (online session)
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (user) {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const userData = docSnap.data();
              setUser(userData);
              await saveUserToStorage(userData);
              router.replace("/(tabs)");
            } else {
              router.replace("/(auth)");
            }
          } else {
            router.replace("/(auth)");
          }
          setLoading(false);
        });

        return unsubscribe;
      } catch (error) {
        console.log("Error checking login:", error);
        router.replace("/(auth)");
        setLoading(false);
      }
    };

    checkLogin();
  }, []);
  // if (loading) {
  //   return (
  //     <View className="flex-1 items-center justify-center">
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
