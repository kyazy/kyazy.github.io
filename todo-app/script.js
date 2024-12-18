const form =document.querySelector('.todo-form');
const input =document.querySelector('.todo-input');
const todolist =document.querySelector('.todo-list');

let todos = [];

form.addEventListener('submit',(event)=>{
    event.preventDefault();
    const taskText = input.ariaValueMax.trim();

    if (taskText === '') return;

    const newTask={
        Id: Date.now(),
        text: taskText,
        completet: false,
    }

    todos.push(newTask);

    saveTodos();

    input.value='';

    renderTodos();
});

function renderTodos(){
    todolist.innerHTML='';
    todos.forEach((task)=>{
        const li= document.createElement('li');
        const checkbox=document.createElement('input');
        checkbox.type='checkbox';
        checkbox.checked=task.completed
        checkbox.setAttribute('aria-label', 'Aufgabe erledigen')
        checkbox.addEventListener('change', ()=>{
            task.completed=checkbox.checked;
            saveTodos();
            renderTodos();
        });

    const span=document.createElement('span');
    span.textContent=task.text

    if (task.completed) {
        span.style.textDecoration='line-through';
    }
    
    deleteButton.addEventListener('click'),()=>{
        todos=todos.filter((t) => t.id !== task.id);
        saveTodos();
        renderTodos();
    };

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    todolist.appendChild(li)
});
}
function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}
function loadTodos(){
    const savedtodos = localStorage.getItem('todos');
    if (savedtodos){
        todos = JSON.parse(savedtodos);
    } else{
        todos=[];
    }
}

loadTodos();
renderTodos();