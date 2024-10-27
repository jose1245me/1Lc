export function setupEventHandlers(animacion, handleLogin, handleRegister) {
    document.getElementById("emailRegister").addEventListener("click", () => {
      animacion(document.getElementById("preForm"), document.getElementById("register"), '/register');
    });
  
    document.getElementById("loginText").addEventListener("click", () => {
      animacion(document.getElementById("preForm"), document.getElementById("login"), '/login');
    });
  
    document.getElementById("registerBack").addEventListener("click", () => {
      animacion(document.getElementById("register"), document.getElementById("preForm"), '/');
    });
  
    document.getElementById("loginBack").addEventListener("click", () => {
      animacion(document.getElementById("login"), document.getElementById("preForm"), '/');
    });
  
    const registerForm = document.getElementById("registerInputs");
    registerForm.addEventListener("submit", handleRegister);
  
    const loginForm = document.getElementById("loginInputs");
    loginForm.addEventListener("submit", handleLogin);
  }