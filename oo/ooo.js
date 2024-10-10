let winaudio = new Audio('mooneda.mp3')
let score = 0;
const imagendelhomero = document.getElementById("imagendelomero")
const box = document.getElementById("box");
const scoreDisplay = document.getElementById("score");
let homero = new Audio('dou.mp3.mp3')



function moveBox() {
    const gameArea = document.getElementById("gameArea");
    const maxX = gameArea.clientWidth - box.clientWidth;
    const maxY = gameArea.clientHeight - box.clientHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    box.style.left = randomX + "px";
    box.style.top = randomY + "px";
}

box.addEventListener("click", function() {
    score++;
    scoreDisplay.textContent = score;
    moveBox();
    imagendelhomero.classList.add("oculto")
     
    winaudio.play ()
    
    if ( score%5 === 0 )
    { 
        homero.play()
        imagendelhomero.classList.remove("oculto")
        
    }
  
});

moveBox();
