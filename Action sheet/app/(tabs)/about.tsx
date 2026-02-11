/**
 * ============================================================
 * ABOUT SCREEN — app/(tabs)/about.tsx
 * ============================================================
 *
 * A simple informational tab explaining the app's purpose.
 * This screen exists to demonstrate how multiple tabs work —
 * switching between Home, Profile, and About is Tab navigation.
 * ============================================================
 */

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen() {
    return (
        <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.container}
        >
            <Ionicons name="code-slash-outline" size={64} color="#075E54" />
            <Text style={styles.title}>About This App</Text>

            <View style={styles.card}>
                <Text style={styles.heading}>🎯 Purpose</Text>
                <Text style={styles.text}>
                    This app is built for learning. It teaches you how Expo Router
                    navigation works and how to build a custom Action Sheet from scratch.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.heading}>📂 Navigation Types Used</Text>
                <Text style={styles.text}>
                    <Text style={styles.bold}>1. Stack Navigation</Text>
                    {"\n"}Wraps the entire app. Screens push/pop like cards.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.bold}>2. Tab Navigation</Text>
                    {"\n"}Bottom tabs for switching between main sections.
                </Text>
                <Text style={styles.text}>
                    <Text style={styles.bold}>3. Drawer Navigation</Text>
                    {"\n"}Side panel inside the Profile tab for sub-screens.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.heading}>🛠️ Tech Stack</Text>
                <Text style={styles.text}>• Expo (latest)</Text>
                <Text style={styles.text}>• Expo Router (file-based routing)</Text>
                <Text style={styles.text}>• TypeScript</Text>
                <Text style={styles.text}>
                    • Custom Action Sheet (Animated + Modal)
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.heading}>⚡ Key Learning Points</Text>
                <Text style={styles.text}>
                    • _layout.tsx files define navigators{"\n"}
                    • Folders with () are "groups" (hidden from URL){"\n"}
                    • Stack {">"} Tabs {">"} Drawer nesting order{"\n"}
                    • Custom animations with React Native Animated API{"\n"}
                    • Modal + Pressable for overlay sheets
                </Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    container: {
        alignItems: "center",
        padding: 24,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#075E54",
        marginTop: 12,
        marginBottom: 20,
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
        marginBottom: 16,
    },
    heading: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
        color: "#555",
        lineHeight: 22,
        marginBottom: 4,
    },
    bold: {
        fontWeight: "bold",
        color: "#075E54",
    },
});
