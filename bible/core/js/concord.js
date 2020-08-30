/***** CONCORD *****/

function concordManager(){
    try {
        if(isRunning){
            let text = document.querySelector("#textConcord").value;
            let count = 0;
            if(text !== undefined && text !== null && text !== "" && text.trim().length > 0){
                removeConcordListItems();
                data["books"].forEach(elementBook => {
                    elementBook["chapters"].forEach((elementChapter, indexChapter) => {
                        elementChapter["verses"].forEach((elementVerse, indexVerse) => {
                            if(count < maxItemsConcord){
                                if(removeAccents(removeSpecialCharacters(elementVerse["content"].toLowerCase())).includes(text.trim().toLowerCase())){
                                    concordItem(elementBook["name"], indexChapter, indexVerse, elementVerse["content"], elementVerse["title"]);
                                    count++;
                                }
                            }
                        })
                    })
                });
                if(document.querySelector("#results").querySelector(".list").querySelectorAll("div").length > 0){
                    openConcord();
                    document.querySelector("#results").querySelector(".list").scrollTop = 0;
                }else{
                    closeConcord();
                }
                if(count === 0){
                    alertManager("Ups...", "No hay resultados. Asegurese de escribir el texto sin tilde.", false, false, null)
                }
                checkScrollingList("results");
            }
        }
    } catch (error) {
        alertManager("Error de Concordancia", error, true, false, null);
    }
}

function openConcord(){
    try {
        if(isRunning){
            activatorElement(document.querySelector("#results"), true);
        }
    } catch (error) {
        alertManager("Error de Concordancia", error, true, false, null);
    }
}

function closeConcord(){
    try {
        if(isRunning){
            activatorElement(document.querySelector("#results"), false);
        }
    } catch (error) {
        alertManager("Error de Concordancia", error, true, false, null);
    }
}

function openConcordItemHere(book, chapter, verse){
    try {
        if(isRunning){
            if(book !== null && chapter !== null && verse !== null){
                openBook(book);
                openChapter(book, chapter);
                openVerse(book, chapter, verse);
                closeConcord();
            }
        }
    } catch (error) {
        alertManager("Error de Concordancia", error, true, false, null);
    }
}

function openConcordItemNewTab(book, chapter, verse){
    try {
        if(isRunning){
            if(book !== null && chapter !== null && verse !== null){
                if(document.querySelector("#first").querySelector(".list").querySelectorAll("div").length < maxReaders){
                    addReader();
                    openBook(book);
                    openChapter(book, chapter);
                    openVerse(book, chapter, verse);
                    closeConcord();
                }else{
                    alertManager("Ups...", "Solo se pueden abrir un máximo de " + maxReaders + " lecturas.", false, false, null);
                }
            }
        }
    } catch (error) {
        alertManager("Error de Concordancia", error, true, false, null);
    }
}

function removeConcordListItems(){
    try {
        if(isRunning){
            if(document.querySelector("#results").querySelector(".list").querySelectorAll("div").length > 0){
                document.querySelector("#results").querySelector(".list").querySelectorAll("div").forEach(element => {
                    element.remove();
                });
            }
        }
    } catch (error) {
        alertManager("Error de Concordancia", error, true, false, null);
    }
}

function toggleConcord(value){
    try {
        if(isRunning){
            if(value !== undefined && value !== null && value !== ""){
                if(document.querySelector("#results").querySelector(".list").querySelectorAll("div").length > 0){
                    openConcord();
                }
            }
        }
    } catch (error) {
        alertManager("Error de Concordancia", error, true, false, null);
    }
}