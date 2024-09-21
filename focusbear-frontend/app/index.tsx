import { Image as ExpoImage } from 'expo-image';
import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, login } = useAuth();
  if (user) {
    router.push('/home');
  }
  const handleLogin = async () => {
    try {
      await login({ email, password });
      router.push('/home');
    } catch (error) {
      console.error('An error occurred. Please try again.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.titleContainer}>
        <ExpoImage
          style={styles.imageLarge}
          source={require('@/assets/images/focusbear-devices.webp')}
          contentFit="contain"
        />

        <ExpoImage
          style={styles.imageSmall}
          source={require('@/assets/images/focusbear-logo.svg')}
          contentFit="contain"
        />
      </View>
      <View style={styles.stepContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="black"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="black"
        />
        <Button title="Sign In" onPress={handleLogin} />
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => {
            router.push('/signup');
          }}
        >
          <Text>
            Don't have an account? <Text style={styles.boldText}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'column',
    gap: 8,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginHorizontal: 48,
  },

  imageLarge: {
    width: 300,
    height: 150,
    marginHorizontal: 16,
    marginTop: 150,
  },

  imageSmall: {
    width: 225,
    height: 100,
    marginHorizontal: 16,
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderRadius: 4,
    color: 'black',
  },

  signupButton: {
    marginTop: 12,
    alignItems: 'center',
  },

  boldText: {
    fontWeight: 'bold',
  },
});
