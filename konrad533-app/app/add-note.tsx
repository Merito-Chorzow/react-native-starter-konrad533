import { Stack } from "expo-router";
import React from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
} from "react-native";

export default function AddNoteScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{title: 'Dodaj Notatkę'}} />

            <View style={styles.content}>
                <Text style={styles.label}>Tytuł</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder="Wpisz tytuł notatki" 
                />

                <Text style={styles.label}>Treść</Text>
                <TextInput 
                    style={[styles.input, styles.textArea]} 
                    placeholder="Wpisz treść notatki" 
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
        borderRadius: 4,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
});
