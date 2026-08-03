let confirmationController = null;
const currentLocalStorageKey = "customPraises";
let dataClonePraises = [];
const exportFileName = "data.hymnal.js";

/**
 * Inicializador
 */
function init() {
    if (!data) return null;

    dataClonePraises = cloneDataPraises(data);
    localStorageData = getDataLocalStorage();
    mergeDataLocalStorageWithClonePraises(localStorageData);

    const typesSongs = getTypesSongs();
    setTypesSongsInElements(typesSongs);

    fillChangesListsContainer();
    fillSongsIntoSelect();

    toogleInternetAccessAlert();
    enableTootips();
}

/**
 * Obtiene los tipos de alabanzas
 */
function getTypesSongs(type = null) {
    const types = new Map();

    types.set(1, "alabanza");
    types.set(2, "himno");
    types.set(3, "coro");
    types.set(4, "mix");

    return type !== null ? types.get(type) : types;
}

/**
 * Obtiene el id de un type según el texto dado
 */
function getTypeSongId(searchText) {
    if (!searchText) return null;

    const types = getTypesSongs();

    const target = String(searchText).trim().toLowerCase();

    for (const [id, name] of types.entries()) {
        if (name.toLowerCase() === target) {
            return id;
        }
    }

    return null;
}

/**
 * Establece los tipos de alabanzas en cada elemento que lo requiera
 */
function setTypesSongsInElements(types = new Map(), elementClass = 'type-element') {
    const typesElements = document.querySelectorAll(`.${elementClass}`);
    if (!typesElements || typesElements.length === 0) return null;

    if (!(types instanceof Map) || types.size === 0) return null;

    typesElements.forEach(selectElement => {
        selectElement.innerHTML = "";

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Seleccione...";
        defaultOption.selected = true;
        selectElement.appendChild(defaultOption);

        types.forEach((typeName, typeKey) => {
            const option = document.createElement("option");
            option.value = typeKey;
            option.textContent = typeName.charAt(0).toUpperCase() + typeName.slice(1);
            selectElement.appendChild(option);
        });
    });

    return typesElements;
}

/**
 * Muestra o esconde el elemento Descripción de un determinado formulario
 */
function toggleDesc(form, typeSong) {
    if (!form) return false;

    const descContainerElement = form.querySelector('.desc-container');
    if (!descContainerElement) return false;
    
    if (typeSong == 4) {
        descContainerElement.classList.remove('d-none');
        return true;
    }

    descContainerElement.classList.add('d-none');
    return true;
}

/**
 * Recarga la página
 */
function reloadPage() {
    window.location.reload();
}

/**
 * Establece el mensaje y función de Callback del modal de confirmación
 */
function setConfirmationMsg(text, callbackOk = null, ...callbackArgs) {
    if (!text) return null;

    const modal_confirmation = document.querySelector('#modal-confirmation');
    if (!modal_confirmation) return false;

    const modal_body = modal_confirmation.querySelector('.modal-body');
    if (!modal_body) return false;

    modal_body.innerHTML = text;

    const btnAccept = modal_confirmation.querySelector('#accept-confirmation-button') || modal_confirmation.querySelector('.accept-confirmation-button');
    
    if (btnAccept && typeof callbackOk === 'function') {

        if (confirmationController) {
            confirmationController.abort();
        }

        confirmationController = new AbortController();

        btnAccept.addEventListener('click', () => {
            const resultado = callbackOk(...callbackArgs);

            const modalInstance = bootstrap.Modal.getInstance(modal_confirmation);
            if (modalInstance) {
                modalInstance.hide();
            }
        }, { 
            once: true, 
            signal: confirmationController.signal 
        });
    }

    return true;
}

/**
 * Limpiar o reestablecer un determinado formulario
 */
function clearForm(form) {
    if (!form) return null;

    form.reset();
    toggleDesc(form, 0);

    const contenteContainer = form.querySelector('#edit-content');
    if (contenteContainer) contenteContainer.classList.add('d-none');

    return true;
}

/**
 * Obtiene los valores de un determinado formulario
 */
function getFormValues(form) {
    if (!form) return null;

    const typeSong = form.querySelector('.type-song');
    if (!typeSong) return false;

    const titleSong = form.querySelector('.title-song');
    if (!titleSong) return false;

    const bodySong = form.querySelector('.body-song');
    if (!bodySong) return false;

    const descSong = form.querySelector('.desc-song');
    if (!descSong) return false;

    const infoSong = form.querySelector('.info-song');
    if (!infoSong) return false;

    const codeSong = form.querySelector('.code-song');

    return {
        form: form.classList.contains('add') ? "add" : (form.classList.contains('edit') ? "edit" : ""),
        typeSong: typeSong.value,
        titleSong: titleSong.value,
        bodySong: bodySong.value,
        descSong: descSong.value,
        infoSong: infoSong.value,
        codeSong: codeSong && codeSong.value,
    }
}

/**
 * Valida los valores obligatorios de un determinado formulario
 */
function checkFormValidate(values) {
    if (!values) return null;

    if (values.typeSong.toString().trim() === "" || values.typeSong == 0) return false;
    if (values.titleSong.toString().trim() === "" || values.titleSong == 0) return false;
    if (values.bodySong.toString().trim() === "" || values.bodySong == 0) return false;
    
    if (values.typeSong == 4) { // Mix
        if (values.descSong.toString().trim() === "" || values.descSong == 0) return false;
    }

    return true;
}

/**
 * Muestra modal de error
 */
function showErrorModal(mensaje = "") {
    const modalError = document.querySelector('#modal-error');
    if (!modalError) return false;

    if (mensaje) {
        const modalBody = modalError.querySelector('.modal-body');
        if (modalBody) {
            modalBody.innerHTML = mensaje;
        }
    }

    const modalInstance = bootstrap.Modal.getOrCreateInstance(modalError);
    modalInstance.show();

    return true;
}

/**
 * Chequea Alabanzas similares
 */
function checkSimilarsTitleSongs(form, value) {
    if (!form || !value || !dataClonePraises) return false;

    const msg_similars = form.querySelector('.msg-similars');
    const similars = findSimilarTitles(value, dataClonePraises.praise);

    if (similars.length > 0 && similars.length <= 10) {
        msg_similars.classList.remove('d-none');
        msg_similars.innerHTML = "Alabanzas similares existentes:<br>";
        similars.forEach(match => {
            msg_similars.innerHTML += `- ${match.item.name}<br>`;
        });
        return false;
    } else if (similars.length > 10) {
        msg_similars.classList.remove('d-none');
        msg_similars.innerHTML = "Se han encontrando muchas alabanzas similares existentes.";
    } else {
        msg_similars.classList.add('d-none');
        return true;
    }
}

/**
 * Obtiene una lista de Alabanzas similares a una buscada
 */
function findSimilarTitles(newTitle, praiseList, threshold = 0.4) {
    const normalizedNew = normalizeText(newTitle);
    const newWords = new Set(normalizedNew.split(/\s+/));
    let matches = [];

    praiseList.forEach(item => {
        const normalizedExisting = normalizeText(item.name);

        if (normalizedExisting === normalizedNew) {
            matches.push({ item, type: "exacto" });
            return;
        }

        if (normalizedExisting.includes(normalizedNew) || normalizedNew.includes(normalizedExisting)) {
            matches.push({ item, type: "parcial" });
            return;
        }

        const existingWords = new Set(normalizedExisting.split(/\s+/));
        let commonWords = 0;
        newWords.forEach(word => {
            if (existingWords.has(word)) commonWords++;
        });

        const totalUniqueWords = new Set([...newWords, ...existingWords]).size;
        const similarity = totalUniqueWords === 0 ? 0 : commonWords / totalUniqueWords;

        if (similarity >= threshold) {
            matches.push({ item, type: "similar" });
        }
    });

    return matches;
}

/**
 * Normaliza un determinado texto
 */
function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s]/g, " ") 
        .replace(/\s+/g, " ") 
        .trim();
}

/**
 * Obtiene la letra inicial del titulo de la Alabanza
 */
function getInitialTitleSong(text) {
    if (!text) return "";

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (/^[a-záéíóúüñÁÉÍÓÚÜÑ]$/i.test(char)) {
            const unaccented = {
                'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'ü': 'u',
                'Á': 'a', 'É': 'e', 'Í': 'i', 'Ó': 'o', 'Ú': 'u', 'Ü': 'u'
            };
            
            return unaccented[char] || char.toLowerCase();
        }

        if (/^[0-9]$/.test(char)) {
            return '#';
        }
    }

    return "";
}

/**
 * Obtiene el código siguiente correlativo
 */
function getNextCode(initialLetter, praiseList) {
    const letter = initialLetter.toUpperCase();
    
    let max = 0;

    praiseList.forEach(item => {
        if (item.code && item.code.toUpperCase().startsWith(letter)) {

            const numeric = parseInt(item.code.slice(1), 10);
            
            if (!isNaN(numeric) && numeric > max) {
                max = numeric;
            }
        }
    });

    const next = max + 1;

    const formatted = String(next).padStart(3, '0');

    return letter + formatted;
}

/**
 * Clona el listado original de Alabanzas (data)
 */
function cloneDataPraises(originalDataPraises) {
    if (!originalDataPraises) return null;
    
    try {
        return structuredClone(originalDataPraises);
    } catch (error) {
        console.error("Error al clonar los datos, usando alternativa JSON:", error);
        return JSON.parse(JSON.stringify(originalDataPraises));
    }
}

/**
 * Obtiene los datos del Local Storage
 */
function getDataLocalStorage() {
    if (!currentLocalStorageKey) return null;

    return JSON.parse(localStorage.getItem(currentLocalStorageKey)) || [];
}

/**
 * Clona los datos del local storage con los clonados del data
 */
function mergeDataLocalStorageWithClonePraises(localStorageData) {
    if (!localStorageData || !Array.isArray(localStorageData)) return null;
    if (!dataClonePraises || !Array.isArray(dataClonePraises.praise)) return null;

    localStorageData.forEach(localItem => {
        if (!localItem.code) return;

        const index = dataClonePraises.praise.findIndex(item => item.code === localItem.code);

        if (index !== -1) {
            dataClonePraises.praise[index] = { ...localItem };
        } else {
            dataClonePraises.praise.push({ ...localItem });
        }
    });

    return dataClonePraises.praise;
}

/**
 * Almacena en Local Storage la nueva Alabanza
 */
function setLocalStorageData(values) {
    if (!values) return null;
    if (!currentLocalStorageKey) return null;

    const currentLocalStorage = getDataLocalStorage();
    currentLocalStorage.push(values);

    localStorage.setItem(currentLocalStorageKey, JSON.stringify(currentLocalStorage));
}

/**
 * Almacena la edición de la Alabanza en el clon de data praises
 */
function setEditSongCloneDataPraises(values) {
    if (!values) return null;
    if (!dataClonePraises) return null;

    if (typeof dataClonePraises !== 'undefined' && dataClonePraises.praise) {
        const globalIndex = dataClonePraises.praise.findIndex(song => song.code === selectedSongValue);
        if (globalIndex !== -1) {
            dataClonePraises.praise[globalIndex] = values[index];
        }
    }
}

/**
 * Almacena la nueva Alabanza en el clon de data praises
 */
function setAddSongCloneDataPraises(values) {
    if (!values) return null;
    if (!dataClonePraises) return null;

    dataClonePraises.praise.push(values);
}

/**
 * Convierte un texto normal a texto de body del sistema
 */
function generateBodySongFormatted(metadata, rawText) {
    const formattedName = metadata.name ? metadata.name.trim() : "";

    let typeHtml = metadata.type && metadata.type.trim() !== "" 
        ? `<h4>${metadata.type.trim()}</h4>` 
        : "";

    let infoHtml = "";
    
    if (metadata.type == 4 && metadata.desc && metadata.desc.trim() !== "") {
        infoHtml = `<h3>Popurrí</h3>`;
    } 
    else if (metadata.info && metadata.info.trim() !== "") {
        let cleanInfo = metadata.info
            .replace(/p[áa]gina\s+(\d+)/gi, 'página <strong>$1</strong>')
            .replace(/n[uú]mer[oó]\s+(\d+)/gi, 'número <strong>$1</strong>');
        infoHtml = `<h3>${cleanInfo}</h3>`;
    }

    const headerSlide = `${typeHtml}<h1>${formattedName}</h1>${infoHtml}`;
    let bodySlides = [{ "slide": headerSlide }];

    if (rawText && rawText.trim() !== "") {
        const blocks = rawText.trim().split(/\n\s*\n/);

        blocks.forEach(bloque => {
            let lines = bloque.trim().split('\n').map(l => l.trim());
            let isChoir = false;

            if (lines.length > 0 && lines[0].match(/^(\/+)?\s*coro/i)) {
                isChoir = true;
                lines[0] = lines[0].replace(/^(\/+)?\s*coro:?\s*/i, '$1 ').trim();

                if (lines[0] === "") {
                    lines.shift();
                }
            }

            let textBlock = lines.join('<br />');

            textBlock = textBlock.replace(/(\/{2,})/g, '<i>$1</i>');
            textBlock = textBlock.replace(/\[(.*?)\]\s*(?:<br\s*\/?>)?/g, '<h4>$1</h4>');

            if (isChoir) {
                textBlock = `<h4>coro</h4>${textBlock}`;
            }

            bodySlides.push({ "slide": textBlock });
        });
    }

    bodySlides.push({ "slide": "<h1>fin</h1>" });

    return bodySlides;
}

/**
 * Rellenar listado de cambios con Alabanzas
 */
function fillChangesListsContainer() {
    const changes_lists_container = document.querySelector('#changes-lists-container');
    if (!changes_lists_container) return null;

    changes_lists_container.innerHTML = "";

    const listChangesLocalStorage = getDataLocalStorage();

    if (!listChangesLocalStorage || listChangesLocalStorage.length === 0) {
        changes_lists_container.innerHTML = `
        <li class="list-group-item disabled text-center">No se han ingresado cambios aún</li>
        `;
        return false;
    }

    listChangesLocalStorage.forEach(item => {
        const form = item.form === "add" ? "Nueva Alabanza" : (item.form === "edit" ? "Alabanza Editada" : "");
        
        const button = `
        <li class="list-group-item d-flex justify-content-between align-items-center gap-2">
            <span class="w-100 text-truncate">
                ${item.name}
                <small class="d-block text-muted small">${form}</small>
            </span>
            <div class="w-auto d-flex justify-content-end align-items-center gap-2">
                <button type="button" title="Editar" class="btn btn-primary btn-sm d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#modal-edit" onclick="fillEditModalChange('${item.code}');">
                    <i class="icon icon-pencil-white" aria-hidden="true"></i>
                </button>
                <button type="button" title="Borrar" class="btn btn-danger btn-sm d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#modal-confirmation" onclick="setConfirmationMsg('¿Confirma que eliminará este cambio temporal?', deleteChange, '${item.code}', '${item.form}');">
                    <i class="icon icon-close-white" aria-hidden="true"></i>
                </button>
            </div>
        </li>
        `;

        changes_lists_container.innerHTML += button;
    });
}

/**
 * Convierte un texto con saltos de línea a br de HTML
 */
function newLineToBreak(text) {
    if (!text) return "";

    return text.replace(/\r\n|\n/g, '<br>');
}

/**
 * Convierte un br de HTML a salto de línea
 */
function breakToNewLine(text) {
    if (!text) return "";
    
    return text.replace(/<\s*br\s*\/?>/gi, '\n');
}

/**
 * Descarta todos los cambios temporales
 */
function discardChanges() {
    if (!currentLocalStorageKey) return null;

    localStorage.removeItem(currentLocalStorageKey);

    const changes_lists_container = document.querySelector('#changes-lists-container');
    if (!changes_lists_container) return null;
    
    changes_lists_container.innerHTML = "";

    changes_lists_container.innerHTML = `
    <li class="list-group-item disabled text-center">No se han ingresado cambios aún</li>
    `;

    dataClonePraises = cloneDataPraises(data);
    fillSongsIntoSelect();

    return true;
}

/**
 * Elimina un cambio en el Local Storage
 */
function deleteChangeLocalStorage(code) {
    if (!code) return null;

    const listChangesLocalStorage = getDataLocalStorage();
    
    if (!listChangesLocalStorage || !Array.isArray(listChangesLocalStorage)) return null;

    const updatedList = listChangesLocalStorage.filter(item => item.code !== code);

    localStorage.setItem('customPraises', JSON.stringify(updatedList));

    return updatedList;
}

/**
 * Elimina un cambio agregado en el clon de Praises
 */
function deleteChangeClonedPraises(code) {
    if (!code) return null;

    const dataClonePraisesLocal = dataClonePraises;

    if (!dataClonePraisesLocal || !Array.isArray(dataClonePraisesLocal.praise)) return null;

    const updatedList = dataClonePraisesLocal.praise.filter(item => item.code !== code);

    dataClonePraises.praise = updatedList;

    return updatedList;
}

/**
 * Reemplaza un cambio temporal del Praises clonado con el original
 */
function replaceChangeClonedPraises(code) {
    if (!code) return null;

    const dataClonePraisesLocal = dataClonePraises;
    if (!dataClonePraisesLocal || !Array.isArray(dataClonePraisesLocal.praise)) return null;

    const originalData = data;
    if (!originalData || !Array.isArray(originalData.praise)) return null;

    const originalItem = originalData.praise.find(item => item.code === code);
    if (!originalItem) return null; 

    const index = dataClonePraisesLocal.praise.findIndex(item => item.code === code);

    if (index !== -1) {
        dataClonePraises.praise[index] = structuredClone(originalItem);
    } else {
        dataClonePraises.praise.push(structuredClone(originalItem));
    }

    return dataClonePraises;
}

/**
 * Elimina un cambio
 */
function deleteChange(code, form) {
    if (!code || !form) return null;

    deleteChangeLocalStorage(code);

    if (form === "add") {
        deleteChangeClonedPraises(code);
    } else if (form === "edit") {
        replaceChangeClonedPraises(code);
        fillSongsIntoSelect();
    }

    fillChangesListsContainer();
    fillSongsIntoSelect();

    return true;
}

/**
 * Carga un cambio temporal determinado en el Modal
 */
function fillEditModalChange(code) {
    if (!code) return null;

    const listChangesLocalStorage = getDataLocalStorage();
    if (!listChangesLocalStorage || !Array.isArray(listChangesLocalStorage)) return null;

    const item = listChangesLocalStorage.filter(item => item.code === code);

    const form = document.querySelector('#form-edit-modal');
    if (!form) return null;

    setFormValues(form, item[0]);
}

/**
 * Setea valores a un formulario determinado
 */
function setFormValues(form, values) {
    if (!form) return null;

    const { form: formType, code, desc, body, info, name, type } = values;

    if (formType && form) {
        form.classList.add(formType);
    }

    const codeSong = form.querySelector('.code-song');
    if (!codeSong) return false;

    const typeSong = form.querySelector('.type-song');
    if (!typeSong) return false;

    const titleSong = form.querySelector('.title-song');
    if (!titleSong) return false;

    const bodySong = form.querySelector('.body-song');
    if (!bodySong) return false;

    const descSong = form.querySelector('.desc-song');
    if (!descSong) return false;

    const descContainer = form.querySelector('.desc-container');
    if (!descContainer) return false;

    const infoSong = form.querySelector('.info-song');
    if (!infoSong) return false;

    codeSong.value = code;

    typeSong.value = getTypeSongId(type);
    typeSong.querySelector(`option[value="${typeSong.value}"]`).setAttribute('selected', 'selected');

    titleSong.value = name;
    bodySong.value = generateBodyToText(body);
    bodySong.scrollTop = 0;
    
    infoSong.value = info;

    if (desc) {
        descSong.value = breakToNewLine(desc);
        descContainer.classList.remove('d-none');
    } else {
        descContainer.classList.add('d-none');
    }

    return true;
}

/**
 * Genera un texto con Array y HTML a texto normal
 */
function generateBodyToText(bodyArray) {
    if (!Array.isArray(bodyArray) || bodyArray.length <= 2) return "";

    const contentSlides = bodyArray.slice(1, bodyArray.length - 1);

    const bloquesTexto = contentSlides.map(item => {
        let slideHtml = item.slide || "";
        slideHtml = slideHtml.replace(/<h4>coro<\/h4>/gi, 'Coro\n');

        slideHtml = slideHtml.replace(/<h4>(.*?)<\/h4>/gi, '[$1]\n');

        slideHtml = slideHtml.replace(/<i>(\/+)<\/i>/gi, '$1');

        slideHtml = slideHtml.replace(/<br\s*\/?>/gi, '\n');

        return slideHtml.trim();
    });

    return bloquesTexto.join('\n\n');
}

/**
 * Busca y retorna una canción o item del Local Storage según su código
 */
function getItemByCode(code) {
    if (!code) return null;

    const items = dataClonePraises.praise;
    if (!items || !Array.isArray(items) || items.length === 0) return null;

    const foundItem = items.find(item => item.code === code);

    return foundItem || null;
}

/**
 * Busca y retorna un item del Local Storage según su código
 */
function getItemLocalStorage(code) {
    if (!code) return null;

    const listChangesLocalStorage = getDataLocalStorage();
    
    if (!listChangesLocalStorage || !Array.isArray(listChangesLocalStorage)) return null;

    const foundItem = listChangesLocalStorage.find(item => item.code === code);

    return foundItem || null;
}

/**
 * Reemplaza todo el contenido de un item en el Local Storage según su código
 */
function updateItemLocalStorage(code, newItemData) {
    if (!code || !newItemData) return null;
    if (!currentLocalStorageKey) return null;

    const list = getDataLocalStorage();
    if (!list || !Array.isArray(list)) return null;

    const index = list.findIndex(item => item.code === code);

    if (index === -1) {
        console.warn("Item no encontrado con el código:", code);
        return null;
    }

    list[index] = { ...newItemData, code };

    localStorage.setItem(currentLocalStorageKey, JSON.stringify(list));

    return list[index];
}

/**
 * Reemplaza todo el contenido de un item dentro del objeto clonado dataClonePraises según su código
 */
function updateItemClonedPraises(code, newItemData) {
    if (!code || !newItemData) return null;

    const dataClonePraisesLocal = dataClonePraises;
    if (!dataClonePraisesLocal || !Array.isArray(dataClonePraisesLocal.praise)) return null;

    const index = dataClonePraisesLocal.praise.findIndex(item => item.code === code);

    if (index === -1) {
        console.warn("Item no encontrado en el clon con el código:", code);
        return null; 
    }

    dataClonePraises.praise[index] = { ...newItemData, code };

    return dataClonePraises.praise[index];
}

/**
 * Obtiene las Alabanzas poniendo primero las que están en el Local Storage bajo el grupo "En edición"
 */
function generatePraisesOptionsHTML() {
    if (!dataClonePraises || !Array.isArray(dataClonePraises.praise)) return "";

    const localItems = getDataLocalStorage() || [];
    const localCodes = new Set(localItems.map(item => item.code));

    const allItems = [...dataClonePraises.praise];
    allItems.sort((a, b) => String(a.code).localeCompare(String(b.code)));

    const localPraises = [];
    const normalPraises = [];

    for (const item of allItems) {
        if (localCodes.has(item.code)) {
            localPraises.push(item);
        } else {
            normalPraises.push(item);
        }
    }

    let htmlOptions = '<option value="" disabled selected>Seleccione una opción</option>';

    if (localPraises.length > 0) {
        htmlOptions += `<optgroup label="En edición">`;
        for (const item of localPraises) {
            const displayText = (item.name && item.name.toString().trim().toUpperCase()) || item.desc || item.code;
            htmlOptions += `<option value="${item.code}" disabled>${displayText}</option>`;
        }
        htmlOptions += `</optgroup>`;
    }

    const groups = new Map();
    for (const item of normalPraises) {
        const groupKey = String(item.code).charAt(0).toUpperCase();
        
        if (!groups.has(groupKey)) {
            groups.set(groupKey, []);
        }
        groups.get(groupKey).push(item);
    }

    const sortedGroups = Array.from(groups.keys()).sort((a, b) => a.localeCompare(b));

    for (const groupKey of sortedGroups) {
        htmlOptions += `<optgroup label="${groupKey}">`;
        
        const itemsInGroup = groups.get(groupKey);
        for (const item of itemsInGroup) {
            const displayText = (item.name && item.name.toString().trim().toUpperCase()) || item.desc || item.code;
            htmlOptions += `<option value="${item.code}">${displayText}</option>`;
        }
        
        htmlOptions += `</optgroup>`;
    }

    return htmlOptions;
}

/**
 * Rellena un select con las Alabanzas siempre y cuando no esten dentro de los cambios temporales
 */
function fillSongsIntoSelect() {
    const selectElement = document.querySelector('#edit-edit-song');
    if (!selectElement) return null;

    const value = selectElement.value;

    const songs = generatePraisesOptionsHTML();

    selectElement.innerHTML = songs;

    if (value) {
        selectElement.value = value;
        selectElement.querySelectorAll(`option[value="${value}"]`).selected = true;
    }
    
    return true;
}

/**
 * Selecciona una Alabanza para editar
 */
function selectedEditSong(form, code) {
    if (!form) return null;

    const contenteContainer = form.querySelector('#edit-content');
    if (!contenteContainer) return null;

    if (!code) {
        contenteContainer.classList.add('d-none');
        return true;
    }

    setFormValues(form, getItemByCode(code));

    contenteContainer.classList.remove('d-none');
    return true;
}

/**
 * Muestra el model de cargando
 */
function showLoadingModal(msg = null) {
    const loading = document.querySelector('#modal-loading');
    if (!loading) return null;

    const msgLoading = loading.querySelector('#msg-loading');
    if (msgLoading && msg) msgLoading.innerHTML = msg;

    const modalInstance = bootstrap.Modal.getOrCreateInstance(loading);
    modalInstance.show();
}

/**
 * Esconde el model de cargando
 */
function hideLoadingModal() {
    const loading = document.querySelector('#modal-loading');
    if (!loading) return null;

    const modalInstance = bootstrap.Modal.getOrCreateInstance(loading);
    modalInstance.hide();
}

/**
 * Genera una Alabanza con Gemini Online (Con límite de 25 caracteres por línea, bloques cerrados y soporte para Mix)
 */
async function generateSong(fragment, current = 1) {
    if (!fragment) return null;

    const textarea = document.querySelector('#add-body-song');
    if (!textarea) return false;

    const inputInfo = document.querySelector('#add-info-song');
    if (!inputInfo) return false;

    const inputTitle = document.querySelector('#add-title-song');
    if (!inputTitle) return false;

    const inputType = document.querySelector('#add-type-song');
    if (!inputType) return false;

    const inputDesc = document.querySelector('#add-desc-song');
    const descContainer = document.querySelector('#desc-container');

    if (!checkOnline()) {
        showErrorModal("No hay acceso a Internet.");
        return false;
    }

    if (!apiGeminiKey) {
        showErrorModal("No se ha proporcionado una API key de Gemini.");
        return false;
    }

    hideLoadingModal();
    showLoadingModal(`Buscando la canción por fragmento "${fragment}" (Intento ${current}/3)...`);

    textarea.scrollTop = 0;

    const url = `${apiGeminiLink}?key=${apiGeminiKey}`;

    const prompt = `El usuario recuerda este fragmento o titulo de una alabanza cristiana: "${fragment}". 
    Identifica de qué alabanza o mix se trata. Devuelve la respuesta estrictamente como un objeto JSON válido (sin texto adicional, sin saludos, sin bloques de código markdown como \`\`\`json) con exactamente esta estructura:
    {
      "titulo": "El nombre oficial de la alabanza o del mix",
      "artista": "El autor o intérprete principal",
      "tipo": "Debe ser estrictamente un número en formato de texto o entero: 1 para alabanza, 2 para himno, 3 para coro, o 4 para mix",
      "canciones_mix": ["Nombre de la primera canción", "Nombre de la segunda canción"] (Si 'tipo' es 4, lista aquí los nombres de los temas que lo componen en orden. Si no es un mix, deja este array vacío: []),
      "letra": "La letra completa. Usa la palabra Coro al inicio de las estrofas que correspondan. Prohibido usar '(x2)'. Para indicar las repeticiones, envuelve el bloque o líneas repetidas colocando las barras tanto al inicio como al final (por ejemplo: '// Línea\nLínea //' si se repite dos veces, o '/// ... ///' si se repite tres veces). REGLA ESTRICTA DE FORMATO: Ninguna línea de la letra debe superar los 30 caracteres (si una frase es más larga, divídela obligatoriamente en varias líneas usando saltos de línea). No agregues saludos ni texto adicional, solo la letra limpia."
    }`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const apiResponse = await response.json();

        if (apiResponse.error && apiResponse.error.code === 503 && current < 3) {
            console.warn(`Servidor saturado. Reintentando en 3 segundos... (${current}/3)`);
            await new Promise(resolve => setTimeout(resolve, 3000));
            return generateSong(fragment, current + 1);
        }

        if (apiResponse.error) {
            showErrorModal(`Error de la API: ${apiResponse.error.message}`);
            hideLoadingModal();
            return;
        }

        if (apiResponse.candidates && apiResponse.candidates[0].content) {
            let responseLocal = apiResponse.candidates[0].content.parts[0].text;
            
            responseLocal = responseLocal.replace(/```json/g, '').replace(/```/g, '').trim();

            const songData = JSON.parse(responseLocal);

            if (inputTitle) inputTitle.value = songData.titulo || "";
            if (inputInfo) inputInfo.value = songData.artista || "Desconocido";
            if (inputType) inputType.value = songData.tipo || "1";

            if (String(songData.tipo) === "4" && songData.canciones_mix && songData.canciones_mix.length > 0) {
                if (descContainer) descContainer.classList.remove('d-none');
                if (inputDesc) inputDesc.value = songData.canciones_mix.join('\n');
            } else {
                if (descContainer) descContainer.classList.add('d-none');
                if (inputDesc) inputDesc.value = "";
            }

            textarea.value = songData.letra || "";
            
            textarea.scrollTop = 0;
            textarea.focus();

            hideLoadingModal();
        } else {
            showErrorModal("No se pudo encontrar la letra para esa alabanza.");
            hideLoadingModal();
        }

    } catch (error) {
        console.error("Error de conexión con Gemini:", error);
        showErrorModal("No se pudo establecer la conexión con el Motor de IA.");
        hideLoadingModal();
    } 
}

/**
 * Comprueba si hay acceso a internet
 */
function checkOnline() {
    return navigator.onLine;
}

/**
 * Establece el mensaje de acceso a internet
 */
function toogleInternetAccessAlert() {
    const internetAccessAlert = document.querySelector('#access-internet');
    if (!internetAccessAlert) return null;

    if (checkOnline()) {
        internetAccessAlert.classList.add('alert-success');
        internetAccessAlert.classList.remove('alert-danger');
        internetAccessAlert.innerHTML = `Con Acceso a Internet`;
        return true;
    }

    internetAccessAlert.classList.remove('alert-success');
    internetAccessAlert.classList.add('alert-danger');
    internetAccessAlert.innerHTML = `Sin Acceso a Internet`;
    return false;
}

/**
 * Habilita los Tootips
 */
function enableTootips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
}

/**
 * Función auxiliar para obtener la fecha actual en formato ISO respetando la zona horaria local de Chile
 */
function getLocalDateISO() {
    const now = new Date();
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now - tzOffset)).toISOString().slice(0, -1);
    return localISOTime; 
};