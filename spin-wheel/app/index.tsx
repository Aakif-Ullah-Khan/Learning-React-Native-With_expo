import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, G, Path, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.8;
const RADIUS = WHEEL_SIZE / 2;

export default function SpinWheel() {
  const [segments, setSegments] = useState([
    { label: 'Prize 1', color: '#FF6B6B' },
    { label: 'Prize 2', color: '#4ECDC4' },
    { label: 'Prize 3', color: '#FFE66D' },
    { label: 'Prize 4', color: '#95E1D3' },
    { label: 'Prize 5', color: '#F38181' },
    { label: 'Prize 6', color: '#AA96DA' },
    { label: 'Prize 7', color: '#FCBAD3' },
    { label: 'Prize 8', color: '#A8E6CF' },
  ]);
  
  const [winner, setWinner] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const anglePerSegment = 360 / segments.length;

  const createWheelPath = (index:any) => {
    const startAngle = (index * anglePerSegment - 90) * (Math.PI / 180);
    const endAngle = ((index + 1) * anglePerSegment - 90) * (Math.PI / 180);
    
    const x1 = RADIUS + RADIUS * Math.cos(startAngle);
    const y1 = RADIUS + RADIUS * Math.sin(startAngle);
    const x2 = RADIUS + RADIUS * Math.cos(endAngle);
    const y2 = RADIUS + RADIUS * Math.sin(endAngle);
    
    return `M ${RADIUS} ${RADIUS} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 0 1 ${x2} ${y2} Z`;
  };

  const getTextPosition = (index :any) => {
    const angle = (index * anglePerSegment + anglePerSegment / 2 - 90) * (Math.PI / 180);
    const textRadius = RADIUS * 0.65;
    return {
      x: RADIUS + textRadius * Math.cos(angle),
      y: RADIUS + textRadius * Math.sin(angle),
      rotation: index * anglePerSegment + anglePerSegment / 2 + 90,
    };
  };

  const renderVerticalText = (text:any, textPos:any, index:any) => {
    const letters = text.split('');
    const letterSpacing = 16;
    const startY = textPos.y - ((letters.length - 1) * letterSpacing) / 2;

    return letters.map((letter:any, i:any) => (
      <SvgText
        key={`${index}-${i}`}
        x={textPos.x}
        y={startY + i * letterSpacing}
        fill="#000"
        fontSize="14"
        fontWeight="bold"
        textAnchor="middle"
        rotation={textPos.rotation}
        origin={`${textPos.x}, ${startY + i * letterSpacing}`}
      >
        {letter}
      </SvgText>
    ));
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setWinner('');
    
    const randomIndex = Math.floor(Math.random() * segments.length);
    const baseRotation = 360 * 8; // More rotations for longer spin
    const segmentAngle = 360 / segments.length;
    const targetAngle = 360 - (randomIndex * segmentAngle + segmentAngle / 2);
    const finalRotation = baseRotation + targetAngle;
    
    // Random duration between 5-10 seconds
    const duration = Math.random() * 5000 + 5000;
    
    rotateAnim.setValue(0);
    
    // Create a more dynamic easing with bounce effect
    Animated.sequence([
      // Fast start
      Animated.timing(rotateAnim, {
        toValue: finalRotation * 0.7,
        duration: duration * 0.5,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      // Slow down smoothly
      Animated.timing(rotateAnim, {
        toValue: finalRotation,
        duration: duration * 0.5,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setWinner(segments[randomIndex].label);
      setIsSpinning(false);
      
      // Remove winner after 2 seconds
      setTimeout(() => {
        setSegments(prevSegments => prevSegments.filter((_, idx) => idx !== randomIndex));
        setWinner('');
        rotateAnim.setValue(0);
      }, 2000);
    });
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spin the Wheel!</Text>
      
      <View style={styles.wheelContainer}>
        <View style={styles.pointer} />
        
        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
          <Svg width={WHEEL_SIZE} height={WHEEL_SIZE}>
            {segments.map((segment, index) => {
              const textPos = getTextPosition(index);
              return (
                <G key={index}>
                  <Path
                    d={createWheelPath(index)}
                    fill={segment.color}
                    stroke="#fff"
                    strokeWidth={2}
                  />
                  {renderVerticalText(segment.label, textPos, index)}
                </G>
              );
            })}
            <Circle cx={RADIUS} cy={RADIUS} r="30" fill="#fff" stroke="#333" strokeWidth={3} />
          </Svg>
        </Animated.View>
      </View>

      <TouchableOpacity
        style={[styles.button, isSpinning && styles.buttonDisabled]}
        onPress={spinWheel}
        disabled={isSpinning || segments.length === 0}
      >
        <Text style={styles.buttonText}>
          {segments.length === 0 ? 'NO PRIZES LEFT' : isSpinning ? 'SPINNING...' : 'SPIN'}
        </Text>
      </TouchableOpacity>

      {segments.length === 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>🎊 All prizes claimed! 🎊</Text>
        </View>
      )}

      {winner ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>🎉 Winner: {winner} 🎉</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  wheelContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  pointer: {
    position: 'absolute',
    top: -15,
    width: 0,
    height: 0,
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ff0000',
    zIndex: 10,
  },
  button: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
});