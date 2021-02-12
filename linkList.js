const linkForm = document.querySelector(".js-linkForm"),
    linkInput = linkForm.querySelector(".js-link"),
    descriptionInput = linkForm.querySelector('.js-description'),
    linkList = document.querySelector(".js-linkList");

const LINK_LS = "links";

let links = []
let linkNumbers = 1;

function deleteLinkList(event){
    const btn = event.target
    const li = btn.parentNode
    linkList.removeChild(li)
    const cleanLinkList = links.filter(function(linkList){
        return linkList.id !== parseInt(li.id)
    });
    links = cleanLinkList
    saveLinkList();
}

function saveLinkList(){
    localStorage.setItem(LINK_LS, JSON.stringify(links));
}

function paintLinks(link, text, highLight=false){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const anchor = document.createElement("a");
    const newId = linkNumbers++;
    delBtn.innerText = "❌";
    delBtn.addEventListener("click", deleteLinkList)
    if(!link.includes('http')){
        link = `http://${link}`
    }
    anchor.setAttribute('href', link)
    anchor.setAttribute('target','_blink')
    anchor.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(anchor);
    li.id = newId;
    if (highLight === true) {
        li.classList.add('highLight')
    }
    linkList.appendChild(li);
    querySelectorLi();
    const linkObj = {
        text,
        id: newId,
        link,
        highLight
    };
    links.push(linkObj);
    saveLinkList();
}


function handleSubmit(event){
    event.preventDefault();
    const linkValue = linkInput.value;
    const descriptionValue = descriptionInput.value;
    paintLinks(linkValue, descriptionValue);
    linkInput.value = "";
    descriptionInput.value = "";
}

function loadLinks(){
    const loadedLinks = localStorage.getItem(LINK_LS);
    if(loadedLinks !== null){
        const parsedLinks = JSON.parse(loadedLinks);
        parsedLinks.forEach(function(linkList){
            paintLinks(linkList.link, linkList.text, linkList.highLight)
        })
    }
}
function init(){
    loadLinks();
    linkForm.addEventListener("submit", handleSubmit)
}
init();