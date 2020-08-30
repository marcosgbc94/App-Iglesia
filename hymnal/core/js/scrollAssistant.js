/***** SCROLL ASSISTANT *****/

// Subir Scroll
function upScroll(name){
    try {
        if(isRunning && !alertDisplayed){
            const elementBase = document.querySelector("#" + name);
            if(elementBase !== undefined && elementBase !== null){
                const list = elementBase.querySelector(".list");
                if(list !== undefined && list !== null){
                    list.scrollTop -= scrollMovePx;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Asistente de Desplazamiento", error, false, false, null);
    }
}

// Bajar Scroll
function downScroll(name){
    try {
        if(isRunning && !alertDisplayed){
            const elementBase = document.querySelector("#" + name);
            if(elementBase !== undefined && elementBase !== null){
                const list = elementBase.querySelector(".list");
                if(list !== undefined && list !== null){
                    list.scrollTop += scrollMovePx;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Asistente de Desplazamiento", error, false, false, null);
    }
}

// Comprobar Si la lista se puede desplazar
function checkScrollingList(name){
    try {
        if(isRunning && !alertDisplayed){
            const elementBase = document.querySelector("#" + name);
            if(elementBase !== undefined && elementBase !== null){
                const list = elementBase.querySelector(".list");
                const upButton = elementBase.querySelector(".header").querySelector(".scrollButton");
                const downButton = elementBase.querySelector(".footer").querySelector(".scrollButton");
                if(list !== null && upButton !== null && downButton !== null){
                    if(list.clientHeight < list.scrollHeight){
                        if(list.scrollTop === 0){
                            setStateButton(upButton, true);
                            setStateButton(downButton, false);
                        }else if((parseInt(list.scrollTop) + parseInt(list.clientHeight)) === list.scrollHeight){
                            setStateButton(upButton, false);
                            setStateButton(downButton, true);
                        }else{
                            setStateButton(upButton, false);
                            setStateButton(downButton, false);
                        }
                    }else{
                        setStateButton(upButton, true);
                        setStateButton(downButton, true);
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Asistente de Desplazamiento", error, false, false, null);
    }
}