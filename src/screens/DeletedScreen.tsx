import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  id: string;
  sender: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
}

const DeletedScreen = ({ navigation }: any) => {
  const [deletedMessages, setDeletedMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeletedMessages = async () => {
      try {
        const storedDeletedMessages = await AsyncStorage.getItem('deletedMessages');
        if (storedDeletedMessages) {
          setDeletedMessages(JSON.parse(storedDeletedMessages));
        }
      } catch (error) {
        console.error('Error loading deleted messages:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDeletedMessages();
  }, []);

  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity
      style={[styles.messageItem, item.read ? styles.readMessage : styles.unreadMessage]}
      onPress={() => navigation.navigate('MessageDetails', { message: item })}
    >
      <View style={styles.messageHeader}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.subject}>{item.subject}</Text>
      <Text style={styles.body} numberOfLines={1}>{item.body}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.loadingText}>Loading deleted messages...</Text>
      ) : (
        <FlatList
          data={deletedMessages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingTop: 20,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#555',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  messageItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  readMessage: {
    // No specific style for read messages, or a subtle change
  },
  unreadMessage: {
    borderLeftWidth: 5,
    borderLeftColor: '#6c757d',
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  subject: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#555',
  },
  body: {
    fontSize: 13,
    color: '#666',
  },
});

export default DeletedScreen;