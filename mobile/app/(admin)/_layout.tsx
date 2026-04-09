import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout() {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <Redirect href={'/(auth)/login'} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
