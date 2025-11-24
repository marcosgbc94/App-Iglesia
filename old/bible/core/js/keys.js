/***** KEYS *****/

window.addEventListener("keydown", function(event){
    try {
        if(isRunning){
            switch(event.which){
                case 9:
                    event.preventDefault();
                    break;
                case 27:
                    event.preventDefault();
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            if(document.querySelector("#results").classList.contains("active")){
                                closeConcord();
                            }else{
                                if(document.querySelector(".mainApp").querySelector("#header").classList.contains("active")){
                                    closeAllOpened();
                                }else{
                                    removeReader(readerActive);
                                }
                            }
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
                case 13:
                    event.preventDefault();
                    if(alertDisplayed){
                        let cancelButton = document.querySelector("#message").querySelector(".cancel");
                        let acceptButton = document.querySelector("#message").querySelector(".accept");
                        if(acceptButton !== null){
                            acceptButton.click();
                        }else if(cancelButton !== null){
                            cancelButton.click();
                        }
                    }else{
                        if(inputTextFocused){
                            document.activeElement.parentNode.querySelector(".actionButton").click();
                        }
                    }
                    break;
                case 46:
                    event.preventDefault();
                    if(!alertDisplayed){
                        if(inputTextFocused){
                            document.activeElement.value = null;
                        }
                    }
                    break;
                case 33:
                    event.preventDefault();
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            if(document.querySelector(".mainApp").querySelector("#header").classList.contains("active")){
                                prev("chapter");
                            }
                        }
                    }
                    break;
                case 34:
                    event.preventDefault();
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            if(document.querySelector(".mainApp").querySelector("#header").classList.contains("active")){document.querySelector(".screen").querySelector(".active").querySelector("div").querySelector("div").scrollTop
                                next("chapter");
                            }
                        }
                    }
                    break;
                case 37:
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            if(document.querySelector(".mainApp").querySelector("#header").classList.contains("active")){
                                prev("verse");
                            }
                        }
                    }
                    break;
                case 38:
                    event.preventDefault();
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            if(document.querySelector(".mainApp").querySelector("#header").classList.contains("active")){
                                document.querySelector(".screen").querySelector(".active").querySelector("div").querySelector("div").scrollTop = document.querySelector(".screen").querySelector(".active").querySelector("div").querySelector("div").scrollTop - scrollMovePx;
                            }
                        }
                    }
                    break;
                case 39:
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            if(document.querySelector(".mainApp").querySelector("#header").classList.contains("active")){document.querySelector(".screen").querySelector(".active").querySelector("div").querySelector("div").scrollTop
                                next("verse");
                            }
                        }
                    }
                    break;
                case 40:
                    event.preventDefault();
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            if(document.querySelector(".mainApp").querySelector("#header").classList.contains("active")){
                                document.querySelector(".screen").querySelector(".active").querySelector("div").querySelector("div").scrollTop = document.querySelector(".screen").querySelector(".active").querySelector("div").querySelector("div").scrollTop + scrollMovePx;
                            }
                        }
                    }
                    break;
                case 35:
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            if(document.querySelector(".mainApp").querySelector("#header").classList.contains("active")){
                                document.querySelector(".screen").querySelector(".active").querySelector("div").querySelector("div").scrollTop = document.querySelector(".screen").querySelector(".active").querySelector("div").querySelector("div").scrollHeight;
                            }
                        }
                    }
                    break;
                case 36:
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            if(document.querySelector(".mainApp").querySelector("#header").classList.contains("active")){
                                document.querySelector(".screen").querySelector(".active").querySelector("div").querySelector("div").scrollTop = 0;
                            }
                        }
                    }
                    break;
                case 113:
                    event.preventDefault();
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            addReader();
                        }
                    }
                    break;
                case 76:
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            viewMenu("books");
                            document.querySelector("#textBook").focus();
                            event.preventDefault();
                        }
                    }
                    break;
                case 67:
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            viewMenu("chapters");
                            document.querySelector("#textChapter").focus();
                            event.preventDefault();
                        }
                    }
                    break;
                case 86:
                    if(!alertDisplayed){
                        if(!inputTextFocused){
                            viewMenu("verses");
                            document.querySelector("#textVerse").focus();
                            event.preventDefault();
                        }
                    }
                    break;
            }
        }
    } catch (error) {
        alertManager("Error de Teclado", error, true, false, null);
    }
});