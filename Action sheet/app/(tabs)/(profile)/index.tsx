/**
 * ============================================================
 * PROFILE SCREEN — app/(tabs)/(profile)/index.tsx
 * ============================================================
 *
 * This is a WhatsApp-like Profile screen that demonstrates:
 *   1. Clean UI layout with profile image, name, status
 *   2. A list of tappable options
 *   3. Opening our custom Action Sheet on option press
 *   4. A custom Drawer Menu (hamburger button in header)
 *
 * TWO CUSTOM OVERLAYS ON THIS SCREEN:
 *   - Action Sheet: slides UP from bottom (vertical animation)
 *   - Drawer Menu: slides IN from left (horizontal animation)
 *   Both use the same technique (Animated + Modal) but in
 *   different directions. Compare the two to understand the pattern!
 *
 * STATE MANAGEMENT:
 *   sheetVisible + selectedOption → control the Action Sheet
 *   drawerVisible → controls the Drawer Menu
 * ============================================================
 */

import { useState, useLayoutEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    ScrollView,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import ActionSheet from "@/components/ActionSheet";
import DrawerMenu from "@/components/DrawerMenu";

/**
 * SUB-OPTIONS for each profile menu item.
 * When you tap "Edit Profile", the Action Sheet opens with
 * options like "Change Name", "Change Photo", etc.
 */
const ACTION_SHEET_OPTIONS: Record<
    string,
    {
        label: string;
        icon: keyof typeof Ionicons.glyphMap;
        onPress: () => void;
    }[]
> = {
    "Edit Profile": [
        {
            label: "Change Name",
            icon: "pencil-outline",
            onPress: () =>
                Alert.alert("Change Name", "Name change dialog would open here"),
        },
        {
            label: "Change Photo",
            icon: "camera-outline",
            onPress: () =>
                Alert.alert("Change Photo", "Photo picker would open here"),
        },
        {
            label: "Update Bio",
            icon: "text-outline",
            onPress: () =>
                Alert.alert("Update Bio", "Bio editor would open here"),
        },
    ],
    Privacy: [
        {
            label: "Last Seen",
            icon: "time-outline",
            onPress: () =>
                Alert.alert("Last Seen", "Privacy settings for last seen"),
        },
        {
            label: "Profile Photo",
            icon: "eye-off-outline",
            onPress: () =>
                Alert.alert("Profile Photo", "Who can see your profile photo"),
        },
        {
            label: "Blocked Contacts",
            icon: "ban-outline",
            onPress: () =>
                Alert.alert("Blocked", "Manage blocked contacts"),
        },
    ],
    Settings: [
        {
            label: "Notifications",
            icon: "notifications-outline",
            onPress: () =>
                Alert.alert("Notifications", "Notification preferences"),
        },
        {
            label: "Storage & Data",
            icon: "folder-outline",
            onPress: () =>
                Alert.alert("Storage", "Manage storage and data usage"),
        },
        {
            label: "App Language",
            icon: "language-outline",
            onPress: () => Alert.alert("Language", "Change app language"),
        },
    ],
    Logout: [
        {
            label: "Logout from this device",
            icon: "log-out-outline",
            onPress: () =>
                Alert.alert("Logout", "You would be logged out here"),
        },
        {
            label: "Logout from all devices",
            icon: "phone-portrait-outline",
            onPress: () =>
                Alert.alert("Logout All", "All sessions would end"),
        },
    ],
};

/**
 * Profile menu items — main list shown on the Profile screen.
 * Each item has a label, icon, and accent color.
 */
const PROFILE_MENU_ITEMS = [
    { label: "Edit Profile", icon: "create-outline" as const, color: "#075E54" },
    {
        label: "Privacy",
        icon: "lock-closed-outline" as const,
        color: "#128C7E",
    },
    { label: "Settings", icon: "settings-outline" as const, color: "#25D366" },
    { label: "Logout", icon: "log-out-outline" as const, color: "#DC3545" },
];

export default function ProfileScreen() {
    const navigation = useNavigation();
    const router = useRouter();

    // ----- ACTION SHEET STATE -----
    const [sheetVisible, setSheetVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    // ----- DRAWER STATE -----
    const [drawerVisible, setDrawerVisible] = useState(false);

    /**
     * ADD HAMBURGER BUTTON TO HEADER
     * useLayoutEffect runs before the screen renders, so the
     * header button appears immediately (no flicker).
     *
     * navigation.setOptions() lets us customize the header
     * from within the screen component — useful when the header
     * needs to interact with the screen's state.
     */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable
                    style={{ marginLeft: 10, padding: 4 }}
                    onPress={() => setDrawerVisible(true)}
                >
                    <Ionicons name="menu" size={26} color="#fff" />
                </Pressable>
            ),
        });
    }, [navigation]);

    /** Open Action Sheet with the selected option */
    const openSheet = (option: string) => {
        setSelectedOption(option);
        setSheetVisible(true);
    };

    /**
     * DRAWER MENU ITEMS
     * These items appear in the custom drawer when ☰ is tapped.
     * Tapping "Settings" navigates to the settings screen using
     * router.push() (Stack navigation within the profile group).
     */
    const drawerItems = [
        {
            label: "Profile",
            icon: "person-outline" as const,
            active: true, // We're currently on this screen
            onPress: () => { }, // Already here, do nothing
        },
        {
            label: "Settings",
            icon: "settings-outline" as const,
            onPress: () => router.push("/(tabs)/(profile)/settings"),
        },
        {
            label: "Help",
            icon: "help-circle-outline" as const,
            onPress: () => Alert.alert("Help", "Help & FAQ section"),
        },
    ];

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* ===== PROFILE HEADER SECTION ===== */}
                <View style={styles.profileHeader}>
                    {/* Avatar with initials (no image needed for demo) */}
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>JD</Text>
                        </View>
                        {/* Green "online" indicator dot */}
                        <View style={styles.onlineIndicator} />
                    </View>

                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileStatus}>
                        Hey there! I'm learning React Native 🚀
                    </Text>
                    <Text style={styles.profilePhone}>+1 (555) 123-4567</Text>
                </View>

                {/* ===== MENU OPTIONS LIST ===== */}
                <View style={styles.menuCard}>
                    {PROFILE_MENU_ITEMS.map((item, index) => (
                        <Pressable
                            key={item.label}
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && styles.menuItemPressed,
                                index < PROFILE_MENU_ITEMS.length - 1 &&
                                styles.menuItemBorder,
                            ]}
                            onPress={() => openSheet(item.label)}
                        >
                            {/* Colored icon circle */}
                            <View
                                style={[
                                    styles.menuIconContainer,
                                    { backgroundColor: item.color },
                                ]}
                            >
                                <Ionicons name={item.icon} size={20} color="#fff" />
                            </View>
                            <Text
                                style={[
                                    styles.menuLabel,
                                    item.label === "Logout" && styles.logoutLabel,
                                ]}
                            >
                                {item.label}
                            </Text>
                            <Ionicons name="chevron-forward" size={20} color="#ccc" />
                        </Pressable>
                    ))}
                </View>

                {/* ===== LEARNING TIPS ===== */}
                <View style={styles.tipCard}>
                    <Ionicons name="bulb-outline" size={20} color="#F9A825" />
                    <Text style={styles.tipText}>
                        Tap any option above to open the <Text style={styles.bold}>Action Sheet</Text> (slides from bottom).
                        {"\n"}Tap the ☰ icon in the header to open the <Text style={styles.bold}>Custom Drawer</Text> (slides from left).
                    </Text>
                </View>
            </ScrollView>

            {/* ===== ACTION SHEET (slides UP from bottom) ===== */}
            <ActionSheet
                visible={sheetVisible}
                onClose={() => setSheetVisible(false)}
                title={selectedOption}
                options={ACTION_SHEET_OPTIONS[selectedOption] || []}
            />

            {/* ===== CUSTOM DRAWER (slides IN from left) ===== */}
            <DrawerMenu
                visible={drawerVisible}
                onClose={() => setDrawerVisible(false)}
                items={drawerItems}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    scrollContent: {
        paddingBottom: 30,
    },

    // ----- Profile Header -----
    profileHeader: {
        backgroundColor: "#fff",
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    avatarContainer: {
        position: "relative",
        marginBottom: 14,
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#075E54",
        alignItems: "center",
        justifyContent: "center",
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
    },
    avatarText: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#fff",
    },
    onlineIndicator: {
        position: "absolute",
        bottom: 4,
        right: 4,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: "#25D366",
        borderWidth: 3,
        borderColor: "#fff",
    },
    profileName: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
    },
    profileStatus: {
        fontSize: 14,
        color: "#888",
        marginTop: 4,
        textAlign: "center",
    },
    profilePhone: {
        fontSize: 13,
        color: "#aaa",
        marginTop: 6,
    },

    // ----- Menu Card -----
    menuCard: {
        backgroundColor: "#fff",
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 12,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 16,
        gap: 14,
    },
    menuItemPressed: {
        backgroundColor: "#f8f8f8",
    },
    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    menuIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    menuLabel: {
        flex: 1,
        fontSize: 15,
        color: "#333",
        fontWeight: "500",
    },
    logoutLabel: {
        color: "#DC3545",
    },

    // ----- Learning Tip -----
    tipCard: {
        flexDirection: "row",
        backgroundColor: "#FFF8E1",
        marginTop: 16,
        marginHorizontal: 16,
        borderRadius: 10,
        padding: 14,
        gap: 10,
        alignItems: "flex-start",
    },
    tipText: {
        flex: 1,
        fontSize: 13,
        color: "#F57F17",
        lineHeight: 20,
    },
    bold: {
        fontWeight: "bold",
    },
});
