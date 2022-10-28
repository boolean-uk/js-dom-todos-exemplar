// SELECT HTML ELEMENTS SO WE CAN WRITE TO THE PAGE
const list = document.querySelector(".todo-list");
const form = document.querySelector(".todo-form");
const errorElement = document.querySelector(".error");

// WORKSHOP OBJECTIVES
// Review how to organise and plan our work
// as we get started
// Demonstrate code to set up LOCAL STATE
// Review FETCH

// OBJ 1
// Make a GET request with fetch to http://localhost:3000/todos to
// load all Todos from the server and render them in a list.
// Completed Todos should be grey and scored out.

// OBJ 2
// when user clicks add, POST a new todo item
// option 1: detect form submit event; prevent default behaviour; send fetch POST reuqest for a new todo
// when repsonse comes back, add todo to state.todods and re-render list
// option 2: detect form input events and store the title of the new todo in state
// then continue with option 1

// STATE
const state = {
  todos: [],
};
// HANDLE ACTIONS CODE

// RENDER CODE
function createTodoLI(todo) {
  const li = document.createElement("li");
  li.innerText = todo.title;

  // if todo.complted === true, we strikethrough
  if (todo.completed === true) {
    li.setAttribute("class", "completed");
  }

  return li;
}

function renderAllTodos() {
  // 3) when LOCAL state is updated, call a function to render the TODOS
  // a) clear the original list of todos
  list.innerHTML = "";
  // b) for each todo, I want to render a new todo
  state.todos.forEach((todo) => {
    // c) create a function that creates one HTML <li> for each todo
    const li = createTodoLI(todo);
    // d) add li to the list <ul>
    list.appendChild(li);
  });
}

// INIT - the first thing that is always run, when your page first loads
// 1) when page loads, call a function that makes a GET request for all TODOS
// fetch http://localhost:3000/todos with GET
function getAllTodosFromServer() {
  // this is a GET, no need to pass OPTIONS to fetch
  // call the fetch function
  fetch("http://localhost:4000/todos")
    // when I get a response, run the following 2 functions
    .then((responseFromServer) => {
      // check if my response was problematic:
      if (responseFromServer.status !== 200)
        throw Error("There was some problem GETting all Todos");
      // extracts the JSON data from the response and returns it from this function
      // the JSON data is returned as JS arrays and JS objects
      // what we return here becomes the parameter for the next then() function
      return responseFromServer.json();
    })
    .then((arrayOfTodos) => {
      // 2) on response from GET, update LOCAL state with the todos
      // state.todos is an array of all todos from the server
      state.todos = arrayOfTodos;
      // re-render my todo list
      renderAllTodos();
    })
    .catch((error) => {
      console.log("ERROR", error);
      errorElement.innerText = error.message;
    });
}

getAllTodosFromServer();
