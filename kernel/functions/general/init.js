/******************************/
/****** INICIALIZACION *******/
/****************************/

let working;
let appDisplayed;
let errorDisplayed;
let hymnalWorking;
let bibleWorking;

// Proceso de carga de la aplicacion
window.addEventListener("load", function(){
    try {
        working = true;
        appDisplayed = true;
        errorDisplayed = false;
        hymnalWorking = true;
        bibleWorking = true;

        initLoader();
        checkData();
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("load");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de carga de la aplicación. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
});

// Redimensionado de la ventana
window.addEventListener("resize", function(){
    try {
        checkResolution();
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("resize");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de redimensionado de la aplicación. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
});