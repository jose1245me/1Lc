import { animacion } from "./animations.js";
//funcion de animaciones generales



export async function handleLogin(event) {
  event.preventDefault();
  const emailOrUser = document.getElementById("loginEmailInput").value;
  const password = document.getElementById("loginPasswordInput").value;
  //valor del input (lo que se puso dentro)




  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrUser, password }) //se entrega server.js el valor de los inputs 
    });

    const data = await response.json(); 
    if (response.ok) { //si la respuesta es positiva se inicia sesion
      alert("Inicio de sesión exitoso");
      const token = data.token;
      localStorage.setItem('token', token);
      console.log("token almacenado" + token)
      animacion(document.getElementById("login"), document.getElementById("main")); //pasa
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.log("Error en inicio de sesión", error.message);
  }
}

export async function handleRegister(event) {
  event.preventDefault();
  const nickname = document.getElementById("nicknameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;
  //valor de inputs



  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, email, password }),
    });


    const data = await response.json();
    if (response.ok) {
      alert("Registro exitoso");
      const token = data.token;
      localStorage.setItem('token', token);
      animacion(document.getElementById("register"), document.getElementById("unitsSelector"),); //pasa
    } else {
      alert("Error en el registro: " + data.message);
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("Error de conexión: " + error.message);
  }
}