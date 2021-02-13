const DdayForm = document.querySelector(".js-DdayForm"),
    DdayInput = DdayForm.querySelector(".js-Dday"),
    DdayDescription = DdayForm.querySelector('.js-DdayDescription'),
    DdayList = document.querySelector(".js-DdayList");

const D_DAY_LS = "Dday";

let Ddays = []
let DdayNumbers = 1;

function deleteDday(event){
    const btn = event.target
    const li = btn.parentNode
    DdayList.removeChild(li)
    const cleanDday = Ddays.filter(function(Dday){
        return Dday.id !== parseInt(li.id)
    });
    Ddays = cleanDday
    saveDday();
}

function saveDday(){
    localStorage.setItem(D_DAY_LS, JSON.stringify(Ddays));
}

function DdayLoad(Dday){
    const ONE_DAY_MILLISECOND = 86400000;
    const currentDate = new Date();
    const day = new Date(`${Dday}:00:00:00+0900`);
    const remainMillseconds = day - currentDate;
    const remainDay = Math.ceil(remainMillseconds / ONE_DAY_MILLISECOND);
    if(remainDay === -0){
        return 'D-day'
    } else if (remainDay < 0){
        return `D+${Math.abs(remainDay)}`
    } else{
        return `D-${remainDay}`
    }
}

function paintDday(text, Dday, highLight=false){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const description = document.createElement("span");
    const day = document.createElement("span");
    const DdaySpan = document.createElement('span')
    const newId = DdayNumbers++;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteDday)
    description.innerText = text
    day.innerText = Dday
    DdaySpan.innerText = DdayLoad(Dday);
    li.appendChild(delBtn);
    li.appendChild(description);
    li.appendChild(day);
    li.appendChild(DdaySpan)
    li.id = newId;
    if (highLight === true) {
        li.classList.add('highLight')
    }
    DdayList.appendChild(li);
    querySelectorLi();
    const DdayObj = {
        text,
        id: newId,
        Dday,
        highLight
    };
    Ddays.push(DdayObj);
    saveDday();
}


function handleSubmit(event){
    event.preventDefault();
    const DdayValue = DdayInput.value;
    const descriptionValue = DdayDescription.value;
    paintDday(descriptionValue, DdayValue);
    DdayInput.value = "";
    DdayDescription.value = "";
}

function loadLinks(){
    const loadedDday = localStorage.getItem(D_DAY_LS);
    if(loadedDday !== null){
        const parsedLinks = JSON.parse(loadedDday);
        parsedLinks.forEach(function(Dday){
            paintDday(Dday.text, Dday.Dday, Dday.highLight)
        })
    }
}
function init(){
    loadLinks();
    DdayForm.addEventListener("submit", handleSubmit)
}
init();
