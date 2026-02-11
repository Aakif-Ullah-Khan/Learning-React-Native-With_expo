/**
 * ============================================================
 * CUSTOM DRAWER MENU — components/DrawerMenu.tsx
 * ============================================================
 *
 * WHAT IS A DRAWER?
 * A Drawer is a side panel that slides in from the left edge.
 * It's commonly used for navigation menus (like Gmail, Spotify).
 *
 * WHY BUILD IT CUSTOM?
 * The official Drawer from @react-navigation/drawer requires
 * react-native-reanimated (a heavy native dependency).
 * By building our own, we:
 *   1. Learn HOW drawers actually work internally
 *   2. Avoid native dependency version conflicts
 *   3. Keep the app lightweight
 *
 * HOW THIS WORKS:
 * 1. A full-screen overlay (Modal) appears on top of the app
 * 2. A dark backdrop fills the screen (Pressable to close)
 * 3. A white panel slides in from the LEFT using Animated
 * 4. The panel contains navigation menu items
 * 5. Tapping a menu item navigates to that screen and closes
 *
 * ANIMATION:
 * - translateX starts at -DRAWER_WIDTH (off-screen to the left)
 * - When opening: animate to 0 (panel slides into view)
 * - When closing: animate back to -DRAWER_WIDTH
 *
 * NO EXTERNAL LIBRARIES:
 *   ✅ Animated  (React Native built-in)
 *   ✅ Modal     (React Native built-in)
 *   ✅ Pressable (React Native built-in)
 * ============================================================
 */

import React, { useEffect, useRef } from "react";
import {
    Animated,
    Modal,
    Pressable,
    View,
    Text,
    StyleSheet,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Drawer width = 75% of screen width (common pattern)
const SCREEN_WIDTH = Dimensions.get("window").width;
const DRAWER_WIDTH = SCREEN_WIDTH * 0.75;

type DrawerMenuItem = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    active?: boolean; // Is this the currently active screen?
};

type DrawerMenuProps = {
    visible: boolean;
    onClose: () => void;
    items: DrawerMenuItem[];
};

export default function DrawerMenu({
    visible,
    onClose,
    items,
}: DrawerMenuProps) {
    /**
     * ANIMATION VALUE
     * Starts at -DRAWER_WIDTH (completely off-screen to the left).
     * When visible, animates to 0 (slides into view).
     */
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

    /**
     * ANIMATION TRIGGERS
     * Same pattern as ActionSheet, but horizontal (translateX)
     * instead of vertical (translateY).
     */
    useEffect(() => {
        if (visible) {
            // OPEN: Slide in from the left
            Animated.timing(slideAnim, {
                toValue: 0,              // Slide to natural position
                duration: 280,           // Slightly faster than Action Sheet
                useNativeDriver: true,
            }).start();
        } else {
            // CLOSE: Slide back to the left
            Animated.timing(slideAnim, {
                toValue: -DRAWER_WIDTH,  // Slide off-screen
                duration: 220,
                useNativeDriver: true,
            }).start();
        }
    }, [visible]);

    /**
     * CLOSE HANDLER
     * Animate out first, THEN call onClose callback.
     * This ensures the user sees the smooth slide-out.
     */
    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: -DRAWER_WIDTH,
            duration: 220,
            useNativeDriver: true,
        }).start(() => {
            onClose(); // Called after animation finishes
        });
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={handleClose} // Android back button
        >
            <View style={styles.container}>
                {/* Dark backdrop — tapping closes the drawer */}
                <Pressable style={styles.backdrop} onPress={handleClose} />

                {/* The sliding drawer panel */}
                <Animated.View
                    style={[
                        styles.drawer,
                        {
                            // translateX moves the panel LEFT/RIGHT
                            // -DRAWER_WIDTH = hidden (left of screen)
                            // 0 = visible (at the left edge of screen)
                            transform: [{ translateX: slideAnim }],
                        },
                    ]}
                >
                    {/* Drawer Header */}
                    <View style={styles.drawerHeader}>
                        <View style={styles.headerAvatar}>
                            <Text style={styles.headerAvatarText}>JD</Text>
                        </View>
                        <Text style={styles.headerName}>John Doe</Text>
                        <Text style={styles.headerEmail}>john.doe@example.com</Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Menu Items */}
                    {items.map((item, index) => (
                        <Pressable
                            key={index}
                            style={({ pressed }) => [
                                styles.menuItem,
                                item.active && styles.menuItemActive,
                                pressed && styles.menuItemPressed,
                            ]}
                            onPress={() => {
                                item.onPress();
                                handleClose();
                            }}
                        >
                            <Ionicons
                                name={item.icon}
                                size={22}
                                color={item.active ? "#075E54" : "#666"}
                            />
                            <Text
                                style={[
                                    styles.menuLabel,
                                    item.active && styles.menuLabelActive,
                                ]}
                            >
                                {item.label}
                            </Text>
                        </Pressable>
                    ))}

                    {/* Footer info */}
                    <View style={styles.drawerFooter}>
                        <Text style={styles.footerText}>
                            📖 This is a custom drawer built{"\n"}with Animated API — no
                            external libs!
                        </Text>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
    },

    // Dark overlay behind the drawer
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    // The white drawer panel
    drawer: {
        width: DRAWER_WIDTH,
        height: "100%",
        backgroundColor: "#fff",
        elevation: 16,
        shadowColor: "#000",
        shadowOffset: { width: 4, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
    },

    // Header with user info
    drawerHeader: {
        backgroundColor: "#075E54",
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    headerAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },
    headerAvatarText: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#fff",
    },
    headerName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    headerEmail: {
        fontSize: 13,
        color: "rgba(255,255,255,0.7)",
        marginTop: 2,
    },

    divider: {
        height: 1,
        backgroundColor: "#eee",
    },

    // Menu items
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 20,
        gap: 16,
    },
    menuItemActive: {
        backgroundColor: "#e8f5e9",
    },
    menuItemPressed: {
        backgroundColor: "#f0f0f0",
    },
    menuLabel: {
        fontSize: 15,
        color: "#333",
    },
    menuLabelActive: {
        color: "#075E54",
        fontWeight: "600",
    },

    // Footer
    drawerFooter: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    },
    footerText: {
        fontSize: 12,
        color: "#aaa",
        lineHeight: 18,
        textAlign: "center",
    },
});
