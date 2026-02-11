/**
 * ============================================================
 * SETTINGS SCREEN — app/(tabs)/(profile)/settings.tsx
 * ============================================================
 *
 * This is a Drawer sub-screen inside the Profile tab.
 * You can reach this screen by:
 *   1. Opening the Drawer (swipe from left or tap ☰)
 *   2. Tapping "Settings" in the Drawer menu
 *
 * This demonstrates how Drawer navigation works:
 *   - Both "Profile" and "Settings" share the same tab
 *   - The Drawer switches between them WITHOUT affecting tabs
 *   - The tab bar stays visible (we're still inside the tab)
 * ============================================================
 */

import { View, Text, StyleSheet, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function SettingsScreen() {
    // Simple state to demonstrate interactivity
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>⚙️ Settings</Text>
            <Text style={styles.subtitle}>
                This screen is inside the Drawer navigator.{"\n"}
                Open the drawer (☰ or swipe left) to switch back to Profile.
            </Text>

            {/* Settings options */}
            <View style={styles.card}>
                <View style={styles.settingRow}>
                    <View style={styles.settingLeft}>
                        <Ionicons name="moon-outline" size={22} color="#075E54" />
                        <Text style={styles.settingLabel}>Dark Mode</Text>
                    </View>
                    <Switch
                        value={darkMode}
                        onValueChange={setDarkMode}
                        trackColor={{ false: "#ccc", true: "#075E54" }}
                        thumbColor="#fff"
                    />
                </View>

                <View style={styles.divider} />

                <View style={styles.settingRow}>
                    <View style={styles.settingLeft}>
                        <Ionicons
                            name="notifications-outline"
                            size={22}
                            color="#075E54"
                        />
                        <Text style={styles.settingLabel}>Notifications</Text>
                    </View>
                    <Switch
                        value={notifications}
                        onValueChange={setNotifications}
                        trackColor={{ false: "#ccc", true: "#075E54" }}
                        thumbColor="#fff"
                    />
                </View>
            </View>

            <View style={styles.infoCard}>
                <Ionicons name="information-circle-outline" size={20} color="#075E54" />
                <Text style={styles.infoText}>
                    Drawer navigation lets you have multiple screens within a single tab.
                    The tab bar stays visible, but the content switches.
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        padding: 24,
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#075E54",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 13,
        color: "#888",
        marginBottom: 24,
        lineHeight: 20,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 4,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        marginBottom: 20,
    },
    settingRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    settingLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    settingLabel: {
        fontSize: 15,
        color: "#333",
    },
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginHorizontal: 16,
    },
    infoCard: {
        flexDirection: "row",
        backgroundColor: "#e8f5e9",
        borderRadius: 10,
        padding: 14,
        gap: 10,
        alignItems: "flex-start",
    },
    infoText: {
        flex: 1,
        fontSize: 13,
        color: "#2e7d32",
        lineHeight: 20,
    },
});
