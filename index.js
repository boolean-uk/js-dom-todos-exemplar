const list = document.querySelector(".todo-list")
const form = document.querySelector(".todo-form")
const errorElement = document.querySelector(".error")

// Make a GET request with fetch to http://localhost:3000/todos to load all Todos from the server and render them in a list. Completed Todos should be grey and scored out.

function getAndRenderTodoList() {
  fetch("http://localhost:3000/todos")
    .then(res => res.json())
    .then(data => {
      renderTodoList(data)
    })
    .catch(e => {
      console.log(e)
      errorElement.innerText = "SORRY, NO LUCK TODAY!"
    })
}
function renderTodoList(todos) {
  // clear the html
  list.innerHTML = ""
  // loop through the todo items
  todos.forEach(todo => {
    // create the todo list item element
    const li = createTodoListItem(todo)
    // append to the list
    list.append(li)
  })
}

function createTodoListItem(todo) {
  const li = document.createElement("li")

  // Add a "Complete" button to each uncompleted Todo. When the user clicks it, make a PATCH request with fetch to http://localhost:3000/todos/[todoid] (replacing todoid with the actual ID of the todo) to update the todo as completed. Update the list of Todos without reloading the page.
  const completeButton = document.createElement("button")
  completeButton.innerText = "complete"
  completeButton.addEventListener("click", event => {
    // send a PATCH request
    const obj = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({completed: true})
    }
    fetch(`http://localhost:3000/todos/${todo.id}`, obj)
      .then(res => res.json())
      .then(data => {
        // rerender the list
        getAndRenderTodoList()
      })
    })

// Add a "Delete" button to each Todo. When the user clicks it, make a DELETE request with fetch to http://localhost:3000/todos/[todoid] (replacing todoid with the actual ID of the todo) to remove the todo. Update the list of Todos without reloading the page.
  const deleteButton = document.createElement("button")
  deleteButton.innerText = "delete"
  deleteButton.addEventListener("click", event => {
    // send a DELETE request
    const obj = {
      method: "DELETE",
    }
    fetch(`http://localhost:3000/todos/${todo.id}`, obj)
      .then(res => res.json())
      .then(data => {
        // rerender the list
        getAndRenderTodoList()
      })
    })

  li.innerText = todo.title
  li.append(deleteButton)

  if (todo.completed) {
    li.setAttribute("class", "completed")
  } else {
    li.append(completeButton)
  }

  return li
}

// When the form is submitted, make POST request with fetch to http://localhost:3000/todos to create a new Todo. Update the list of Todos without reloading the page.
form.addEventListener("submit", event => {
  // prevent page reload
  event.preventDefault()
  // get value from input field
  const title = event.target[0].value
  // make a POST request with data
  const obj = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({title: title, completed: false})
  }
  fetch(`http://localhost:3000/todos`, obj)
    .then(res => res.json())
    .then(data => {
      getAndRenderTodoList()
    })
  })


getAndRenderTodoList()
