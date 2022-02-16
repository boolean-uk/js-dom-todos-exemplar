const todoList = document.getElementById('todo-list');
const addTodoForm = document.getElementById('add-todo-form');

const getTodos = () => {
  fetch('http://localhost:3000/todos')
    .then((res) => res.json())
    .then((res) => renderTodos(res));
};

const renderTodos = (todos) => {
  const todosList = todos.map((todo) => {
    if (todo.completed) {
      return `<li class='completed '>${todo.title} </li>`;
    }
    return `<li>${todo.title} </li>`;
  });
  todoList.innerHTML = todosList.join('');
};

const listenToAddTodoForm = () => {
  addTodoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newTodo = {
      title: event.target.title.value,
      completed: false
    };
    addTodo(newTodo);
  });
};

const addTodo = (newTodo) => {
  fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newTodo)
  })
    .then((res) => res.json())
    .then((todos) => getTodos());
};

listenToAddTodoForm();
getTodos();
