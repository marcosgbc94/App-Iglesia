/***** KEYS *****/

window.addEventListener("keydown", function(event){
    try {
        if(isRunning){
            switch(event.which){
                case 13:
                    if(alertDisplayed){
                        let cancelButton = document.querySelector("#message").querySelector(".cancel");
                        let acceptButton = document.querySelector("#message").querySelector(".accept");
                        if(acceptButton !== null){
                            acceptButton.click();
                        }else if(cancelButton !== null){
                            cancelButton.click();
                        }
                    }
                    break;
                case 27:
                    event.preventDefault();
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            closeItem();
                        }else{
                            document.activeElement.blur();
                        }
                    }else{
                        let cancelButton = document.querySelector("#message").querySelector(".cancel");
                        let acceptButton = document.querySelector("#message").querySelector(".accept");
                        if(cancelButton !== null){
                            cancelButton.click();
                        }else if(acceptButton !== null){
                            acceptButton.click();
                        }
                    }
                    break;
                case 46:
                    event.preventDefault();
                    if(!alertDisplayed){
                        document.querySelector(".inputText").value = null;
                        getItems();
                    }
                    break
                case 113:
                    if(!alertDisplayed){
                        document.querySelector("#backButton").click();
                    }
                    break;
                case 33:
                    event.preventDefault();
                    if(!alertDisplayed){
                        upScroll('second');
                    }
                    break;
                case 34:
                    event.preventDefault();
                    if(!alertDisplayed){
                        downScroll('second');
                    }
                    break;
                case 35:
                    if(!alertDisplayed && !inputTextFocused){
                        event.preventDefault();
                        controlManager("last");
                    }
                    break;
                case 36:
                    if(!alertDisplayed && !inputTextFocused){
                        event.preventDefault();
                        controlManager("first");
                    }
                    break;
                case 37:
                    if(!alertDisplayed && !inputTextFocused){
                        controlManager("prev");
                    }
                    break;
                case 38:
                    event.preventDefault();
                    if(!alertDisplayed){
                        if (!inputTextFocused) {
                            if (document.querySelector("#first").querySelector(".list").querySelectorAll("button").length > 0) {
                                if (tabindex === 0) {
                                    tabindex = document.querySelector("#first").querySelector(".list").querySelectorAll("button").length;
                                    document.querySelector("#first").querySelector(".list").querySelectorAll("button")[tabindex - 1].focus();
                                } else if (tabindex === 1) {
                                    tabindex = document.querySelector("#first").querySelector(".list").querySelectorAll("button").length;
                                    document.querySelector("#first").querySelector(".list").querySelectorAll("button")[tabindex - 1].focus();
                                } else {
                                    tabindex--;
                                    document.querySelector("#first").querySelector(".list").querySelectorAll("button")[tabindex - 1].focus();
                                }
                            }
                        }
                    }
                    break;
                case 39:
                    if(!alertDisplayed && !inputTextFocused){
                        controlManager("next");
                    }
                    break;
                case 40:
                    event.preventDefault();
                    if(!alertDisplayed){
                        if (inputTextFocused) {
                            if (document.querySelector("#first").querySelector(".list").querySelectorAll("button").length > 0) {
                                document.querySelector(".inputText").blur();
                                tabindex = 1;
                                document.querySelector("#first").querySelector(".list").querySelectorAll("button")[tabindex - 1].focus();
                                document.querySelector("#first").querySelector(".list").scrollTop = 0;
                            }
                        } else {
                            if (document.querySelector("#first").querySelector(".list").querySelectorAll("button").length > 0) {
                                if (tabindex === 0) {
                                    tabindex = 1;
                                    document.querySelector("#first").querySelector(".list").querySelectorAll("button")[tabindex - 1].focus();
                                } else if (tabindex === document.querySelector("#first").querySelector(".list").querySelectorAll("button").length) {
                                    tabindex = 1;
                                    document.querySelector("#first").querySelector(".list").querySelectorAll("button")[tabindex - 1].focus();
                                } else {
                                    tabindex++;
                                    document.querySelector("#first").querySelector(".list").querySelectorAll("button")[tabindex - 1].focus();
                                }
                            }
                        }
                    }
                    break;
                case 8:
                case 48:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 58:
                case 59:
                case 60:
                case 61:
                case 62:
                case 63:
                case 64:
                case 65:
                case 66:
                case 67:
                case 68:
                case 69:
                case 70:
                case 71:
                case 72:
                case 73:
                case 74:
                case 75:
                case 76:
                case 77:
                case 78:
                case 79:
                case 80:
                case 81:
                case 82:
                case 83:
                case 84:
                case 85:
                case 86:
                case 87:
                case 88:
                case 89:
                case 90:
                    if (!alertDisplayed && !inputTextFocused) {
                        document.querySelector(".inputText").focus();
                    }
                    break;
            }
        }
    } catch (error) {
        alertManager("Error de Teclado", error, true, false, null);
    }
});