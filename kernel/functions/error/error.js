/******************************/
/*********** ERROR ***********/
/****************************/

// Proceso de inicio de la pantalla de error
function initError() {
    try {
        if (document.querySelector("#error") !== undefined && document.querySelector("#error") !== null) {
            if (!errorDisplayed) {
                document.querySelector("#error").classList.remove("inactive");
                document.querySelector("#error").classList.add("active");
                errorDisplayed = true;
            }
        }
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("initError");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de inicio de la pantalla de error. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
}

// Proceso de termino de la pantalla de error
function endError() {
    try {
        if (document.querySelector("#error") !== undefined && document.querySelector("#error") !== null) {
            if (errorDisplayed) {
                document.querySelector("#error").classList.remove("active");
                document.querySelector("#error").classList.add("inactive");
                errorDisplayed = false;
            }
        }
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("endError");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de termino de la pantalla de error. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
}

// Rellenador de la pantalla de error
function errorFiller(title, desc, category) {
    try {
        if (!errorDisplayed) {
            if(document.querySelector("#error") !== undefined && document.querySelector("#error") !== null){
                if(document.querySelector("#error-message") !== undefined && document.querySelector("#error-message") !== null){
                    if(document.querySelector("#error-message-title") !== undefined && document.querySelector("#error-message-title") !== null){
                        if(title !== undefined && title !== null){
                            document.querySelector("#error-message-title").innerHTML = title;
                        }
                    }
                    if(document.querySelector("#error-message-desc") !== undefined && document.querySelector("#error-message-desc") !== null){
                        if(desc !== undefined && desc !== null){
                            document.querySelector("#error-message-desc").innerHTML = desc;
                        }
                    }
                    if(document.querySelector("#error-message-actions") !== undefined && document.querySelector("#error-message-actions") !== null){
                        if(category !== undefined && category !== null){
                            document.querySelector("#error-message-actions").innerHTML = null;
                            switch(category){
                                case "ok":
                                    let okButton = document.createElement("button");
                                    okButton.setAttribute("title", "Cerrar [Esc]");
                                    okButton.setAttribute("onclick", "endError()");
                                    okButton.appendChild(document.createTextNode("Cerrar"));
                                    document.querySelector("#error-message-actions").appendChild(okButton);
                                    break;
                                case "warning":
                                    let warningButton = document.createElement("button");
                                    warningButton.setAttribute("title", "Aceptar [Esc]");
                                    warningButton.setAttribute("onclick", "endError()");
                                    warningButton.appendChild(document.createTextNode("Aceptar"));
                                    document.querySelector("#error-message-actions").appendChild(warningButton);
                                    break;
                                case "error":
                                    let errorButton = document.createElement("button");
                                    errorButton.setAttribute("title", "Reiniciar [F5]");
                                    errorButton.setAttribute("onclick", "reloadSystem()");
                                    errorButton.appendChild(document.createTextNode("Reiniciar"));
                                    document.querySelector("#error-message-actions").appendChild(errorButton);
                                    working = false;
                                    break;
                            }
                        }
                    }
                    initError();
                }
            }
        }
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("errorFiller");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de rellenado de la pantalla de error. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
}

// Reiniciar sistema
function reloadSystem() {
    try {
        if (!working) {
            window.location.reload();
        }
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("reloadSystem");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de reinicio de la aplicación. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
}