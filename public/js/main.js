import { animacion } from './animations.js'; 
import { handleLogin, handleRegister } from './auth.js';
import { setupEventHandlers, USbuttons, UScontinueButton } from './domHandlers.js'; // funciones de otros js 


// Iniciar funciones principales apenas se cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  setupEventHandlers(animacion, handleLogin, handleRegister);
  USbuttons(
    document.getElementById("USkg"),
    document.getElementById("USlb"),
    document.getElementById("USkm"),
    document.getElementById("USmiles"),
    document.getElementById("UScm"),
    document.getElementById("USin")
);

});


//localStorage.clear() 
//usa eso si quieres cerrar sesion


const token = localStorage.getItem('token'); // El token es como una llave para no tener que iniciar sesión reiteradas veces

if (!token) { 
  alert('No hay token disponible. Por favor, inicie sesión.');
  // podrías hacer algo más aquí, como redirigir a la página de inicio
} else {
  fetch('http://localhost:3000/main',{ 
    method: 'GET',
    headers: {
      'Authorization': token // usar token 
    }
  })
  .then(response => {
    console.log('Response:', response);
    if (response.ok) {
      animacion(document.getElementById("preForm"), document.getElementById("main"))
      alert("el token fue valido")
    } else if (response.status === 401) { // no fue autorizado (no válido)
      localStorage.removeItem('token'); // limpiar
      alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
      animacion(document.getElementById("main"), document.getElementById("preForm"))
    } else {
      console.error('Error en la respuesta:', response.status);
      alert('Error inesperado: ' + response.status); // error por otra cosa
      animacion(document.getElementById("main"), document.getElementById("preForm"))
    }
  });
}