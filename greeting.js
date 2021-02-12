const greetingForm = document.querySelector(".js-greetingForm"),
  greetingInput = greetingForm.querySelector("input");

const greetingDiv = document.querySelector('.js-greetingDiv'),
  greeting = greetingDiv.querySelector(".js-greeting"),
  modifyBtn = greetingDiv.querySelector('button');

const USER_LS = "currentUser",
  HIDE_CN = 'hide';

function saveName(text){
  localStorage.setItem(USER_LS, text);
}

function handleUserNameSubmit(event){
  event.preventDefault()
  const currentValue = greetingInput.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName(){
  greetingForm.classList.remove(HIDE_CN);
  greetingDiv.classList.add(HIDE_CN);
  greetingForm.addEventListener("submit", handleUserNameSubmit)
}

function paintGreeting(text) {
  greetingForm.classList.add(HIDE_CN);
  greetingDiv.classList.remove(HIDE_CN);
  greeting.innerText = `"Hello ${text}"`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}
function modifyName(){
  const currentUser = localStorage.getItem(USER_LS);
  greetingInput.value = currentUser
  askForName();
}

function init() {
  loadName();
  modifyBtn.addEventListener('click',modifyName);
}

init();