const bgImage = document.querySelector('body');

function paintImage(time){
    const image = new Image();
    image.src = `images/${time}.jpg`;
    image.classList.add("bgImage")
    bgImage.appendChild(image);
}
function getTime(){
    const currentTime = new Date().getHours();
    if(6 <= currentTime & currentTime <= 11){
        return 'morning'
    } else if(12 < currentTime & currentTime <= 18){
        return 'afternoon'
    } else{
        return 'night'
    }
}

function init(){
    time = getTime();
    paintImage(time);
}
init();