import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Illustration from "../assets/Illustration.svg"; // ✅ import svg as component

const { width } = Dimensions.get("window");

type SlideItem = {
  id: string;
  title: string;
  description: string;
  ImageComponent: React.FC<any>; // ✅ store svg component
};

export default function Onboarding() {
  // ✅ Onboarding slides inside same file
  const slides: SlideItem[] = [
    {
      id: "1",
      title: "Welcome to Surf.",
      description: "I provide essential stuff for your\nui designs every tuesday!",
      ImageComponent: Illustration,
    },
    {
      id: "2",
      title: "Design faster.",
      description: "Use ready-made UI templates\nand components.",
      ImageComponent: Illustration,
    },
    {
      id: "3",
      title: "Stay productive.",
      description: "Organize your work\nand keep things simple.",
      ImageComponent: Illustration,
    },
  ];

  const flatListRef = useRef<FlatList<SlideItem>>(null);
  const [index, setIndex] = useState(0);

  // ✅ detect current slide index
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(slideIndex);
  };

  // ✅ finish onboarding
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/");
  };

  // ✅ go next slide or finish
  const goNext = () => {
    if (index < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      finishOnboarding();
    }
  };

  const skip = () => finishOnboarding();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.topBar} />

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => {
          const SVG = item.ImageComponent;

          return (
            <View style={[styles.slide, { width }]}>
              <View style={styles.imageWrapper}>
                {/* ✅ render svg */}
                <SVG width={"100%"} height={"100%"} />
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          );
        }}
      />

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        {/* Skip */}
        <TouchableOpacity onPress={skip}>
          <Text style={styles.skip}>Skip</Text>
        </TouchableOpacity>

        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === index ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Next */}
        <TouchableOpacity onPress={goNext}>
          <Text style={styles.next}>
            {index === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  imageWrapper: {
    width: "100%",
    height: 320, // ✅ important for SVG sizing
    justifyContent: "center",
    alignItems: "center",
    marginTop: -100,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 12,
    color: "#111",
  },

  description: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 18,
    color: "#777",
    lineHeight: 22,
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },

  skip: { color: "#bbb", fontSize: 18 },

  next: { color: "#111", fontSize: 20, fontWeight: "700" },

  dots: { flexDirection: "row", alignItems: "center", gap: 8 },

  dot: { width: 10, height: 10, borderRadius: 5 },
  dotActive: { backgroundColor: "#111" },
  dotInactive: { backgroundColor: "#ddd" },

  topBar: {
    height: 40,
    backgroundColor: "#E6F4FE",
  },
});
