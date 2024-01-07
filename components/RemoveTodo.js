const API_URL = 'http://graphql.unicaen.fr:4000'

const RemoveTodo = `
mutation DeleteTodos($where: TodoWhere) {
  deleteTodos(where: $where) {
    nodesDeleted
  }
}
`

export function removetodo(username,token,id) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: RemoveTodo,
      variables: {
        where: {
          belongsTo: {
            owner: {
              username: username,
            }
          },
          id : id
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
      return jsonResponse.data.deleteTodos
    })
    .catch(error => {
      throw error
    })
}