import React, {useState} from "react";
import {
  Button,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useRouter} from "expo-router";
import {useAuth} from "@/hooks/useAuth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, login} = useAuth();
  console.log(user);
  if (user) {
    console.log("User is logged in", user);
    router.push("/home");
  }

  const handleLogin = async () => {
    try {
      await login({email: email, password: password});
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{light: "#A1CEDC", dark: "#A1CEDC"}}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">🐻 FocusBear</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Login</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" onPress={handleLogin} />
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => {
            /* Handle sign up navigation */
          }}
        ></TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 16,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    marginBottom: 12,
    borderRadius: 4,
  },
  signupButton: {
    marginTop: 12,
  },
  signupText: {
    color: "#007BFF",
    textAlign: "center",
  },
});
