const API_URL = 'http://graphql.unicaen.fr:4000'

const QueryTodo = `
query Query($where: TodoWhere) {
  todos(where: $where) {
    content
    done
    id
  }
}
`

export function querytodos(username,token,listID) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+token
    },
    body: JSON.stringify({
      query: QueryTodo,
      variables: {
        where: {
          belongsTo: {
            id: listID,
            owner: {
              username: username
            },
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
      return jsonResponse.data.todos
    })
    .catch(error => {
      throw error
    })
}