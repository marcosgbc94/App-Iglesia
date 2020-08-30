/*******************************/
/******** RESOLUCION **********/
/*****************************/

// Comprobar la resolucion
function checkResolution(){
    try {
        if(working){
            if(maxResolutionsWidth !== undefined && maxResolutionsWidth !== null){
                if(maxResolutionsHeight !== undefined && maxResolutionsHeight !== null){
                    if((window.innerWidth < maxResolutionsWidth) || (window.innerHeight < maxResolutionsHeight)){
                        errorFiller("Advertencia", "La pantalla de su dispositivo es demasiado pequeña para el sistema. Para un optimo consumo de la aplicación, se recomienda una resolución de " + maxResolutionsWidth + "px por " + maxResolutionsHeight + "px.", "warning");
                    }
                }
            }
        }
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("checkResolution");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de comprobar la resolución. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
}