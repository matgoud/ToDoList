import React, { useContext } from 'react'
import {View,Text} from 'react-native'
import { UsernameContext } from '../Context/Context'

export default function HomeScreen () {
    const [username, setUsername] = useContext(UsernameContext)

      return (
        <View>
          <Text>Bienvenue !</Text>
          <Text>Vous êtes actuellement connecté comme {username}</Text>
          <Text>Vous pouvez naviguer dans l'espace de selection des todolists
          afin de choisir ou créer une nouvelle todolist
            puis selectionner le menu des todos afin de créer supprimer et modifier
            vos taches a faire vous pouvez vous déconnecter avec signout quand vous avez
            fini!
          </Text>
            <Text> </Text>
            <Text>
            créé par Clément Bartolone et Mathieu Goudal

            </Text>

        </View>
      )
}