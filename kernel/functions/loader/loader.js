/******************************/
/***** PANTALLA DE CARGA *****/
/****************************/

// Proceso de inicio de la pantalla de carga
function initLoader(){
    try {
        if(document.querySelector("#loader") !== undefined && document.querySelector("#loader") !== null){
            document.querySelector("#loader").classList.remove("inactive");
            document.querySelector("#loader").classList.add("active");
        }
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("initLoader");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de inicio de la pantalla de carga. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
}

// Proceso de termino de la pantalla de carga
function endLoader(event){
    try {
        if(event !== undefined && event !== null){
            if(event.target.id === "loader"){
                event.target.classList.remove("active");
                event.target.classList.add("inactive");
                initApp();
            }
        }
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("endLoader");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de termino de la pantalla de carga. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
}