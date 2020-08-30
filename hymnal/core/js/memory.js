/***** MEMORY *****/

function itemMemoryManager(option, code){
    try {
        if(isRunning && option !== null){
            switch(option){
                case "add":
                    return addItemToMemory(code);
                case "get":
                    return getItemFromMemory();
                case "remove":
                    return removeItemFromMemory();
            }
        }
    } catch (error) {
        alertManager("Error de Memoria", error, true, false, false);
    }
}

function addItemToMemory(code){
    try {
        if(isRunning && code !== null){
            if (checkIntegrityData()) {
                if(checkUniqueItem(code)){
                    data["praise"].forEach(element => {
                        if(element["code"] === code){
                            item["code"] = code;
                            item["name"] = element["name"];
                            item["info"] = element["info"];
                            item["type"] = element["type"];
                            item["desc"] = element["desc"];
                            item["body"] = element["body"];
                        }
                    });
                    return true;
                }else{
                    return false;
                }
            }
        }
    } catch (error) {
        alertManager("Error de Memoria", error, true, false, false);
    }
}

function getItemFromMemory(){
    try {
        if(isRunning){
            if (item["code"] !== null) {
                return {"code": item["code"], "name": item["name"], "info": item["info"], "type": item["type"], "desc": item["desc"], "body": item["body"]};
            }else{
                return false;
            }
        }
    } catch (error) {
        alertManager("Error de Memoria", error, true, false, false);
    }
}

function removeItemFromMemory(){
    try {
        if(isRunning){
            if (item["code"] !== null) {
                item["code"] = null;
                item["name"] = null;
                item["info"] = null;
                item["type"] = null;
                item["desc"] = null;
                item["body"] = null;
                return true;
            }else{
                return false;
            }
        }
    } catch (error) {
        alertManager("Error de Memoria", error, true, false, false);
    }
}

function checkUniqueItem(code){
    try {
        if(isRunning && code !== null){
            if(item["code"] !== null){
                if(item["code"] === code){
                    return false;
                }else{
                    return true;
                }
            }else{
                return true;
            }
        }
    } catch (error) {
        alertManager("Error de Memoria", error, true, false, false);
    }
}

function AddItemToStorageMemory(code){
    try {
        if(isRunning && code !== null){
            if(itemsMemory.length < maxItemsMemory){
                if(itemsMemory[itemsMemory.length - 1] !== code){
                    itemsMemory.push(code);
                }
            }else{
                if(itemsMemory[itemsMemory.length] !== code){
                    if(itemsMemory[itemsMemory.length - 2] !== code){
                        deleteItemFromStorageMemory();
                        itemsMemory.push(code);
                    }else{
                        deleteItemFromStorageMemory();
                    }
                }
            }
        }
    } catch (error) {
        alertManager("Error de Memoria", error, true, false, false);
    }
}

function deleteItemFromStorageMemory(){
    try {
        if(isRunning){
            if(itemsMemory.length > 0){
                itemsMemory.pop();
            }
        }
    } catch (error) {
        alertManager("Error de Memoria", error, true, false, false);
    }
}