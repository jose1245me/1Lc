function animacion(oldDiv, newDiv) { // funcion para animaciones
  if (oldDiv.classList.contains("show")) {
    oldDiv.classList.remove("show");
  }
  oldDiv.classList.add("oculto");

  setTimeout(() => {
    oldDiv.classList.add("Dnone");
    newDiv.classList.remove("Dnone");
    newDiv.classList.remove("oculto");
    newDiv.classList.add("show");
  }, 200);
}







document.getElementById("emailRegister").addEventListener("click", () => {
  animacion(document.getElementById("preForm"), document.getElementById("register"));
});
document.getElementById("loginText").addEventListener("click", ()=>{
  animacion(document.getElementById("preForm"), document.getElementById("login"));
})


document.getElementById("registerBack").addEventListener("click", () => {
  animacion(document.getElementById("register"), document.getElementById("preForm"));
});


document.getElementById("loginBack").addEventListener("click", () => {
  animacion(document.getElementById("login"), document.getElementById("preForm"));
});

function updateContinueButtonState() { //Revisa si los input son validos y el boton "continue" se habilita
  const isEmailValid = !document.getElementById("correctEmail").classList.contains("Dnone");
  const isPasswordValid = !document.getElementById("correctPassword").classList.contains("Dnone");
  const isUserValid = !document.getElementById("correctUser").classList.contains("Dnone");

  const continueButton = document.getElementById("formContinueButton");
  if (isEmailValid && isPasswordValid && isUserValid) {
    continueButton.classList.add("valid");
    continueButton.disabled = false;
  } else {
    continueButton.classList.remove("valid");
    continueButton.disabled = true;
  }
}

const form = document.getElementById("registerInputs");
form.addEventListener("submit", async function (a) {//funcion asincrona 
  a.preventDefault();
  const nickname = document.getElementById("nicknameInput").value;
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  try {
    const response = await fetch("http://localhost:3000/register", { //buscar server
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nickname, email, password }), //enviar datos
    });

    const data = await response.json(); //espera la respuesta o resultado
    if (response.ok) { //si esta correcto cambia de estado en la web
      animacion(document.getElementById("register"), document.getElementById("home") )
      
    } else {
      alert("Error en el registro: " + data.message);
    }
  } catch (error) {
    console.error("Error de conexión:", error);
    alert("Error de conexión: " + error.message);
  }
});

function inputValidEmail(input) { //validar email
  input.addEventListener("input", () => {
    input.value = input.value.trim();
    let isValid = true;

    if (input.value.length > 0 && input.value.endsWith("@gmail.com") && input.value.length > 10) {
      for (let i = 0; i < input.value.length; i++) {
        const element = input.value[i];
        if ("&=\\'-<>+,".includes(element) || (element === "." && input.value[i + 1] === ".")) {
          isValid = false;
          break;
        }
      }
      document.getElementById("correctEmail").classList.toggle("Dnone", !isValid);
      document.getElementById("invalidEmail").classList.toggle("Dnone", isValid);
    } else {
      document.getElementById("correctEmail").classList.add("Dnone");
      document.getElementById("invalidEmail").classList.remove("Dnone");
    }
    updateContinueButtonState();
  });
}

inputValidEmail(document.getElementById("emailInput"));

function inputValidPassword(input) { //validar password
  input.addEventListener("input", () => {
    input.value = input.value.trim();
    const isValid = input.value.length > 5;
    document.getElementById("correctPassword").classList.toggle("Dnone", !isValid);
    document.getElementById("invalidPassword").classList.toggle("Dnone", isValid);
    updateContinueButtonState();
  });
}

inputValidPassword(document.getElementById("passwordInput"));

function inputValidUser(input) { //validar user
  input.addEventListener("input", () => {
    input.value = input.value.trim();
    const isValid = input.value.length > 3;
    document.getElementById("correctUser").classList.toggle("Dnone", !isValid);
    document.getElementById("invalidUser").classList.toggle("Dnone", isValid);
    updateContinueButtonState();
  });
}

inputValidUser(document.getElementById("nicknameInput"));