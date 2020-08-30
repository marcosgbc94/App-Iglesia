/***** ELEMENT MANAGER *****/

// Creador de botones de lectura
function readerButtonCreator(ID){
    try {
        if(isRunning){
            if(ID !== undefined && ID !== null){
                const list = document.querySelector("#first").querySelector(".main").querySelector(".list");
                let reader = document.createElement("div");
                reader.setAttribute("data-reader", ID);
                reader.id = ID;
                reader.className = "reader";
                reader.setAttribute("draggable", true);
                reader.setAttribute("ondragstart", "dragReaderButton(event)");
                reader.setAttribute("ondragenter", "dragEnter(event)");
                reader.setAttribute("ondragleave", "dragLeave(event)");
                reader.setAttribute("ondragend", "deselectAllReaderButtons()");
                let button = document.createElement("button");
                button.setAttribute("onclick", "openReader(" + ID + ")");
                button.appendChild(document.createTextNode("Nueva Lectura " + (parseInt(ID) + 1)));
                button.className = "openReaderButton textbreak";
                let close = document.createElement("button");
                close.className = "actionButton";
                close.setAttribute("title", "Cerrar esta Lectura");
                close.setAttribute("onclick", "removeReader(" + ID + ")");
                reader.appendChild(button);
                reader.appendChild(close);
                list.appendChild(reader);
            }
        }
    } catch (error) {
        alertManager("Error de Administración de Elementos", error, true, false, null);
    }
}

// Creador de botones de libro
function bookButtonCreator(name, index){
    try {
        if(isRunning){
            if(name !== null && index !== null){
                const list = document.querySelector("#booksTab").querySelector(".main").querySelector(".list");
                let button = document.createElement("button");
                button.setAttribute("onmouseover", "this.title = this.innerText");
                button.setAttribute("onclick", "openBook('" + name + "')");
                button.setAttribute("tabindex", index);
                button.setAttribute("data-book", name);
                button.className = "textbreak";
                button.appendChild(document.createTextNode(name));
                list.appendChild(button);
            }
        }
    } catch (error) {
        alertManager("Error de Administración de Elementos", error, true, false, null);
    }
}

// Creador de label de libro
function bookLabelCreator(name){
    try {
        if(isRunning){
            if(name !== undefined && name !== null){
                const list = document.querySelector("#booksTab").querySelector(".main").querySelector(".list");
                let label = document.createElement("span");
                label.setAttribute("onmouseover", "this.title = this.innerText");
                label.className = "label";
                label.appendChild(document.createTextNode(name));
                list.appendChild(label);
            }
        }
    } catch (error) {
        alertManager("Error de Administración de Elementos", error, true, false, null);
    }
}

// Creador de botones de capitulos
function chapterButtonCreator(index, book){
    try {
        if(isRunning){
            if(index !== null && book !== null){
                const list = document.querySelector("#chaptersTab").querySelector(".main").querySelector(".list");
                let button = document.createElement("button");
                button.setAttribute("onmouseover", "this.title = 'Capítulo ' + this.innerText");
                button.setAttribute("onclick", "openChapter('" + book + "', " + index + ")");
                button.setAttribute("tabindex", index);
                button.setAttribute("data-book", book);
                button.setAttribute("data-chapter", index);
                button.className = "textbreak";
                button.appendChild(document.createTextNode(index + 1));
                list.appendChild(button);
            }
        }
    } catch (error) {
        alertManager("Error de Administración de Elementos", error, true, false, null);
    }
}

// Creador de botones de versiculos
function verseButtonCreator(index, chapter, book){
    try {
        if(isRunning){
            if(index !== undefined && chapter !== null && book !== null){
                const list = document.querySelector("#versesTab").querySelector(".main").querySelector(".list");
                let button = document.createElement("button");
                button.setAttribute("onmouseover", "this.title = 'Versículo ' + this.innerText");
                button.setAttribute("onclick", "openVerse('" + book + "', " + chapter + ", " + index + ")");
                button.setAttribute("tabindex", index);
                button.setAttribute("data-book", book);
                button.setAttribute("data-chapter", chapter);
                button.setAttribute("data-verse", index);
                button.setAttribute("draggable", true);
                button.setAttribute("ondragstart", "dragVerseButton(event)");
                button.setAttribute("ondragenter", "dragEnter(event)");
                button.setAttribute("ondragleave", "dragLeave(event)");
                button.setAttribute("ondragend", "deselectAllReaderButtons()");
                button.className = "textbreak";
                button.appendChild(document.createTextNode(index + 1));
                list.appendChild(button);
            }
        }
    } catch (error) {
        alertManager("Error de Administración de Elementos", error, true, false, null);
    }
}

// Removedor de listas
function removeList(option){
    try {
        if(isRunning){
            if(option !== undefined && option !== null){
                switch(option){
                    case "book":
                        document.querySelector("#booksTab").querySelector(".list").querySelectorAll("*").forEach(element => {
                            element.remove();
                        });
                        break;
                    case "chapter":
                        document.querySelector("#chaptersTab").querySelector(".list").querySelectorAll("*").forEach(element => {
                            element.remove();
                        });
                        break;
                    case "verse":
                        document.querySelector("#versesTab").querySelector(".list").querySelectorAll("*").forEach(element => {
                            element.remove();
                        });
                        break;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Administración de Elementos", error, true, false, null);
    }
}

// Creador de Pantallas
function addScreenCreator(ID){
    try {
        if(isRunning){
            if(ID !== undefined && ID !== null){
                const screen = document.querySelector(".screen");
                if(screen !== null){
                    let newScreen = document.createElement("div");
                    newScreen.className = "screens inactive";
                    newScreen.setAttribute("data-reader", ID);
                    screen.appendChild(newScreen);
                }
            }
        }
    } catch (error) {
        alertManager("Error de Administración de Elementos", error, true, false, null);
    }
}

// Creador de Items de concordancia
function concordItem(book, chapter, verse, content, titleVerse){
    try {
        if(isRunning){
            if(book !== null && chapter !== null && verse !== null && content !== null && title !== null) {
                let base = document.createElement("div");
                let header = document.createElement("div");
                header.className = "header";
                let title = document.createElement("span");
                title.className = "label textbreak";
                title.innerHTML = book + " " + (chapter + 1) + ":" + (verse + 1);
                let openHere = document.createElement("button");
                openHere.className = "actionButton icon-openItem-black";
                openHere.setAttribute("title", "Abrir en esta lectura");
                openHere.setAttribute("onclick", "openConcordItemHere('" + book + "', " + chapter + ", " + verse + ")");
                let openNewTab = document.createElement("button");
                openNewTab.className = "actionButton icon-openNewItem-black";
                openNewTab.setAttribute("onclick", "openConcordItemNewTab('" + book + "', " + chapter + ", " + verse + ")");
                openNewTab.setAttribute("title", "Abrir en una nueva lectura");
                header.appendChild(title);
                header.appendChild(openNewTab);
                header.appendChild(openHere);
                let text = document.createElement("div");
                text.className = "text";
                text.innerHTML = "<h1>" + titleVerse + "</h1>" + content;
                base.appendChild(header);
                base.appendChild(text);
                document.querySelector("#results").querySelector(".list").appendChild(base);
            }
        }
    } catch (error) {
        alertManager("Error de Administración de Elementos", error, true, false, null);
    }
}