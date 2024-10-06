const input1 = document.getElementById("input1");
const signo = document.getElementById("signo");
const input2 = document.getElementById("input2");
const resultado = document.getElementById("resultado");
const btn = document.getElementById("btn");


btn.addEventListener("click", function () {

    let n1 = parseFloat(input1.value);
    let operador = signo.value;
    let n2 = parseFloat(input2.value);




  if (
    !isNaN(n1) &&
    !isNaN(n2) &&
    (operador === "+" ||
      operador === "-" ||
      operador === "/" ||
      operador === "*")
  ) {
    document.getElementById("imagen").classList.add("oculto")
    switch (operador) {
      case "+":
        resultado.innerText = n1 + n2;
        break;
      case "-":
        resultado.innerText = n1 - n2;
        break;
      case "*":
        resultado.innerText = n1 * n2;
        break;
      case "/":
        resultado.innerText = n1 / n2;
        break;
    }
  } else {
    document.getElementById("imagen").classList.remove("oculto")
    resultado.innerText = "XD";

  }
});
