/***** ITEMS *****/

function checkIntegrityData() {
    try {
        if (isRunning) {
            if (data !== undefined && data !== null) {
                if (data["praise"] !== undefined && data["praise"] !== null) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        alertManager("Error de Integridad de Datos", error, true, false, null);
        return false;
    }
}

function getItems() {
    try {
        if (isRunning) {
            if (checkIntegrityData()) {
                removeAllItems();
                let count = 0;
                data["praise"].forEach((element, index) => {
                    if (count <= maxItemsDisplayed) {
                        if (printItem(element, index)) {
                            count++;
                        }
                    }
                });
                checkScrollingList('first');
                tabindex = 0;
                document.activeElement.blur();
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
    }
}

function printItem(element, index) {
    try {
        if (isRunning) {
            if (element !== null && index !== null) {
                // Crear elementos base
                const list = document.querySelector("#first").querySelector(".list");
                const button = document.createElement("button");
                const title = document.createElement("span");
                const info = document.createElement("span");
                const desc = document.createElement("span");
                const code = element["code"];
                // Establecer atributos, clases y texto de elementos
                button.className = "fade-in";
                button.setAttribute("data-code", code);
                button.setAttribute("onclick", "openItem(this.dataset.code, false)");
                button.setAttribute("tabindex", (index + 1));
                if(itemMemoryManager("get", null)["code"] === element["code"]){
                    button.className = "selected";
                }
                title.className = "title textbreak";
                title.appendChild(document.createTextNode(element["name"]));
                title.setAttribute("onmouseover", "this.title = this.innerText");
                if (element["info"] !== null && element["info"].length > 0) {
                    info.className = "info textbreak";
                    info.appendChild(document.createTextNode(element["info"]));
                    info.setAttribute("onmouseover", "this.title = this.innerText");
                }
                if (element["desc"] !== null && element["desc"].length > 0) {
                    desc.className = "desc textbreak";
                    desc.innerHTML = element["desc"];
                    desc.setAttribute("onmouseover", "this.title = this.innerText");
                }
                // Rellenar en lista
                button.appendChild(title);
                if (element["info"] !== null && element["info"].length > 0) button.appendChild(info);
                if (element["desc"] !== null && element["desc"].length > 0) button.appendChild(desc);
                list.appendChild(button);
                return true;
            } else { return false; }
        } else { return false; }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
        return false;
    }
}

function searchItem(search) {
    try {
        if (isRunning) {
            if (search !== null && search.trim().length > 0) {
                removeAllItems();
                document.querySelector("#first").querySelector(".list").scrollTop = 0;
                let count = 0;
                search = search.split("¡").join("");
                search = search.split("!").join("");
                search = search.split("¿").join("");
                search = search.split("?").join("");
                data["praise"].forEach((element, index) => {
                    if (count <= maxItemsDisplayed) {
                        if (removeAccents(element["name"]).trim().includes(removeAccents(search.trim().toLowerCase()))) {
                            // Buscar por nombre
                            if (printItem(element, index)) {
                                count++;
                            }
                        } else if (removeAccents(element["info"]).trim().includes(removeAccents(search.trim().toLowerCase()))) {
                            // Buscar por informacion
                            if (printItem(element, index)) {
                                count++;
                            }
                        } else if (removeAccents(removeSpecialCharacters(element["desc"]).trim()).includes(removeAccents(search.trim().toLowerCase()))) {
                            // Buscar por descripcion
                            if (printItem(element, index)) {
                                count++;
                            }
                        } else {
                            // Buscar en los slides
                            let contains = false;
                            element["body"].forEach((innerElement, innerIndex) => {
                                if (innerIndex > 0 && innerIndex < element["body"].length - 1) {
                                    if (removeAccents(removeSpecialCharacters(innerElement["slide"])).includes(removeAccents(search.trim().toLowerCase()))) {
                                        contains = true;
                                    }
                                }
                            });
                            if (contains) {
                                if (printItem(element, index)) {
                                    count++;
                                }
                            }
                        }
                    }
                });
                checkScrollingList('first');
                notResultsListItems();
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
    }
}

function removeAllItems() {
    try {
        if (isRunning) {
            const list = document.querySelector("#first").querySelector(".list");
            if (list !== null && list.querySelectorAll("*").length > 0) {
                list.querySelectorAll("*").forEach(element => {
                    element.remove();
                });
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
    }
}

function openItem(code, isPrev){
    try {
        if(isRunning && code !== null && isPrev !== null){
            if(itemMemoryManager("add", code)){
                const item = itemMemoryManager("get", null);
                selectItem(code);
                getDiapositives();
                openDiapositive(0);
                setTitle(item["name"]);
                activatorElement(document.querySelector(".mainApp").querySelector(".right"), true);
                activatorElement(document.querySelector(".mainApp").querySelector("#footer"), true);
                if(!isPrev) AddItemToStorageMemory(code);
                if(itemsMemory.length > 1) setStateButton(document.querySelector("#backButton"), false);
                tabindex = 0;
                setTitlePage();
                document.querySelector(".design").querySelector("div").scrollTop = 0;
            }else{
                alertManager("Ups...", "Ya se encuentra abierta la Alabanza.", false, false, false);
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
    }
}

function openPrevItem(){
    try {
        if(isRunning){
            if(itemsMemory.length > 0){
                if(itemsMemory.length > 0){
                    let screens = document.querySelector(".screen").querySelector(".screens");
                    if(itemsMemory.length > 1){
                        if (screens !== undefined && screens !== null) {
                            // Recordar la alabanza abierta anteriormente
                            deleteItemFromStorageMemory();
                            let code = itemsMemory[itemsMemory.length - 1];
                            openItem(code, true);
                            if (itemsMemory.length === 1) {
                                setStateButton(document.querySelector("#backButton"), true);
                            }
                        }else{
                            let code = itemsMemory[itemsMemory.length - 1];
                            openItem(code, true);
                        }
                    }else{
                        // Opciones de apertura cuando se cierra una alabanza
                        if (screens === undefined || screens === null) {
                            let code = itemsMemory[itemsMemory.length - 1];
                            openItem(code, true);
                            setStateButton(document.querySelector("#backButton"), true);
                        }
                        setStateButton(document.querySelector("#backButton"), true);
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
    }
}

function closeItem(){
    try {
        if(isRunning){
            const screen = document.querySelector(".screen");
            if(screen !== undefined && screen !== null){
                if(screen.querySelector(".screens") !== undefined && screen.querySelector(".screens") !== null){
                    if(itemMemoryManager("remove", null)){
                        removeInnerScreen();
                        removeAllDiapositives();
                        deselectItem();
                        setTitle(null);
                        activatorElement(document.querySelector(".mainApp").querySelector(".right"), false);
                        activatorElement(document.querySelector(".mainApp").querySelector("#footer"), false);
                        document.querySelector("#first").querySelector(".list").scrollTop = 0;
                        if(itemsMemory.length > 0) setStateButton(document.querySelector("#backButton"), false);
                        tabindex = 0;
                        document.activeElement.blur();
                        setTitlePage();
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
    }
}

function selectItem(code){
    try {
        if(isRunning && code !== null){
            const list = document.querySelector("#first").querySelector(".list");
            if (list !== null && list.querySelectorAll("button").length > 0) {
                deselectItem();
                list.querySelectorAll("button").forEach(element => {
                    if(element.dataset.code == code){
                        element.classList.add("selected")
                    }
                });
                moveToElement(list);
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
    }
}

function deselectItem(){
    try {
        if(isRunning){
            const list = document.querySelector("#first").querySelector(".list");
            if (list !== null && list.querySelectorAll("button").length > 0) {
                list.querySelectorAll("button").forEach(element => {
                    if(element.classList.contains("selected")){
                        element.classList.remove("selected")
                    }
                });
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
    }
}

function notResultsListItems(){
    try {
        if(isRunning){
            const list = document.querySelector("#first").querySelector(".list");
            if (list !== null && list.querySelectorAll("button").length === 0) {
                const base = document.createElement("div");
                const label = document.createElement("span");
                base.className = "empty";
                label.className = "label";
                label.appendChild(document.createTextNode("Sin Resultados"));
                base.appendChild(label);
                list.appendChild(base);
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
    }
}

function removeAccents(text) {
    try {
        if(isRunning){
            if(text !== undefined){
                if (text !== null && text.trim().length > 0) {
                    for (var i = 0; i <= text.length; i++) {
                        if (text.charAt(i) == "á") text = text.replace(/á/, "a");
                        if (text.charAt(i) == "é") text = text.replace(/é/, "e");
                        if (text.charAt(i) == "í") text = text.replace(/í/, "i");
                        if (text.charAt(i) == "ó") text = text.replace(/ó/, "o");
                        if (text.charAt(i) == "ú") text = text.replace(/ú/, "u");
                        if (text.charAt(i) == ",") text = text.replace(/,/, "");
                    }
                    return text;
                }else{
                    return text;
                }
            }else{
                text = "";
                return text;
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
        return text;
    }
}

// Remover caracteres especiales
function removeSpecialCharacters(text) {
    try {
        if (isRunning) {
            if (text !== undefined && text !== null) {
                text = text.split("¡").join("");
                text = text.split("!").join("");
                text = text.split("¿").join("");
                text = text.split("?").join("");
                text = text.split("<br/>").join(" ");
                text = text.split("<br />").join(" ");
                text = text.split("<i>//</i>").join("");
                text = text.split("<i>///</i>").join("");
                text = text.split("<i>////</i>").join("");
                text = text.split("<i>/////</i>").join("");
                text = text.split("<i>//////</i>").join("");
                text = text.split("<h4>coro</h4>").join("");
                text = text.split("<h4>hablar</h4>").join("");
                text = text.split("<h4>final</h4>").join("");
                text = text.split("<h4>fuerte</h4>").join("");
                text = text.split("<h4>suave</h4>").join("");
                text = text.trim().toLowerCase();
                return text;
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, false);
    }
}

function setTitlePage(){
    try {
        if(isRunning){
            let item = itemMemoryManager("get", null)["name"];
            if(item !== undefined && item !== null){
                document.title = captialize(item);
            }else{
                document.title = "Himnario";
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}