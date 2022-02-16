const getTodos = () => {
  fetch('http://localhost:3000/todos')
    .then((res) => res.json())
    .then((res) => console.log(res));
};

getTodos();
