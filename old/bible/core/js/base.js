/***** BASE *****/

let isRunning;
let alertDisplayed;
let scrollMovePx;
let maxReaders;
let readers;
let readerActive;
let maxItemsConcord;
let inputTextFocused;

window.addEventListener("load", function(){
    isRunning = true;
    alertDisplayed = false;
    scrollMovePx = 200;
    maxReaders = 10;
    readers = [];
    readerActive = null;
    screenDisplayed = false;
    maxItemsConcord = 20;
    inputTextFocused = false;

    init();
    getBooks();
    addReader();
    checkScrollingList('booksTab');
});

