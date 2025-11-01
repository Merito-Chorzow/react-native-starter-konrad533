// import React, {useState, useEffect} from "react"; - nie potrzebne
import React from "react";
import { Link } from "expo-router";
import { 
  Text, 
  View,
  TextInput,
  TouchableOpacity, //klikalne notatki
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { useNotes, ApiNote } from "@/context/notes-context";

// interface ApiNote {
//   userId: number;
//   id: number;
//   title: string;
//   body: string;
// }

// const Notes = [
//   { id: '1', title: 'Notatka testowa 1', date: '28-10-2025' },
//   { id: '2', title: 'Notatka testowa 2', date: '29-10-2025' },
//   { id: '3', title: 'Notatka testowa 3', date: '30-10-2025' },
// ];

type NoteItemProps = {
  note: ApiNote;
};

// const NoteItem = ({ title, date }: NoteItemProps) => (
const NoteItem = ({ note }: NoteItemProps) => (
  <Link 
    href={{ 
      pathname: './note/[id]',
      params: { id: note.id, title: note.title, body: note.body }, 
    }} 
    asChild
  >
    <TouchableOpacity style={styles.noteItem}>
      <View>
        <Text style={styles.noteTitle}>{note.title}</Text>
        <Text style={styles.noteBody}>{note.body.substring(0, 50)}</Text>
        {/* <Text style={styles.noteDate}>{date}</Text> */}
      </View>
    </TouchableOpacity>
  </Link>
);

export default function Index() {
  // const [notes, setNotes] = useState<ApiNote[]>([]);
  // const [isLoading, setLoading] = useState<boolean>(true); - zastępujemy useState i useEffect nowym hookiem useNotes
  const { notes, isLoading } = useNotes();

  // useEffect(() => {
  //   const fetchNotes = async () => {
  //     try {
  //       const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  //       const data: ApiNote[] = await response.json();
  //       setNotes(data);
  //     } catch (error) {
  //       console.error('Error fetching notes:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   fetchNotes();
  // }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.LoadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Ładowanie notatek...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={notes}
        renderItem={({ item }) => (
          <NoteItem note={item} />
        )}      
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <Text style={styles.headerTitle}>Moje Notatki </Text>
        )}
      />
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  noteItem:{
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  noteDate:{
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  noteBody:{
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  noteTitle:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle:{
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  LoadingContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});