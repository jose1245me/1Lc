import { animacion } from './animations.js';
import { handleLogin, handleRegister } from './auth.js';
import { inputValidEmail, inputValidPassword, inputValidUser } from './validation.js';
import { setupEventHandlers } from './domHandlers.js';

// Inicialización de funciones
setupEventHandlers(animacion, handleLogin, handleRegister);

// Verificar el token al cargar la página
fetch('http://localhost:3000/home', { 
  method: 'GET',
  headers: {
    'Authorization': localStorage.getItem('token') || ''
  }
})
.then(response => {
  console.log('Response:', response);
  if (response.ok) {
    animacion(document.getElementById("preForm"), document.getElementById("home"), '/home');
  } else if (response.status === 401) {
    localStorage.removeItem('token');
    alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
    animacion(document.getElementById("home"), document.getElementById("preForm"), '/');
  } else {
    console.error('Error en la respuesta:', response.status);
    alert('Error inesperado: ' + response.status);
  }
});