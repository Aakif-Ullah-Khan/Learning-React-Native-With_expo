/**
 * ============================================================
 * CUSTOM ACTION SHEET — components/ActionSheet.tsx
 * ============================================================
 *
 * WHAT IS AN ACTION SHEET / BOTTOM SHEET?
 * An Action Sheet (also called Bottom Sheet) is a UI panel that
 * slides up from the bottom of the screen. It shows a list of
 * actions the user can take. Examples:
 *   - WhatsApp: share menu, attachment options
 *   - iOS: share sheet, delete confirmation
 *   - Google Maps: place details panel
 *
 * HOW THIS COMPONENT WORKS (step by step):
 *
 * 1. VISIBILITY:
 *    We use React Native's <Modal> component. When `visible` prop
 *    is true, the Modal renders on top of everything.
 *
 * 2. DARK BACKDROP:
 *    Inside the Modal, we place a full-screen Pressable with a
 *    dark semi-transparent background (rgba). Tapping it closes
 *    the sheet (common UX pattern).
 *
 * 3. SLIDE ANIMATION:
 *    - We use Animated.Value to control the sheet's Y position
 *    - When opening: animate from bottom (off-screen) to its
 *      natural position (translateY: 0)
 *    - When closing: animate back down, then hide the Modal
 *    - Animated.timing() creates a smooth linear animation
 *
 * 4. CLOSE TRIGGERS:
 *    The sheet closes when the user:
 *    - Taps the dark backdrop (outside the sheet)
 *    - Taps the ✕ close button
 *    - Taps any option in the list
 *
 * PROPS:
 *   visible: boolean          - Controls if sheet is shown
 *   onClose: () => void       - Called when sheet should close
 *   title: string             - Sheet header text
 *   options: OptionItem[]     - List of options to display
 *
 * NO EXTERNAL LIBRARIES USED:
 *   ✅ Animated  (React Native built-in)
 *   ✅ Modal     (React Native built-in)
 *   ✅ Pressable (React Native built-in)
 *   ✅ View/Text (React Native built-in)
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

// ----- TYPES -----
// Each option in the Action Sheet has a label, an icon, and an onPress handler
type OptionItem = {
    label: string;
    icon: keyof typeof Ionicons.glyphMap; // Ensures valid Ionicon names
    onPress: () => void;
};

type ActionSheetProps = {
    visible: boolean;       // Is the sheet currently visible?
    onClose: () => void;    // Function to call when closing
    title: string;          // Sheet title (e.g., "Edit Profile")
    options: OptionItem[];  // List of action options
};

// Get screen height — we need this to calculate the slide distance
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default function ActionSheet({
    visible,
    onClose,
    title,
    options,
}: ActionSheetProps) {
    /**
     * ============================================================
     * ANIMATION SETUP
     * ============================================================
     *
     * Animated.Value is like a variable that React Native's
     * animation system can smoothly change over time.
     *
     * We start at SCREEN_HEIGHT (sheet is below the screen).
     * When opening, we animate to 0 (sheet is at its natural position).
     * When closing, we animate back to SCREEN_HEIGHT.
     *
     * useRef ensures the Animated.Value persists across re-renders
     * without being recreated.
     */
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    /**
     * ============================================================
     * ANIMATION TRIGGERS
     * ============================================================
     *
     * useEffect watches the `visible` prop:
     *   - When visible becomes TRUE  → slide UP (open)
     *   - When visible becomes FALSE → slide DOWN (close)
     *
     * Animated.timing() creates a timed animation:
     *   - toValue: the target position
     *   - duration: how long the animation takes (milliseconds)
     *   - useNativeDriver: true = runs on the native thread for
     *     better performance (60fps). Always use this for
     *     transform animations like translateY.
     */
    useEffect(() => {
        if (visible) {
            // OPEN: Slide up from bottom to natural position
            Animated.timing(slideAnim, {
                toValue: 0,              // Final position: 0 = natural spot
                duration: 300,           // Takes 300ms to slide up
                useNativeDriver: true,   // Native thread = smoother
            }).start();
        } else {
            // CLOSE: Slide back down off screen
            Animated.timing(slideAnim, {
                toValue: SCREEN_HEIGHT,  // Slide all the way down
                duration: 250,           // Slightly faster close feels snappy
                useNativeDriver: true,
            }).start();
        }
    }, [visible]); // Re-run whenever `visible` changes

    /**
     * ============================================================
     * CLOSE HANDLER
     * ============================================================
     *
     * When closing, we DON'T immediately hide the Modal.
     * Instead:
     *   1. Start the slide-down animation
     *   2. Wait for it to finish (.start(callback))
     *   3. THEN call onClose() to set visible=false
     *
     * This ensures the user sees the smooth close animation
     * before the Modal disappears.
     */
    const handleClose = () => {
        Animated.timing(slideAnim, {
            toValue: SCREEN_HEIGHT,
            duration: 250,
            useNativeDriver: true,
        }).start(() => {
            // This callback runs AFTER the animation completes
            onClose();
        });
    };

    return (
        /**
         * ============================================================
         * MODAL COMPONENT
         * ============================================================
         *
         * Modal renders content on top of EVERYTHING in the app.
         * It creates a new "layer" above the current screen.
         *
         * Props explained:
         * - visible: controls if Modal is shown
         * - transparent: allows us to see through to the screen behind
         * - animationType="fade": the backdrop fades in (the sheet
         *   uses our custom slide animation, not this)
         * - onRequestClose: called when Android back button is pressed
         */
        <Modal
            visible={visible}
            transparent={true}
            animationType="none"
            onRequestClose={handleClose}
            // statusBarTranslucent makes the Modal cover the ENTIRE
            // screen on Android — including over the status bar AND
            // the tab bar. Without this, the tab bar may show through.
            statusBarTranslucent={true}
        >
            <View style={styles.modalContainer}>
                {/**
         * ============================================================
         * DARK BACKDROP
         * ============================================================
         *
         * This is a full-screen Pressable with a dark, transparent
         * background. It serves two purposes:
         *   1. VISUAL: Dims the screen behind the sheet
         *   2. INTERACTIVE: Tapping anywhere on it closes the sheet
         *
         * This is a standard UX pattern — users expect to close
         * modals/sheets by tapping outside of them.
         */}
                <Pressable style={styles.backdrop} onPress={handleClose} />

                {/**
         * ============================================================
         * THE ACTUAL SHEET (Animated)
         * ============================================================
         *
         * Animated.View allows us to apply animations to this View.
         *
         * transform: [{ translateY: slideAnim }]
         * This moves the sheet vertically based on our animation:
         *   - slideAnim = SCREEN_HEIGHT → sheet is below screen (hidden)
         *   - slideAnim = 0 → sheet is at its natural position (visible)
         *
         * The sheet is positioned at the BOTTOM of the screen using
         * position: "absolute" and bottom: 0 in the styles.
         */}
                <Animated.View
                    style={[
                        styles.sheet,
                        {
                            transform: [{ translateY: slideAnim }],
                        },
                    ]}
                >
                    {/* ----- SHEET HEADER ----- */}
                    <View style={styles.header}>
                        {/* The small gray bar at the top (drag indicator) */}
                        <View style={styles.dragHandle} />

                        <View style={styles.headerRow}>
                            <Text style={styles.headerTitle}>{title}</Text>
                            {/*
                Close button (✕) — another way to close the sheet.
                Always provide multiple close methods for good UX.
              */}
                            <Pressable
                                style={({ pressed }) => [
                                    styles.closeButton,
                                    pressed && { opacity: 0.6 },
                                ]}
                                onPress={handleClose}
                            >
                                <Ionicons name="close" size={24} color="#666" />
                            </Pressable>
                        </View>
                    </View>

                    {/* ----- DIVIDER LINE ----- */}
                    <View style={styles.divider} />

                    {/* ----- OPTIONS LIST ----- */}
                    {/**
           * We map over the options array and render each as a
           * Pressable row. When tapped:
           *   1. Call the option's onPress handler
           *   2. Close the sheet
           */}
                    {options.map((option, index) => (
                        <Pressable
                            key={index}
                            style={({ pressed }) => [
                                styles.optionRow,
                                pressed && styles.optionPressed,
                                // Add bottom border to all except last option
                                index < options.length - 1 && styles.optionBorder,
                            ]}
                            onPress={() => {
                                option.onPress();  // Do the action
                                handleClose();     // Then close the sheet
                            }}
                        >
                            <Ionicons name={option.icon} size={22} color="#075E54" />
                            <Text style={styles.optionText}>{option.label}</Text>
                            <Ionicons
                                name="chevron-forward"
                                size={18}
                                color="#ccc"
                                style={styles.chevron}
                            />
                        </Pressable>
                    ))}
                </Animated.View>

                {/**
                 * WHITE BOTTOM FILL
                 * On Android, the system navigation bar is translucent,
                 * and the dark backdrop shows through it (looks black).
                 * This white View sits at the very bottom and covers
                 * that area so the nav bar background stays white.
                 */}
                <View style={styles.bottomFill} />
            </View>
        </Modal>
    );
}

/**
 * ============================================================
 * STYLES
 * ============================================================
 *
 * Key positioning concepts:
 * - modalContainer fills the entire screen (flex: 1)
 * - backdrop fills the entire screen (absolute positioning)
 * - sheet is at the bottom (position: absolute, bottom: 0)
 * - sheet has rounded top corners (borderTopLeftRadius, etc.)
 */
const styles = StyleSheet.create({
    // Full-screen container — fills the Modal
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end", // Push content to bottom
    },

    // Dark transparent overlay behind the sheet
    backdrop: {
        ...StyleSheet.absoluteFillObject, // Fills entire parent
        backgroundColor: "rgba(0, 0, 0, 0.5)", // 50% black
    },

    // The white sheet panel at the bottom
    sheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        // Large bottom padding ensures the white background extends
        // all the way down to cover the tab bar area and reach the
        // Android system navigation buttons. This makes it look
        // like a native bottom sheet.
        paddingBottom: 60,
        // Shadow for a "floating" effect
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },

    // Header section of the sheet
    header: {
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 4,
    },

    // Small gray bar at the top (visual hint that sheet is draggable)
    dragHandle: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: "#ddd",
        marginBottom: 12,
    },

    // Header row: title on left, close button on right
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
    },

    // Close button (✕)
    closeButton: {
        padding: 4,
    },

    // Line between header and options
    divider: {
        height: 1,
        backgroundColor: "#eee",
        marginHorizontal: 20,
        marginVertical: 8,
    },

    // Each option row
    optionRow: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
        gap: 14,
    },

    // Pressed state: subtle highlight
    optionPressed: {
        backgroundColor: "#f0f0f0",
    },

    // Bottom border between options
    optionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },

    optionText: {
        flex: 1,
        fontSize: 15,
        color: "#333",
    },

    // Right arrow icon
    chevron: {
        marginLeft: "auto",
    },

    // White fill at the very bottom — covers the area behind
    // Android's translucent system navigation bar so the dark
    // backdrop doesn't bleed through and look black.
    bottomFill: {
        backgroundColor: "#fff",
        height: 50, // Tall enough to cover any system nav bar
    },
});
