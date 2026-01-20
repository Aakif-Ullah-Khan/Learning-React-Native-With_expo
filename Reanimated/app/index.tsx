import React from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import Animated, { 
  useSharedValue, 
  withTiming, 
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { styled } from 'nativewind';

// ============================================================
// STEP 1: Create Animated Components with NativeWind
// ============================================================
// You need to wrap Animated components with styled() from nativewind

const AnimatedView = styled(Animated.View);
const AnimatedText = styled(Animated.Text);
const AnimatedImage = styled(Animated.Image);

export default function NativeWindReanimated() {
  // Create shared values for animations
  const boxWidth = useSharedValue(100);
  const boxRotate = useSharedValue(0);
  const bgColor = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  // ============================================================
  // EXAMPLE 1: Animate Width with Tailwind Classes
  // ============================================================
  const handleAnimateWidth = () => {
    boxWidth.value = withTiming(boxWidth.value === 100 ? 250 : 100, {
      duration: 600,
    });
  };

  // ============================================================
  // EXAMPLE 2: Animate Rotation with useAnimatedStyle
  // ============================================================
  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${boxRotate.value}deg` }],
    };
  });

  const handleRotate = () => {
    boxRotate.value = withTiming(boxRotate.value + 360, { duration: 800 });
  };

  // ============================================================
  // EXAMPLE 3: Animate Color Change with Interpolation
  // ============================================================
  const colorStyle = useAnimatedStyle(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#95E1D3', '#F38181'];
    const index = Math.floor(bgColor.value) % colors.length;
    return {
      backgroundColor: colors[index],
    };
  });

  const handleChangeColor = () => {
    bgColor.value = withTiming(bgColor.value + 1, { duration: 500 });
  };

  // ============================================================
  // EXAMPLE 4: Scale with Opacity
  // ============================================================
  const scaleOpacityStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handleScaleAndOpacity = () => {
    scale.value = withTiming(scale.value === 1 ? 1.5 : 1, { duration: 500 });
    opacity.value = withTiming(opacity.value === 1 ? 0.5 : 1, { duration: 500 });
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* HEADER */}
      <Text className="text-3xl font-bold text-center text-gray-800 mb-6">
        🎨 NativeWind + Reanimated
      </Text>

      {/* ====== EXAMPLE 1: Width Animation ====== */}
      <View className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <Text className="text-lg font-bold text-gray-700 mb-3">
          1️⃣ Animate Width
        </Text>

        <AnimatedView
          style={[
            { width: boxWidth },
            {
              className: 'h-20 bg-red-500 rounded-lg mb-4',
            },
          ]}
          className="h-20 bg-red-500 rounded-lg mb-4"
        />

        <Button
          title="Toggle Width"
          onPress={handleAnimateWidth}
          color="#EF4444"
        />
        <Text className="text-xs text-gray-600 italic mt-3">
          Box width animates between 100px and 250px
        </Text>
      </View>

      {/* ====== EXAMPLE 2: Rotation Animation ====== */}
      <View className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <Text className="text-lg font-bold text-gray-700 mb-3">
          2️⃣ Rotate Animation
        </Text>

        <AnimatedView
          style={[
            rotateStyle,
            {
              width: 100,
              height: 100,
              backgroundColor: '#4ECDC4',
              borderRadius: 10,
              alignSelf: 'center',
              marginBottom: 16,
            },
          ]}
        />

        <Button
          title="Rotate 360°"
          onPress={handleRotate}
          color="#06B6D4"
        />
        <Text className="text-xs text-gray-600 italic mt-3">
          Box rotates 360 degrees smoothly
        </Text>
      </View>

      {/* ====== EXAMPLE 3: Color Change ====== */}
      <View className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <Text className="text-lg font-bold text-gray-700 mb-3">
          3️⃣ Change Color
        </Text>

        <AnimatedView
          style={[
            colorStyle,
            {
              width: '100%',
              height: 100,
              borderRadius: 10,
              marginBottom: 16,
            },
          ]}
        />

        <Button
          title="Next Color"
          onPress={handleChangeColor}
          color="#8B5CF6"
        />
        <Text className="text-xs text-gray-600 italic mt-3">
          Cycles through multiple colors
        </Text>
      </View>

      {/* ====== EXAMPLE 4: Scale & Opacity ====== */}
      <View className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
        <Text className="text-lg font-bold text-gray-700 mb-3">
          4️⃣ Scale + Opacity
        </Text>

        <AnimatedView
          style={[
            scaleOpacityStyle,
            {
              width: 80,
              height: 80,
              backgroundColor: '#F38181',
              borderRadius: 10,
              alignSelf: 'center',
              marginBottom: 16,
            },
          ]}
        />

        <Button
          title="Scale & Fade"
          onPress={handleScaleAndOpacity}
          color="#F87171"
        />
        <Text className="text-xs text-gray-600 italic mt-3">
          Box scales up and fades simultaneously
        </Text>
      </View>

      {/* ====== HOW TO USE TAILWIND WITH REANIMATED ====== */}
      <View className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
        <Text className="text-lg font-bold text-blue-700 mb-3">
          💡 How It Works
        </Text>

        <Text className="text-sm text-blue-600 mb-2 font-semibold">
          1. Import and wrap:
        </Text>
        <Text className="text-xs bg-blue-100 p-2 rounded font-mono text-blue-900 mb-3">
          const AnimatedView = styled(Animated.View);
        </Text>

        <Text className="text-sm text-blue-600 mb-2 font-semibold">
          2. Use Tailwind classes:
        </Text>
        <Text className="text-xs bg-blue-100 p-2 rounded font-mono text-blue-900 mb-3">
          &lt;AnimatedView className="bg-red-500 rounded-lg" /&gt;
        </Text>

        <Text className="text-sm text-blue-600 mb-2 font-semibold">
          3. Add animations with style prop:
        </Text>
        <Text className="text-xs bg-blue-100 p-2 rounded font-mono text-blue-900">
          style={{'{'} width: boxWidth {'}'}}
        </Text>
      </View>

      {/* ====== KEY POINTS ====== */}
      <View className="bg-green-50 rounded-lg p-4 border border-green-200">
        <Text className="text-lg font-bold text-green-700 mb-3">
          ✅ Key Points
        </Text>

        <Text className="text-sm text-green-700 mb-2">
          • Use styled() to wrap Animated components
        </Text>
        <Text className="text-sm text-green-700 mb-2">
          • Tailwind classes work for static styles
        </Text>
        <Text className="text-sm text-green-700 mb-2">
          • Use style prop for dynamic animations
        </Text>
        <Text className="text-sm text-green-700 mb-2">
          • Combine both for best results
        </Text>
        <Text className="text-sm text-green-700">
          • Static styles = className, Dynamic = style prop
        </Text>
      </View>

      <View className="h-8" />
    </ScrollView>
  );
}