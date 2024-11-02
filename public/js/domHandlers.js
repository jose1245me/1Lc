import { inputValidEmail, inputValidPassword, inputValidUser } from './validation.js';
import { animacion } from './animations.js';
//funciones de validacion para inputs de register(check y X), (login no necesita)


export function setupEventHandlers(animacion, handleLogin, handleRegister) {
    document.getElementById("emailRegister").addEventListener("click", (a) => {
        animacion(document.getElementById("preForm"), document.getElementById("register"));
    });

    document.getElementById("loginText").addEventListener("click", (a) => {
        animacion(document.getElementById("preForm"), document.getElementById("login"));
    });

    document.getElementById("registerBack").addEventListener("click", (a) => {
        animacion(document.getElementById("register"), document.getElementById("preForm"));
    });

    document.getElementById("loginBack").addEventListener("click", (a) => {
        animacion(document.getElementById("login"), document.getElementById("preForm"));
    });
    //animaciones generales para eventos como "click"








    const registerForm = document.getElementById("registerInputs");
    registerForm.addEventListener("submit", handleRegister);

    const loginForm = document.getElementById("loginInputs");
    loginForm.addEventListener("submit", handleLogin);
    //botones para continuar de forms cuando se les hace click




    // Agregar validaciones para los campos de registro
    const emailInput = document.getElementById("emailInput");
    const passwordInput = document.getElementById("passwordInput");
    const nicknameInput = document.getElementById("nicknameInput");
    //inputs

    inputValidEmail(emailInput);
    inputValidPassword(passwordInput); //check o x 
    inputValidUser(nicknameInput);

 
 
    function registerUpdateContinueButtonState() {
        const isEmailValid = !document.getElementById("correctEmail").classList.contains("Dnone");
        const isPasswordValid = !document.getElementById("correctPassword").classList.contains("Dnone");
        const isUserValid = !document.getElementById("correctUser").classList.contains("Dnone");
    
        const continueButton = document.getElementById("registerContinueButton");
        if((isEmailValid && isPasswordValid && isUserValid)){
            continueButton.disabled = false;
            continueButton.classList.add("valid");
            
        } else{
            continueButton.classList.remove("valid")
            continueButton.disabled = true;
    }
    }
     //funcion para boton de register

    emailInput.addEventListener("input", registerUpdateContinueButtonState);
    passwordInput.addEventListener("input",  registerUpdateContinueButtonState);
    nicknameInput.addEventListener("input", registerUpdateContinueButtonState)
    //que se actualice la funcion cada que se cambia un valor en los input



    
    // boton para login
    const loginEmailInput = document.getElementById("loginEmailInput");
    const loginPasswordInput = document.getElementById("loginPasswordInput");


    function loginUpdateContinueButtonState() {
        const IsEmailOrUserValid = document.getElementById("loginEmailInput").value !== "";
        const IsPasswordValid = document.getElementById("loginPasswordInput").value !== "";
        
        const continueButton = document.getElementById("loginContinueButton");
        if(IsEmailOrUserValid && IsPasswordValid){
            continueButton.disabled = false;
            continueButton.classList.add("valid");
            
        } else{
            continueButton.classList.remove("valid")
            continueButton.disabled = true;
        }
    }   
    
    //cada que se cambia un valor en el input se llama a la funcion
    loginEmailInput.addEventListener("input",  loginUpdateContinueButtonState);
    loginPasswordInput.addEventListener("input",  loginUpdateContinueButtonState);
}

export function USbuttons(kg, lb, km, miles, cm, inches){ //botones de unidades

    const change = (n1, n2) => {
        n1.classList.add("UStrueBtn");
        n2.classList.remove("UStrueBtn");
    }

    kg.addEventListener("click", ()=> change(kg, lb));
    lb.addEventListener("click", ()=> change(lb, kg));
    km.addEventListener("click", ()=> change(km, miles));
    miles.addEventListener("click", ()=> change(miles, km));
    cm.addEventListener("click", ()=> change(cm, inches));
    inches.addEventListener("click", ()=> change(inches, cm));
} 
USbuttons(
    document.getElementById("USkg"),
    document.getElementById("USlb"),
    document.getElementById("USkm"),
    document.getElementById("USmiles"),
    document.getElementById("UScm"),
    document.getElementById("USin")
);


export function UScontinueButton(button){
    const units = document.querySelectorAll(".UStrueBtn");
    button.addEventListener("click", ()=>{
        button.disabled = true;
        units.forEach(element => {
            localStorage.setItem(element.id, element.textContent) //guardar preferencias del usuario
        });
    animacion(document.getElementById("unitsSelector"), document.getElementById("main"));

    })
}

UScontinueButton(document.getElementById("UScontinueBtn"))

