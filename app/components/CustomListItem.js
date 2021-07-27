import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from "react-native-elements"

export default function CustomListItem({id, chatName, enterChat}) {

    // console.log(chatName)

    return (
        <ListItem onPress={()=>{enterChat(id, chatName)}} id={id} bottomDivider={true}>
            <Avatar 
                rounded={true}
                source={{uri:"https://www.pngkit.com/png/full/302-3022217_roger-berry-avatar-placeholder.png"}} 
            />
            <ListItem.Content>
                <ListItem.Title style={{fontWeight:"bold"}}>
                    {chatName}
                </ListItem.Title>                
                <ListItem.Subtitle style={{fontWeight:"bold"}} ellipsizeMode="tail" numberOfLines={1}>
                    This is the subtitle of the messages. This is the subtitle of the messages.
                </ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({})
