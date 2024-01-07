const API_URL = 'http://graphql.unicaen.fr:4000'

const RemoveTodoList = `
mutation Mutation($where: TodoListWhere) {
  deleteTodoLists(where: $where) {
    nodesDeleted
  }
}
`

export function removetodolist(username,token,id) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: RemoveTodoList,
      variables: {
        where: {
          owner: {
            username: username
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
      return jsonResponse.data.deleteTodoLists
    })
    .catch(error => {
      throw error
    })
}