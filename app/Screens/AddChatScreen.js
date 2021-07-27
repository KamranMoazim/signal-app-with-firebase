import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import React, { useEffect ,useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from "react-native-elements"
import { db } from '../../firebase';

export default function AddChatScreen({navigation}) {

    const [input,setInput] = useState("");

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:"Add a new Chat",
            headerLeft:null,
            headerBackTitle:"Chat"
        })
    },[navigation])

    const createChat = async () => {
        db.collection("chat").add({
            chatName:input,

        }).then(()=>{
            navigation.goBack()
        }).catch((error)=>alert(error))
    }

    return (
        <View style={styles.container}>
            <Input
                placeholder="Enter a Chat Name"
                onChangeText={(text)=>setInput(text)}
                leftIcon={() =>  <FontAwesome name="wechat" size={24} color="black" />}
            />
            <Button onPress={createChat} title="Create a new Chat" />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        padding:30,
        height:"100%"
    }
})
