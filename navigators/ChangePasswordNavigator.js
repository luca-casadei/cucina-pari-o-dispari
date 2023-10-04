import React from 'react';
import Profile from '../components/Profile';
import ChangePassword from '../components/ChangePassword';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screen names
const profileName = "Profilo"
const changePasswordName = "Cambia Password"

//Variables
const Stack = createNativeStackNavigator();


export default function App() {
  return (
  <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={profileName} screenOptions={{ headerShown: false, }}>
        <Stack.Screen name={profileName} component={Profile} />
        <Stack.Screen name={changePasswordName} component={ChangePassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}