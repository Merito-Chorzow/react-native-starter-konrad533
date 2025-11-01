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
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNotes } from "@/context/notes-context";
import * as Location from 'expo-location';

export default function AddNoteScreen() {
    const params = useLocalSearchParams();
    const isEditMode = params.id != null;

    const noteId = params.id ? String(params.id) : '';
    const noteTitle = params.title ? String(params.title) : '';
    const noteBody = params.body ? String(params.body) : '';

    const [title, setTitle] = useState(noteTitle);
    const [body, setBody] = useState(noteBody);
    const { addNote, editNote } = useNotes();

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [isLocationLoading, setLocationLoading] = useState(false);

    const handleGetLocation = async () => {
        setLocationLoading(true);
        setLocation(null);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Brak dostępu', 'Pozwól aplikacji na dostęp do lokalizacji aby dodać ją do notatki.');
            setLocationLoading(false);
            return;
        }
        try {
            let currentLocation = await Location.getCurrentPositionAsync({ 
                accuracy: Location.Accuracy.Balanced, 
            });
            setLocation(currentLocation);
        } catch (error) {
            Alert.alert('Błąd', 'Nie udało się pobrać lokalizacji. Spróbuj ponownie.');
        } finally {
            setLocationLoading(false);
        }
    };

    const handleSaveNote = () => {
        if (!title.trim() || !body.trim()) {
            Alert.alert('Błąd', 'Proszę wypełnić oba pola przed zapisaniem notatki.');
            return
        }
        
        let finalBody = body;
        if (location) {
            if (!finalBody.includes('\n\nLokalizacja:')) {
                finalBody += `\n\nLokalizacja: ${location.coords.latitude.toFixed(4)}, ${location.coords.longitude.toFixed(4)}`;
            }
        }

        if (isEditMode) {
            editNote(Number(noteId), title, finalBody);
        } else {
            addNote({ title: title, body: finalBody });
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

                <View style={styles.locationSection}>
                    <Button title="Dołącz lokalizację" onPress={handleGetLocation} />
                    {isLocationLoading && <ActivityIndicator style={styles.locationLoader} />}

                    {location && (
                        <Text style={styles.locationText}>
                            Zapisano lokalizację!
                        </Text>
                    )}

                    {isEditMode && !location && !isLocationLoading && body.includes('Lokalizacja:') && (
                        <Text style={styles.locationText}>
                            Notatka zawiera już lokalizację.
                        </Text>
                    )}
                </View>
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
    locationSection: {
        marginTop: 24,
        alignItems: 'flex-start',
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    locationText: {
        marginTop: 10,
        fontSize: 14,
        color: 'green',
        fontWeight: '500',
    },
    locationLoader: {
        marginTop: 10,
    },
});
