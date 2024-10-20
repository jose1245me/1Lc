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
    animacion(document.getElementById("preForm"), document.getElementById("register"));
});

document.getElementById("registerBack").addEventListener("click", () => {
    animacion(document.getElementById("register"), document.getElementById("preForm"));
});