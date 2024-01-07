import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './Navigation/Navigation';
import TodoItem from './components/TodoItem';
import TodoList from './components/TodoList';
import { TokenContext, UsernameContext,TodoContext} from './Context/Context'
import { ProgressBar } from 'react-native-web';

export default function App () {
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)
  const [todocontext, setTodoContext] = useState({id: 0,title: "rien",})

  return (
    <UsernameContext.Provider value={[username, setUsername]}>
        <TokenContext.Provider value={[token, setToken]}>
          <TodoContext.Provider value={[todocontext, setTodoContext]}>
            <Navigation />
          </TodoContext.Provider>
        </TokenContext.Provider>
      </UsernameContext.Provider>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
