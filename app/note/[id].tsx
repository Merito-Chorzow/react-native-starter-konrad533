import { Stack, useLocalSearchParams, Link } from "expo-router";
import React from "react";
import {
    Text,
    View,
    StyleSheet,
    // SafeAreaView, - zastąpiony react-native-safe-area-context
    ScrollView,
    Pressable,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from "@/context/notes-context";


export default function NoteDetail() {
    const { id } = useLocalSearchParams();

    const { notes } = useNotes();

    const note = notes.find((n) => n.id === Number(id));

    if (!note) {
        return (
            <SafeAreaView style={styles.container}>
                <Stack.Screen options={{ title: 'Ładowanie...' }} />
                <View style={styles.content}>
                    <Text>Notatka nie znaleziona</Text>
                </View>
            </SafeAreaView>
        );
    }

    const noteId = String(note.id);
    const noteTitle = String(note.title);
    const noteBody = String(note.body);

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen 
            options={{
                title: `Notatka #${id}`,
                headerRight: () => (
                    <Link 
                        href={{ 
                            pathname: '/add-note',
                            params: { 
                                id: noteId, 
                                title: noteTitle, 
                                body: noteBody 
                            }, 
                        }} 
                        asChild
                    >
                        <Pressable>
                            <Text style={{ fontSize: 16, color: '#007AFF' }}>Edytuj</Text>
                        </Pressable>
                    </Link>
                ),
            }} 
            />

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.noteTitle}>{String(note.title)}</Text>
                <Text style={styles.noteBody}>{String(note.body)}</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    content: {
        padding: 16,
    },
    noteTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
        textTransform: 'capitalize',
    },
    noteBody: {
        fontSize: 16,
        lineHeight: 24,
        color: '#333',
    },
});