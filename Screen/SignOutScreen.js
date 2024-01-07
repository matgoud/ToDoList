import React, { useContext } from 'react'
import {View,Text,Button} from 'react-native'
import { UsernameContext,TokenContext } from '../Context/Context'

  export default function SignOutScreen ({ navigation, route }) {
    const[username,setUsername]=useContext(UsernameContext);
    const[token,setToken]=useContext(TokenContext);


    //simple mais efficace
    const deconnection= ()=>{
      setUsername(null);
      setToken(null);
    }
    return (
      <View>
        <Text>hate de vous revoir!</Text>
        <Button title='Sign out' onPress={() => deconnection()} />
      </View>
      )
  }