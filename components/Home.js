import { React, useEffect, useState } from 'react';
import { StyleSheet,  Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

export default function Home({ route }) { 

  //Variables
  const { value } = route.params;
  const [associations, setAssociations] = useState([ ]);
  const [getEffettuata, setGet] = useState(false);


  //Methods
  useEffect(()=>{
    if(!getEffettuata){
      getAssociations();
    }
  });
  
  getAssociations = async() => {
    try{
      var data = new URLSearchParams();
      data.append('username', value.username);
      fetch('https://apis-pari-o-dispari.azurewebsites.net/getassociazionecucine', {
          method: 'POST',
          mode: 'cors',
          headers: {
          'Accept': 'application/x-www-form-urlencoded',
          'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: data.toString(),
          json:true,
      }).then(response => response.json())
      .then(response => {
        setAssociations(response);
      })
    }catch(err)
    {
        console.log(err.message);
    }
  }


  return (
      <View style={styles.container}>
            <Text style={{fontSize: 30, flex: 0.1, }}>Benvenuto/a {value.username}!</Text>
            <View style = {{flex: 0.8}}>
              <SelectDropdown 
                data={associations}
                defaultButtonText='Scegli il bambino'
                search={true}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
              />
              
            </View>
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