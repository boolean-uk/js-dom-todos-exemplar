const state = {
  todos: [],
  uncompletedOnly: false
}

function getTodos() {
  let url = 'http://localhost:3000/todos'
  if(state.uncompletedOnly) {
    url += '?completed=false'
  }

  fetch(url)
    .then(function(response){
      return response.json()
    })
    .then(function(todos){
      //Update the state with the data from fetch
      state.todos = todos
      //Render the page using the state
      render()
    })
}

function addTodo(todo) {
  const options = {
    method: 'POST',
    headers : {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(todo)
  }

  fetch('http://localhost:3000/todos', options)
    .then(function(response){
      return response.json()
    })
    .then(function(todo){
      //Update the state - add the new todo in to the list
      state.todos.push(todo)
      //Render the page
      render()
    })
}

function completeTodo(todo) {
  //Use a patch request to update the completed
  //property of this todo only
  const options = {
    method: 'PATCH',
    headers : {
      'Content-Type' : 'application/json'
    },
    //We only want to update completed, so we only send that property
    body: JSON.stringify({
      completed: true
    })
  }

  fetch('http://localhost:3000/todos/' + todo.id, options)
    .then(function(response){
      return response.json()
    })
    .then(function(updatedTodo){
      //Reload the todos from the server - we could
      //also just updated the todo and call the render
      //function, but in this exemplar we have a toggle filter
      //so if the filter is on, we wouldn't want to display
      //the todo once it's completed, so would need to 
      //remove from the list here. To keep the code
      //simpler we just reload everything from the server
      //and that makes sure the correct filter logic
      //is applied
      getTodos()
    })
}

const todoListEl = document.querySelector('#todo-list')
const todoFormEl = document.querySelector('#todo-form')
const todoInputEl = document.querySelector('#todo-input')
const filterEl = document.querySelector('#uncompleted-filter')

filterEl.addEventListener('click', function() {
  //Update our state
  state.uncompletedOnly = filterEl.checked
  //Reload the todos from the server
  getTodos()
})

todoFormEl.addEventListener('submit', function(e) {
  e.preventDefault()
  
  const todo = {
    title: todoInputEl.value,
    completed: false
  }

  addTodo(todo)
})

function render() {
  clear()
  renderTodos()
}

function clear() {
  todoListEl.innerHTML = ''
  todoInputEl.value =''
}

function renderTodos() {
  for(const todo of state.todos) {
    const todoEl = document.createElement('li')
    todoEl.innerText = todo.title
    todoListEl.append(todoEl)

    if(todo.completed) {
      todoEl.setAttribute('style', 'color:grey; text-decoration: line-through;')
    } else {
      const completeButtonEl = document.createElement('button')
      completeButtonEl.innerText = 'Complete'
      todoListEl.append(completeButtonEl)

      //Call the complete Todo function to mark the todo 
      //as completed
      completeButtonEl.addEventListener('click', function() {
        completeTodo(todo)
      })

    }
  }
}

//When the page loads, fetch the Todos
getTodos()