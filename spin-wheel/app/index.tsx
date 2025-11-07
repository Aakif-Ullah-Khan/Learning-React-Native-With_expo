import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  useColorScheme,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert,
  Easing,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Polygon, G, Text as SvgText } from "react-native-svg";
import { router } from "expo-router";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const WHEEL_RADIUS = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.25;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  // Theme colors
  const theme = {
    background: isDarkMode ? "#1a1a1a" : "#ffffff",
    surfaceLight: isDarkMode ? "#2d2d2d" : "#f5f5f5",
    surface: isDarkMode ? "#242424" : "#ffffff",
    text: isDarkMode ? "#ffffff" : "#000000",
    textSecondary: isDarkMode ? "#b0b0b0" : "#666666",
    primary: "#6366f1",
    primaryLight: isDarkMode ? "#4f46e5" : "#6366f1",
    accent: "#ec4899",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    border: isDarkMode ? "#3a3a3a" : "#e5e7eb",
  };

  // Color palette for wheel segments - Rainbow spectrum
  const segmentColors = [
    "#6B5FFF",
    "#7B4DFF",
    "#8B3FFF",
    "#9B2FFF",
    "#AB1FFF", // Blues to Purple
    "#BB0FFF",
    "#CB00FF",
    "#DB00FF",
    "#EB00EF",
    "#FB00DF", // Purple to Magenta
    "#FF00CF",
    "#FF00BF",
    "#FF00AF",
    "#FF009F",
    "#FF008F", // Magenta to Pink/Red
    "#FF1F7F",
    "#FF3F6F",
    "#FF5F5F",
    "#FF7F4F",
    "#FF9F3F", // Pink to Red/Orange
    "#FFBF2F",
    "#FFDF1F",
    "#FFFF0F",
    "#EFFF00",
    "#DFFF00", // Orange to Yellow
    "#CFFF00",
    "#BFFF00",
    "#AFFF00",
    "#9FFF00",
    "#8FFF00", // Yellow to Lime
    "#7FFF00",
    "#6FFF00",
    "#5FFF00",
    "#4FFF00",
    "#3FFF1F", // Lime Green
    "#2FFF3F",
    "#1FFF5F",
    "#0FFF7F",
    "#00FF9F",
    "#00FFBF", // Green
    "#00FFDF",
    "#00FFFF",
    "#00EFFF",
    "#00DFFF",
    "#00CFFF", // Cyan to Light Blue
    "#00BFFF",
    "#00AFFF",
    "#009FFF",
    "#008FFF",
    "#007FFF", // Light Blue
    "#006FFF",
    "#005FFF",
    "#004FFF",
    "#003FFF",
    "#002FFF", // Back to Blue
  ];

  // State management
  const [members, setMembers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  // UseRef keeps the same Animated.Value instance across renders
  const wheelRotation = useRef(new Animated.Value(0)).current;

  // Animation references
  const wheelRotationValue = useRef(0);

  // Validate and add member
  const handleAddMember = () => {
    const trimmedName = inputValue.trim();

    if (!trimmedName) {
      Alert.alert("Invalid Input", "Member name cannot be empty.");
      return;
    }

    if (members.some((m) => m.toLowerCase() === trimmedName.toLowerCase())) {
      Alert.alert(
        "Duplicate Member",
        "This member already exists in the list."
      );
      return;
    }

    setMembers([...members, trimmedName]);
    setInputValue("");
  };

  // Remove member from list
  const handleRemoveMember = (index: number) => {
    const newMembers = members.filter((_, i) => i !== index);
    setMembers(newMembers);
    if (winner === members[index]) {
      setWinner(null);
    }
  };

  // Calculate winner based on rotation angle
  const calculateWinner = (angle: number) => {
    if (members.length === 0) return null;

    // Normalize angle to 0-360
    let normalizedAngle = angle % 360;
    if (normalizedAngle < 0) normalizedAngle += 360;

    // Adjust for wheel pointer (usually at top)
    const segmentAngle = 360 / members.length;
    const adjustedAngle = (360 - normalizedAngle) % 360;
    const winnerIndex =
      Math.floor(adjustedAngle / segmentAngle) % members.length;

    return members[winnerIndex];
  };

  // Spin wheel animation
  const handleSpin = () => {
    if (members.length < 2) {
      Alert.alert(
        "Need at least 2 members",
        "Please add at least 2 members to spin the wheel."
      );
      return;
    }

    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // Ensure we always increase the Animated value (always clockwise):
    // Build a new target value that is greater than the current accumulated rotation.
    const baseRotation = wheelRotationValue.current || 0;
    const spinDegrees = 3600 + Math.random() * 360; // 10 full rotations + random offset
    const targetRotation = baseRotation + spinDegrees;

    // Winner will be determined from the final absolute angle
    const finalAngle = targetRotation % 360;
    const winningMember = calculateWinner(finalAngle);

    // Provide a snappy/fast initial burst then decelerate smoothly to the final rotation.
    // Initial burst gives immediate feedback; main animation decelerates with easing.
    Animated.sequence([
      Animated.timing(wheelRotation, {
        toValue: baseRotation + 720, // two quick rotations
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(wheelRotation, {
        toValue: targetRotation,
        duration: 3500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
    ]).start(() => {
      // Save accumulated rotation so next spin continues clockwise
      wheelRotationValue.current = targetRotation;
      setWinner(winningMember);
      setIsSpinning(false);
    });
  };

  // Reset wheel
  const handleReset = () => {
    // Reset immediately to zero to avoid animating backwards (anticlockwise).
    setWinner(null);
    wheelRotation.stopAnimation(() => {
      wheelRotation.setValue(0);
      wheelRotationValue.current = 0;
      setIsSpinning(false);
    });
  };

  // Generate SVG wheel
  const generateWheelSVG = () => {
    if (members.length === 0) {
      return (
        <Svg
          width={WHEEL_RADIUS * 2}
          height={WHEEL_RADIUS * 2}
          viewBox={`0 0 ${WHEEL_RADIUS * 2} ${WHEEL_RADIUS * 2}`}
        >
          <Circle
            cx={WHEEL_RADIUS}
            cy={WHEEL_RADIUS}
            r={WHEEL_RADIUS}
            fill={theme.surfaceLight}
            stroke={theme.border}
            strokeWidth="2"
          />
          <SvgText
            x={WHEEL_RADIUS}
            y={WHEEL_RADIUS}
            textAnchor="middle"
            dy="0.3em"
            fontSize="14"
            fill={theme.textSecondary}
            fontWeight="600"
          >
            Add members to spin
          </SvgText>
        </Svg>
      );
    }

    const segmentAngle = 360 / members.length;
    const radius = WHEEL_RADIUS;
    const centerX = radius;
    const centerY = radius;

    const segments = members.map((member, index) => {
      const startAngle = (index * segmentAngle - 90) * (Math.PI / 180);
      const endAngle = ((index + 1) * segmentAngle - 90) * (Math.PI / 180);

      // Calculate polygon points for segment
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      const points = `${centerX},${centerY} ${x1},${y1} ${x2},${y2}`;

      // Text position (middle of segment)
      const midAngle = (startAngle + endAngle) / 2;
      const textRadius = radius * 0.65;
      const textX = centerX + textRadius * Math.cos(midAngle);
      const textY = centerY + textRadius * Math.sin(midAngle);
      const textRotation = ((midAngle * 180) / Math.PI + 90) % 360;

      const segmentColor = segmentColors[index % segmentColors.length];

      return (
        <G key={index}>
          <Polygon
            points={points}
            fill={segmentColor}
            stroke={theme.surface}
            strokeWidth="2"
            opacity="0.9"
          />
          <SvgText
            x={textX}
            y={textY}
            textAnchor="middle"
            dy="0.3em"
            fontSize="11"
            fill="white"
            fontWeight="bold"
            rotation={textRotation}
            origin={`${textX},${textY}`}
            textLength={radius * 0.35}
            numberOfLines={1}
          >
            {member.substring(0, 10)}
          </SvgText>
        </G>
      );
    });

    return (
      <Svg
        width={WHEEL_RADIUS * 2}
        height={WHEEL_RADIUS * 2}
        viewBox={`0 0 ${WHEEL_RADIUS * 2} ${WHEEL_RADIUS * 2}`}
      >
        <Circle
          cx={centerX}
          cy={centerY}
          r={radius + 2}
          fill="none"
          stroke={theme.border}
          strokeWidth="1"
        />
        {segments}
      </Svg>
    );
  };

  // Get rotation animation style
  const rotationStyle = {
    transform: [
      {
        rotate: wheelRotation.interpolate({
          inputRange: [0, 360],
          outputRange: ["0deg", "360deg"],
          extrapolate: "extend",
        }),
      },
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <SafeAreaView edges={["top"]} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>
              Spin Wheel Picker
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Add members and spin to pick a winner!
            </Text>
          </View>

          {/* Member Input Section */}
          <View
            style={[
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Add Members
            </Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.surfaceLight,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="Enter member name"
                placeholderTextColor={theme.textSecondary}
                value={inputValue}
                onChangeText={setInputValue}
                onSubmitEditing={handleAddMember}
              />
              <TouchableOpacity
                style={[styles.addButton, { backgroundColor: theme.primary }]}
                onPress={handleAddMember}
              >
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
            {/* 
            <TouchableOpacity
              onPress={() => {
                router.push("/weel");
              }}
              style={[
                styles.cardButton,
                { backgroundColor: theme.primary, borderColor: theme.border },
              ]}
            >
              <Text>Go to another page</Text>
            </TouchableOpacity> */}

            {/* Members List */}
            {members.length > 0 ? (
              <View style={styles.membersList}>
                <FlatList
                  data={members}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  renderItem={({ item, index }) => (
                    <View
                      style={[
                        styles.memberItem,
                        {
                          backgroundColor: theme.surfaceLight,
                          borderLeftColor:
                            segmentColors[index % segmentColors.length],
                        },
                      ]}
                    >
                      <View style={styles.memberContent}>
                        <Text
                          style={[styles.memberName, { color: theme.text }]}
                        >
                          {item}
                        </Text>
                        <Text
                          style={[
                            styles.memberIndex,
                            { color: theme.textSecondary },
                          ]}
                        >
                          #{index + 1}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => handleRemoveMember(index)}
                      >
                        <Ionicons name="close" size={20} color={theme.error} />
                      </TouchableOpacity>
                    </View>
                  )}
                  scrollEnabled={false}
                />
              </View>
            ) : (
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                No members added yet
              </Text>
            )}
          </View>

          {/* Spin Wheel Section */}
          <View
            style={[
              styles.card,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={[styles.cardTitle, { color: theme.text }]}>
              Spin Wheel
            </Text>

            <View style={styles.wheelContainer}>
              {/* Pointer at top */}
              <View
                style={[
                  styles.pointer,
                  {
                    borderTopColor: theme.primary,
                    borderLeftColor: "transparent",
                    borderRightColor: "transparent",
                    borderBottomColor: "transparent",
                  },
                ]}
              />

              {/* Animated wheel */}
              <Animated.View style={[rotationStyle]}>
                {generateWheelSVG()}
              </Animated.View>
            </View>

            {/* Spin Button */}
            <TouchableOpacity
              style={[
                styles.spinButton,
                {
                  backgroundColor: theme.primary,
                  opacity: isSpinning || members.length < 2 ? 0.5 : 1,
                },
              ]}
              onPress={handleSpin}
              disabled={isSpinning || members.length < 2}
            >
              {isSpinning ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <Ionicons
                    name="sync"
                    size={24}
                    color="white"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={styles.spinButtonText}>
                    {members.length < 2 ? "Add Members First" : "SPIN"}
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {/* Winner Display */}
            {winner && (
              <View
                style={[
                  styles.winnerSection,
                  {
                    backgroundColor: theme.surfaceLight,
                    borderColor: theme.accent,
                  },
                ]}
              >
                <Text
                  style={[styles.winnerLabel, { color: theme.textSecondary }]}
                >
                  🎉 Winner 🎉
                </Text>
                <Text style={[styles.winnerName, { color: theme.accent }]}>
                  {winner}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.resetButton,
                    { backgroundColor: theme.success },
                  ]}
                  onPress={handleReset}
                >
                  <Ionicons name="refresh" size={20} color="white" />
                  <Text style={styles.resetButtonText}>Spin Again</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Info Footer */}
          {members.length > 0 && (
            <View
              style={[
                styles.card,
                {
                  backgroundColor: theme.surfaceLight,
                  borderColor: theme.border,
                },
              ]}
            >
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                <Text style={{ fontWeight: "600", color: theme.text }}>
                  {members.length}
                </Text>{" "}
                member{members.length !== 1 ? "s" : ""} •{" "}
                {members.length < 2
                  ? "Add more members to start spinning!"
                  : "Ready to spin!"}
              </Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  header: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
    borderWidth: 1,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  membersList: {
    marginTop: 12,
    gap: 8,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
  },
  memberContent: {
    flex: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  memberIndex: {
    fontSize: 12,
    fontWeight: "500",
  },
  removeButton: {
    padding: 4,
  },
  emptyText: {
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
  },
  wheelContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 24,
    position: "relative",
  },
  pointer: {
    position: "absolute",
    top: 0,
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderTopWidth: 20,
    zIndex: 10,
  },
  spinButton: {
    flexDirection: "row",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  spinButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1,
  },
  winnerSection: {
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 16,
    borderWidth: 2,
  },
  winnerLabel: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 1,
  },
  winnerName: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 12,
  },
  resetButton: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    gap: 8,
  },
  resetButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
  },
  infoText: {
    fontSize: 13,
    textAlign: "center",
    fontWeight: "500",
  },
});
