/**
 * ============================================================
 * ROOT LAYOUT — app/_layout.tsx
 * ============================================================
 *
 * WHY THIS FILE EXISTS:
 * This is the ROOT of our entire navigation tree.
 * In Expo Router, every folder with a `_layout.tsx` defines a
 * "navigator" (Stack, Tabs, Drawer, etc.).
 *
 * HOW STACK NAVIGATION WORKS:
 * - Stack is like a deck of cards — new screens slide ON TOP
 * - You "push" a screen to go forward, "pop" to go back
 * - The root layout uses Stack so that we can push screens
 *   (like a Detail page) on top of the entire Tab bar
 *
 * NAVIGATION HIERARCHY:
 *   Stack (this file)
 *     ├── (tabs) → Bottom Tab Navigator
 *     │     ├── home
 *     │     ├── (profile) → Drawer Navigator
 *     │     │     ├── index (Profile screen)
 *     │     │     └── settings
 *     │     └── about
 *     └── detail → Pushed on top of everything
 * ============================================================
 */

import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        // Stack wraps everything — this is the outermost navigator
        <Stack
            screenOptions={{
                // Default header style for all Stack screens
                headerStyle: { backgroundColor: "#075E54" }, // WhatsApp green
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
            }}
        >
            {/*
        (tabs) is a "group" — the parentheses tell Expo Router
        this folder name should NOT appear in the URL.
        It renders the Tab navigator defined in (tabs)/_layout.tsx
      */}
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false, // Tabs have their own headers, hide Stack's
                }}
            />

            {/*
        "detail" screen lives OUTSIDE the tabs, so when we navigate
        to it, it slides ON TOP of the tab bar (full-screen push).
        This demonstrates the difference between Tab navigation
        (switching between tabs) and Stack navigation (pushing new screens).
      */}
            <Stack.Screen
                name="detail"
                options={{
                    title: "Detail Screen",
                    // This enables the slide-in animation (Stack behavior)
                    presentation: "card",
                }}
            />
        </Stack>
    );
}
