import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Image, Button, Input } from "react-native-elements"
import { StatusBar } from "expo-status-bar"
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function LoginScreen({navigation}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView enabled={true} style={styles.container} >
                <StatusBar style="light" />
                <Image 
                    source={{
                        uri:"https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"
                    }}
                    style={{height:150, width:150}}
                />
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
                    <Button style={styles.button} title="Login"  />
                </View>
                <View style={styles.button}>
                    <Button style={styles.button} onPress={()=>navigation.navigate("Register")} type="outline" title="Register" />
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
    inputContainer:{
        width:300
    },
    button:{
        width:200,
        marginTop:10
    }
})
