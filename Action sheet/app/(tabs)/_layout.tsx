/**
 * ============================================================
 * TABS LAYOUT — app/(tabs)/_layout.tsx
 * ============================================================
 *
 * HOW BOTTOM TAB NAVIGATION WORKS:
 * - Tabs show multiple screens side by side with a tab bar at bottom
 * - Only ONE tab is visible at a time
 * - Tapping a tab SWITCHES to that screen (no push/pop)
 * - Each tab maintains its own navigation state
 *
 * WHY TABS ARE INSIDE STACK:
 * The root _layout.tsx uses a Stack navigator. This Tabs navigator
 * is one of the Stack's screens. This means:
 *   - Normal tab switching happens WITHIN the tabs
 *   - But if we navigate to "detail", it pushes ON TOP of tabs
 *   - This is exactly how most apps work (e.g., WhatsApp)
 *
 * FOLDER STRUCTURE:
 *   (tabs)/
 *     ├── _layout.tsx    ← This file (defines the tab bar)
 *     ├── home.tsx       ← "Home" tab screen
 *     ├── (profile)/     ← "Profile" tab (contains a Drawer inside!)
 *     └── about.tsx      ← "About" tab screen
 * ============================================================
 */

import { Platform } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                // Style the tab bar to look like WhatsApp
                tabBarActiveTintColor: "#075E54",     // Active tab = green
                tabBarInactiveTintColor: "#888",       // Inactive tab = gray
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 1,
                    borderTopColor: "#e0e0e0",
                    paddingTop: 4,

                },
                // Header style for each tab
                headerStyle: { backgroundColor: "#075E54" },
                headerTintColor: "#fff",
                headerTitleStyle: { fontWeight: "bold" },
            }}
        >
            {/*
        TAB 1: Home
        The simplest tab — just a screen with navigation demo
      */}
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />

            {/*
        TAB 2: Profile (with Drawer inside!)
        Notice the name is "(profile)" — the parentheses make it a group.
        Inside this group, there's ANOTHER _layout.tsx that defines
        a Drawer navigator. So we have: Stack > Tabs > Drawer
      */}
            <Tabs.Screen
                name="(profile)"
                options={{
                    title: "Profile",
                    headerShown: false, // Drawer has its own header
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />

            {/*
        TAB 3: About
        Another simple tab to show how multiple tabs work
      */}
            <Tabs.Screen
                name="about"
                options={{
                    title: "About",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="information-circle-outline"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
