const list = document.querySelector(".todo-list");
const form = document.querySelector(".todo-form");
const errorElement = document.querySelector(".error");

// Make a GET request with fetch to http://localhost:3000/todos to load all Todos from the server and render them in a list. Completed Todos should be grey and scored out.

// Add a "Complete" button to each uncompleted Todo. When the user clicks it, make a PATCH request with fetch to http://localhost:3000/todos/[todoid] (replacing todoid with the actual ID of the todo) to update the todo as completed. Update the list of Todos without reloading the page.

function fetchTodoList() {
	fetch("http://localhost:3000/todos")
		.then((res) => res.json())
		.then((data) => {
			renderToDos(data);
		})
		.catch((e) => {
			console.log(e);
			errorElement.innerText = "SORRY, NO LUCK TODAY!";
		});
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	addToDo(e.target[0].value);
});

function renderToDos(data) {
	list.innerHTML = "";
	data.length !== 0 &&
		data.forEach((el) => {
			// create element
			const wrapper = document.createElement("li");
			wrapper.innerHTML = el.title;
			if (el.completed) {
				wrapper.classList.add("completed");
			} else {
				const completeTaskButton = document.createElement("button");
				completeTaskButton.innerHTML = "Complete";
				completeTaskButton.addEventListener("click", (e) => {
					e.preventDefault();
					completeToDo(el.id);
				});
				wrapper.append(completeTaskButton);
			}
			// delete listener
			const deleteTaskButton = document.createElement("button");
			deleteTaskButton.innerHTML = "Delete";
			deleteTaskButton.addEventListener("click", (e) => {
				e.preventDefault();
				deleteToDo(el.id);
			});
			wrapper.append(deleteTaskButton);
			// append item
			list.append(wrapper);
		});
}

function addToDo(value) {
	const fetchParams = {
		method: "POST",
		body: JSON.stringify({
			title: value,
			completed: false,
		}),
		headers: { "Content-Type": "application/json" },
	};
	fetch(`http://localhost:3000/todos`, fetchParams)
		.then((res) => res.json())
		.then((data) => {
			fetchTodoList();
			// clear input
			form.reset();
		})
		.catch((e) => {
			console.log(e);
		});
}

function deleteToDo(id) {
	const fetchParams = {
		method: "DELETE",
	};
	fetch(`http://localhost:3000/todos/${id}`, fetchParams)
		.then((res) => res.json())
		.then((data) => {
			fetchTodoList();
		})
		.catch((e) => {
			console.log(e);
		});
}

function completeToDo(id) {
	const fetchParams = {
		method: "PATCH",
		body: JSON.stringify({
			completed: true,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	};
	fetch(`http://localhost:3000/todos/${id}`, fetchParams)
		.then((res) => res.json())
		.then((data) => {
			fetchTodoList();
		})
		.catch((e) => {
			console.log(e);
		});
}

fetchTodoList();
