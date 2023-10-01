import React from 'react';
import Login from './components/Login';
import TabBar from './components/TabBar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screen names
const loginName = "Login"
const tabBarName = "TabBar";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
  <NavigationContainer>
      <Stack.Navigator initialRouteName={loginName} screenOptions={{ headerShown: false, }}>
        <Stack.Screen name={loginName} component={Login} />
        <Stack.Screen name={tabBarName} component={TabBar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}