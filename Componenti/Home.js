import React, { Profiler } from 'react';
import { StyleSheet, Image, Text, View, TextInput, Linking, Pressable } from 'react-native';
import TabBar from './TabBar';

export default function Home({ navigation }) { 
  return (
      <View style={styles.container}>
            <Text>Benvenuto/a!</Text>

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