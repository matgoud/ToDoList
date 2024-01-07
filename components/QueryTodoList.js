const API_URL = 'http://graphql.unicaen.fr:4000'

const QueryTodoList = `
query Query($where: TodoListWhere) {
  todoLists(where: $where) {
    id
    title
  }
}
`

export function querytodolist(username,token) {
  
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: QueryTodoList,
      variables: {
        where: {
          owner: {
            username: username
          }
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
      return jsonResponse.data.todoLists
    })
    .catch(error => {
      throw error
    })
}