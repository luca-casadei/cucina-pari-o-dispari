import React from 'react';
import Home from './Home';
import Profilo from './Profilo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screen names
const homeName = "Home"
const profileName = "Profilo"

const Tab = createBottomTabNavigator();

export default function TabBar({ navigation }) { 
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
              } 
  
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            activeTintColor: 'tomato',
            inactiveTintColor: 'grey',
            labelStyle: { paddingBottom: 10, fontSize: 10 },
            style: { padding: 10, height: 70}
          })}
          >
            <Tab.Screen name={homeName} component={Home} />
            <Tab.Screen name={profileName} component={Profilo} />
        </Tab.Navigator>
    </NavigationContainer>
  );
}