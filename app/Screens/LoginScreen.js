import React, { useEffect, useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Image, Button, Input } from "react-native-elements"
import { StatusBar } from "expo-status-bar"
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { auth } from "../../firebase"

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);


export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged((authUser)=>{
            console.log("LOGIN")
            // console.log(authUser)
            if (authUser) {
                navigation.replace("Messages")
            }
        })
        return unsubscribe
    },[])

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(email, password)
        .then((authUser)=>{
            // console.log(authUser)
            if (authUser) {
                navigation.replace("Messages")
            }
        })
        .catch((error)=>alert(error.message))
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView enabled={true}>
                <StatusBar style="light" />
                <View style={styles.logo}>
                    <Image
                        style={{height:150, width:150}} 
                        source={{
                            uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                        }}
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <Input 
                        placeholder="Email" 
                        autoFocus={true} 
                        value={email} 
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input 
                        placeholder="Password" 
                        // secureTextEntry 
                        value={password} 
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>

                <View style={styles.button}>
                    <Button raised={true} onPress={handleLogin} title="Login"  />
                </View>
                <View style={styles.button}>
                    <Button onPress={()=>navigation.navigate("Register")} type="outline" title="Register" />
                </View>
                    

                <View style={{height:100}} />
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:"center",
        alignItems:"center",
        flex:1,
        padding:10,
        backgroundColor:"white"
    },
    logo:{
        alignSelf:"center",
    },
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10,
        alignSelf:"center"
    }
})
