/*******************************/
/******** PANTALLAS ***********/
/*****************************/

function selectorShow(){
    try {
        if(working){
            if(document.querySelector("#selector") !== undefined && document.querySelector("#selector") !== null){
                if(!selectorDisplayed){
                    document.querySelector("#selector").classList.remove("inactive");
                    document.querySelector("#selector").classList.add("active");
                    selectorDisplayed = true;
                }
            }
        }
    } catch (error) {
        
    }
}