/***** ITEMS *****/

function openBook(book) {
    try {
        if (isRunning) {
            if (book !== undefined && book !== null) {
                editReader(book, null, null);
                removeList("chapter");
                getChapters();
                deselectButton("books");
                selectButton("books", book);
                viewMenu("chapters");
                closeScreen();
                checkScrollingList('chaptersTab');
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function closeBook() {
    try {
        if (isRunning) {
            closeVerse();
            closeChapter();
            editReader(null, null, null);
            deselectButton("books");
            viewMenu("books");
            checkScrollingList('booksTab');
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function openChapter(book, chapter) {
    try {
        if (isRunning) {
            if (book !== null && chapter !== null) {
                editReader(book, chapter, null);
                removeList("verse");
                getVerses();
                deselectButton("chapters");
                selectButton("chapters", chapter);
                viewMenu("verses");
                openVerse(book, chapter, 0);
                checkScrollingList('versesTab');
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function closeChapter() {
    try {
        if (isRunning) {
            deselectButton("chapters");
            editReader(readerManager("get", readerActive, null)["book"], null, null);
            viewMenu("books");
            removeList("chapter");
            checkScrollingList('chaptersTab');
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function openVerse(book, chapter, verse) {
    try {
        if (isRunning) {
            if (book !== null && chapter !== null && verse !== null) {
                editReader(book, chapter, verse);
                deselectButton("verses");
                selectButton("verses", verse);
                moveToElement(document.querySelector("#versesTab").querySelector(".list"));
                addScreen();
                screenActivator(true);
                openScreen();
                sliderManager("chapter");
                sliderManager("verse");
                setTitlePage();
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function closeVerse() {
    try {
        if (isRunning) {
            deselectButton("verses");
            editReader(readerManager("get", readerActive, null)["book"], readerManager("get", readerActive, null)["chapter"], null);
            viewMenu("chapters");
            removeList("verse");
            checkScrollingList('versesTab');
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function checkIntegrityData() {
    try {
        if (isRunning) {
            if (data !== undefined && data !== null) {
                if (data["bible"] !== undefined && data["bible"] !== null) {
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

function getBooks() {
    try {
        if (isRunning) {
            if (checkIntegrityData()) {
                data["books"].forEach((element, index) => {
                    if (element["location"] !== undefined && element["location"] !== null) {
                        if (element["location"] === "old") {
                            if (index === 0) {
                                bookLabelCreator("antiguo testamento");
                            }
                            bookButtonCreator(element["name"], (index += 1));
                        } else {
                            if (index === 39) {
                                bookLabelCreator("nuevo testamento");
                            }
                            bookButtonCreator(element["name"], (index += 1));
                        }
                    }
                });
            } else {
                alertManager("Error de Integridad de Datos", error, true, false, null);
            }
        }
    } catch (error) {
        alertManager("Error de Datos", error, true, false, null);
    }
}

function getChapters() {
    try {
        if (isRunning) {
            if (checkIntegrityData()) {
                let book = readerManager("get", readerActive, null)["book"];
                if (book !== undefined && book !== null) {
                    data["books"].forEach(element => {
                        if (element["name"] === book) {
                            element["chapters"].forEach((subElement, index) => {
                                chapterButtonCreator(index, book);
                            });
                        }
                    });
                }
            }
        }
    } catch (error) {
        alertManager("Error de Datos", error, true, false, null);
    }
}

function getVerses() {
    try {
        if (isRunning) {
            if (checkIntegrityData()) {
                let numberBook = null;
                data["books"].forEach((element, index) => {
                    if (element["name"] === readerManager("get", readerActive, null)["book"]) {
                        numberBook = index;
                    }
                });
                let searchChapter = data["books"][numberBook]["chapters"][readerManager("get", readerActive, null)["chapter"]];
                searchChapter["verses"].forEach((element, index) => {
                    verseButtonCreator(index, readerManager("get", readerActive, null)["chapter"], readerManager("get", readerActive, null)["book"]);
                });
            }
        }
    } catch (error) {
        alertManager("Error de Datos", error, true, false, null);
    }
}

function getContentVerse(option) {
    try {
        if (isRunning) {
            if (option !== undefined && option !== null) {
                switch (option) {
                    case "location":
                        let location = readerManager("get", readerActive, null)["book"] + " " + (readerManager("get", readerActive, null)["chapter"] + 1) + ":" + (readerManager("get", readerActive, null)["verse"] + 1);
                        if (location !== undefined && location !== null) {
                            return location;
                        }
                        break;
                    case "title":
                        let screenTitle = document.querySelector(".screen");
                        if (screenTitle !== undefined && screenTitle !== null) {
                            let numberBook = null;
                            data["books"].forEach((element, index) => {
                                if (element["name"] == readerManager("get", readerActive, null)["book"]) {
                                    numberBook = index;
                                }
                            });
                            let title = data["books"][numberBook]["chapters"][readerManager("get", readerActive, null)["chapter"]]["verses"][readerManager("get", readerActive, null)["verse"]].title;
                            if (title !== undefined && title !== null) {
                                return title;
                            }
                        }
                        break;
                    case "content":
                        let screenContent = document.querySelector(".screen");
                        if (screenContent !== undefined && screenContent !== null) {
                            let numberBook = null;
                            data["books"].forEach((element, index) => {
                                if (element["name"] == readerManager("get", readerActive, null)["book"]) {
                                    numberBook = index;
                                }
                            });
                            let content = data["books"][numberBook]["chapters"][readerManager("get", readerActive, null)["chapter"]]["verses"][readerManager("get", readerActive, null)["verse"]].content;
                            if (content !== undefined && content !== null) {
                                return content;
                            }
                        }
                        break;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function closeAllOpened(){
    try {
        if(isRunning){
            closeBook();
            closeScreen();
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function viewMenu(option) {
    try {
        if (isRunning) {
            if (option !== undefined && option !== null) {
                const tab = document.querySelector("#second").querySelector(".tab");
                tab.querySelector(".header").querySelectorAll("button").forEach(element => {
                    if (element.classList.contains("selected")) {
                        element.classList.remove("selected");
                    }
                });
                tab.querySelector(".main").querySelectorAll("div").forEach(element => {
                    if (element.classList.contains("active")) {
                        element.classList.remove("active");
                        element.classList.add("inactive");
                    }
                });
                switch (option) {
                    case "books":
                        tab.querySelector(".header").querySelector(".books").classList.add("selected");
                        tab.querySelector(".main").querySelector(".books").classList.remove("inactive");
                        tab.querySelector(".main").querySelector(".books").classList.add("active");
                        moveToElement(document.querySelector("#booksTab").querySelector(".list"));
                        break;
                    case "chapters":
                        tab.querySelector(".header").querySelector(".chapters").classList.add("selected");
                        tab.querySelector(".main").querySelector(".chapters").classList.remove("inactive");
                        tab.querySelector(".main").querySelector(".chapters").classList.add("active");
                        moveToElement(document.querySelector("#chaptersTab").querySelector(".list"));
                        break;
                    case "verses":
                        tab.querySelector(".header").querySelector(".verses").classList.add("selected");
                        tab.querySelector(".main").querySelector(".verses").classList.remove("inactive");
                        tab.querySelector(".main").querySelector(".verses").classList.add("active");
                        moveToElement(document.querySelector("#versesTab").querySelector(".list"));
                        break;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function selectButton(option, key) {
    try {
        if (isRunning) {
            if (option !== null && key !== null) {
                let list = null;
                if (option === "readers") {
                    list = document.querySelector("#" + option).querySelector(".list");
                } else {
                    list = document.querySelector("#" + option + "Tab").querySelector(".list");
                }
                if (list !== undefined && list !== null) {
                    switch (option) {
                        case "books":
                            list.querySelectorAll("button").forEach(element => {
                                if (element.dataset.book == key) {
                                    element.classList.add("selected");
                                }
                            });
                            break;
                        case "chapters":
                            list.querySelectorAll("button").forEach(element => {
                                if (element.dataset.chapter == key) {
                                    element.classList.add("selected");
                                }
                            });
                            break;
                        case "verses":
                            list.querySelectorAll("button").forEach(element => {
                                if (element.dataset.verse == key) {
                                    element.classList.add("selected");
                                }
                            });
                            break;
                        case "readers":
                            list.querySelectorAll("div").forEach(element => {
                                if (element.dataset.reader == key) {
                                    element.classList.add("selected");
                                }
                            });
                            break;
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function deselectButton(option) {
    try {
        if (isRunning) {
            if (option !== undefined && option !== null) {
                let list = null;
                if (option === "readers") {
                    list = document.querySelector("#" + option).querySelector(".list");
                    if (list !== undefined && list !== null) {
                        list.querySelectorAll("div").forEach(element => {
                            if (element.classList.contains("selected")) {
                                element.classList.remove("selected")
                            }
                        });
                    }
                } else {
                    list = document.querySelector("#" + option + "Tab").querySelector(".list");
                    if (list !== undefined && list !== null) {
                        list.querySelectorAll("button").forEach(element => {
                            if (element.classList.contains("selected")) {
                                element.classList.remove("selected")
                            }
                        });
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function writeBook(){
    try {
        if(isRunning){
            const text = document.querySelector("#textBook").value;
            if(text !== undefined && text !== null && text !== "" && text.trim().length > 0){
                if(document.querySelector("#booksTab").querySelector(".list").querySelectorAll("button").length > 0){
                    let aux = false;
                    document.querySelector("#booksTab").querySelector(".list").querySelectorAll("button").forEach(element => {
                        if(removeAccents(removeSpecialCharacters(element.innerText.toLowerCase())).includes(text.trim().toLowerCase())){
                            if(!aux){
                                element.click();
                                aux = true;
                            }
                        }
                    });
                    if(!aux){
                        alertManager("Libro inexistente", "No existe el Libro escrito", false, false, null);
                        document.querySelector("#textBook").focus();
                    }else{
                        document.querySelector("#textBook").value = null;
                        document.querySelector("#textChapter").focus();
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function writeChapter(){
    try {
        if(isRunning){
            const text = parseInt(document.querySelector("#textChapter").value);
            if(text !== undefined && text !== null && text !== "" && text.toString.length > 0){
                let aux = false;
                if(document.querySelector("#chaptersTab").querySelector(".list").querySelectorAll("button")[text - 1] !== undefined && document.querySelector("#chaptersTab").querySelector(".list").querySelectorAll("button")[text - 1] !== null){
                    document.querySelector("#chaptersTab").querySelector(".list").querySelectorAll("button")[text - 1].click();
                    aux = true;
                }
                if(!aux){
                    alertManager("Capítulo inexistente", "No existe el Capítulo escrito", false, false, null);
                    document.querySelector("#textChapter").focus();
                }else{
                    document.querySelector("#textChapter").value = null;
                    document.querySelector("#textVerse").focus();
                }
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function writeVerse(){
    try {
        if(isRunning){
            const text = parseInt(document.querySelector("#textVerse").value);
            if(text !== undefined && text !== null && text !== "" && text.toString.length > 0){
                let aux = false;
                if(document.querySelector("#versesTab").querySelector(".list").querySelectorAll("button")[text - 1] !== undefined && document.querySelector("#versesTab").querySelector(".list").querySelectorAll("button")[text - 1] !== null){
                    document.querySelector("#versesTab").querySelector(".list").querySelectorAll("button")[text - 1].click();
                    aux = true;
                }
                if(!aux){
                    alertManager("Versículo inexistente", "No existe el Versículo escrito", false, false, null);
                    document.querySelector("#textVerse").focus();
                }else{
                    document.querySelector("#textVerse").value = null;
                    document.querySelector("#textVerse").blur();
                }
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
    }
}

function dragVerseButton(event) {
    try {
        if (isRunning) {
            if (event !== undefined && event !== null) {
                let book = event.target.dataset.book;
                let chapter = event.target.dataset.chapter;
                let verse = event.target.dataset.verse;
                let reader = book + "-" + chapter + "|" + verse;
                event.dataTransfer.setData("text", reader);
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, false, false, null);
    }
}

// Remover caracteres especiales
function removeSpecialCharacters(text) {
    try {
        if (isRunning) {
            if (text !== undefined && text !== null) {
                text = text.split("ª").join("");
                text = text.trim().toLowerCase();
                text = text.split("<span>").join("");
                text = text.split("</span>").join("");
                text = text.split("<br>").join(" ");
                text = text.split("<br />").join(" ");
                text = text.split("<br/>").join(" ");
                text = text.split("<div>").join(" ");
                text = text.split("</div>").join(" ");
                return text;
            }
        }
    } catch (error) {
        alertManager("Error de Item", error, true, false, null);
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
        alertManager("Error de Item", error, true, false, null);
        return text;
    }
}