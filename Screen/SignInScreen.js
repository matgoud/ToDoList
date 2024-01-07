import React, { useState,useContext } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
} from 'react-native'

import { signIn } from '../components/SignIn.js'
import { TokenContext,UsernameContext } from '../Context/Context'

export default function SignInScreen ({navigation}) {
  const[login,setlogin] = useState('');
  const[username,setUsername] = useContext(UsernameContext);
  const[password,setpassword] = useState('');
  const[token,setToken]=useContext(TokenContext);
  const[error,setError]=useState('');
  const onSubmit = () => {
    signIn(login, password)
    .then(t => {
      setToken(t)//on recupère le token
      setUsername(login)
    })
    .catch(err => {
      setError(err.message)
    })
    }
    return (
      <>
        <Text>  Veuillez rentrer vos identifiants:</Text>
      <View style={styles.textInput_group}>
        <View>
          <TextInput
            style={styles.textinput_view}
            value={login}
            placeholder="Nom d'utilisateur"
            onChangeText={text => setlogin(text)}
          />
        </View>
        <View>
          <TextInput
            style={styles.textinput_view}
            secureTextEntry={true}
            value={password}
            placeholder="Mot de passe"
            onChangeText={text => setpassword(text)}
          />
        </View>
      </View>
      <View style={styles.textInput_group}>
        <View style={styles.buttoninput_view}>
          <Button title="Sign in" onPress={onSubmit}/>
        </View>
      </View>
      <View>{error ? <Text>{error}</Text> : null }</View>
      </>
      
      
    )
  }

  const styles = StyleSheet.create({
    textInput_group: {
      flexDirection: 'row'
    },
    textinput_view: {
      margin: 12,
      borderWidth: 1,
      padding: 10
    },
    buttoninput_view: {
      margin: 12,
      paddingTop: 3
    }
  })