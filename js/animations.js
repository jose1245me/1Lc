export function animacion(oldDiv, newDiv, newUrl) {
    if (oldDiv.classList.contains("show")) {
      oldDiv.classList.remove("show");
    }
    oldDiv.classList.add("oculto");
  
    setTimeout(() => {
      oldDiv.classList.add("Dnone");
      newDiv.classList.remove("Dnone");
      newDiv.classList.remove("oculto");
      newDiv.classList.add("show");
      history.pushState(null, '', newUrl);
    }, 200);
  }