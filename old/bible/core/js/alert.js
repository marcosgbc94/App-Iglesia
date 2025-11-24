/***** ALERT *****/

const alt = document.querySelector("#alert");
const msg = document.querySelector("#alert").querySelector("#message");

// Adminisstrador de Alertas
function alertManager(title, desc, isFatal, isQuery, functAccept){
    try {
        if(isRunning){
            if(!alertDisplayed){
                alertClean();
                if(title !== undefined && title !== null){
                    msg.querySelector("#title").innerHTML = title;
                    console.log(title);
                }
                if(desc !== undefined && desc !== null){
                    msg.querySelector("#desc").innerHTML = desc;
                    console.log(desc);
                }
                if(isFatal){
                    alertAddButton(true, "restart()", false);
                    msg.querySelector("#desc").innerHTML += " Se requiere actualizar la página haciendo clic en el botón Aceptar o presionando la tecla F5 de su teclado.";
                    alertShow();
                    isRunning = false;
                }else if(isQuery){
                    alertAddButton(true, functAccept, true);
                    alertShow();
                }else{
                    alertAddButton(true, "alertHide()", false);
                    alertShow();
                }
            }
        }
    } catch (error) {
        alert(error + " Error interno del sistema. Debe reiniciar con tecla F5 de su teclado.");
        isRunning = false;
    }
}

// Mostrar Alerta
function alertShow(){
    try {
        if(isRunning){
            activator(alt, true);
            activator(msg, true);
            alertDisplayed = true;
            document.activeElement.blur();
        }
    } catch (error) {
        alert(error + " Error interno del sistema. Debe reiniciar con tecla F5 de su teclado.");
        isRunning = false;
    }
}

// Esconder Alerta
function alertHide(){
    try {
        if(isRunning){
            activator(alt, false);
            activator(msg, false);
            alertClean();
            alertDisplayed = false;
        }
    } catch (error) {
        alert(error + " Error interno del sistema. Debe reiniciar con tecla F5 de su teclado.");
        isRunning = false;
    }
}

// Limpiar Alerta
function alertClean(){
    try {
        if(isRunning){
            msg.querySelector("#title").innerHTML = null;
            msg.querySelector("#desc").innerHTML = null;
            if(msg.querySelector("#list").querySelectorAll("button").length > 0){
                msg.querySelector("#list").querySelectorAll("button").forEach(element => {
                    element.remove();
                });
            }
        }
    } catch (error) {
        alert(error + " Error interno del sistema. Debe reiniciar con tecla F5 de su teclado.");
        isRunning = false;
    }
}

// Agregar boton a una Alerta
function alertAddButton(accept, functionAccept, cancel){
    try {
        if(isRunning){
            if(accept !== undefined && accept !== null && accept !== false){
                let acceptButton = document.createElement("button");
                acceptButton.className = "textbreak accept";
                acceptButton.appendChild(document.createTextNode("Aceptar"));
                if(functionAccept !== undefined && functionAccept !== null){
                    acceptButton.setAttribute("onclick", functionAccept);
                }
                msg.querySelector("#list").appendChild(acceptButton);
            }
            if(cancel !== undefined && cancel !== null && cancel !== false){
                let cancelButton = document.createElement("button");
                cancelButton.className = "textbreak accept";
                cancelButton.appendChild(document.createTextNode("Cancelar"));
                cancelButton.setAttribute("onclick", "alertHide()");
                msg.querySelector("#list").appendChild(cancelButton);
            }
        }
    } catch (error) {
        alert(error + " Error interno del sistema. Debe reiniciar con tecla F5 de su teclado.");
        isRunning = false;
    }
}
