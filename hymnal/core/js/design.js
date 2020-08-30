/***** DESIGN *****/

function getDesign(){
    try {
        if(isRunning && designs !== undefined && designs !== null){
            removeDesigns();
            designs["designs"].forEach(element => {
                printDesigns(element);
            });
        }
    } catch (error) {
        alertManager("Error de Diseño", error, true, false, false);
    }
}

function printDesigns(element){
    try {
        if(isRunning && element !== null){
            const list = document.querySelector(".design").querySelector("div");
            if(list !== undefined && list !== null){
                let button = document.createElement("button");
                let subtitle = document.createElement("span");
                let text = document.createElement("span");
                let route = getComputedStyle(document.documentElement).getPropertyValue("--screen-img-route");
                button.style.backgroundImage = "url(" + route + element["icon"] + ")";
                button.style.backgroundColor = element["background"];
                button.setAttribute("title", element["name"]);
                button.setAttribute("data-code", element["code"]);
                button.setAttribute("onclick", "openDesign(this.dataset.code)");
                button.className = "fade-in";
                subtitle.className = "subtitle";
                subtitle.appendChild(document.createTextNode("T"));
                subtitle.style.color = element["primary"];
                subtitle.style.textShadow = element["shadow"];
                text.className = "text";
                text.appendChild(document.createTextNode("a"));
                text.style.color = element["secondary"];
                text.style.textShadow = element["shadow"];
                button.appendChild(subtitle);
                button.appendChild(text);
                list.appendChild(button);
            }
        }
    } catch (error) {
        alertManager("Error de Diseño", error, true, false, false);
    }
}

function removeDesigns(){
    try {
        if(isRunning){
            const list = document.querySelector(".design").querySelector("div");
            if(list !== undefined && list !== null){
                if(list.querySelectorAll("button").length > 0){
                    list.querySelectorAll("button").forEach(element => {console.log(element)
                        element.remove();
                    });
                }
            }
        }
    } catch (error) {
        alertManager("Error de Diseño", error, true, false, false);
    }
}

function openDesign(code){
    try {
        if(isRunning && code !== null){
            let aux = false;
            if(screen !== undefined && screen !== null){
                designs["designs"].forEach(element => {
                    if(element["code"] == code){
                        designCode = element["code"];
                        aux = true;
                    }
                })
                if(aux){
                    applyDesign(designCode);
                }
            }
        }
    } catch (error) {
        alertManager("Error de Diseño", error, true, false, false);
    }
}

function applyDesign(code){
    try {
        if(isRunning && code !== null){
            const screen = document.querySelector(".screen");
            let route = getComputedStyle(document.documentElement).getPropertyValue("--screen-img-route");
            designs["designs"].forEach(element => {
                if(element["code"] == code){
                    if(element["image"] !== undefined && element["image"] !== null && element["image"].length > 0){
                        screen.querySelector(".screens").style.backgroundImage = "url(" + route + element["image"] + ")";
                    }else if(element["background"] !== undefined && element["background"] !== null && element["background"].length > 0){
                        screen.querySelector(".screens").style.backgroundImage = "none";
                        screen.querySelector(".screens").style.backgroundColor = element["background"];
                    }
                    if(screen.querySelector(".screens").querySelector("div").querySelector("div").querySelector("div").querySelector("div") === null){
                        screen.querySelector(".screens").querySelector("div").querySelector("div").style.textShadow = element["shadow"];
                        screen.querySelector(".screens").querySelector("div").querySelector("div").style.color = element["primary"];
                        screen.querySelector(".screens").querySelector("div").querySelector("div").querySelectorAll("h4").forEach(elm => {
                            elm.style.color = element["secondary"];
                        });
                        screen.querySelector(".screens").querySelector("div").querySelector("div").querySelectorAll("i").forEach(elm => {
                            elm.style.color = element["secondary"];
                        });
                        screen.querySelector(".screens").querySelector("div").querySelector("div").querySelectorAll("h1").forEach(elm => {
                            elm.style.color = element["secondary"];
                        });
                    }
                }
            })
        }
    } catch (error) {
        alertManager("Error de Diseño", error, true, false, false);
    }
}