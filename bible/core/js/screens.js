/***** SCREENS *****/

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
        alertManager("Error de Pantalla", error, true, false, null);
    }
}

function screenActivator(activate){
    try {
        if(isRunning){
            if(activate !== undefined){
                const screen = document.querySelector(".screen");
                if(screen !== null && readerActive !== null && screen.querySelectorAll(".screens").length > 0){
                    screen.querySelectorAll(".screens").forEach(element => {
                        if(element.classList.contains("active")){
                            element.classList.remove("active");
                            element.classList.add("inactive");
                        }
                    });
                    if(activate){
                        screen.querySelectorAll(".screens").forEach(element => {
                            if(element.dataset.reader == readerActive){
                                element.classList.remove("inactive");
                                element.classList.add("active");
                            }
                        });
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Pantalla", error, true, false, null);
    }
}

function openScreen(){
    try {
        if(isRunning){
            const screen = document.querySelector(".screen");
            screen.querySelectorAll(".screens").forEach(element => {
                if(element.classList.contains("active")){
                    if(element.innerHTML === ""){
                        let base = document.createElement("div");
                        let inner = document.createElement("div");
                        base.appendChild(inner);
                        element.appendChild(base);
                        fillScreen();
                    }else{
                        element.innerHTML = null;
                        let base = document.createElement("div");
                        let inner = document.createElement("div");
                        base.appendChild(inner);
                        element.appendChild(base);
                        fillScreen();
                    }
                }
            });
        }
    } catch (error) {
        alertManager("Error de Pantalla", error, true, false, null);
    }
}

function closeScreen(){
    try {
        if(isRunning){
            const screen = document.querySelector(".screen");
            screen.querySelectorAll(".screens").forEach(element => {
                if(element.classList.contains("active")){
                    element.innerHTML = null;
                    setTitle(null);
                    activatorElement(document.querySelector(".mainApp").querySelector("#header"), false);
                    activatorElement(document.querySelector(".mainApp").querySelector("#footer"), false);
                    document.querySelector("#booksTab").querySelector(".list").scrollTop = 0;
                    setTitlePage();
                }
            });
        }
    } catch (error) {
        alertManager("Error de Pantalla", error, true, false, null);
    }
}

function fillScreen(){
    try {
        if(isRunning){
            const screen = document.querySelector(".screen");
            screen.querySelectorAll(".screens").forEach(element => {
                if(element.classList.contains("active") && element.innerHTML !== ""){
                    const base = element.querySelector("div").querySelector("div");
                    base.className = "fade-in";
                    let div = document.createElement("div");
                    let title = document.createElement("h1");
                    title.innerHTML = getContentVerse("title");
                    let location = document.createElement("h4");
                    location.appendChild(document.createTextNode(getContentVerse("location")));
                    div.appendChild(location);
                    div.appendChild(title);
                    base.appendChild(div);
                    base.innerHTML += getContentVerse("content");
                    setTitle(getContentVerse("title"));
                    activatorElement(document.querySelector(".mainApp").querySelector("#header"), true);
                    activatorElement(document.querySelector(".mainApp").querySelector("#footer"), true);
                }
            });
        }
    } catch (error) {
        alertManager("Error de Pantalla", error, true, false, null);
    }
}

function addScreen(){
    try {
        if(isRunning){
            if(readerActive !== undefined && readerActive !== null){
                const screen = document.querySelector(".screen");
                let state = true
                screen.querySelectorAll(".screens").forEach(element => {
                    if(element.dataset.reader == readerActive){
                        state = false;
                    }
                });
                if(state){
                    let base = document.createElement("div");
                    base.className = "screens";
                    element.appendChild(base);
                }
            }
        }
    } catch (error) {
        alertManager("Error de Pantalla", error, true, false, null);
    }
}