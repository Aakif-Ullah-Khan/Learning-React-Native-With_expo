import React, { useRef, useState } from "react";
import { Animated, Text, TouchableOpacity, View } from "react-native";
import Svg, { G, Path, Text as SvgText } from "react-native-svg";

export default function Wheel() {
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [winner, setWinner] = useState("");

  const rewards: any[] = [
    "10 Coins",
    "20 Coins",
    "Try Again",
    "50 Coins",
    "100 Coins",
    "Free Spin",
    "200 Coins",
    "Lose",
    "Small Prize",
    "Jackpot",
  ];

  const spin = () => {
    // always clockwise (always positive angle)
    const random = Math.floor(360 * 10 + Math.random() * 360);

    Animated.timing(rotateValue, {
      toValue: random,
      duration: 4000,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      useNativeDriver: true,
    }).start(() => {
      const deg = random % 360;
      const slice = 360 / rewards.length;
      const selectedIndex = Math.floor(deg / slice);
      setWinner(rewards[rewards.length - 1 - selectedIndex]);
    });
  };

  const spinAnimation = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          width: 300,
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* ARROW POINTER */}
        <View
          style={{
            position: "absolute",
            top: -20,
            width: 0,
            height: 0,
            borderLeftWidth: 12,
            borderRightWidth: 12,
            borderBottomWidth: 20,
            borderLeftColor: "transparent",
            borderRightColor: "transparent",
            borderBottomColor: "red",
            zIndex: 999,
          }}
        />

        {/* WHEEL */}
        <Animated.View
          style={{
            position: "absolute",
            transform: [{ rotate: spinAnimation }],
          }}
        >
          <Svg width={300} height={300} viewBox="0 0 300 300">
            <G x={150} y={150}>
              {rewards.map((r, i) => {
                const arc = 360 / rewards.length;
                const midAngle = i * arc + arc / 2;
                const start = i * arc;
                const end = start + arc;
                const path = describeArc(0, 0, 140, start, end);

                return (
                  <G key={i}>
                    <Path d={path} fill={i % 2 == 0 ? "#FFD700" : "#FF6347"} />

                    {/* TEXT inside slice */}
                    <SvgText
                      x={80 * Math.cos((midAngle * Math.PI) / 180)}
                      y={80 * Math.sin((midAngle * Math.PI) / 180)}
                      fill="#000"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {r}
                    </SvgText>
                  </G>
                );
              })}
            </G>
          </Svg>
        </Animated.View>

        {/* CENTER SPIN BUTTON */}
        <TouchableOpacity
          onPress={spin}
          style={{
            width: 85,
            height: 85,
            backgroundColor: "black",
            borderRadius: 150,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>SPIN</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ marginTop: 25, fontSize: 18 }}>
        Winner: {winner || "---"}
      </Text>
    </View>
  );
}

// arc utilities
function describeArc(
  x: any,
  y: any,
  radius: any,
  startAngle: any,
  endAngle: any
) {
  let start = polarToCartesian(x, y, radius, endAngle);
  let end = polarToCartesian(x, y, radius, startAngle);
  let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  let d = [
    "M",
    0,
    0,
    "L",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "Z",
  ].join(" ");

  return d;
}

function polarToCartesian(
  centerX: any,
  centerY: any,
  radius: any,
  angleInDegrees: any
) {
  let angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}
