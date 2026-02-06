import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/120' }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>john.doe@example.com</Text>

      <View style={styles.buttonContainer}>
        <Link href="/profile/edit" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/profile/preferences" asChild>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
            <Text style={styles.buttonText}>Preferences</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 40,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: '#50C878',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});