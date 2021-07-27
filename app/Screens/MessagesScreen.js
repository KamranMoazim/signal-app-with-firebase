import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { StatusBar } from "expo-status-bar"
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

import CustomListItem from "../components/CustomListItem"
import {auth, db} from "../../firebase"

export default function MessagesScreen({navigation}) {

    const [chats,setChats] = useState([])

    const signOut = () => {
        auth.signOut()
        .then(()=>{
            navigation.replace("Login")
        })
    }

    useEffect(()=>{
        const unsubscribe = db.collection("chat").onSnapshot((snapshot)=>{
            setChats(snapshot.docs.map((doc)=>({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe;
    },[])

    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Signal",
            headerTintColor:"black",
            headerTitleStyle:{
              color:"black",
            //   alignSelf:"center"
            },
            headerStyle:{
              backgroundColor:"white",
            },
            headerLeft: () => (
                <View style={{marginLeft:20}}>
                    <TouchableOpacity onPress={signOut} activeOpacity={0.5}>
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} /> 
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{marginRight:20, flexDirection:"row", justifyContent:"space-between", width:70}}>
                    <TouchableOpacity  onPress={signOut} activeOpacity={0.5}>
                        <AntDesign name="camerao" size={30} /> 
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>navigation.navigate("AddChat")} activeOpacity={0.5}>
                        <SimpleLineIcons name="pencil" size={27} /> 
                    </TouchableOpacity>
                </View>
            ),
        })
    },[navigation])

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat",{
            id,
            chatName
        })
    }

    return (
        <>
            <StatusBar style="light" />
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    {chats.map(({id, data:{chatName}}, index)=>{
                        return <CustomListItem id={id} chatName={chatName} enterChat={enterChat} key={index} /> 
                    })}
                    {/* <CustomListItem /> */}
                </ScrollView>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        // justifyContent:"center",
        // alignItems:"center",
        flex:1,
        // padding:10,
        backgroundColor:"white"
    },
    scrollContainer:{
        height:"100%"
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    }
})
