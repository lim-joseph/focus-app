import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/hooks/useAuth';
import { Image as ExpoImage } from 'expo-image';

export default function Signup() {
  const router = useRouter();
  const { user, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(''); // State to hold error messages

  // if (user) {
  //   router.push("/home");
  // }

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Function to handle signup
  const handleSignup = async () => {
    // Check if all fields are filled
    if (!email || !password || !confirmPassword || !name) {
      setError('All fields must be filled.');
      return;
    }

    // Validate email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Clear error if validation passes
    setError('');

    // Perform the signup request
    try {
      await signUp({ email: email, password: password, name: name });
      router.push('/home');
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <>
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

      {/* Error Message Display */}

      <View style={styles.stepContainer}>
        <View style={styles.errorContainer}>
          {error ? (
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          ) : null}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Name"
          keyboardType="default"
          value={name}
          onChangeText={setName}
          placeholderTextColor="black"
        />
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
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="black"
        />

        <Button title="Sign Up" onPress={handleSignup} />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            /* Handle login navigation */
          }}
        >
          <Text>
            Already have an account?{' '}
            <Text style={styles.loginTextBold} onPress={() => router.push('/')}>
              Sign in
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </>
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
    marginTop: 50,
  },
  imageSmall: {
    width: 225,
    height: 100,
    marginHorizontal: 16,
  },
  errorContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  loginButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  loginTextBold: {
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});
