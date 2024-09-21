import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { Clock, Moon, Sun } from 'lucide-react-native';

// Define the interface for the fetched data
interface DailyStats {
  date: string;
  eveningRoutineCompletionPercentage: number;
  id: number;
  minutesInFocusSessions: number;
  morningRoutineCompletionPercentage: number;
}

export default function Streaks() {
  const router = useRouter();
  const { user } = useAuth();
  const [dailyStats, setDailyStats] = useState<DailyStats | null>(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [sortCriterion, setSortCriterion] = useState<
    'focusStreak' | 'morningStreak' | 'eveningStreak'
  >('focusStreak'); // Default sorting criterion

  useEffect(() => {
    fetchDailyData();
    fetchLeaderboardData();
  }, []);

  useEffect(() => {
    sortLeaderboard();
  }, [sortCriterion]); // Re-sort when the criterion changes

  const fetchDailyData = async () => {
    const formattedDate = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '%2F');

    const url = `http://118.139.10.45:3000/daily-stats/${formattedDate}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: '*/*',
          user_id: user.id,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`,
        );
      }

      const data: DailyStats = await response.json();
      setDailyStats(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const fetchLeaderboardData = async () => {
    console.log(user.email);
    const url = `http://118.139.10.45:3000/user/${user.email}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          accept: 'application/json', // Accepting JSON response
        },
      });

      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`,
        );
      }

      const data = await response.json(); // Parse JSON response
      const friends = data.friends.map((friend: any) => ({
        id: friend.id,
        name: friend.name,
        morningStreak: friend.morningRoutineStreak,
        eveningStreak: friend.eveningRountineStreak,
        focusStreak: friend.focusSessionStreak,
      }));
      const allData = friends.concat({
        id: data.id,
        name: data.name,
        morningStreak: data.morningRoutineStreak,
        eveningStreak: data.eveningRountineStreak,
        focusStreak: data.focusSessionStreak,
      });

      setLeaderboard(allData);
      sortLeaderboard(allData); // Sort data when it's first fetched
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const sortLeaderboard = (data = leaderboard) => {
    // Sort based on the current sort criterion
    const sortedData = [...data].sort(
      (a: any, b: any) => b[sortCriterion] - a[sortCriterion],
    );
    setLeaderboard(sortedData);
  };

  return (
    <View style={styles.container}>
      <View style={styles.streaksCard}>
        <View style={styles.streaksHeader}>
          <Text style={styles.streaksHeaderText}>Streaks</Text>
          <View style={styles.streaksIconRow}>
            <TouchableOpacity
              style={styles.streaksIconContainer}
              onPress={() => setSortCriterion('morningStreak')} // Set sorting criterion to morningStreak
            >
              <Sun size={24} color={Colors.light.tint} />
              <Text>1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.streaksIconContainer}
              onPress={() => setSortCriterion('eveningStreak')} // Set sorting criterion to eveningStreak
            >
              <Moon size={24} color={Colors.light.tint} />
              <Text>2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.streaksIconContainer}
              onPress={() => setSortCriterion('focusStreak')} // Set sorting criterion to focusStreak
            >
              <Clock size={24} color={Colors.light.tint} />
              <Text>3</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.todayCard}>
        <View style={styles.todayHeader}>
          <Text style={styles.todayHeaderText}>Today</Text>
          <Text style={styles.todayFocusTime}>
            Focus time:{' '}
            {dailyStats
              ? `${dailyStats.minutesInFocusSessions} min`
              : 'Loading...'}
          </Text>
        </View>
        <View style={styles.todayStreakContainer}>
          <View style={styles.todayStreakRow}>
            <Sun size={24} color={Colors.light.tint} />
            <View style={styles.todayStreakBar}>
              <View
                style={[
                  styles.todayStreakFill,
                  {
                    width: `${dailyStats ? dailyStats.morningRoutineCompletionPercentage : 0}%`,
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.todayStreakRow}>
            <Moon size={24} color={Colors.light.tint} />
            <View style={styles.todayStreakBar}>
              <View
                style={[
                  styles.todayStreakFill,
                  {
                    width: `${dailyStats ? dailyStats.eveningRoutineCompletionPercentage : 0}%`,
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.leaderboardCard}>
        <View style={styles.leaderboardHeader}>
          <Text style={styles.leaderboardTitle}>Leaderboard</Text>
          <View style={styles.leaderboardIconRow}>
            <TouchableOpacity
              style={styles.streaksIconContainer}
              onPress={() => setSortCriterion('morningStreak')} // Set sorting criterion to morningStreak
            >
              <Sun size={20} color={Colors.light.tint} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.streaksIconContainer}
              onPress={() => setSortCriterion('eveningStreak')} // Set sorting criterion to eveningStreak
            >
              <Moon size={20} color={Colors.light.tint} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.streaksIconContainer}
              onPress={() => setSortCriterion('focusStreak')} // Set sorting criterion to focusStreak
            >
              <Clock size={20} color={Colors.light.tint} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={leaderboard}
          keyExtractor={() => crypto.randomUUID()}
          renderItem={({ item }) => (
            <View style={styles.leaderboardItem}>
              <Text style={styles.leaderboardName}>{item.name}</Text>
              <View style={styles.leaderboardStreaks}>
                <Text style={styles.leaderboardStreak}>
                  {item.morningStreak}
                </Text>
                <Text style={styles.leaderboardStreak}>
                  {item.eveningStreak}
                </Text>
                <Text style={styles.leaderboardStreak}>{item.focusStreak}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 32,
    flexDirection: 'column',
    gap: 16,
  },
  streaksCard: {
    padding: 20,
    backgroundColor: 'white',
    borderColor: '#dddddd',
    borderWidth: 2,
    borderRadius: 10,
  },
  streaksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  streaksHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  streaksIconRow: {
    flexDirection: 'row',
    gap: 13,
  },
  streaksIconContainer: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  todayCard: {
    padding: 20,
    backgroundColor: 'white',
    borderColor: '#dddddd',
    borderWidth: 2,
    borderRadius: 10,
  },
  todayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  todayHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  todayFocusTime: {
    marginTop: 8,
  },
  todayStreakContainer: {
    flexDirection: 'column',
    gap: 14,
  },
  todayStreakRow: {
    flexDirection: 'row',
    gap: 8,
  },
  todayStreakBar: {
    flex: 1,
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 8,
  },
  todayStreakFill: {
    height: '100%',
    backgroundColor: '#76c7c0',
  },
  leaderboardCard: {
    padding: 20,
    backgroundColor: 'white',
    borderColor: '#dddddd',
    borderWidth: 2,
    borderRadius: 10,
  },
  leaderboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  leaderboardIconRow: {
    flexDirection: 'row',
    gap: 13,
  },
  leaderboardItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  leaderboardName: {
    fontSize: 18,
  },
  leaderboardStreaks: {
    flexDirection: 'row',
    gap: 24,
  },
  leaderboardStreak: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
