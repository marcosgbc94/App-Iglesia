/***** MORE *****/

function init(){
    try {
        const start = document.querySelector("#start");
        if(start !== undefined && start !== null){
            activator(start, false);
        }
    } catch (error) {
        alert(error + " Error interno del sistema. Debe reiniciar con tecla F5 de su teclado.");
        isRunning = false;
    }
}

function activator(element, activate){
    try {
        if(isRunning){
            if(element !== null && activate !== null){
                if(activate){
                    if(element.classList.contains("inactive")){
                        element.classList.remove("inactive");
                        element.classList.add("active");
                    }
                }else{
                    if(element.classList.contains("active")){
                        element.classList.remove("active");
                        element.classList.add("inactive");
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Función Auxiliar", error, true, false, null)
    }
}

function restart(){
    try {
        if(!isRunning){
            window.location.reload();
        }
    } catch (error) {
        alert(error + " Error interno del sistema. Debe reiniciar con tecla F5 de su teclado.");
    }
}

function setStateButton(elementButton, isDisabled){
    try {
        if(isRunning){
            if(elementButton !== null && isDisabled !== null){
                elementButton.disabled = isDisabled;
            }
        }
    } catch (error) {
        alertManager("Error de Función Auxiliar", error, false, false, null);
    }
}

function activatorElement(element, active){
    try {
        if(isRunning){
            if(element !== null && active !== null){
                if(active){
                    if(element.classList.contains("inactive")){
                        element.classList.remove("inactive");
                        element.classList.add("active");
                    }
                }else{
                    if(element.classList.contains("active")){
                        element.classList.remove("active");
                        element.classList.add("inactive");
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Función Auxiliar", error, true, false, null);
    }
}

function moveToElement(list){
    try {
        if(isRunning){
            if(list !== undefined && list !== null){
                if(list.children.length > 0){
                    let selected = list.querySelector(".selected");
                    if (selected !== null) {
                        list.scrollTop = selected.offsetTop - 100;
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Función Auxiliar", error, false, false, null);
    }
}

const captialize = words => words.split(' ').map( w =>  w.substring(0,1).toUpperCase() + w.substring(1)).join(' ');