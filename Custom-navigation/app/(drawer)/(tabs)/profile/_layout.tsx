import { Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileStack() {
  const navigation = useNavigation();

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4A90E2',
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            style={{ marginLeft: 15 }}
          >
            <Ionicons name="menu" size={28} color="white" />
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Profile',
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: 'Edit Profile',
        }}
      />
      <Stack.Screen
        name="preferences"
        options={{
          title: 'Preferences',
        }}
      />
    </Stack>
  );
}