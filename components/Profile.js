import React from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';

//Screen names
const changePasswordName = "Cambia Password";

//Variables 
const username = "Francesco"; // Database call in order to get the real username. To-Do
var email = "Email da prendere da DB";
var psw = "Password da prendere da DB";

export default function Profile({ navigation }) { 
  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.container}>
        <Text style={{fontSize: 30, flex: 0.9,}}>Informazioni su {username}</Text>
        <View style={{flex: 1, alignItems: 'center',}}>
        <Text>Email</Text>
          <View  style={{flexDirection:"row", margin: 10,}}>
            <TextInput placeholder={email} placeholderTextColor="black" style={styles.profileTextInput}></TextInput>
            <Pressable style={styles.profilePressable}><Text style={{textAlign: 'center', fontWeight: 'bold', color:'white'}}>Aggiungi</Text></Pressable>
          </View>
          <Text>Password</Text>
          <View style={{flexDirection:"row", margin: 10,}}>
            <TextInput placeholder={psw} placeholderTextColor="black" style={styles.profileTextInput}></TextInput>
            <Pressable onPress={() => navigation.navigate(changePasswordName)} style={styles.profilePressableEdit}><Text style={{textAlign: 'center', fontWeight: 'bold', color:'white'}}>Modifica</Text></Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileTextInput:{
      width: 220,
      textAlign: 'center',
      height: 50,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      margin: 20,
    },
    profilePressable: {
      width: 110,
      height: 'auto',
      padding: 20,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'grey',
      backgroundColor: '#0d6efd',
      margin: 15,
    },
    profilePressableEdit: {
      width: 110,
      height: 'auto',
      padding: 20,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'grey',
      backgroundColor: '#198754',
      margin: 15,
    },
  });