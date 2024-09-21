import React, { useState } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';

import { Button } from '@/components/Button';

import { Colors } from '@/constants/Colors';
import { Sizes } from '@/constants/Sizes';

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
      <Text style={styles.pageTitle}>
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.bearLogo}
        />
        Good Evening!
      </Text>

      <Text style={styles.cardTitle}>Your routine</Text>

      <View style={styles.card}>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            <Text style={styles.listItemIcon}>✔</Text>
            Do the dishes
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            <Text style={styles.listItemIcon}>-</Text>
            Put out the bins
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.listItemText}>
            <Text style={styles.listItemIcon}>-</Text>
            Clean your room
          </Text>
        </View>
        <Button
          title={'edit'}
          style={styles.editButton}
          inverted={true}
        ></Button>
      </View>

      <Button title="Start Focusing" inverted={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    padding: Sizes.viewPadding,
    gap: Sizes.viewGap,
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
  editButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  listItem: {
    marginTop: 5,
    marginBottom: 5,
  },
  listItemText: {
    fontWeight: 'bold',
  },
  listItemIcon: {
    fontFamily: 'monospace',
    paddingRight: 10,
  },
  pageTitle: {
    paddingBottom: 20,
    paddingTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
  },
  bearLogo: {
    height: 30,
    width: 31,
    marginBottom: -5,
    marginRight: 16,
  },
});
