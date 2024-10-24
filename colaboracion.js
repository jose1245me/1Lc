function animacion(oldDiv, newDiv) {
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
  animacion(
    document.getElementById("preForm"),
    document.getElementById("register")
  );
});

document.getElementById("registerBack").addEventListener("click", () => {
  animacion(
    document.getElementById("register"),
    document.getElementById("preForm")
  );
});
function updateContinueButtonState() {
  const isEmailValid = !document
    .getElementById("correctEmail")
    .classList.contains("Dnone");
  const isPasswordValid = !document
    .getElementById("correctPassword")
    .classList.contains("Dnone");
  const isUserValid = !document
    .getElementById("correctUser")
    .classList.contains("Dnone");

    const form = document.getElementById("registerImputs");
    
  if (isEmailValid && isPasswordValid && isUserValid) {
    document.getElementById("formContinueButton").classList.add("valid");
    document.getElementById("formContinueButton").disabled = false;
   

    form.addEventListener("submit", async function (a) {
        a.preventDefault();
        const nickname = document.getElementById("nicknameInput").value;
        const email = document.getElementById("emailInput").value;
        const password = document.getElementById("passwordInput").value;
  
        // Enviar los datos al servidor
        try {
          const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nickname, email, password }), // Datos a enviar al servidor
          });
  
          const data = await response.json();
          if (response.ok) {
            alert('Registro exitoso');
          } else {
            alert('Error en el registro: ' + data.message);
          }
        } catch (error) {
          alert('Error de conexión: ' + error.message);
        }
      });
      
  } else {
    document.getElementById("formContinueButton").classList.remove("valid");
    document.getElementById("formContinueButton").disabled = true;
  }
}

function inputValidEmail(input) {
  input.addEventListener("input", () => {
    input.value = input.value.trim();

    if (input.value.length > 0) {
      if (
        input.value.slice(-10) === "@gmail.com" &&
        input.value.length - 10 > 0
      ) {
        let isTrue = true;
        for (let i = 0; i < input.value.length; i++) {
          let element = input.value[i];
          if (
            element === "&" ||
            element === "=" ||
            element === "'" ||
            element === "-" ||
            element === "<" ||
            element === ">" ||
            element === "+" ||
            element === "," ||
            (element === "." &&
              i + 1 < input.value.length &&
              input.value[i + 1] === ".")
          ) {
            document.getElementById("correctEmail").classList.add("Dnone");
            document.getElementById("invalidEmail").classList.remove("Dnone");
            isTrue = false;
            break;
          }
          if (isTrue) {
            document.getElementById("correctEmail").classList.remove("Dnone");
            document.getElementById("invalidEmail").classList.add("Dnone");
          }
        }
      } else {
        document.getElementById("correctEmail").classList.add("Dnone");
        document.getElementById("invalidEmail").classList.remove("Dnone");
      }
    } else {
      document.getElementById("invalidEmail").classList.add("Dnone");
      document.getElementById("correctEmail").classList.add("Dnone");
    }
    updateContinueButtonState();
  });
}
inputValidEmail(document.getElementById("emailInput"));

function inputValidPassword(input) {
  input.addEventListener("input", () => {
    input.value = input.value.trim();
    if (input.value.length > 5) {
      document.getElementById("correctPassword").classList.remove("Dnone");
      document.getElementById("invalidPassword").classList.add("Dnone");
    } else {
      document.getElementById("correctPassword").classList.add("Dnone");
      document.getElementById("invalidPassword").classList.remove("Dnone");
    }
    updateContinueButtonState();
  });
}
inputValidPassword(document.getElementById("passwordInput"));

function inputValidUser(input) {
  input.addEventListener("input", () => {
    input.value = input.value.trim();
    if (input.value.length > 3) {
      document.getElementById("correctUser").classList.remove("Dnone");
      document.getElementById("invalidUser").classList.add("Dnone");
    } else {
      document.getElementById("correctUser").classList.add("Dnone");
      document.getElementById("invalidUser").classList.remove("Dnone");
    }
    updateContinueButtonState(); // Verifica el estado del botón
  });
}
inputValidUser(document.getElementById("nicknameInput"));
