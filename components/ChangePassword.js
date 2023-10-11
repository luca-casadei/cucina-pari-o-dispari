import {React, useState} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native';

//Screen names
const profileName = "Profilo";

export default function ChangePassword({ route, navigation }) { 
  //Variables 
  const [oldPassword,setOldPassword] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [confirmNewPassword,setConfirmNewPassword] = useState('');

  const confermaModifica = ( navigation ) => {
    if(oldPassword.length == 0 || newPassword.length == 0 || confirmNewPassword.length == 0){
      alert("Compilare tutti i campi per poter modificare la password!")
    } else if(newPassword == confirmNewPassword){
      // Controlli da aggiungere una volta che ci sarà il collegamento con il database.
      if(route.params.value.password === oldPassword){
        Alert.alert('Attenzione', 'La password verrà modificata in caso di conferma!', [
          {
            text: 'Annulla',
            onPress: () => console.log('Modifica password annullata'),
            style: 'cancel',
          },
          {
            text: 'Conferma', onPress: () => {
              console.log('Modifica password confermata'); 
              navigation.navigate(profileName, {value: {
                username: route.params.value.username,
                password: newPassword,
              }});
              modificaPassword(route.params.value.username, newPassword);
            }
          },
        ]);
      } else {
        alert('La password attuale inserita non corrisponde!');
      }
    } else {
      alert('La nuova password è diversa dalla conferma.');
    }
  }

  const modificaPassword = async(username, password)=>{
    try{
        const response = await fetch('https://apis-pari-o-dispari.azurewebsites.net/setchefpassword', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
      })
      console.log(response.status);
      switch(response.status){
        case 502:{
          alert("Errore interno, database non raggiungibile.");
          break;
        }
        case 200:{
            alert('Password modificata');
          break; 
        }
        default:{
          alert("Errore non gestito.");
          break;
        }
      }
    }catch(err){
        console.log(err.message);
    }
}

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.container}>
        <View style={{flex: 0.7, alignItems: 'center',}}>
            <Text>Vecchia password</Text>
            <TextInput onChangeText={setOldPassword} placeholder='Inserire la password attuale' placeholderTextColor="black" style={styles.changePasswordTextInput}></TextInput>

            <Text>Nuova password</Text>
            <TextInput onChangeText={setNewPassword} placeholder='Inserire la nuova password' placeholderTextColor="black" style={styles.changePasswordTextInput}></TextInput>

            <Text>Conferma nuova password</Text>
            <TextInput onChangeText={setConfirmNewPassword} placeholder='Confermare la password, reinserirla' placeholderTextColor="black" style={styles.changePasswordTextInput}></TextInput>
            
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
        width: 160,
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
        backgroundColor: '#353238',
        margin: 15,
      },
  });