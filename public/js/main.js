import { animacion } from './animations.js'; 
import { handleLogin, handleRegister } from './auth.js';
import { footerBtns, setupEventHandlers, USbuttons, UScontinueButton } from './domHandlers.js'; // funciones de otros js 

//localStorage.clear();
//usa eso si quieres cerrar sesion
async function fetchData() {
  const token = localStorage.getItem('token');

  if (!token) { 
    alert('No hay token disponible. Por favor, inicie sesión.');
    animacion(document.getElementById("main"), document.getElementById("preForm"));
    return null; // Retorna `null` si no hay token
  }

  try {
    const response = await fetch('http://localhost:3000/main', { 
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });

    console.log('Response:', response);
    if (response.ok) {
      const data = await response.json();
      animacion(document.getElementById("preForm"), document.getElementById("main"));
      alert("El token fue válido");
      
      const textos = document.getElementsByClassName("usernameTextContent");
      Array.from(textos).forEach(element => {
        element.innerText = data.nickname;
      });
      return data; // Retorna 'data' si la respuesta es válida
    } else if (response.status === 401) {
      localStorage.removeItem('token');
      alert('Su sesión ha expirado. Por favor, inicie sesión nuevamente.');
      animacion(document.getElementById("main"), document.getElementById("preForm"));
      return null; // Retorna `null` para indicar error de autenticación
    } else {
      console.error('Error en la respuesta:', response.status);
      alert('Error inesperado: ' + response.status);
      animacion(document.getElementById("main"), document.getElementById("preForm"));
      return null;
    }
  } catch (error) {
    console.error('Error en el fetch:', error);
    alert('Hubo un problema con la solicitud.');
    animacion(document.getElementById("main"), document.getElementById("preForm"));
    return null;
  }
}

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
footerBtns();

fetchData()
});
