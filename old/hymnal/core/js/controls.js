/***** CONTROLS *****/

function controlManager(option){
    try {
        if(isRunning && option !== null){
            switch(option){
                case "prev":
                    prev();
                    break;
                case "next":
                    next();
                    break;
                case "first":
                    first();
                    break;
                case "last":
                    last();
                    break;
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, false, false, false);
    }
}

function prev(){
    try {
        if(isRunning){
            let diapositives = itemMemoryManager("get", null)["body"].length;
            let index = parseInt(document.querySelector("#second").querySelector(".list").querySelector(".selected").dataset.index) - 1;
            if(diapositives !== null && diapositives > 0 && index !== null && index >= 0){
                openDiapositive(index);
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, false, false, false);
    }
}

function next(){
    try {
        if(isRunning){
            let diapositives = itemMemoryManager("get", null)["body"].length;
            let index = parseInt(document.querySelector("#second").querySelector(".list").querySelector(".selected").dataset.index) + 1;
            if(diapositives !== null && diapositives > 0 && index !== null && index >= 0 && index < diapositives){
                openDiapositive(index);
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, false, false, false);
    }
}

function first(){
    try {
        if(isRunning){
            openDiapositive(0);
        }
    } catch (error) {
        alertManager("Error de Controles", error, false, false, false);
    }
}

function last(){
    try {
        if(isRunning){
            let diapositives = itemMemoryManager("get", null)["body"].length - 1;
            if(diapositives !== null && diapositives > 0){
                openDiapositive(diapositives);
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, false, false, false);
    }
}

function setIndexIndicator(index){
    try {
        if(isRunning && index !== null){
            let diapositives = itemMemoryManager("get", null)["body"].length;
            const idx = document.querySelector(".index");
            if(diapositives !== null && idx !== null){
                idx.innerHTML = null;
                const total = document.createElement("span");
                total.className = "total";
                total.appendChild(document.createTextNode("/" + diapositives));
                idx.appendChild(document.createTextNode(parseInt(index) + 1));
                idx.appendChild(total);
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, false, false, false);
    }
}

function setSlider(index){
    try {
        if(isRunning && index !== null){
            let diapositives = itemMemoryManager("get", null)["body"].length;
            const slider = document.querySelector(".progress");
            if(diapositives !== null && slider !== null){
                slider.style.width = ((100 * (parseInt(index) + 1)) / diapositives) + "%";
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, false, false, false);
    }
}