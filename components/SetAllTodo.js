const API_URL = 'http://graphql.unicaen.fr:4000'

const SetAllTodo = `
mutation Mutation($where: TodoWhere, $update: TodoUpdateInput) {
  updateTodos(where: $where, update: $update) {
    todos {
      done
      id
    }
  }
}
`

export function setalltodo(username,token,listID,value) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: SetAllTodo,
      variables: {
        where: {
          belongsTo: {
            owner: {
              username: username
            },
            id : listID
            //title: "todolist mega cool"
          },
        },
        update: {
          done: value
        }
      }
    })
  })
    .then(response => {
      return response.json().then((data) => {
        //alert(data);
        return data;
    });
    })
    .then(jsonResponse => {
      if (jsonResponse.errors != null) {
        throw jsonResponse.errors[0]
      }
      return jsonResponse.data.todos
    })
    .catch(error => {
      throw error
    })
}