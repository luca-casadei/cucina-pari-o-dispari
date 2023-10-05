import { React, useState } from 'react';
import { StyleSheet, Image, Text, TextInput, Linking, Pressable, KeyboardAvoidingView } from 'react-native';

//Screen names
const tabBarName = "TabBar";

export default function Login({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.container}>
            <Image style={styles.logo} source={require('../images/Logo.png')}></Image>
            <Text style={styles.loginText}>Inserisci lo username </Text>
            <TextInput onChangeText={setUsername} placeholder="Username" placeholderTextColor="black" style={styles.loginTextInput}></TextInput>
            <Text style={styles.loginText}>Inserisci la password </Text>
            <TextInput onChangeText={setPassword} secureTextEntry={true} maxLength={20} placeholder="Password" placeholderTextColor="black" style={styles.loginTextInput}></TextInput>
            <Text>Password dimenticata?</Text>
            <Text style={{color: 'blue', margin: 5}} onPress={() => Linking.openURL('https://www.auslromagna.it/')}>Contatta l'amministratore</Text>
            <Pressable onPress={() => ()=>VerificaCredenziali(navigation,username,password)} style={styles.loginPressable}><Text style={{textAlign: 'center', fontWeight: 'bold', color:'white'}}>Accedi</Text></Pressable>
        </KeyboardAvoidingView>
    );
}

VerificaCredenziali = async (navigation,username,password)=>{

  const RESPONSE = await fetch('https://www.pariodispari.com/apis/cheflogin', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({username: this.username, password:  this.password})
    })
    .catch(error => {
      console.error(error);
    });
    switch(RESPONSE.status){
      case 200:{
        navigation.navigate(tabBarName);
        break;
      }
      default: {
        alert("Le credenziali inserite non sono valide!");
      }
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
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
    },
    loginTextInput:{
      width: 300,
      height: 50,
      padding: 10,
      borderWidth: 1,
      borderRadius: 5,
      margin: 20,
    },
    loginPressable: {
      width: 100,
      height: 'auto',
      padding: 20,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'grey',
      backgroundColor: '#198754',
      margin: 15,
    },
  });