import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

export default function Home({ route }) {
  // Variables
  const { value } = route.params;
  const [associations, setAssociations] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [kidMenuInfo, setKidMenuInfo] = useState(null);
  const [menuDishes, setMenuDishes] = useState([]);

  // Methods
  useEffect(() => {
    if (!associations.length) {
      getAssociations();
    }
  }, []);

  useEffect(() => {
    if (selectedChild && kidMenuInfo && kidMenuInfo.IdMenu) {
      getKidMenuDishes(selectedChild.CodiceFiscaleBambino, kidMenuInfo.IdMenu);
    }
  }, [selectedChild, kidMenuInfo]);

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

  const getKidMenuInfo = async (codiceFiscaleParam) => {
    try {
      const response = await fetch('https://casadei.ddns.net:3000/getkidmenuinfo', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codiceFiscale: codiceFiscaleParam,
        })
      });
      const responseData = await response.text();
      try {
        const data = JSON.parse(responseData);
        setKidMenuInfo(data);
      } catch (error) {
        console.log("Errore nel parsing della risposta JSON:", error);
        setKidMenuInfo(null);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKidMenuDishes = async (codiceFiscaleParam, idMenu) => {
    try {
      const response = await fetch('https://casadei.ddns.net:3000/getkidmenudishes', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codiceFiscale: codiceFiscaleParam,
          idMenu: idMenu,
        })
      });
      const data = await response.json();
      setMenuDishes(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
  };

  const handleSelectChild = (selectedItem, index) => {
    const selectedChild = associations[index];
    if (selectedChild) {
      setSelectedChild(selectedChild);
      getKidMenuInfo(selectedChild.CodiceFiscaleBambino);
    } else {
      console.log("SelectedChild is null or undefined");
    }
  };

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
            <Text style={styles.sectionHeader}>Informazioni:</Text>
            <Text style={styles.childDetailText}>Data di nascita: {formatDate(selectedChild.DataNascitaBambino)}</Text>
            <Text style={styles.childDetailText}>Codice fiscale: {selectedChild.CodiceFiscaleBambino}</Text>
            <Text style={styles.childDetailText}>Email tutore: {selectedChild.EmailBambino}</Text>
            {kidMenuInfo && (
              <View>
                <Text style={styles.sectionHeader}>Menu:</Text>
                <Text style={styles.menuDetailText}>Id Menu: {kidMenuInfo?.IdMenu}</Text>
                <Text style={styles.menuDetailText}>Nome Menu: {kidMenuInfo?.NomeMenu}</Text>
                <Text style={styles.menuDetailText}>Stagione: {kidMenuInfo?.StagioneMenu}</Text>
                <Text style={styles.menuDetailText}>Email creatore: {kidMenuInfo?.EmailCreatoreMenu}</Text>
                {menuDishes.length > 0 && (
                  <>
                    <Text style={styles.sectionHeader}>Piatti:</Text>
                    {menuDishes.map((item, index) => (
                      <Text key={index} style={styles.menuItem}>{item.NomePiatto} - {item.Descrizione}</Text>
                    ))}
                  </>
                )}
              </View>
            )}
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  menuDetailText: {
    fontSize: 18,
    marginBottom: 5,
  },
  menuItem: {
    fontSize: 16,
    marginLeft: 20,
  },
});