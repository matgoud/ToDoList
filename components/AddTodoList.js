const API_URL = 'http://graphql.unicaen.fr:4000'

const AddTodoList = `
mutation CreateTodoLists($input: [TodoListCreateInput!]!) {
  createTodoLists(input: $input) {
    todoLists {
      id
      owner {
        username
      }
      title
    }
  }
}
`

export function addtodolist(username,token,name) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: AddTodoList,
      variables: {
        input: [
          {
            title: name,
            owner: {
              connect: {
                where: {
                  username: username
                }
              }
            }
          }
        ]
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
      return jsonResponse.data.createTodoLists
    })
    .catch(error => {
      throw error
    })
}