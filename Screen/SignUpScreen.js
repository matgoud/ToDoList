import React, { useState,useContext } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
} from 'react-native'
import { TokenContext,UsernameContext } from '../Context/Context'
import { signUp } from '../components/SignUp.js'

export default function SignUpScreen ({navigation}) {
  const[login,setlogin] = useState('');
  const[username,setUsername]=useContext(UsernameContext);
  const[token,setToken]=useContext(TokenContext);
  const[error,setError]=useState('');
  const[password1,setpassword1] = useState('');
  const[password2,setpassword2] = useState('');
  const onSubmit = () => {
    signUp(login, password1)
    .then(t => {
      setToken(t)//on chope le token et basta
      setUsername(login)
      //pas besoin de naviger il y a une condition dans le composant 
    })
    .catch(err => {
      console.log('error', err)
      setError(err.message)
    })
  }
    return (
      <>
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
            value={password1}
            placeholder="Mot de passe"
            onChangeText={text => setpassword1(text)}
          />
        </View>
        </View>
        
        <View style={styles.textInput_group}>

        <View>
          <TextInput
            style={styles.textinput_view}
            secureTextEntry={true}
            value={password2}
            placeholder="Confirmation mot de passe"
            onChangeText={text => setpassword2(text)}
            />
        </View>
        <View style={styles.buttoninput_view}>
          <Button title="S'inscrire" onPress={onSubmit}/>
        </View>
        </View>
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