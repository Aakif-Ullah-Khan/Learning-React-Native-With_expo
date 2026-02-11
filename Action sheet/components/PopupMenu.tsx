/**
 * ============================================================
 * CUSTOM POPUP MENU — components/PopupMenu.tsx
 * ============================================================
 *
 * WHAT IS A POPUP MENU?
 * A popup menu (also called overflow menu or 3-dot menu) is a
 * small dropdown that appears near the button that triggered it.
 * It's the "⋮" icon you see in almost every Android app header.
 *
 * HOW THIS DIFFERS FROM THE ACTION SHEET:
 *   - Action Sheet: slides UP from the BOTTOM of the screen
 *   - Popup Menu: drops DOWN from the TOP-RIGHT corner
 *   - Both use Modal + Animated, but with different positioning
 *
 * ANIMATION:
 * Instead of translateY (vertical slide), we use:
 *   - opacity: fades from 0 → 1
 *   - scale: grows from 0.8 → 1 (subtle zoom effect)
 * This creates a "pop in" effect like native Android menus.
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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type PopupMenuItem = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
};

type PopupMenuProps = {
    visible: boolean;
    onClose: () => void;
    items: PopupMenuItem[];
};

export default function PopupMenu({
    visible,
    onClose,
    items,
}: PopupMenuProps) {
    /**
     * ANIMATION VALUES
     * We animate TWO properties simultaneously:
     *   - opacity: 0 (invisible) → 1 (fully visible)
     *   - scale: 0.8 (slightly smaller) → 1 (full size)
     * This creates a smooth "pop in" effect.
     */
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        if (visible) {
            // POP IN: fade in + scale up simultaneously
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 180,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 180,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // Reset values when hidden
            fadeAnim.setValue(0);
            scaleAnim.setValue(0.8);
        }
    }, [visible]);

    const handleClose = () => {
        // POP OUT: fade out + scale down, then close
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.8,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start(() => {
            onClose();
        });
    };

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="none" // We handle animation ourselves
            onRequestClose={handleClose}
            statusBarTranslucent={true}
        >
            {/* Full-screen backdrop — tapping closes the menu */}
            <Pressable style={styles.backdrop} onPress={handleClose}>
                {/* The popup card — positioned at top-right */}
                <Animated.View
                    style={[
                        styles.menu,
                        {
                            opacity: fadeAnim,
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    {items.map((item, index) => (
                        <Pressable
                            key={index}
                            style={({ pressed }) => [
                                styles.menuItem,
                                pressed && styles.menuItemPressed,
                                index < items.length - 1 && styles.menuItemBorder,
                            ]}
                            onPress={() => {
                                item.onPress();
                                handleClose();
                            }}
                        >
                            <Ionicons name={item.icon} size={20} color="#333" />
                            <Text style={styles.menuLabel}>{item.label}</Text>
                        </Pressable>
                    ))}
                </Animated.View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    // Transparent full-screen backdrop
    backdrop: {
        flex: 1,
    },

    // The dropdown card — positioned at top-right corner
    menu: {
        position: "absolute",
        top: 50, // Below the header
        right: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        minWidth: 180,
        // Shadow for floating effect
        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        overflow: "hidden",
    },

    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 13,
        paddingHorizontal: 16,
        gap: 12,
    },

    menuItemPressed: {
        backgroundColor: "#f0f0f0",
    },

    menuItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },

    menuLabel: {
        fontSize: 14,
        color: "#333",
    },
});
