/***** BASE *****/

let isRunning;
let alertDisplayed;
let maxItemsDisplayed;
let scrollMovePx;
let item;
let itemsMemory;
let maxItemsMemory;
let textScreenSize;
let inputTextFocused;
let tabindex;
let designCode;

window.addEventListener("load", function(){
    isRunning = true;
    alertDisplayed = false;
    maxItemsDisplayed = 20;
    scrollMovePx = 100;
    item = {"code": null, "name": null, "info": null, "type": null, "desc": null, "body": null};
    itemsMemory = [];
    maxItemsMemory = 20;
    inputTextFocused = false;
    tabindex = 0;
    designCode = "00";
    textScreenSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--screen-fnsz").replace("vw", ""));

    init();
    getItems();
    getDesign();
});