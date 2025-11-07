import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

// ✅ Helper to get data
const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    return null;
  }
};

// ✅ Helper to save data
const storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log("Error saving data:", e);
  }
};

export default function Index() {
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    const value = await getData("onboarded");
    if (value === "true") {
      router.replace("/home");
    }
  };

  const handleFinish = async () => {
    await storeData("onboarded", "true");
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Onboarding
        onSkip={handleFinish}
        onDone={handleFinish}
        DoneButtonComponent={() => (
          <TouchableOpacity onPress={handleFinish} style={styles.doneButton}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        )}
        bottomBarHighlight={false}
        pages={[
          {
            backgroundColor: "#fff",
            image: (
              <View style={styles.lottieContainer}>
                <LottieView
                  source={require("../assets/images/Animation/girl-setting-favorite-button-in-website.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Onboarding 1",
            subtitle: "Done with React Native Onboarding Swiper",
          },
          {
            backgroundColor: "#ec2323",
            image: (
              <View style={styles.lottieContainer}>
                <LottieView
                  source={require("../assets/images/Animation/content-moderation.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Onboarding 2",
            subtitle: "This is the second screen",
          },
          {
            backgroundColor: "#0be545",
            image: (
              <View style={styles.lottieContainer}>
                <LottieView
                  source={require("../assets/images/Animation/user-interface.json")}
                  autoPlay
                  loop
                  style={styles.lottie}
                />
              </View>
            ),
            title: "Onboarding 3",
            subtitle: "This is the third screen",
          },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  lottieContainer: {
    width: width,
    height: height * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    width: "100%",
    height: "100%",
  },
  doneButton: {
    marginRight: 20,
    padding: 10,
    backgroundColor: "#000",
    borderRadius: 10,
  },
  doneButtonText: {
    color: "#fff",
  },
});
