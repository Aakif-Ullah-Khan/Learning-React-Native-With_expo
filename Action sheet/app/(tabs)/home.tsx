/**
 * ============================================================
 * HOME SCREEN — app/(tabs)/home.tsx
 * ============================================================
 *
 * This is the default tab when the app opens.
 * It demonstrates STACK NAVIGATION by providing a button that
 * pushes the "detail" screen on top of everything (including tabs).
 *
 * KEY CONCEPT — router.push():
 * When we call router.push("/detail"), Expo Router looks for
 * a file called `detail.tsx` in the app/ folder. Since the
 * root layout is a Stack, the detail screen SLIDES IN from right.
 * The tab bar disappears because "detail" is outside (tabs).
 * ============================================================
 */

import { useState, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useRouter, useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import PopupMenu from "@/components/PopupMenu";

export default function HomeScreen() {
    // useRouter() gives us navigation methods like push, back, replace
    const router = useRouter();
    const navigation = useNavigation();

    // ----- POPUP MENU STATE -----
    const [menuVisible, setMenuVisible] = useState(false);

    /**
     * 3-DOT MENU ITEMS
     * These options appear when the user taps the ⋮ icon.
     * Each needs: label, icon, and onPress handler.
     */
    const menuItems = [
        {
            label: "New Chat",
            icon: "chatbubble-outline" as const,
            onPress: () => router.push("/new"),
        },
        {
            label: "New Group",
            icon: "people-outline" as const,
            onPress: () => Alert.alert("New Group", "Create a new group"),
        },
        {
            label: "Starred Messages",
            icon: "star-outline" as const,
            onPress: () => Alert.alert("Starred", "View starred messages"),
        },
        {
            label: "Settings",
            icon: "settings-outline" as const,
            onPress: () => Alert.alert("Settings", "Open app settings"),
        },
    ];

    /**
     * ADD 3-DOT BUTTON TO HEADER (top-right)
     * useLayoutEffect runs before paint, so the button appears
     * immediately without any flicker.
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable
                    style={{ marginRight: 12, padding: 4 }}
                    onPress={() => setMenuVisible(true)}
                >
                    <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
                </Pressable>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* App title section */}
            <Ionicons name="book-outline" size={64} color="#075E54" />
            <Text style={styles.title}>📚 Navigation Learning App</Text>
            <Text style={styles.subtitle}>
                Learn Expo Router navigation by exploring this app!
            </Text>

            {/* Navigation guide */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>🗺️ Navigation Guide</Text>
                <Text style={styles.cardText}>
                    • <Text style={styles.bold}>Bottom Tabs</Text> — Tap Home, Profile,
                    or About below
                </Text>
                <Text style={styles.cardText}>
                    • <Text style={styles.bold}>Drawer</Text> — Go to Profile tab, tap
                    the ☰ icon
                </Text>
                <Text style={styles.cardText}>
                    • <Text style={styles.bold}>Stack Push</Text> — Tap the button below
                    to push a new screen
                </Text>
                <Text style={styles.cardText}>
                    • <Text style={styles.bold}>Action Sheet</Text> — Go to Profile tab
                    and tap any option
                </Text>
                <Text style={styles.cardText}>
                    • <Text style={styles.bold}>Popup Menu</Text> — Tap the ⋮ icon in
                    the top-right corner
                </Text>
            </View>

            {/*
        STACK NAVIGATION DEMO BUTTON
        router.push() adds a new screen to the Stack.
        "/detail" maps to app/detail.tsx
      */}
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed, // Visual feedback on press
                ]}
                onPress={() => router.push("/detail")}
            >
                <Ionicons name="arrow-forward-circle-outline" size={22} color="#fff" />
                <Text style={styles.buttonText}>Push Detail Screen (Stack Demo)</Text>
            </Pressable>

            {/* ===== 3-DOT POPUP MENU ===== */}
            <PopupMenu
                visible={menuVisible}
                onClose={() => setMenuVisible(false)}
                items={menuItems}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#075E54",
        marginTop: 16,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 8,
        textAlign: "center",
        marginBottom: 24,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        width: "100%",
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 12,
    },
    cardText: {
        fontSize: 13,
        color: "#555",
        lineHeight: 22,
        marginBottom: 4,
    },
    bold: {
        fontWeight: "bold",
        color: "#075E54",
    },
    button: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#075E54",
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        gap: 10,
        elevation: 2,
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.97 }],
    },
    buttonText: {
        color: "#fff",
        fontSize: 15,
        fontWeight: "600",
    },
});
