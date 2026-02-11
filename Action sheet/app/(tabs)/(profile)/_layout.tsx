/**
 * ============================================================
 * PROFILE LAYOUT — app/(tabs)/(profile)/_layout.tsx
 * ============================================================
 *
 * ORIGINAL PLAN vs WHAT WE DID:
 * We originally planned to use @react-navigation/drawer here,
 * but that requires react-native-reanimated (a heavy native
 * dependency). Instead, we built a CUSTOM drawer from scratch!
 *
 * HOW THIS WORKS NOW:
 * - This layout uses a Stack navigator (built into Expo Router)
 * - The Profile screen includes a hamburger (☰) button that
 *   opens our custom DrawerMenu component
 * - The DrawerMenu slides in from the left using Animated API
 * - This teaches the SAME concept without native deps!
 *
 * LEARNING POINT:
 * In Expo Router, _layout.tsx files can use: Stack, Tabs, or Drawer.
 * Here we use Stack, but pair it with a custom drawer overlay to
 * demonstrate the drawer UX pattern without external libraries.
 * ============================================================
 */

import { Stack } from "expo-router";

export default function ProfileLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: { backgroundColor: "#075E54" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
            }}
        >
            {/*
        Profile screen — the main screen in this Stack.
        The custom drawer hamburger button is added IN the screen
        itself (index.tsx), not here, because the drawer state
        lives in the screen component.
      */}
            <Stack.Screen
                name="index"
                options={{
                    title: "My Profile",
                }}
            />

            {/*
        Settings screen — pushed onto the Stack from the drawer.
        When the user taps "Settings" in the custom drawer,
        we call router.push("settings") which pushes this screen.
      */}
            <Stack.Screen
                name="settings"
                options={{
                    title: "Settings",
                }}
            />
        </Stack>
    );
}
