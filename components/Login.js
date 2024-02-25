import React, { useState } from 'react';
import { StyleSheet, Image, Text, TextInput, Linking, Pressable, View, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const tabBarName = "TabBar";

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showHidePassword, setShowHidePassword] = useState(true);

  const VerificaCredenziali = async () => {
    console.log(username);
    console.log(password);

    try {
      const response = await fetch('https://casadei.ddns.net:3000/cheflogin', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      });
      console.log(response.status);
      switch (response.status) {
        case 502:
          {
            alert("Errore interno, database non raggiungibile.");
            break;
          }
        case 404:
          {
            alert("Utente non trovato");
            break;
          }
        case 400:
          {
            alert("Credenziali invalide");
            break;
          }
        case 200:
          {
            response.json().then(navigation.navigate(tabBarName, { username: username, password: password }));
            break;
          }
        default:
          {
            alert("Errore non gestito.");
            break;
          }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.container}>
      <Image style={styles.logo} source={require('../images/Logo.png')} />
      <Text style={styles.loginText}>Inserisci lo username </Text>
      <TextInput onChangeText={setUsername} placeholder="Username" placeholderTextColor="black" style={styles.loginTextInput} />
      <Text style={styles.loginText}>Inserisci la password </Text>
      <View style={{ flexDirection: "row" }}>
        <TextInput onChangeText={setPassword} secureTextEntry={showHidePassword} maxLength={20} placeholder="Password" placeholderTextColor="black" style={styles.loginTextInput} />
        <Pressable onPress={() => setShowHidePassword(!showHidePassword)} style={{ marginTop: 30 }}><Text><Ionicons name={showHidePassword ? 'eye-off' : 'eye'} size={28} color="black" /></Text></Pressable>
      </View>
      <Text>Password dimenticata?</Text>
      <Text style={{ color: 'blue', margin: 5 }} onPress={() => Linking.openURL('https://www.auslromagna.it/')}>Contatta l'amministratore</Text>
      <Pressable onPress={VerificaCredenziali} style={styles.loginPressable}><Text style={{ textAlign: 'center', fontWeight: 'bold', color: 'white' }}>Accedi</Text></Pressable>
    </KeyboardAvoidingView>
  );
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
  loginTextInput: {
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
