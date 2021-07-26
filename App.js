import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from "./app/Screens/LoginScreen"
import RegisterScreen from "./app/Screens/RegisterScreen"


const Stack = createStackNavigator();

const globalScreenStyles = {
  headerTintColor:"white",
  headerTitleStyle:{
    color:"white",
    alignSelf:"center"
  },
  headerStyle:{
    backgroundColor:"#2c6bed",
  },
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenStyles}>
        <Stack.Screen name="Login" component={LoginScreen} options={{title:"Login"}} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{title:"Register", headerLeft: null}} />
      </Stack.Navigator>
    </NavigationContainer>
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
