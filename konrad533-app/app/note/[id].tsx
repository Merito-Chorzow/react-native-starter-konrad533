import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
} from "react-native";

export default function NoteDetail() {
    const { id, title, body } = useLocalSearchParams();

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{title: `Notatka #${id}`}} />

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.noteTitle}>{String(title)}</Text>
                <Text style={styles.noteBody}>{String(body)}</Text>
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