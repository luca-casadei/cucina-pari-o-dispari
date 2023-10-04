import {React, useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';

//Screen names
const profileName = "Profilo";

//Variables 
const oldPsw = "Vecchia password da prendere da DB";
var newPsw = "Nuova password da prendere da DB";
var confirmNewPsw = "Conferma password da prendere da DB";


export default function ChangePassword({ navigation }) { 

  const [vecchiaPassword,setVecchiaPassword] = useState('');
  const [nuovaPassword,setNuovaPassword] = useState('');
  const [confermaPassword,setConfermaPassword] = useState('');

  const confermaModifica = ( navigation ) => {
    if(vecchiaPassword.length == 0 && nuovaPassword.length == 0 && confermaPassword.length == 0){
      alert("Inserire le informazioni per poter modificare la password!")
    } else if(vecchiaPassword.length != 0 && nuovaPassword.length != 0 && nuovaPassword == confermaPassword){
      // Controlli da aggiungere una volta che ci sarà il collegamento con il database.

      Alert.alert('Attenzione', 'La password verrà modificata in caso di conferma!', [
        {
          text: 'Annulla',
          onPress: () => console.log('Modifica password annullata'),
          style: 'cancel',
        },
        {
          text: 'Conferma', onPress: () => {console.log('Modifica password confermata'); navigation.navigate(profileName);}
        },
      ]);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.container}>
        <View style={{flex: 0.9, alignItems: 'center',}}>
            <Text>Vecchia password</Text>
            <TextInput onChangeText={setVecchiaPassword} placeholder={oldPsw} placeholderTextColor="black" style={styles.changePasswordTextInput}></TextInput>

            <Text>Nuova password</Text>
            <TextInput onChangeText={setNuovaPassword} id='tiNewPsw' placeholder={newPsw} placeholderTextColor="black" style={styles.changePasswordTextInput}></TextInput>

            <Text>Conferma nuova password</Text>
            <TextInput onChangeText={setConfermaPassword} id='tiNewPswConfirm' placeholder={confirmNewPsw} placeholderTextColor="black" style={styles.changePasswordTextInput}></TextInput>
            
            <View style={{flexDirection:"row"}}>
              <Pressable onPress={() => navigation.navigate(profileName)} style={styles.changePasswordPressableBack}><Text style={{textAlign: 'center', fontWeight: 'bold', color:'white'}}>Indietro</Text></Pressable>
              <Pressable onPress={() => confermaModifica(navigation)} style={styles.changePasswordPressableConfirm}><Text style={{textAlign: 'center', fontWeight: 'bold', color:'white'}}>Modifica e Salva</Text></Pressable>
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
    changePasswordTextInput:{
        width: 300,
        height: 50,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        margin: 20,
      },
      changePasswordPressableConfirm: {
        width: 180,
        height: 'auto',
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        backgroundColor: '#009B4D',
        margin: 15,
      },
      changePasswordPressableBack: {
        width: 100,
        height: 'auto',
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'grey',
        backgroundColor: '#323232',
        margin: 15,
      },
  });