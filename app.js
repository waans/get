const todoinput = document.querySelector(".todo-input") ;
const todoButton = document.querySelector(".todo-button") ;
const todoList = document.querySelector(".todo-list") ;
const filterOption = document.querySelector(".filter-todo") ;


document.addEventListener("DOMContentLoaded", getTodos) ;
todoButton.addEventListener('click',addTodo) ;
todoList.addEventListener('click',deletecheck) ;
filterOption.addEventListener('click',filterTodo) ;




function addTodo(event) {
	event.preventDefault() ;



	const todoDiv = document.createElement("div") ;
	todoDiv.classList.add("todo") ;

	const newTodo = document.createElement("li") ;
	newTodo.innerText = todoinput.value  ;
	newTodo.classList.add("todo-item") ;
	todoDiv.appendChild(newTodo) ;


	saveLocalTodos(todoinput.value) ;


	const completedButton = document.createElement('button') ;
	completedButton.innerHTML = '<i class = "fas fa-check"> </i>' ;
	completedButton.classList.add("complete-btn") ;
	todoDiv.appendChild(completedButton) ;


	const trushButton = document.createElement('button') ;
	trushButton.innerHTML = '<i class ="fas fa-trash"></i>' ;
	trushButton.classList.add("trash-btn") ;
	todoDiv.appendChild(trushButton) ;

	todoList.appendChild(todoDiv) ;

	todoinput.value = '' ;


}


function deletecheck(e){
 	const item = e.target ;

 	if (item.classList[0] === "trash-btn") {
 	 	const todo = item.parentElement ;
 		todo.remove() ;
 		removeLocalTodos(todo) ;
 	}
 	if (item.classList[0] === "complete-btn") {
		const todo = item.parentElement ;
		todo.classList.toggle("completed") ;		
 	}
}


function filterTodo(e) {
	const todos = todoList.childNodes ;
	todos.forEach(function(todo) {
		switch(e.target.value) {
			case "all" : 	
				todo.style.display = 'flex' ;
				break ;
			case "completed": 	
				if(todo.classList.contains('completed')) {
					todo.style.display = 'flex' ;
				}
				else {
					todo.style.display = 'none' ;
				}
				break ;
			case "uncompleted" : 
				if(!todo.classList.contains('completed')) {
					todo.style.display = 'flex' ;
				}
				else {
					todo.style.display = 'none' ;
				}
				break ;
		}
	});
}



function saveLocalTodos(todo) {
	let todos ;

	if(localStorage.getItem('todos') === null) {todos = [] ;}
	else {
		todos = JSON.parse(localStorage.getItem("todos")) ;
	}
	todos.push(todo) ;
	localStorage.setItem("todos", JSON.stringify(todos)) ;
}





function getTodos() {

let todos ;

	if(localStorage.getItem('todos') === null) {todos = [] ;}
	else {
		todos = JSON.parse(localStorage.getItem("todos")) ;
	}
	todos.forEach(function(todo) {
		const todoDiv = document.createElement("div") ;
		todoDiv.classList.add("todo") ;

		const newTodo = document.createElement("li") ;
		newTodo.innerText = todo  ;
		newTodo.classList.add("todo-item") ;
		todoDiv.appendChild(newTodo) ;



		const completedButton = document.createElement('button') ;
		completedButton.innerHTML = '<i class = "fas fa-check"> </i>' ;
		completedButton.classList.add("complete-btn") ;
		todoDiv.appendChild(completedButton) ;


		const trushButton = document.createElement('button') ;
		trushButton.innerHTML = '<i class ="fas fa-trash"></i>' ;
		trushButton.classList.add("trash-btn") ;
		todoDiv.appendChild(trushButton) ;

		todoList.appendChild(todoDiv) ;

	});

}

function removeLocalTodos (todo) {
	let todos ;

	if(localStorage.getItem('todos') === null) {todos = [] ;}
	else {
		todos = JSON.parse(localStorage.getItem("todos")) ;
	}

	const todoIndex = todo.children[0].innerText ;
	todos.splice(todos.indexOf(todoIndex),1) ;
	localStorage.setItem("todos", JSON.stringify(todos)) ;
}














