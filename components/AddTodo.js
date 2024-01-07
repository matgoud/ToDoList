const API_URL = 'http://graphql.unicaen.fr:4000'

const AddTodo = `
mutation Mutation($input: [TodoCreateInput!]!) {
  createTodos(input: $input) {
    todos {
      content
      done
      id
      belongsTo {
        title
      }
    }
  }
}
`

export function addtodo(token,listID,name) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: AddTodo,
      variables: {
        input: [
          {
            content: name,
            done: false,
            belongsTo: {
              connect: {
                where: {
                  id: listID,
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
      return jsonResponse.data.createTodos
    })
    .catch(error => {
      throw error
    })
}