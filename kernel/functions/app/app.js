/******************************/
/************ APP ************/
/****************************/

// Proceso de inicio de la pantalla de aplicacion
function initApp(){
    try {
        if(document.querySelector("#app") !== undefined && document.querySelector("#app") !== null){
            document.querySelector("#app").classList.remove("inactive");
            document.querySelector("#app").classList.add("active");
            appDisplayed = true;
            checkResolution();
        }
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("initApp");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de inicio de la pantalla de aplicación. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
}