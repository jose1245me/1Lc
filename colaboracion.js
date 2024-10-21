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
    const isEmailValid = !document.getElementById("correctEmail").classList.contains("Dnone");
    const isPasswordValid = !document.getElementById("correctPassword").classList.contains("Dnone");
    const isUserValid = !document.getElementById("correctUser").classList.contains("Dnone");

    if (isEmailValid && isPasswordValid && isUserValid) {
        document.getElementById("formContinueButton").classList.add("valid");
        document.getElementById("formContinueButton").disabled = false; 
    } else {
        document.getElementById("formContinueButton").classList.remove("valid");
        document.getElementById("formContinueButton").disabled = true; 
    }
}


function inputValidEmail(input) {
    input.addEventListener("input", () => {
        input.value = input.value.trim();
        if (input.value.length > 0) {
            if (input.value.slice(-10) === "@gmail.com" && input.value.length - 10 > 0) {
                document.getElementById("correctEmail").classList.remove("Dnone");
                document.getElementById("invalidEmail").classList.add("Dnone");
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