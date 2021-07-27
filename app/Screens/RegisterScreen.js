import React, { useState } from 'react'
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native'
import { Image, Button, Input ,Text } from "react-native-elements"
import { StatusBar } from "expo-status-bar"
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { auth } from "../../firebase";

export default function RegisterScreen({navigation}) {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    const handleRegister = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser)=>{
            // console.log(authUser)
            authUser.user.updateProfile({
                displayName:name,
                photoURL:imageUrl || "https://www.pngkit.com/png/full/302-3022217_roger-berry-avatar-placeholder.png"
            })
        })
        .catch((error)=>alert(error.message))
    }

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
                <Text style={styles.logoText}>Create Signal Account</Text>
                <View style={styles.inputContainer}>
                    <Input 
                        placeholder="Full Name" 
                        autoFocus={true} 
                        value={name} 
                        onChangeText={(text) => setName(text)}
                    />
                    <Input 
                        placeholder="Email" 
                        value={email} 
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Input 
                        placeholder="Password" 
                        // secureTextEntry={true}
                        value={password} 
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Input 
                        placeholder="Profile Picture URL(optional)" 
                        value={imageUrl} 
                        onChangeText={(text) => setImageUrl(text)}
                    />
                </View>

                <View style={styles.button}>
                    <Button 
                        raised={true} 
                        style={styles.button} 
                        onPress={handleRegister} 
                        title="Register" 
                    />
                </View>
                <View style={styles.button}>
                    <Button 
                        style={styles.button} 
                        onPress={()=>navigation.navigate("Login")} 
                        type="outline" 
                        title="Login"  
                    />
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
    },
    logoText:{
    fontWeight:"bold",
    fontSize:22,
    marginVertical:15
    }
})
