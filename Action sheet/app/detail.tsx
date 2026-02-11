/**
 * ============================================================
 * DETAIL SCREEN — app/detail.tsx
 * ============================================================
 *
 * WHY THIS FILE IS OUTSIDE (tabs):
 * This file is in app/detail.tsx, NOT inside app/(tabs)/.
 * This means when we navigate to "/detail", it gets pushed
 * onto the ROOT Stack navigator. The result:
 *   - The detail screen slides in from the right
 *   - The bottom tab bar DISAPPEARS (because we're above it)
 *   - The back arrow appears in the header to go back
 *
 * This is exactly how apps like WhatsApp work:
 *   - Chat list is in a tab
 *   - Tapping a chat pushes a full-screen chat view
 *   - The tab bar is hidden during the chat
 *
 * KEY CONCEPT — router.back():
 * Calling router.back() pops the current screen off the Stack,
 * returning to wherever we came from. It's like pressing the
 * hardware back button on Android.
 * ============================================================
 */

import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function DetailScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Ionicons name="layers-outline" size={64} color="#075E54" />
            <Text style={styles.title}>🎉 Detail Screen</Text>
            <Text style={styles.subtitle}>
                This screen was PUSHED onto the Stack. Notice the tab bar is gone!
            </Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>📖 What just happened?</Text>
                <Text style={styles.cardText}>
                    1. You tapped the button on the Home screen{"\n"}
                    2. router.push("/detail") was called{"\n"}
                    3. Expo Router found this file (app/detail.tsx){"\n"}
                    4. The root Stack navigator pushed this screen on top{"\n"}
                    5. The tab bar disappeared because this is ABOVE the tabs
                </Text>
            </View>

            {/*
        router.back() pops this screen off the Stack
        We return to wherever we came from (the Home tab)
      */}
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back-circle-outline" size={22} color="#fff" />
                <Text style={styles.buttonText}>Go Back (router.back)</Text>
            </Pressable>
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
        marginBottom: 8,
    },
    cardText: {
        fontSize: 13,
        color: "#555",
        lineHeight: 22,
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
