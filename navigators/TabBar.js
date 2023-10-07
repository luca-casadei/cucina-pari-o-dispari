import React from 'react';
import Home from '../components/Home';
import Login from '../components/Login';
import ChangePasswordNavigator from './ChangePasswordNavigator';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


//Screen names
const loginName = "Login"
const logoutName = "Disconnetti"
const homeName = "Home"
const profileName = "Profilo"

//Variables
const Tab = createBottomTabNavigator();

export default function TabBar({ route, navigation }) { 
  const { username } = route.params;

  return (
    <NavigationContainer independent={true}>
        <Tab.Navigator 
          initialRouteName={homeName}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let rn = route.name;
  
              if (rn === homeName) {
                iconName = focused ? 'home' : 'home-outline';
  
              } else if (rn === profileName) {
                iconName = focused ? 'person' : 'person-outline';
              } else if (rn === logoutName) {
                iconName = 'log-out-outline';
              }
  
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            activeTintColor: 'tomato',
            inactiveTintColor: 'grey',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 10, height: 70}
          })}
          >
            <Tab.Screen name={homeName} component={Home} initialParams={{ username: username }} />
            <Tab.Screen name={profileName} component={ChangePasswordNavigator} initialParams={{ username: username }} />
            <Tab.Screen name={logoutName} component={Login} listeners={{
              tabPress: e => {
                e.preventDefault();
                Alert.alert('Attenzione', 'L\'account verrà disconnesso!', [
                  {
                    text: 'Annulla',
                    onPress: () => console.log('Logout annullato'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK', onPress: () => {console.log('Logout effettuato'); navigation.navigate(loginName);}
                  },
                ]);
              }
            }}/>
        </Tab.Navigator>
    </NavigationContainer>
  );
}