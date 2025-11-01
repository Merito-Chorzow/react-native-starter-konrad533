import { Stack, Link } from "expo-router";
import React from "react";
import { Text, Pressable } from "react-native";
import { NotesProvider } from "@/context/notes-context";

export default function RootLayout() {
  return (
    <NotesProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Notatki',
            headerRight: () => (
              <Link href="./add-note" asChild>
                <Pressable>
                  <Text style={{ fontSize: 16, color: '#007AFF' }}>Dodaj</Text>
                </Pressable>
              </Link>
            ),
          }}
        />

        <Stack.Screen
          name="add-note"
          options={{ 
            title: 'Dodaj Notatkę',
            presentation: 'modal',
          }}
        />

        <Stack.Screen
          name="note/[id]"
          options={{ 
            title: 'Szczegóły Notatki' 
          }}
        />
      </Stack>
    </NotesProvider> 
  );
}
