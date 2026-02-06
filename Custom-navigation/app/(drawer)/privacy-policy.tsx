import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';

export default function PrivacyPolicyScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Privacy Policy',
          headerStyle: { backgroundColor: '#4A90E2' },
          headerTintColor: 'white',
        }}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.text}>
          This is where your privacy policy content would go...
        </Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});