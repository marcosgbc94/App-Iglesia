/***** CONTROLS *****/

function next(option) {
    try {
        if (isRunning) {
            if (option !== undefined && option !== null) {
                switch (option) {
                    case "chapter":
                        let bookCH = readerManager("get", readerActive, null)["book"];
                        let chapterCH = readerManager("get", readerActive, null)["chapter"];
                        let chapters = getCountChapters();
                        if (chapterCH < chapters) {
                            openChapter(bookCH, chapterCH + 1, null);
                            openVerse(bookCH, chapterCH + 1, 0);
                        }
                        break;
                    case "verse":
                        let bookVE = readerManager("get", readerActive, null)["book"];
                        let chapterVE = readerManager("get", readerActive, null)["chapter"];
                        let verseVE = readerManager("get", readerActive, null)["verse"];
                        let verses = getCountVerses();
                        if (verseVE < verses) {
                            openVerse(bookVE, chapterVE, verseVE + 1);
                        }
                        break;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, true, false, null);
    }
}

function prev(option) {
    try {
        if (isRunning) {
            if (option !== undefined && option !== null) {
                switch (option) {
                    case "chapter":
                        let bookCH = readerManager("get", readerActive, null)["book"];
                        let chapterCH = readerManager("get", readerActive, null)["chapter"];
                        if (chapterCH > 0) {
                            openChapter(bookCH, chapterCH - 1, null);
                            openVerse(bookCH, chapterCH - 1, 0);
                        }
                        break;
                    case "verse":
                        let bookVE = readerManager("get", readerActive, null)["book"];
                        let chapterVE = readerManager("get", readerActive, null)["chapter"];
                        let verseVE = readerManager("get", readerActive, null)["verse"];
                        if (verseVE > 0) {
                            openVerse(bookVE, chapterVE, verseVE - 1);
                        }
                        break;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, true, false, null);
    }
}

function last(option) {
    try {
        if (isRunning) {
            if (option !== undefined && option !== null) {
                switch (option) {
                    case "chapter":
                        let bookCH = readerManager("get", readerActive, null)["book"];
                        let chapters = getCountChapters();
                        openChapter(bookCH, chapters, null);
                        openVerse(bookCH, chapters, 0);
                        break;
                    case "verse":
                        let bookVE = readerManager("get", readerActive, null)["book"];
                        let chapterVE = readerManager("get", readerActive, null)["chapter"];
                        let verses = getCountVerses();
                        openVerse(bookVE, chapterVE, verses);
                        break;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, true, false, null);
    }
}

function first(option) {
    try {
        if (isRunning) {
            if (option !== undefined && option !== null) {
                switch (option) {
                    case "chapter":
                        let bookCH = readerManager("get", readerActive, null)["book"];
                        openChapter(bookCH, 0, null);
                        openVerse(bookCH, 0, 0);
                        break;
                    case "verse":
                        let bookVE = readerManager("get", readerActive, null)["book"];
                        let chapterVE = readerManager("get", readerActive, null)["chapter"];
                        openVerse(bookVE, chapterVE, 0);
                        break;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, true, false, null);
    }
}

function getCountChapters() {
    try {
        if (isRunning) {
            let book = readerManager("get", readerActive, null)["book"];
            let count = 0;
            if (book !== undefined && book !== null) {
                data["books"].forEach(element => {
                    if (element["name"] === book) {
                        element["chapters"].forEach((subElement, index) => {
                            count++;
                        });
                    }
                });
            }
            return count - 1;
        }
    } catch (error) {
        alertManager("Error de Controles", error, true, false, null);
    }
}

function getCountVerses() {
    try {
        if (isRunning) {
            let numberBook = null;
            let count = 0;
            data["books"].forEach((element, index) => {
                if (element["name"] === readerManager("get", readerActive, null)["book"]) {
                    numberBook = index;
                }
            });
            let searchChapter = data["books"][numberBook]["chapters"][readerManager("get", readerActive, null)["chapter"]];
            searchChapter["verses"].forEach((element, index) => {
                count++;
            });
            return count - 1;
        }
    } catch (error) {
        alertManager("Error de Controles", error, true, false, null);
    }
}

function sliderManager(option){
    try {
        if(isRunning){
            if(option !== undefined && option !== null){
                switch(option){
                    case "chapter":
                        document.querySelector(".boxChapters").querySelector(".index").innerHTML = (readerManager("get", readerActive, null)["chapter"] + 1) + "<span class='total'>/" + (getCountChapters() + 1) + "</span>";
                        document.querySelector(".boxChapters").querySelector(".slider").querySelector(".progress").style.width = ((100 * (readerManager("get", readerActive, null)["chapter"] + 1)) / (getCountChapters() + 1)) + "%";
                        break;
                    case "verse":
                        document.querySelector(".boxVerses").querySelector(".index").innerHTML = (readerManager("get", readerActive, null)["verse"] + 1) + "<span class='total'>/" + (getCountVerses() + 1) + "</span>";
                        document.querySelector(".boxVerses").querySelector(".slider").querySelector(".progress").style.width = ((100 * (readerManager("get", readerActive, null)["verse"] + 1)) / (getCountVerses() + 1)) + "%";
                        break;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Controles", error, true, false, null);
    }
}