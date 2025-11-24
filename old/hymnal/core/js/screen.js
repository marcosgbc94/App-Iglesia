/***** SCREEN *****/

function openScreen(value, index){
    try {
        if(isRunning && value !== null && index !== null){
            //removeInnerScreen();
            document.querySelector(".screen").innerHTML = null;
            // Crear elementos base
            const screen = document.querySelector(".screen");
            const screens = document.createElement("div");
            const inner = document.createElement("div");
            const innerSimple = document.createElement("div");
            const innerDouble = document.createElement("div");
            const titleContainer = document.createElement("div");
            // Establecer atributos, clases y texto de elementos
            screens.className = "screens";
            inner.className = "fade-in";
            if(index == 0){
                titleContainer.innerHTML = value;
                innerSimple.appendChild(titleContainer);
            }else{
                innerSimple.innerHTML = value;
            }
            // Rellenar en lista
            innerDouble.appendChild(innerSimple);
            inner.appendChild(innerDouble);
            screens.appendChild(inner);
            screen.appendChild(screens);
            if(designCode !== "00"){
                applyDesign(designCode);
            }
        }
    } catch (error) {
        alertManager("Error de Pantalla", error, true, false, false);
    }
}

function removeInnerScreen(){
    try {
        if(isRunning){
            const screen = document.querySelector(".screen");
            if(screen !== undefined && screen !== null){
                if(screen.querySelector(".screens") !== undefined && screen.querySelector(".screens") !== null){
                    screen.querySelector(".screens").remove();
                }
            }
        }
    } catch (error) {
        alertManager("Error de Pantalla", error, true, false, false);
    }
}

function setTitle(title){
    try {
        if(isRunning){
            if(title !== undefined && title !== null){
                document.querySelector("#elementTitle").innerHTML = title;
            }else{
                document.querySelector("#elementTitle").innerHTML = null;
            }
        }
    } catch (error) {
        alertManager("Error de Pantalla", error, true, false, false);
    }
}

function setScreenFontSizeText(){
    try {
        if(isRunning){
            //document.documentElement.style.setProperty("--screen-fnsz", textScreenSize + "vw");
            let size = textScreenSize;
            if(((document.querySelector(".screens").clientHeight - 20) < document.querySelector(".screens").querySelector("div").querySelector("div").querySelector("div").clientHeight) || ((document.querySelector(".screens").clientWidth - 20) < document.querySelector(".screens").querySelector("div").querySelector("div").querySelector("div").clientWidth)){
                while(((document.querySelector(".screens").clientHeight - 20) < document.querySelector(".screens").querySelector("div").querySelector("div").querySelector("div").clientHeight) || ((document.querySelector(".screens").clientWidth - 20) < document.querySelector(".screens").querySelector("div").querySelector("div").querySelector("div").clientWidth)){
                    size = size - 0.3;
                    document.documentElement.style.setProperty("--screen-fnsz", size + "vw");
                    if(size < 1){
                        break;
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Pantalla", error, true, false, false);
    }
}