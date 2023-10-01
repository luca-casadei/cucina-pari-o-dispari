import React from 'react';
import Login from './Componenti/Login';
import Home from './Componenti/Home';
import Profilo from './Componenti/Profilo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profilo" component={Profilo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}