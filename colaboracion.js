

const input1 = document.getElementById("input1");
const signo = document.getElementById("signo");
const input2 = document.getElementById("input2");
const resultado = document.getElementById("resultado");
const form = document.getElementById("divInputs");
const imagenCorrecta =  document.getElementById("imagenPerdida")
const imagenIncorrecta = document.getElementById("imagen");



form.addEventListener("submit", function(a){

   a.preventDefault()


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
    if (!isNaN(parseFloat(resultado.innerText))){
     imagenCorrecta.classList.remove("oculto")
    }
  } else {
    imagenIncorrecta.classList.remove("oculto")
    imagenCorrecta.classList.add("oculto")
    resultado.innerText = "XD";

  }

});



window.addEventListener('click', () => {
  const audio = new Audio('Record (online-voice-recorder.com).mp3');
  audio.preload = 'auto';
  audio.play().catch(error => {
    console.error('La reproducción automática fue bloqueada:', error);
  });
  document.getElementById("XD").classList.remove("animation");
  setTimeout(() => {
    document.getElementById("XD").classList.add("animation")
  }, 1000);
 
  // Una vez que el audio se ha intentado reproducir, removemos el event listener
});
