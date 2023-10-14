import { React, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screen names
const changePasswordName = "Cambia Password";

export default function Profile({ route, navigation }) {
  
  
  //Variables 
  const { value } = route.params;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showHidePassword, setShowHidePassword] = useState(true);
  const [getEffettuata, setGet] = useState(false);

  //Methods
  useEffect(()=>{
    if(!getEffettuata){
      console.log("Lo username é: " + value.username);
      console.log("La password é: " + value.password);

      getChef();
      setPassword(value.password);
      setGet(true);
    }else{
      console.log("La password dopo la modifica é: " + value.password);
      setPassword(value.password);
    }
  });
 
  getChef = async() => {
    try{
      fetch('https://apis-pari-o-dispari.azurewebsites.net/getchef', {
          method: 'POST',
          mode: 'cors',
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: value.username,
          })
      }).then(response => response.json())
      .then(response => {
          setEmail(response.Email);
      })
    }catch(err)
    {
        console.log(err.message);
    }
  }

  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : ''} style={styles.container}>
        <Text style={{fontSize: 30, flex: 0.3,}}>Informazioni su {value.username}</Text>
        <View style={{flex: 0.6, alignItems: 'center',}}>
          <Text>Email</Text>
          { email != '' &&         
            <View style={{flexDirection:"row", margin: 10,}}>
              <TextInput editable={false} value={email} placeholderTextColor="black" style={styles.profileTextInput}></TextInput>
            </View>
          }
          {email == '' &&
              <Pressable style={styles.profilePressable}><Text style={{textAlign: 'center', fontWeight: 'bold', color:'white'}}>Aggiungi</Text></Pressable>
          }
          <Text>Password</Text>
          <View style={{flexDirection:"row", }}>
            <TextInput editable={false} value={password} secureTextEntry={showHidePassword} placeholderTextColor="black" style={styles.profileTextInput}></TextInput>
            <Pressable onPress={() => setShowHidePassword(!showHidePassword)} style={{marginTop: 30, }}><Text><Ionicons name={showHidePassword ? 'eye-off' : 'eye'} size={28} color="black"/></Text></Pressable>
          </View>
          <Pressable onPress={() => navigation.navigate(changePasswordName)} style={styles.profilePressableEdit}><Text style={{textAlign: 'center', fontWeight: 'bold', color:'white' }}>Modifica Password</Text></Pressable>
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
      width: 180,
      height: 'auto',
      padding: 20,
      borderWidth: 1,
      borderRadius: 5,
      borderColor: 'grey',
      backgroundColor: '#198754',
    },
  });