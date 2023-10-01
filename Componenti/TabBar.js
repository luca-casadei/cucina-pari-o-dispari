import React from 'react';
import Home from './Home';
import Profilo from './Profilo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Login';


const Tab = createBottomTabNavigator();

export default function TabBar() { 
  return (
    <NavigationContainer independent={true}>
        <Tab.Navigator>
            <Tab.Screen name="Profilo" component={Login} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}