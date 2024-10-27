export function inputValidEmail(input) {
    input.addEventListener("input", () => {
      input.value = input.value.trim();
      let isValid = true;
  
      if (
        input.value.length > 0 &&
        input.value.endsWith("@gmail.com") &&
        input.value.length > 10
      ) {
        for (let i = 0; i < input.value.length; i++) {
          const element = input.value[i];
          if (
            "&=\\'-<>+,".includes(element) ||
            (element === "." && input.value[i + 1] === ".")
          ) {
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
      if (input.value === "") {
        document.getElementById("invalidEmail").classList.add("Dnone");
      }
    });
  }
  
  export function inputValidPassword(input) {
    input.addEventListener("input", () => {
      input.value = input.value.trim();
      const isValid = input.value.length > 5;
      document.getElementById("correctPassword").classList.toggle("Dnone", !isValid);
      document.getElementById("invalidPassword").classList.toggle("Dnone", isValid);
      if (input.value === "") {
        document.getElementById("invalidPassword").classList.add("Dnone");
      }
    });
  }
  
  export function inputValidUser(input) {
    input.addEventListener("input", () => {
      input.value = input.value.trim();
      const isValid = input.value.length > 3;
      document.getElementById("correctUser").classList.toggle("Dnone", !isValid);
      document.getElementById("invalidUser").classList.toggle("Dnone", isValid);
    });
  }