import React from 'react';
import { StyleSheet, Image, Text, View, TextInput, Linking, Pressable } from 'react-native';


export default function Login({ navigation }) {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../images/Logo.png')}></Image>
            <Text style={styles.loginText}>Inserisci lo username </Text>
            <TextInput placeholder="Username" placeholderTextColor="black" style={styles.loginTextInput}></TextInput>
            <Text style={styles.loginText}>Inserisci la password </Text>
            <TextInput secureTextEntry={true} placeholder="Password" placeholderTextColor="black" style={styles.loginTextInput}></TextInput>
            <Text style={{color: 'blue', margin: 20}} onPress={() => Linking.openURL('http://google.com')}>Password dimenticata?</Text>
            <Pressable onPress={() => navigation.navigate('TabBar')} style={styles.loginPressable}><Text style={{textAlign: 'center', fontWeight: 'bold', color:'white'}}>Accedi</Text></Pressable>
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
    logo: {
      width: 150,
      height: 150,
    },
    loginText: {
      textAlign: 'center',
      fontWeight: 'bold',
      margin: 20,
    },
    loginTextInput:{
      width: 300,
      height: 50,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
    },
    loginPressable: {
      width: 100,
      height: 'auto',
      padding: 20,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'grey',
      backgroundColor: 'grey',
    },
  });