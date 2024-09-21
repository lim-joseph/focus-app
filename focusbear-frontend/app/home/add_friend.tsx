import { useUser } from '@/hooks/useUser';
import React, { useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

interface Friend {
  id: number;
  email: string;
}

const initialFriends: Friend[] = [
  { id: 1, email: 'alice@example.com' },
  { id: 2, email: 'bob@example.com' },
  { id: 3, email: 'charlie@example.com' },
];

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [email, setEmail] = useState<string>('');
  const { user } = useUser();

  const addFriend = async () => {
    if (email) {
      const newFriend: Friend = {
        id: friends.length + 1,
        email: email,
      };
      setFriends([...friends, newFriend]);
      setEmail('');
    }

    // URL for the POST request
    const url = 'http://118.139.10.45:3000/user/add-friend';

    // Data to be sent in the request body
    const requestBody = {
      userEmail: user.email,
      friendEmail: email,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json', // Ensures the body is sent as JSON
        },
        body: JSON.stringify(requestBody), // Convert JS object to JSON string
      });

      if (!response.ok) {
        throw new Error(
          `Network response was not ok, status: ${response.status}`,
        );
      }

      const data = await response.json(); // Assuming response is JSON
      console.log(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const sortedFriends = [...friends].sort((a, b) =>
    a.email.localeCompare(b.email),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friends Leaderboard</Text>
      <FlatList
        data={sortedFriends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.friendItem}>{item.email}</Text>
        )}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Enter friend's email"
        keyboardType="email-address"
      />
      <Button title="Add Friend" onPress={addFriend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
  friendItem: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default Friends;
