import React from "react";
import { 
  Text, 
  View,
  TextInput,
  TouchableOpacity, //klikalne notatki
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView
} from "react-native";

const Notes = [
  { id: '1', title: 'Notatka testowa 1', date: '28-10-2025' },
  { id: '2', title: 'Notatka testowa 2', date: '29-10-2025' },
  { id: '3', title: 'Notatka testowa 3', date: '30-10-2025' },
];

type NoteItemProps = {
  title: string;
  date: string;
};

const NoteItem = ({ title, date }: NoteItemProps) => (
  <TouchableOpacity style={styles.noteItem}>
    <View>
      <Text style={styles.noteTitle}>{title}</Text>
      <Text style={styles.noteDate}>{date}</Text>
    </View>
  </TouchableOpacity>
);

export default function Index() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Moje Notatki</Text>

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
  noteTitle:{
    fontSize: 18,
    fontWeight: 'bold',
  }
});