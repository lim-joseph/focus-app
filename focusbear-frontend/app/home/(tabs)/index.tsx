import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Button } from "@/components/Button"

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
    <View>
      <ThemedText type="title" style={styles.pageTitle}>
        <Image source={require("@/assets/images/icon.png")} style={styles.bearLogo} />
        FocusBear
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Streaks</ThemedText>
        <View style={styles.streakContainer}>
          <ThemedText type="default">
            Morning completion %
          </ThemedText>
          <ThemedText type="default">
            Morning streak {morningStreak}
          </ThemedText>
          <View style={styles.streakBar}>
            <View
              style={[styles.streakFill, { width: `${morningStreak * 10}%` }]}
            />
          </View>
        </View>
        <View style={styles.streakContainer}>
          <ThemedText type="default">
            Evening completion %
          </ThemedText>
          <ThemedText type="default">
            Evening streak {eveningStreak}
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
    </View>
  );
}

const styles = StyleSheet.create({
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 16,
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
  bearLogo: {
    height: 30,
    width: 31,
    marginBottom: -4,
    marginRight: 10
  }
});
