import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import CustomDrawer from '@/components/navigation/CustomDrawer';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#E3F2FD',
        drawerActiveTintColor: '#4A90E2',
        drawerInactiveTintColor: '#666',
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="privacy-policy"
        options={{
          drawerLabel: 'Privacy Policy',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shield-checkmark-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          drawerLabel: 'About',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}