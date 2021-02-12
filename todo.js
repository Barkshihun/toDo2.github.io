const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODO_LS = "toDos";

let toDos = []
let toDoNumbers = 1;

function deleteToDo(event){
    const btn = event.target
    const li = btn.parentNode
    toDoList.removeChild(li)
    const cleanToDo = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id)
    });
    toDos = cleanToDo
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text, highLight=false){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDoNumbers++;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteToDo)
    span.innerText = text
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    if (highLight === true) {
        li.classList.add('highLight')
    }
    toDoList.appendChild(li);
    querySelectorLi();
    const toDoObj = {
        text,
        id: newId,
        highLight
    };
    toDos.push(toDoObj);
    saveToDos();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODO_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text, toDo.highLight)
        })
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}
init();