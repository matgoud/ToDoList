const API_URL = 'http://graphql.unicaen.fr:4000'

const UpdateTodo = `
mutation Mutation($where: TodoWhere, $update: TodoUpdateInput) {
  updateTodos(where: $where, update: $update) {
    todos {
      done
      id
    }
  }
}
`

export function updatetodo(username,token,listID,id,value) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: UpdateTodo,
      variables: {
        where: {
          belongsTo: {
            owner: {
              username: username
            },
            id : listID
            //title: "todolist mega cool"
          },
          id: id
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