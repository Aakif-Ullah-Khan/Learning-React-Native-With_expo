import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { Alert, Animated, Button, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const slideAnim = new Animated.Value(-100);

  // Show Alert
  const showAlert = () => {
    Alert.alert(
      'Hello!',
      'This is an Alert message',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel pressed') },
        { text: 'OK', onPress: () => console.log('OK pressed') }
      ]
    );
  };

  // Show Custom iPhone Glass Morphism Toast
  const showToast = (message: any) => {
    setToastMessage(message);
    setToastVisible(true);

    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.delay(2500),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setToastVisible(false);
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Show Alert" onPress={showAlert} />
      <Button title="Show iPhone Toast" onPress={() => showToast('Perfect! Message sent')} color="green" />

      {toastVisible && (
        <Animated.View style={[styles.toastContainer, { transform: [{ translateY: slideAnim }] }]}>
          <BlurView intensity={95} style={styles.blurContainer}>
            <View style={styles.toastContent}>
              <Text style={styles.toastText}>{toastMessage}</Text>
            </View>
          </BlurView>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#000',
  },
  toastContainer: {
    position: 'absolute',
    top: 60,
    left: 16,
    right: 16,
    zIndex: 1000,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  blurContainer: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backdropFilter: 'blur(20px)',
  },
  toastContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});