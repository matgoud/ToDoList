import React ,{useState}from "react";
import { StyleSheet, View, TextInput, Button, Text, FlatList, Switch,Image, TouchableOpacity } from 'react-native';
import todolistData from "../Helpers/todoData";

export default function TodoListItem(props){
    return (
        <View style={styles.content}>
            <button onClick={(state) => {props.selectItem(props.item)}}>{props.item.title}</button>
            <TouchableOpacity onPress={(state) => {
                props.deleteTodo(props.item.id);
            }}>
                <Image source={require('../assets/trash-can-outline.png')} style={{ height: 24, width: 24 }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row'
    },
    text_item: {
        marginLeft: 10,
        width: 150
    }
})