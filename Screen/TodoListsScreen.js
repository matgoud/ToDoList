import React, { useEffect, useState ,useContext} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  Switch
} from 'react-native'

import todolistData from '../Helpers/todolistData'
import TodoListItem from '../components/TodoList'
import { querytodolist } from '../components/QueryTodoList'
import { TokenContext,UsernameContext,TodoContext} from '../Context/Context'
import { removetodolist } from '../components/RemoveTodoList'
import { addtodolist } from '../components/AddTodoList'

export default function TodoList ({navigation}) {
  const[username,setUsername]=useContext(UsernameContext);
  const[token,setToken]=useContext(TokenContext);
  const[todocontext,setTodoContext]=useContext(TodoContext);
  const [todos, setTodos] = useState(todolistData)
  const [name, setName] = useState("rien")
  const [newTodoText, setNewTodoText] = useState('')

  //on va chercher les todolists dans la BDD  
  useEffect(() => {
    querytodolist(username,token).then( list =>{
      setTodos(list)
    }
    )
  },[username,token]);

  //permet de supprimer une todolist dans la BDD
  const deleteTodoList = id => {
    const newTodos = todos.filter(item => item.id != id)
    setTodos(newTodos)
    removetodolist(username,token,id);
    if(id == todocontext.id){
      setName("rien")
      setTodoContext({id: 0,title: "rien"})//on reset la selection pour eviter que l'utilisateur revienne dessus hehe
    }

  }
  
  //permet de selectionner une todolist afin d'en voir les todos
  const selectTodoList = item => {
    setTodoContext(item);
    setName(item.title)
  }
  
  //permet d'ajouter une nouvelle todolist dans la BDD
  const addNewTodoList = () => {
    if (newTodoText == '') return
    addtodolist(username,token,newTodoText).then(out =>{
      querytodolist(username,token).then( list =>{
        setTodos(list)
      })
    })
    setNewTodoText('')
  }

  return (
    
      <View style={{ margin: 10 }}>       
        <Text>{name} est selectionné</Text>
        <Text>Cliquez sur une todolist afin de la selectionner</Text>
        <View style={styles.textInput_group}>
          <View>
            <TextInput
              style={styles.textinput_view}
              onChangeText={setNewTodoText}
              placeholder="saisir ici le nom d'une nouvelle todolist"
              onSubmitEditing={addNewTodoList}
              value={newTodoText}
            />
          </View>
          <View style={styles.buttoninput_view}>
            <Button onPress={addNewTodoList} title='new' />
          </View>
        </View>
        <FlatList
          style={{ paddingLeft: 10 }}
          data={todos}
          renderItem={({ item }) => (
            <TodoListItem
              item={item}
              deleteTodo={deleteTodoList}
              selectItem={selectTodoList}
            />
          )}
        />
        
      </View>
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
