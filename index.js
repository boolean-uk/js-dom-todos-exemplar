const state = {
  todos: []
}

function getTodos() {
  fetch('http://localhost:3000/todos')
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
      //Really important side note -we don't updated the 
      //updatedTodo - because that's the response from the 
      //server. We want to update the todo that was passed
      //to the function because that's the one stored in the
      //state - so by updating that, when we call render,
      //it will be updated on the page.

      //Update the state - set the todo object as completed
      todo.completed = true
      //Render the page
      render()
    })
}

const todoListEl = document.querySelector('#todo-list')
const todoFormEl = document.querySelector('#todo-form')
const todoInputEl = document.querySelector('#todo-input')

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