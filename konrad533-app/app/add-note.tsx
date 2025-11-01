import { Stack, router } from "expo-router";
import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Alert,
    Button,
} from "react-native";
import { useNotes } from "@/context/notes-context";

export default function AddNoteScreen() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const { addNote } = useNotes();

    const handleSaveNote = () => {
        if (!title.trim() || !body.trim()) {
            Alert.alert('Błąd', 'Proszę wypełnić oba pola przed zapisaniem notatki.');
            return
        }
        addNote({ title, body });
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{
                title: 'Dodaj Notatkę',
                headerRight: () => (
                    <Button 
                        onPress={handleSaveNote} 
                        title="Zapisz" 
                    />
                ),
            }} 
            />

            <View style={styles.content}>
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
                    style={[styles.input, styles.textArea]} 
                    placeholder="Wpisz treść notatki" 
                    placeholderTextColor="#888"
                    value={body}
                    onChangeText={setBody}                   
                    multiline
                />
            </View>
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
        fontWeight: 'bold',
        marginTop: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
});
