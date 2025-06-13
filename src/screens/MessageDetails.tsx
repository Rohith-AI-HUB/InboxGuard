import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MessageDetails = ({ route, navigation }: any) => {
  const { message, handleArchive, handleDelete, handleSpam } = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: message.subject,
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log('More options pressed')}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, message.subject]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.sender}>From: {message.sender}</Text>
        <Text style={styles.date}>{message.date}</Text>
      </View>
      <Text style={styles.subject}>{message.subject}</Text>
      <View style={styles.separator} />
      <Text style={styles.body}>{message.body}</Text>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => {
          handleDelete(message);
          navigation.goBack();
        }}>
          <Ionicons name="trash" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => {
          handleArchive(message);
          navigation.goBack();
        }}>
          <Ionicons name="archive" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Archive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => {
          handleSpam(message);
          navigation.goBack();
        }}>
          <Ionicons name="warning" size={24} color="#fff" />
          <Text style={styles.actionButtonText}>Spam</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sender: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  subject: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 15,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default MessageDetails;