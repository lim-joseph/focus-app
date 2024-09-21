import { useAuth } from '@/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const Friends: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [email, setEmail] = useState<string>('');
  const { user } = useAuth();

  useEffect(() => {
    getFriends();
  }, []);

  const addFriend = async () => {
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
      getFriends();
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const getFriends = async () => {
    // Construct the URL
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
      setFriends(data.friends);
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
        keyExtractor={(item) => item.name.toString()}
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
