export function animacion(oldDiv, newDiv) {
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

  //animacion que funciona con css y clases, el argumento oldDiv es el div actual y newDiv es el div al que se va a cambiar
 

