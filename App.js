import React from 'react';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from "./app/Screens/LoginScreen"
import RegisterScreen from "./app/Screens/RegisterScreen"
import MessagesScreen from "./app/Screens/MessagesScreen"
import AddChatScreen from "./app/Screens/AddChatScreen"
import ChatScreen from "./app/Screens/ChatScreen"


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
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{title:"Login"}} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{title:"Register", headerLeft: null}} 
        />
        <Stack.Screen 
          name="Messages" 
          component={MessagesScreen} 
          options={{title:"Messages", headerLeft: null}} 
        />
        <Stack.Screen 
          name="AddChat" 
          component={AddChatScreen} 
          // options={{title:"AddChat", headerLeft: null}} 
        />
        <Stack.Screen 
          name="Chat" 
          component={ChatScreen} 
          // options={{title:"Messages"}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
//, headerLeft: null