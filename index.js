const todoList = document.getElementById('todo-list');

const getTodos = () => {
  fetch('http://localhost:3000/todos')
    .then((res) => res.json())
    .then((res) => renderTodos(res));
};

const renderTodos = (todos) => {
  const todosList = todos.map((todo) => {
    return `<li>${todo.title} </li>`;
  });
  todoList.innerHTML = todosList.join('');
};

getTodos();
