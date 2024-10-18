

const display = document.getElementById("display");

function lcc (input){
    display.value += input;
}

function Borrar(){
    display.value = "";
}

function Calcular(){
    try{
        display.value = eval(display.value);
    }
    catch(error){
        display.value = "lcccxcv";
    }
}