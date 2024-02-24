import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

export default function Home({ route }) {

  // Variabili
  const { value } = route.params;
  const [associations, setAssociations] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  // Metodi
  useEffect(() => {
    if (!associations.length) {
      getAssociations();
    }
  }, []);

  const getAssociations = async () => {
    try {
      const response = await fetch('https://casadei.ddns.net:3000/getassociazionecucine', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: value.username,
        })
      });
      const data = await response.json();
      setAssociations(data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
  };

  const handleSelectChild = (selectedItem, index) => {
    setSelectedChild(associations[index]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Benvenuto/a {value.username}!</Text>
      <View style={styles.dropdownContainer}>
        <SelectDropdown
          data={associations.map(child => `${child.CognomeBambino} ${child.NomeBambino}`)}
          defaultButtonText='Scegli il bambino'
          search={true}
          onSelect={handleSelectChild}
        />
        {selectedChild && (
          <View style={styles.childDetailsContainer}>
            <Text style={styles.childDetailText}>Data di nascita: {formatDate(selectedChild.DataNascitaBambino)}</Text>
            <Text style={styles.childDetailText}>Codice fiscale: {selectedChild.CodiceFiscaleBambino}</Text>
            <Text style={styles.childDetailText}>Email tutore: {selectedChild.EmailBambino}</Text>
          </View>
        )}
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
  headerText: {
    fontSize: 30,
    marginBottom: 20,
  },
  dropdownContainer: {
    flex: 0.8,
  },
  childDetailsContainer: {
    marginTop: 20,
  },
  childDetailText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
