import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image?: any;
}

interface OnboardingScreenProps {
  slides: OnboardingSlide[];
  onComplete: () => void;
  skipButtonText?: string;
  nextButtonText?: string;
  doneButtonText?: string;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  slides,
  onComplete,
  skipButtonText = 'skip',
  nextButtonText = 'Next  >',
  doneButtonText = 'Get Started',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  const updateIndex = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  const goToNextSlide = () => {
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1;
      translateX.value = withSpring(-newIndex * SCREEN_WIDTH);
      setCurrentIndex(newIndex);
    } else {
      onComplete();
    }
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      const offset = -currentIndex * SCREEN_WIDTH;
      translateX.value = offset + event.translationX;
    })
    .onEnd((event) => {
      const shouldMoveToNext = event.translationX < -SCREEN_WIDTH / 3;
      const shouldMoveToPrev = event.translationX > SCREEN_WIDTH / 3;

      if (shouldMoveToNext && currentIndex < slides.length - 1) {
        const newIndex = currentIndex + 1;
        translateX.value = withSpring(-newIndex * SCREEN_WIDTH);
        runOnJS(updateIndex)(newIndex);
      } else if (shouldMoveToPrev && currentIndex > 0) {
        const newIndex = currentIndex - 1;
        translateX.value = withSpring(-newIndex * SCREEN_WIDTH);
        runOnJS(updateIndex)(newIndex);
      } else {
        translateX.value = withSpring(-currentIndex * SCREEN_WIDTH);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const isLastSlide = currentIndex === slides.length - 1;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.slidesContainer, animatedStyle]}>
            {slides.map((slide) => (
              <View key={slide.id} style={styles.slide}>
                <View style={styles.imageContainer}>
                  {slide.image && (
                    <Image source={slide.image} style={styles.image} resizeMode="contain" />
                  )}
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.title}>{slide.title}</Text>
                  <Text style={styles.description}>{slide.description}</Text>
                </View>

                <View style={styles.pagination}>
                  {slides.map((_, index) => (
                    <View
                      key={index}
                      style={[
                        styles.dot,
                        currentIndex === index && styles.activeDot,
                      ]}
                    />
                  ))}
                </View>
              </View>
            ))}
          </Animated.View>
        </GestureDetector>

        <View style={styles.footer}>
          {!isLastSlide ? (
            <View style={styles.navigationRow}>
              <TouchableOpacity onPress={onComplete} style={styles.skipButton}>
                <Text style={styles.skipText}>{skipButtonText}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.nextButton} onPress={goToNextSlide}>
                <Text style={styles.nextButtonText}>{nextButtonText}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.getStartedButton} onPress={onComplete}>
              <Text style={styles.getStartedText}>{doneButtonText}</Text>
            </TouchableOpacity>
          )}

          <View style={styles.bottomIndicator} />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slidesContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  slide: {
    width: SCREEN_WIDTH,
    flex: 1,
    paddingHorizontal: 30,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  image: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.45,
  },
  textContainer: {
    paddingHorizontal: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: 0.3,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D1D6',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4C4C4C',
    width: 8,
    height: 8,
  },
  footer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 5,
  },
  skipText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '400',
  },
  nextButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  getStartedButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomIndicator: {
    width: 134,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 100,
    alignSelf: 'center',
  },
});