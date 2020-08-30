/******************************/
/*********** DATOS ***********/
/****************************/

// Comprobar integridad de datos
function checkData(){
    try {
        if(working){
            let him = checkHymnalData();
            let bib = checkBibleData();
            if(!him & bib){
                hymnalWorking = false;
                errorFiller("Advertencia", "Ocurrio un error al comprobar los datos del Himnario. Por ende lamentamos informar que no se podrá utilizar, solo quedará operativa la Santa Biblia.", "warning");
            }else if(him & !bib){
                bibleWorking = false;
                errorFiller("Advertencia", "Ocurrio un error al comprobar los datos de la Santa Biblia. Por ende lamentamos informar que no se podrá utilizar, solo quedará operativo el Himnario.", "warning");
            }else if(!him & !bib){
                hymnalWorking = false;
                bibleWorking = false;
                errorFiller("Error", "Ocurrio un error al comprobar los datos de la aplicación. Por ende lamentamos informar que no se podrá utilizar. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema.", "error");
            }
        }
    } catch (error) {
        console.log("ERROR FATAL");
        console.log("checkData");
        console.log(error);
        alert("Ha ocurrido un error fatal en el proceso de verificación de integridad de datos. No podrá seguir funcionando el sistema. Intente reiniciar la página con la tecla F5. Si el error es continuo, contacte con el administrador del sistema. Más detalles sobre el error: abrir la consola del navegador.");
        working = false;
    }
}

// Comprobar datos del Himnario
function checkHymnalData(){
    try {
        if(working){
            if(hymnal !== undefined && hymnal !== null){
                if(hymnal.songs !== undefined && hymnal.songs !== null){
                    if(hymnal.songs.length > 0){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
    } catch (error) {
        console.log("ERROR");
        console.log("checkHymnalData");
        console.log(error);
    }
}

// Comprobar datos de la Biblia
function checkBibleData(){
    try {
        if(working){
            if(bible !== undefined && bible !== null){
                if(bible.books !== undefined && bible.books !== null){
                    if(bible.books.length > 0){
                        return true;
                    }else{
                        return false;
                    }
                }else{
                    return false;
                }
            }else{
                return false;
            }
        }
    } catch (error) {
        console.log("ERROR");
        console.log("checkBibleData");
        console.log(error);
    }
}