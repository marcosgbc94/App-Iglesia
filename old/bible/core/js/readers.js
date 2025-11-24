/***** READERS *****/

function openReader(ID) {
    try {
        if (isRunning) {
            if (ID !== undefined && ID !== null) {
                readerActive = ID;
                deselectButton("readers");
                selectButton("readers", ID);
                const bo = readerManager("get", ID, null)["book"];
                const ch = readerManager("get", ID, null)["chapter"];
                const ve = readerManager("get", ID, null)["verse"];
                setTitlePage();
                if (bo !== null && ch === null && ve === null) {
                    openBook(bo);
                    screenActivator(true);
                    document.querySelector("#chaptersTab").querySelector(".list").scrollTop = 0;
                } else if (bo !== null && ch !== null && ve === null) {
                    openBook(bo);
                    openChapter(bo, ch);
                    screenActivator(true);
                } else if (bo !== null && ch !== null && ve !== null) {
                    openBook(bo);
                    openChapter(bo, ch);
                    openVerse(bo, ch, ve);
                } else {
                    closeBook();
                    screenActivator(true);
                    setTitle(null);
                    document.querySelector("#booksTab").querySelector(".list").scrollTop = 0;
                    activatorElement(document.querySelector(".mainApp").querySelector("#header"), false);
                    activatorElement(document.querySelector(".mainApp").querySelector("#footer"), false);
                }
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, true, false, null);
    }
}

function readerManager(option, tab, fill) {
    try {
        if (isRunning) {
            if (option !== undefined && option !== null) {
                switch (option) {
                    case "new":
                        if (tab !== undefined && tab !== null) {
                            let acceptNew = true;
                            readers.forEach(element => {
                                if (element["tab"] == tab) {
                                    acceptNew = false;
                                }
                            });
                            if (acceptNew) {
                                readers.push({ "tab": tab, "book": null, "chapter": null, "verse": null });
                                return true;
                            } else {
                                return "La Pestaña ya esta disponible.";
                            }
                        } else {
                            return "Identificador de Pestaña vacío o defectuoso.";
                        }
                        break;
                    case "edit":
                        if (tab !== null && fill !== null) {
                            let acceptEdit = false;
                            readers.forEach(element => {
                                if (element["tab"] == tab) {
                                    element["book"] = fill["book"];
                                    element["chapter"] = fill["chapter"];
                                    element["verse"] = fill["verse"];
                                    acceptEdit = true;
                                }
                            });
                            if (acceptEdit) {
                                return true;
                            } else {
                                return "La Pestaña no se encuentra.";
                            }
                        } else {
                            return "Identificador de Pestaña vacío o defectuoso.";;
                        }
                        break;
                    case "delete":
                        if (tab !== null) {
                            let acceptDelete = false;
                            let idx = null;
                            readers.forEach((element, index) => {
                                if (element["tab"] == tab) {
                                    idx = index;
                                    acceptDelete = true;
                                }
                            });
                            if (acceptDelete) {
                                readers.splice(idx, 1);
                                return true;
                            } else {
                                return "La Pestaña no se encuentra.";
                            }
                        } else {
                            return "Identificador de Pestaña vacío o defectuoso.";
                        }
                        break;
                    case "get":
                        if (tab !== null) {
                            let ret = null;
                            readers.forEach(element => {
                                if (element["tab"] == tab) {
                                    ret = { "book": element["book"], "chapter": element["chapter"], "verse": element["verse"] };
                                }
                            });
                            return ret;
                        } else {
                            return "Identificador de Pestaña vacío o defectuoso.";
                        }
                        break;
                }
            } else {
                return "Error interno del sistema de pestañas.";
            }
        } else {
            return false;
        }
    } catch (error) {
        alertManager("Error de Lectura", error, true, false, null);
        return false;
    }
}

function addReader() {
    try {
        if (isRunning) {
            if (getNewIDReader() !== false && getNewIDReader() !== null) {
                let ID = getNewIDReader();
                let cont = document.querySelector("#first").querySelector(".list").querySelectorAll("div").length;
                if (cont < maxReaders) {
                    readerButtonCreator(ID);
                    readerManager("new", ID, null);
                    readerActive = ID;
                    addScreenCreator(ID);
                    openReader(ID);
                    checkScrollingList('readers');
                    if (cont === (maxReaders - 1)) {
                        setStateButton(document.querySelector("#first").querySelector("#header").querySelector(".actionButton"), true);
                    }
                } else {
                    alertManager("Advertencia", "Sólo se permite abrir hasta " + maxReaders + " lecturas al mismo tiempo.", false, false, null);
                    return false;
                }
            } else {
                alertManager("Error de Lectura", "Hubo un problema interno en el sistema. Si el problema persiste, reinicie la aplicación presionando la tecla F5 de su teclado.", false, false, null);
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, true, false, null);
    }
}

function editReader(book, chapter, verse) {
    try {
        if (isRunning) {
            document.querySelector("#first").querySelector(".main").querySelector(".list").querySelectorAll("div").forEach(element => {
                if (element.dataset.reader == readerActive) {
                    if (book !== null && chapter !== null && verse !== null) {
                        readerManager("edit", readerActive, { "book": book, "chapter": chapter, "verse": verse });
                        element.setAttribute("data-book", book);
                        element.setAttribute("data-chapter", chapter);
                        element.setAttribute("data-verse", verse);
                        let title = "<h1>" + getContentVerse("title") + "</h1>";
                        let content = getContentVerse("content");
                        if (title !== null && content !== null) {
                            element.querySelector(".openReaderButton").setAttribute("data-title", title);
                            element.querySelector(".openReaderButton").setAttribute("data-content", content);
                            element.querySelector(".openReaderButton").setAttribute("onmouseover", "previewIn(event)");
                            element.querySelector(".openReaderButton").setAttribute("onmouseout", "previewOut()");
                        }
                        element.querySelector(".openReaderButton").innerHTML = null;
                        let textNode = document.createTextNode(book + " " + (chapter + 1) + ":" + (verse + 1));
                        element.querySelector(".openReaderButton").appendChild(textNode);
                    } else if (book !== null && chapter !== null && verse === null) {
                        readerManager("edit", readerActive, { "book": book, "chapter": chapter, "verse": null });
                        element.setAttribute("data-book", book);
                        element.setAttribute("data-chapter", chapter);
                        element.setAttribute("data-verse", null);
                        element.querySelector(".openReaderButton").setAttribute("data-content", null);
                        element.querySelector(".openReaderButton").setAttribute("data-title", null);
                        element.querySelector(".openReaderButton").setAttribute("onmouseover", null);
                        element.querySelector(".openReaderButton").setAttribute("onmouseout", null);
                        element.querySelector(".openReaderButton").innerHTML = null;
                        let textNode = document.createTextNode(book + " " + (chapter + 1));
                        element.querySelector(".openReaderButton").appendChild(textNode);
                    } else if (book !== null && chapter === null && verse === null) {
                        readerManager("edit", readerActive, { "book": book, "chapter": null, "verse": null });
                        element.setAttribute("data-book", book);
                        element.setAttribute("data-chapter", null);
                        element.setAttribute("data-verse", null);
                        element.querySelector(".openReaderButton").setAttribute("data-content", null);
                        element.querySelector(".openReaderButton").setAttribute("data-title", null);
                        element.querySelector(".openReaderButton").setAttribute("onmouseover", null);
                        element.querySelector(".openReaderButton").setAttribute("onmouseout", null);
                        element.querySelector(".openReaderButton").innerHTML = null;
                        element.querySelector(".openReaderButton").appendChild(document.createTextNode(book));
                    } else {
                        readerManager("edit", readerActive, { "book": null, "chapter": null, "verse": null });
                        element.setAttribute("data-book", null);
                        element.setAttribute("data-chapter", null);
                        element.setAttribute("data-verse", null);
                        element.querySelector(".openReaderButton").setAttribute("data-content", null);
                        element.querySelector(".openReaderButton").setAttribute("data-title", null);
                        element.querySelector(".openReaderButton").setAttribute("onmouseover", null);
                        element.querySelector(".openReaderButton").setAttribute("onmouseout", null);
                        element.querySelector(".openReaderButton").innerHTML = null;
                        element.querySelector(".openReaderButton").appendChild(document.createTextNode("nueva lectura " + (parseInt(readerActive) + 1)));
                    }
                }
            });
        }
    } catch (error) {
        alertManager("Error de Lectura", error, true, false, null);
    }
}

function previewIn(event) {
    try {
        if (isRunning) {
            if (event !== undefined && event !== null) {
                if(!event.target.parentNode.classList.contains("selected")){
                    let preview = document.querySelector("#preview");
                    let cancelButtonSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--actionButton-sz'));
                    let headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-hg'));
                    let headerScrollHeight = parseInt(getComputedStyle(document.querySelector(".container").querySelector(".header"), null).height.replace("px", ""));
                    if(event.target.dataset.content !== null && preview !== null && cancelButtonSize !== null && headerHeight !== null && headerScrollHeight !== null){
                        activatorElement(document.querySelector("#preview"), true);
                        document.querySelector("#preview").innerHTML = event.target.dataset.title + event.target.dataset.content;
                        preview.style.left = event.target.offsetLeft + "px";
                        let top = event.target.offsetTop + headerHeight + headerScrollHeight + cancelButtonSize + 5;
                        let bottom = event.target.offsetTop + headerHeight + headerScrollHeight - preview.clientHeight - 5;
                        preview.style.width = (event.target.offsetWidth + cancelButtonSize) + "px";
                        if(preview.clientHeight + top < window.innerHeight){
                            preview.style.top = top + "px";
                        }else{
                            preview.style.top = bottom + "px";
                        }
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, true, false, null);
    }
}

function previewOut() {
    try {
        if (isRunning) {
            activatorElement(document.querySelector("#preview"), false);
        }
    } catch (error) {
        alertManager("Error de Lectura", error, true, false, null);
    }
}

function removeReader(ID) {
    try {
        if (isRunning) {
            if (ID !== undefined && ID !== null) {
                let idx = null;
                document.querySelector("#first").querySelector(".main").querySelector(".list").querySelectorAll("div").forEach((element, index) => {
                    if (element.dataset.reader == ID) {
                        if (element.classList.contains("selected")) {
                            if (index > 0) {
                                idx = document.querySelector("#first").querySelector(".main").querySelector(".list").querySelectorAll("div")[index - 1].dataset.reader;
                            } else {
                                if (document.querySelector("#first").querySelector(".main").querySelector(".list").querySelectorAll("div").length - 1 > 0) {
                                    idx = document.querySelector("#first").querySelector(".main").querySelector(".list").querySelectorAll("div")[1].dataset.reader;
                                }
                            }
                        }
                        element.remove();
                    }
                });
                document.querySelector(".screen").querySelectorAll(".screens").forEach(element => {
                    if (element.dataset.reader == ID) {
                        element.remove();
                    }
                });
                readerManager("delete", ID, null);
                setStateButton(document.querySelector("#first").querySelector("#header").querySelector(".actionButton"), false);
                if (document.querySelector("#first").querySelector(".main").querySelector(".list").querySelectorAll("div").length === 0) {
                    addReader();
                }
                if (idx !== null) {
                    openReader(idx);
                }
                checkScrollingList('readers');
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, true, false, null);
    }
}

function dragReaderButton(event) {
    try {
        if (isRunning) {
            if (event !== undefined && event !== null) {
                event.dataTransfer.setData("text", event.target.id);
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, false, false, null);
    }
}

function dropFirst(event) {
    try {
        if (isRunning) {
            if (event !== undefined && event !== null) {
                if (event.toElement.classList.contains("list")) {
                    event.preventDefault();
                    let data = event.dataTransfer.getData("text");
                    if(data.includes("-")){
                        let book = data.substring(0, data.indexOf("-"));
                        let chapter = parseInt(data.substring((parseInt(data.indexOf("-")) + 1), data.indexOf("|")));
                        let verse = parseInt(data.substring((parseInt(data.indexOf("|")) + 1), data.length));
                        if(addReader() !== false){
                            openBook(book);
                            openChapter(book, chapter);
                            openVerse(book, chapter, verse);
                        }
                    }else{
                        event.target.appendChild(document.getElementById(data));
                    }
                } else {
                    event.preventDefault();
                    let data = event.dataTransfer.getData("text");
                    if(data.includes("-")){
                        let book = data.substring(0, data.indexOf("-"));
                        let chapter = parseInt(data.substring((parseInt(data.indexOf("-")) + 1), data.indexOf("|")));
                        let verse = parseInt(data.substring((parseInt(data.indexOf("|")) + 1), data.length));
                        if(addReader() !== false){
                            openBook(book);
                            openChapter(book, chapter);
                            openVerse(book, chapter, verse);
                        }
                    }else{
                        document.querySelector("#first").querySelector(".list").insertBefore(document.getElementById(data), event.toElement.parentNode);
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, false, false, null);
    }
}

function dragEnter(event) {
    try {
        if (isRunning) {
            if (event !== undefined && event !== null) {
                event.toElement.parentNode.classList.add("over");
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, false, false, null);
    }
}

function dragLeave(event) {
    try {
        if (isRunning) {
            if (event !== undefined && event !== null) {
                event.toElement.parentNode.classList.remove("over");
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, false, false, null);
    }
}

function allowDrop(event) {
    try {
        if (isRunning) {
            if (event !== undefined && event !== null) {
                event.preventDefault();
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, false, false, null);
    }
}

function deselectAllReaderButtons() {
    try {
        if (isRunning) {
            document.querySelector("#first").querySelector(".main").querySelector(".list").querySelectorAll("div").forEach(element => {
                if (element.classList.contains("over")) {
                    element.classList.remove("over");
                }
            });
        }
    } catch (error) {
        alertManager("Error de Lectura", error, false, false, null);
    }
}

function getNewIDReader() {
    try {
        if (isRunning) {
            if (readers !== undefined) {
                if (readers.length > 0) {
                    let readersID = [];
                    readers.forEach(element => {
                        readersID.push(element["tab"]);
                    });
                    let higher = (Math.max.apply(null, readersID)) + 1;
                    return higher;
                } else {
                    return 0;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        alertManager("Error de Lectura", error, true, false, null);
        return false;
    }
}

function removeSpecialCharactersReader(text) {
    try {
        if (isRunning) {
            if (text !== undefined && text !== null) {
                text = text.split("<span>").join("");
                text = text.split("</span>").join("");
                text = text.split("<br>").join("");
                text = text.split("<br />").join("");
                text = text.split("<br/>").join("");
                return text;
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, true, false, null);
    }
}

function setTitlePage(){
    try {
        if(isRunning){
            let book = readerManager("get", readerActive, null)["book"];
            let chapter = readerManager("get", readerActive, null)["chapter"];
            let verse = readerManager("get", readerActive, null)["verse"];
            if(book !== null && chapter !== null && verse !== null){
                document.title = captialize(book) + " " + (chapter + 1) + ":" + (verse + 1);
            }else{
                document.title = "Santa Biblia";
            }
        }
    } catch (error) {
        alertManager("Error de Lectura", error, true, false, null);
    }
}
