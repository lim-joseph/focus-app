import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Button } from '@/components/Button';

import { useRouter } from 'expo-router';
import { useUser } from '@/hooks/useUser';

export default function Streaks() {
  const router = useRouter();
  const [morningStreak, setMorningStreak] = useState(0);
  const [eveningStreak, setEveningStreak] = useState(0);
  const { user } = useUser();
  console.log(user);
  const handleLogEntry = (routine: 'morning' | 'evening') => {
    if (routine === 'morning') {
      setMorningStreak(morningStreak + 1);
    } else {
      setEveningStreak(eveningStreak + 1);
    }
  };

  return (
    <View style={styles.view}>
      <Text style={styles.pageTitle}>User profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
  pageTitle: {
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
