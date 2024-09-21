import { Button } from '@/components/Button';
import { Sizes } from '@/constants/Sizes';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useUser } from '@/hooks/useUser';
import { useRouter } from 'expo-router';

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

      <Text style={styles.cardTitle}>Hi {'username'}!</Text>

      <Button
        style={styles.friendButton}
        title={'Add friend'}
        inverted={false}
        onPress={() => {
          router.push('/home/add_friend');
        }}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: Sizes.viewPadding,
    gap: Sizes.viewPadding,
    height: '100%',
  },
  card: {
    padding: Sizes.viewPadding,
    backgroundColor: 'white',
    borderColor: '#dddddd',
    borderWidth: 2,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  friendButton: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
  },
  pageTitle: {
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
