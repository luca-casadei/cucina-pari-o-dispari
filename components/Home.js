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
      setGet(true);
    }
  });
  
  getAssociations = async() => {
    try{
      fetch('https://apis-pari-o-dispari.azurewebsites.net/getassociazionecucine', {
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
        setAssociations(response.map(o => o.CognomeBambino + " " + o.NomeBambino));
      })
    }catch(err){
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