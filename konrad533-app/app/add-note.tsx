import { Stack, router, useLocalSearchParams} from "expo-router";
import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    // SafeAreaView, - zastąpiony react-native-safe-area-context
    TextInput,
    Alert,
    Button,
    ScrollView,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from "@/context/notes-context";

export default function AddNoteScreen() {
    const params = useLocalSearchParams();
    const isEditMode = params.id != null;

    const noteId = params.id ? String(params.id) : '';
    const noteTitle = params.title ? String(params.title) : '';
    const noteBody = params.body ? String(params.body) : '';

    const [title, setTitle] = useState(noteTitle);
    const [body, setBody] = useState(noteBody);
    const { addNote, editNote } = useNotes();

    const handleSaveNote = () => {
        if (!title.trim() || !body.trim()) {
            Alert.alert('Błąd', 'Proszę wypełnić oba pola przed zapisaniem notatki.');
            return
        }
        
        if (isEditMode) {
            editNote(Number(noteId), title, body);
        } else {
            addNote({ title, body });
        }
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                title: isEditMode ? 'Edytuj Notatkę' : 'Dodaj Notatkę',
                headerRight: () => (
                    <Button 
                        onPress={handleSaveNote} 
                        title="Zapisz" 
                    />
                ),
            }} 
            />

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.label}>Tytuł</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Wpisz tytuł notatki" 
                    placeholderTextColor="#888"
                    value={title}
                    onChangeText={setTitle}
                />

                <Text style={styles.label}>Treść</Text>
                <TextInput 
                    style={[styles.input, styles.textarea]} 
                    placeholder="Wpisz treść notatki" 
                    placeholderTextColor="#888"
                    value={body}
                    onChangeText={setBody}                   
                    multiline
                />
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
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginTop: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textarea: {
        height: 120,
        textAlignVertical: 'top',
    },
});
