import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useUser } from "@/hooks/useUser";

export default function Streaks() {
  const router = useRouter();
  const [morningStreak, setMorningStreak] = useState(0);
  const [eveningStreak, setEveningStreak] = useState(0);
  const { user } = useUser();
  console.log(user);
  const handleLogEntry = (routine: "morning" | "evening") => {
    if (routine === "morning") {
      setMorningStreak(morningStreak + 1);
    } else {
      setEveningStreak(eveningStreak + 1);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
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
        <ThemedText type="subtitle">Streaks</ThemedText>
        <View style={styles.streakContainer}>
          <ThemedText type="default">
            Morning Routine Streak: {morningStreak}
          </ThemedText>
          <View style={styles.streakBar}>
            <View
              style={[styles.streakFill, { width: `${morningStreak * 10}%` }]}
            />
          </View>
        </View>
        <View style={styles.streakContainer}>
          <ThemedText type="default">
            Evening Routine Streak: {eveningStreak}
          </ThemedText>
          <View style={styles.streakBar}>
            <View
              style={[styles.streakFill, { width: `${eveningStreak * 10}%` }]}
            />
          </View>
        </View>
        <Button
          title="Log Morning Entry"
          onPress={() => handleLogEntry("morning")}
        />
        <Button
          title="Log Evening Entry"
          onPress={() => handleLogEntry("evening")}
        />
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
  streakContainer: {
    marginBottom: 16,
  },
  streakBar: {
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 4,
  },
  streakFill: {
    height: "100%",
    backgroundColor: "#76c7c0",
  },
  view: {
    padding: 20
  },
  pageTitle: {
    fontSize: 25
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    marginTop: 40
  },
  streakContainer: {
    marginBottom: 16,
  },
  streakBar: {
    height: 20,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 4,
  },
  streakFill: {
    height: "100%",
    backgroundColor: "#76c7c0",
  },
  bearLogo: {
    height: 30,
    width: 31,
    marginBottom: -4,
    marginRight: 10
  }
});
