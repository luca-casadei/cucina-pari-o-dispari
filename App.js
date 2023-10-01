import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, Linking, Pressable } from 'react-native';
import Login from './Componenti/Login';

export default function App() {
  return (
    <View style={styles.container}>
      <Login></Login>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});