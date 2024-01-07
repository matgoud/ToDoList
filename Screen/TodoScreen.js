import React, { useEffect, useState ,useContext} from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  ProgressBar,
} from 'react-native'

import todoData from '../Helpers/todoData'
import TodoItem from '../components/TodoItem'
import { querytodos } from '../components/QueryTodo'
import { updatetodo } from '../components/UpdateTodo'
import { setalltodo } from '../components/SetAllTodo'
import { addtodo } from '../components/AddTodo'
import { removetodo } from '../components/RemoveTodo'
import { TokenContext,UsernameContext,TodoContext } from '../Context/Context'

export default function Todo () {
  const[username,setUsername]=useContext(UsernameContext);
  const[todocontext,setTodoContext]=useContext(TodoContext);
  const[token,setToken]=useContext(TokenContext);
  const [todos, setTodos] = useState(todoData)
  const [count, setCount] = useState(todos.filter(item => item.done).length)
  const [newTodoText, setNewTodoText] = useState('')
  const [taskfinish,SetFinishedTasks] = useState(true);
  const [taskunfinish,SetUnFinishedTasks] = useState(true);
  const [name, setName] = useState(todocontext.title)
  //on cherche tout les todos dans la BDD et on met a jour les informations comme le conteur
  useEffect(() => {
    querytodos(username,token,todocontext.id).then( list =>{
      setTodos(todoData);
      const newTodos = list;
      setTodos(newTodos)
      setCount(newTodos.filter(item => item.done).length)
    })
    setName(todocontext.title);
  },[username,token,todocontext]);
  const updateCount = offset => {
    setCount(count + offset)
  }

  //pour mettre a jour un item seul (modifie la valeur dans la BDD)
  const updateItem = id => {
    const val = todos.filter(item => item.id == id).filter(item => item.done).length
    let done = true;
    if (val == 1)done = false;
    const newTodos = todos.map((item) => {return {id: item.id, content: item.content, done: (item.id == id) ? ! item.done : item.done}})
    setTodos(newTodos)
    updatetodo(username,token,todocontext.id,id,done);
    setCount(newTodos.filter(item => item.done).length)
  }

  //suprime un todo dans la BDD
  const deleteTodo = id => {
    const newTodos = todos.filter(item => item.id != id)
    removetodo(username,token,id)
    setTodos(newTodos)
    setCount(newTodos.filter(item => item.done).length)
  }

  //ajout un todo dans la BDD
  const addNewTodo = () => {
    if (newTodoText != ''){
      addtodo(token,todocontext.id,newTodoText).then(out =>{
        querytodos(username,token,todocontext.id).then( list =>{
          setTodos(todoData);
          const newTodos = list;
          setTodos(newTodos)

        })
      })
    }
    setNewTodoText('')
  }
  
  //permet de cocher tout les items dans la BDD
  const checkAll = () => {
    const newTodos = todos.map((item) => {return {id: item.id, content: item.content, done: true}})
    setTodos(newTodos)
    setalltodo(username,token,todocontext.id,true);
    setCount(newTodos.length)
  }

  //permet de decocher tout les items dans la BDD
  const uncheckAll = () => {
    const newTodos = todos.map((item) => {return {id: item.id, content: item.content, done: false}})
    setTodos(newTodos)
    setalltodo(username,token,todocontext.id,false);
    setCount(0)
  }

  //permute les taches a cacher
  const ShowFinishedTasks = () =>{
    SetFinishedTasks(!taskfinish);
  }
  //permute les taches a cacher
  const ShowUnFinishedTasks = () =>{
    SetUnFinishedTasks(!taskunfinish)
  }

  return (
    
      <View style={{ margin: 10 }}>       
        <Text>{name} est selectionné</Text>
        <View style={styles.textInput_group}>
          <View>
            <TextInput
              style={styles.textinput_view}
              onChangeText={setNewTodoText}
              placeholder='saisir ici un nouvel item'
              onSubmitEditing={addNewTodo}
              value={newTodoText}
              />
          </View>
          <View style={styles.buttoninput_view}>
            <Button onPress={addNewTodo} title='new' />
          </View>
        </View>
        <View style={styles.buttoninput_view}>
              <Button onPress={checkAll} title='Cocher tous' />
              <Text> </Text>
              <Button onPress={uncheckAll} title='Décocher tous' />
              <Text> </Text>
              <Button onPress={ShowFinishedTasks} title={taskfinish ? "Cacher les cases cochées" : "Afficher les cases cochées"} />
              <Text> </Text>
              <Button onPress={ShowUnFinishedTasks} title={taskunfinish ? "Cacher les cases non cochées" : "Afficher les cases non cochées"} />
              
        </View>
        <View>
          <Text>{count} items réalisés</Text>
          <Text>progrés: {100*count/todos.length}%</Text>
          <Text> </Text>
        <ProgressBar
                color="#00aaaa"
                trackColor="#00000000"
                indeterminate={false}
                progress={count/todos.length}

              />
          <Text> </Text>
          
        </View>
        <View>
          <Text>Items:</Text>
        </View>

        <FlatList
          scrollEnabled={true}
          style={{ paddingLeft: 10,
            overflow:scroll }}
          data={(taskfinish == false && taskunfinish == false) ? (null) : ((taskfinish == false && taskunfinish == true) ? (todos.filter((item) => !item.done)) : (taskfinish == true && taskunfinish == false) ? (todos.filter((item) => item.done)) : (todos))}
          renderItem={({ item }) => (
          <TodoItem
            item={item}
            updateItem={updateItem}
            deleteTodo={deleteTodo}
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
    padding: 3,
  }
})
