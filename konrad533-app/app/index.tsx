import React from "react";
import { 
  Text, 
  View,
  FlatList,
  StatusBar,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const Notes = [
  { id: '1', title: 'Notatka testowa 1', date: '28-10-2025' },
  { id: '2', title: 'Notatka testowa 2', date: '29-10-2025' },
  { id: '3', title: 'Notatka testowa 3', date: '30-10-2025' },
];

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Moje Notatki</Text>
    </View>
  );
}
