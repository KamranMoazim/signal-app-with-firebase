import React,{useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, PlatformColor, Platform, ScrollView, TextInput, Keyboard } from 'react-native'
import { Avatar } from "react-native-elements"
import { FontAwesome, Ionicons } from "@expo/vector-icons"
import * as firebase from "firebase"

import {auth, db} from "../../firebase"

export default function ChatScreen({navigation, route}) {


    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])

    console.log(route.params)


    useLayoutEffect(()=>{
        navigation.setOptions({

            title:route.params.chatName,

            headerTintColor:"black",
            headerTitleStyle:{
              color:"white",
              alignSelf:"center"
            },
            headerStyle:{
              backgroundColor:"#2c6bed",
            },
            headerLeft: () => (
                <View style={{marginLeft:20, flexDirection:"row", justifyContent:"space-between", alignItems:"center", width:70}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <FontAwesome name="arrow-left" size={24} color="white" /> 
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5}>
                        <Avatar rounded source={{uri: auth?.currentUser?.photoURL}} /> 
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{marginRight:15, flexDirection:"row", justifyContent:"space-between", width:70}}>
                    <TouchableOpacity  activeOpacity={0.5}>
                        <FontAwesome name="video-camera" size={24} color="white" /> 
                    </TouchableOpacity>
                    <TouchableOpacity  activeOpacity={0.5}>
                        <Ionicons name="call" size={24} color="white" /> 
                    </TouchableOpacity>
                </View>
            ),
        })
    },[navigation])


    const sendMessage = () => {
        // Keyboard.dismiss()
        db.collection("chat").doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            displayName:auth.currentUser.displayName,
            email:auth.currentUser.email,
            photoURL:auth.currentUser.photoURL,
        })
        setInput("");
    }

    useLayoutEffect(()=>{
        const unsubscribe = db
            .collection("chat")
            .doc(route.params.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot)=>setMessages(
                snapshot.docs.map((doc)=>({
                    id:doc.id,
                    data: doc.data()
                }))
            ))
        return unsubscribe;
    },[route])

    return (
        // <View>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <>
                    <ScrollView style={styles.messagesContainer}>
                        {messages.map(({id, data})=>(
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.receiver}>
                                    <Avatar 
                                        position="absolute"
                                        rounded
                                        top={-15}
                                        left={-5}
                                        size={35} 
                                        source={{uri:auth.currentUser.photoURL}} 
                                    />
                                    <Text style={styles.receiverText}>{data.message}</Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Avatar 
                                        position="absolute"
                                        rounded
                                        top={-15}
                                        right={-5}
                                        size={35}  
                                        source={{uri:data.photoURL}} 
                                    />
                                    <Text style={styles.senderText}>{data.message}</Text>
                                </View>
                            )
                        ))}
                    </ScrollView>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input} 
                            placeholder="Signal Message" 
                            value={input} 
                            onChangeText={(text)=>setInput(text)} 
                            onSubmitEditing={sendMessage}
                        />
                        <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                            <Ionicons style={{marginRight:10}} name="send" size={24} color="#2c6bed" /> 
                        </TouchableOpacity>
                    </View>
                </>
            </KeyboardAvoidingView>
        // </View>
    )
}

const styles = StyleSheet.create({
    messagesContainer:{
        padding:15
    },
    container:{
        flex:1,
        backgroundColor:"white"
    },
    receiverText:{
        marginLeft:10
    },
    receiver:{
        flexDirection:"row",
        padding:15,
        backgroundColor:"#ececec",
        alignSelf:"flex-end",
        borderRadius:20,
        marginRight:15,
        marginBottom:20,
        maxWidth:"80%",
        position:"relative"
    },
    senderText:{
        marginLeft:10
    },
    sender:{
        flexDirection:"row",
        padding:15,
        backgroundColor:"#2b68e6",
        alignSelf:"flex-start",
        borderRadius:20,
        marginRight:15,
        maxWidth:"80%",
        position:"relative"
    },
    inputContainer:{
        flexDirection:"row",
        padding:15,
        alignItems:"center",
        width:"100%"
    },
    input:{
        marginRight:15,
        flex:1,
        bottom:0,
        height:40,
        color:"gray",
        borderRadius:30,
        padding:10,
        backgroundColor:"#ececec"
    }
})
