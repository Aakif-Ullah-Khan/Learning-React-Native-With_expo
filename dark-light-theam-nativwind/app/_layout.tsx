import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "../global.css";

export default function RootLayout() {
  useEffect(() => {
    const configureNavBar = async () => {
      await NavigationBar.setVisibilityAsync("hidden"); // hide nav bar
    };

    configureNavBar();
  }, []);

  return (
    <Stack
      screenOptions={{
        animation: "slide_from_right", // forward animation
        // optional, hides header if needed
      }}
    />
  );
}
