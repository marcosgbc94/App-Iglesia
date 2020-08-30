/*******************************/
/******* SOBRE LA APP *********/
/*****************************/

// Ver informacion sobre la aplicacion
function about(){
    try {
        if(working){
            errorFiller("Sobre la Aplicación", "Himnario evangélico y Santa Biblia Reina-Valera 1960 (RV1960). Desarrollado por Marcos Bustos C. para la Gloria de Dios.", "ok");
        }
    } catch (error) {
        errorFiller("Error", "Ha ocurrido un error fatal en el proceso de visualización del acerca de. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema.", "error");
    }
}