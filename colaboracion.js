

const display = document.getElementById("display");

function lcc (input){
    display.value += input;
}

function Borrar(){
    display.value = "";
}

function Calcular(){
        display.value = eval(display.value);
    if(isNaN(display.value)){
        display.value = "lclxlxlxxxxctu"
    }
    
}