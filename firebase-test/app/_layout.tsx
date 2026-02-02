import { Stack } from 'expo-router';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function RootLayout() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Stack screenOptions={{ headerShown: false }} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <>
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
        </>
      )}
    </Stack>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  );
}