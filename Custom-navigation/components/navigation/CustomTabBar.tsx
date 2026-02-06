import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Get icon name based on route
        let iconName: any = 'home';
        if (route.name === 'home') iconName = isFocused ? 'home' : 'home-outline';
        if (route.name === 'chat') iconName = isFocused ? 'chatbubbles' : 'chatbubbles-outline';
        if (route.name === 'profile') iconName = isFocused ? 'person' : 'person-outline';

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            onPress={onPress}
            style={styles.tab}
          >
            <Animated.View style={[
              styles.iconContainer,
              isFocused && styles.iconContainerActive
            ]}>
              <Ionicons
                name={iconName}
                size={24}
                color={isFocused ? '#4A90E2' : '#666'}
              />
            </Animated.View>
            <Text style={[
              styles.label,
              { color: isFocused ? '#4A90E2' : '#666' }
            ]}>
              {String(label)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  iconContainerActive: {
    backgroundColor: '#E3F2FD',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
});