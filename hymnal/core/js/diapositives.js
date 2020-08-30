/***** DIAPOSITIVES *****/

function getDiapositives() {
    try {
        if (isRunning) {
            let item = itemMemoryManager("get", null);
            removeAllDiapositives();
            item["body"].forEach((element, index) => {
                printDiapositives(element, index)
            });
            document.querySelector("#second").querySelector(".list").scrollTop = 0;
            checkScrollingList('second');
        }
    } catch (error) {
        alertManager("Error de Diapositivas", error, true, false, false);
    }
}

function printDiapositives(element, index) {
    try {
        if (isRunning && element !== null, index !== null) {
            // Crear elementos base
            const list = document.querySelector("#second").querySelector(".list");
            const button = document.createElement("button");
            const text = document.createElement("div");
            const textInner = document.createElement("div");
            const textDoubleInner = document.createElement("div");
            const label = document.createElement("span");
            // Establecer atributos, clases y texto de elementos
            button.className = "fade-in";
            button.setAttribute("tabindex", (index + 1));
            button.setAttribute("data-index", index);
            button.setAttribute("onclick", "openDiapositive(this.dataset.index)");
            text.className = "text";
            textDoubleInner.innerHTML = element["slide"];
            label.className = "label";
            label.appendChild(document.createTextNode(index + 1));
            // Rellenar en lista
            textInner.appendChild(textDoubleInner);
            text.appendChild(textInner);
            button.appendChild(text);
            button.appendChild(label);
            list.appendChild(button);
        }
    } catch (error) {
        alertManager("Error de Diapositivas", error, true, false, false);
    }
}

function removeAllDiapositives() {
    try {
        if (isRunning) {
            const list = document.querySelector("#second").querySelector(".list");
            if (list !== null && list.querySelectorAll("button").length > 0) {
                list.querySelectorAll("button").forEach(element => {
                    element.remove();
                });
                checkScrollingList('second');
            }
        }
    } catch (error) {
        alertManager("Error de Diapositivas", error, true, false, false);
    }
}

function openDiapositive(index){
    try {
        if(isRunning && index !== null){
            const item = itemMemoryManager("get", null);
            if(item !== null){
                openScreen(item["body"][index]["slide"], index);
                setScreenFontSizeText();
                selectDiapositive(index);
                setIndexIndicator(index);
                setSlider(index);
            }
        }
    } catch (error) {
        alertManager("Error de Diapositivas", error, false, false, false);
    }
}

function selectDiapositive(index){
    try {
        if(isRunning && index !== null){
            const list = document.querySelector("#second").querySelector(".list");
            if (list !== null && list.querySelectorAll("button").length > 0) {
                deselectDiapositive();
                list.querySelectorAll("button").forEach(element => {
                    if(element.dataset.index == index){
                        element.classList.add("selected")
                    }
                });
                moveToElement(list);
            }
        }
    } catch (error) {
        alertManager("Error de Diapositivas", error, true, false, false);
    }
}

function deselectDiapositive(){
    try {
        if(isRunning){
            const list = document.querySelector("#second").querySelector(".list");
            if (list !== null && list.querySelectorAll("button").length > 0) {
                list.querySelectorAll("button").forEach(element => {
                    if(element.classList.contains("selected")){
                        element.classList.remove("selected")
                    }
                });
            }
        }
    } catch (error) {
        alertManager("Error de Diapositivas", error, true, false, false);
    }
}