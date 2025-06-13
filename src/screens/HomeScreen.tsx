import { View, Text, StyleSheet, FlatList, TouchableOpacity, PermissionsAndroid, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore
import SmsAndroid from 'react-native-get-sms-android';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  id: string;
  sender: string;
  subject: string;
  body: string;
  date: string;
  read: boolean;
}

// Simple spam detection function (can be improved later)
const isSpam = (message: Message): boolean => {
  // Basic check: if the body contains common spam keywords (case-insensitive)
  const spamKeywords = ['win', 'prize', 'free', 'cash', 'credit', 'loan', 'urgent', 'claim', 'congratulations'];
  const lowerCaseBody = message.body.toLowerCase();
  for (const keyword of spamKeywords) {
    if (lowerCaseBody.includes(keyword)) {
      return true;
    }
  }
  // Basic check: if the sender is a short code or looks suspicious
  // This is a very naive check and might need refinement
  if (message.sender.length < 6 || !message.sender.match(/^[a-zA-Z0-9]+$/)) {
     // return true; // Uncomment this line for a stricter sender check
  }
  return false;
};

const HomeScreen = ({ navigation }: any) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const saveMessagesToStorage = async (key: string, msgs: Message[]) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(msgs));
      console.log(`Messages saved to ${key}`);
    } catch (error) {
      console.error(`Error saving messages to ${key}:`, error);
    }
  };

  const handleArchive = async (messageToArchive: Message) => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageToArchive.id));
    const archivedMessages = JSON.parse((await AsyncStorage.getItem('archivedMessages')) || '[]');
    await saveMessagesToStorage('archivedMessages', [...archivedMessages, messageToArchive]);
  };

  const handleDelete = async (messageToDelete: Message) => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageToDelete.id));
    const deletedMessages = JSON.parse((await AsyncStorage.getItem('deletedMessages')) || '[]');
    await saveMessagesToStorage('deletedMessages', [...deletedMessages, messageToDelete]);
  };

  const handleSpam = async (messageToSpam: Message) => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageToSpam.id));
    const spamMessages = JSON.parse((await AsyncStorage.getItem('spamMessages')) || '[]');
    await saveMessagesToStorage('spamMessages', [...spamMessages, messageToSpam]);
  };

  useEffect(() => {
    const requestReadSmsPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_SMS,
          {
            title: 'InboxGuard SMS Permission',
            message: 'InboxGuard needs access to your SMS messages to display them.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('SMS permission granted');
          fetchMessages();
        } else {
          console.log('SMS permission denied');
          setLoading(false);
          Alert.alert('Permission Denied', 'Cannot read SMS messages without permission.');
        }
      } catch (err) {
        console.warn(err);
        setLoading(false);
      }
    };

    const fetchMessages = () => {
      setLoading(true);
      SmsAndroid.list(
        JSON.stringify({ box: 'inbox' }),
        (fail: any) => {
          console.log('Failed to list messages: ' + fail);
          setLoading(false);
        },
        (count: number, smsList: string) => {
          console.log('Count: ', count);
          const parsedSmsList = JSON.parse(smsList);
          const formattedMessages: Message[] = parsedSmsList.map((sms: any) => ({
            id: sms._id.toString(),
            sender: sms.address,
            subject: sms.subject || 'No Subject',
            body: sms.body,
            date: new Date(sms.date).toLocaleDateString(),
            read: sms.read === 1,
          }));

          // Separate messages into inbox and spam
          const inboxMessages = formattedMessages.filter(msg => !isSpam(msg));
          const spamMessages = formattedMessages.filter(msg => isSpam(msg));

          setMessages(inboxMessages);
          saveMessagesToStorage('spamMessages', spamMessages);

          setLoading(false);
        },
      );
    };

    if (Platform.OS === 'android') {
      requestReadSmsPermission();
    } else {
      // For iOS or other platforms, handle accordingly or show dummy data
      // If you want to keep dummy data for iOS, uncomment the line below
      // setMessages(dummyMessages);
      setLoading(false);
    }
  }, []);

  const renderItem = ({ item }: { item: Message }) => (
    <TouchableOpacity
      style={[styles.messageItem, item.read ? styles.readMessage : styles.unreadMessage]}
      onPress={() => navigation.navigate('MessageDetails', {
        message: item,
        handleArchive: handleArchive,
        handleDelete: handleDelete,
        handleSpam: handleSpam,
      })}
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
        <Text style={styles.loadingText}>Loading messages...</Text>
      ) : (
        <FlatList
          data={messages}
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
    borderLeftColor: '#007bff',
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

export default HomeScreen;