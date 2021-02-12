let li = document.querySelectorAll('li')

function querySelectorLi(){
    li = document.querySelectorAll('li')
    li.forEach(item => {
        liClass = item.addEventListener('click', handleLiClick);
    })
}

function addHighLight(ulClassName,id){
    if(ulClassName === 'js-toDoList'){
        const indexObject = toDos.filter(function(toDo){
            return toDo.id === +id
        });
        const index = toDos.indexOf(indexObject[0])
        toDos[index]['highLight'] = true
        saveToDos();
    }
    if(ulClassName === 'js-DdayList'){
        const indexObject = Ddays.filter(function(toDo){
            return toDo.id === +id
        });
        const index = Ddays.indexOf(indexObject[0])
        Ddays[index]['highLight'] = true
        saveDday();
    }
    if(ulClassName === 'js-linkList'){
        const indexObject = links.filter(function(toDo){
            return toDo.id === +id
        });
        const index = links.indexOf(indexObject[0])
        links[index]['highLight'] = true
        saveLinkList();
    }
}

function deleteHighLight(ulClassName,id){
    if(ulClassName === 'js-toDoList'){
        const indexObject = toDos.filter(function(toDo){
            return toDo.id === +id
        });
        const index = toDos.indexOf(indexObject[0])
        toDos[index]['highLight'] = false
        saveToDos();
    }
    if(ulClassName === 'js-DdayList'){
        const indexObject = Ddays.filter(function(toDo){
            return toDo.id === +id
        });
        const index = Ddays.indexOf(indexObject[0])
        Ddays[index]['highLight'] = false
        saveDday();
    }
    if(ulClassName === 'js-linkList'){
        const indexObject = links.filter(function(toDo){
            return toDo.id === +id
        });
        const index = links.indexOf(indexObject[0])
        links[index]['highLight'] = false
        saveLinkList();
    }
}

function handleLiClick(event){
    const target = event.target
    if (target['localName'] === 'li') {
        const ulclassName = target.parentNode.className
        const className = target.className

        if(className === 'highLight') {
            event.target.classList.remove('highLight')
            deleteHighLight(ulclassName, target.id)
        } else{
            event.target.classList.add('highLight')
            addHighLight(ulclassName, target.id);
        }

    } else if(target['localName'] === 'span') {
        const ulclassName = target.parentNode.parentNode.className
        const className = target.parentNode.className
        if(className === 'highLight') {
            event.target.parentNode.classList.remove('highLight')
            deleteHighLight(ulclassName, target.parentNode.id);
        } else{
            event.target.parentNode.classList.add('highLight')
            addHighLight(ulclassName, target.parentNode.id);
        }
    }
}
