import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CHATS = [
  { id: '1', name: 'Alice Johnson', lastMessage: 'Hey, how are you?', time: '2:30 PM' },
  { id: '2', name: 'Bob Smith', lastMessage: 'See you tomorrow!', time: '1:15 PM' },
  { id: '3', name: 'Carol White', lastMessage: 'Thanks for the help', time: '11:45 AM' },
];

export default function ChatListScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Link href={`/chat/${item.id}`} asChild>
            <TouchableOpacity style={styles.chatItem}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name[0]}</Text>
              </View>
              <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
              </View>
              <Text style={styles.time}>{item.time}</Text>
            </TouchableOpacity>
          </Link>
        )}
      />

      <Link href="/chat/new-chat" asChild>
        <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatInfo: {
    flex: 1,
    marginLeft: 15,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});