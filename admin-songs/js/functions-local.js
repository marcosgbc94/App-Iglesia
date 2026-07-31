
/**
 * Guardar nueva Alabanza
 */
function saveSongTemp(form) {
    if (!form || !dataClonePraises) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [01]");
        return null;
    }

    const formValues = getFormValues(form);
    if (!formValues) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [02]");
        return null;
    }
    
    const checkFormValues = checkFormValidate(formValues);
    if (!checkFormValues) {
        showErrorModal("No se han completado los campos oblogatorios (*). [03]");
        return null;
    }

    formValues.typeSong = getTypesSongs(parseInt(formValues.typeSong));

    formValues.initial = getInitialTitleSong(formValues.titleSong);
    if (!formValues.initial) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [04]");
        return null;
    }

    formValues.code = getNextCode(formValues.initial, dataClonePraises.praise);
    if (!formValues.code) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [05]");
        return null;
    }

    const newSong = {
        "form": formValues.form,
        "code": formValues.code,
        "name": formValues.titleSong,
        "info": formValues.infoSong,
        "type": formValues.typeSong,
        "desc": formValues.descSong,
    }

    newSong.body = generateBodySongFormatted(newSong, formValues.bodySong);

    if (formValues.descSong) {
        newSong.desc = newLineToBreak(formValues.descSong);
    }

    setAddSongCloneDataPraises(newSong);
    setLocalStorageData(newSong);

    fillChangesListsContainer();
    fillSongsIntoSelect();

    clearForm(form);

    return true;
}

/**
 * Guardar edición de una Alabanza desde el modal
 */
function saveSongEditModalTemp(form) {
    if (!form || !dataClonePraises) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [01]");
        return null;
    }

    const formValues = getFormValues(form);
    if (!formValues) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [02]");
        return null;
    }
    
    const checkFormValues = checkFormValidate(formValues);
    if (!checkFormValues) {
        showErrorModal("No se han completado los campos oblogatorios (*). [03]");
        return null;
    }

    formValues.typeSong = getTypesSongs(parseInt(formValues.typeSong));

    formValues.initial = getInitialTitleSong(formValues.titleSong);
    if (!formValues.initial) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [04]");
        return null;
    }

    const itemFromClonedPraises = getItemByCode(formValues.codeSong);
    const itemFromLocalStorage = getItemLocalStorage(formValues.codeSong);

    if (Object.keys(itemFromClonedPraises).length === 0 || Object.keys(itemFromLocalStorage).length === 0) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [05]");
        return null;
    }

    const song = {
        "form": formValues.form,
        "code": formValues.codeSong,
        "name": formValues.titleSong,
        "info": formValues.infoSong,
        "type": formValues.typeSong,
        "desc": formValues.descSong,
    }

    song.body = generateBodySongFormatted(song, formValues.bodySong);

    if (formValues.descSong) {
        song.desc = newLineToBreak(formValues.descSong);
    }

    updateItemLocalStorage(formValues.codeSong, song);
    updateItemClonedPraises(formValues.codeSong, song);

    fillChangesListsContainer();
    fillSongsIntoSelect();

    return true;
}

/**
 * Guardar edición de una Alabanza
 */
function saveSongEdit(form) {
    if (!form || !dataClonePraises) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [01]");
        return null;
    }

    const formValues = getFormValues(form);
    if (!formValues) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [02]");
        return null;
    }
    
    const checkFormValues = checkFormValidate(formValues);
    if (!checkFormValues) {
        showErrorModal("No se han completado los campos oblogatorios (*). [03]");
        return null;
    }

    formValues.typeSong = getTypesSongs(parseInt(formValues.typeSong));

    formValues.initial = getInitialTitleSong(formValues.titleSong);
    if (!formValues.initial) {
        showErrorModal("Hubo un error inesperado al guardar termporalmente la Alabanza. [04]");
        return null;
    }

    // Si es la misma, no cambiar de code
    //const isEqual = formValues.codeSong.charAt(0).toLowerCase() === formValues.initial;

    const song = {
        "form": formValues.form,
        "code": formValues.codeSong,
        "name": formValues.titleSong,
        "info": formValues.infoSong,
        "type": formValues.typeSong,
        "desc": formValues.descSong,
    }

    song.body = generateBodySongFormatted(song, formValues.bodySong);

    if (formValues.descSong) {
        song.desc = newLineToBreak(formValues.descSong);
    }

    updateItemClonedPraises(formValues.codeSong, song);
    setLocalStorageData(song);

    fillChangesListsContainer();

    clearForm(form);
    fillSongsIntoSelect();

    return true;
}

/**
 * Exporta las canciones usando la API moderna de guardado con respaldo si se cancela.
 */
async function exportSong() {
    if (typeof mergeLocalStorageWithData === 'function') {
        mergeLocalStorageWithData();
    }

    const savedCustomSongs = localStorage.getItem('customPraises');

    if (!savedCustomSongs || JSON.parse(savedCustomSongs).length === 0) {
        showErrorModal("No hay canciones nuevas para exportar.");
        return;
    }

    if (dataClonePraises && Array.isArray(dataClonePraises.praise)) {

        const originalMap = new Map();
        if (typeof data !== 'undefined' && data && Array.isArray(data.praise)) {
            data.praise.forEach(item => originalMap.set(item.code, item));
        }

        const customMap = new Map();
        try {
            const parsedCustom = JSON.parse(savedCustomSongs);
            parsedCustom.forEach(item => {
                customMap.set(item.code, item);
            });
        } catch (e) {
            console.error("Error parsing customPraises from localStorage", e);
        }

        const getInitialLetter = (name) => {
            const normalized = normalizeText(name);
            const match = normalized.match(/[a-z]/);
            return match ? match[0] : 'x';
        };

        // Versionado
        dataClonePraises.praise.forEach(song => {
            if (customMap.has(song.code)) {
                const originalCustom = customMap.get(song.code);

                if (originalCustom.form === "add") {
                    song.createdAt = originalCustom.createdAt || getLocalDateISO();
                    song.version = 1;
                } else if (originalCustom.form === "edit") {

                    if (originalMap.has(song.code)) {
                        const originalItem = originalMap.get(song.code);
                        if (originalItem.createdAt) {
                            song.createdAt = originalItem.createdAt;
                        }
                    }

                    song.updatedAt = getLocalDateISO();
                    
                    let baseVersion = 1;
                    if (originalMap.has(song.code)) {
                        baseVersion = Number(originalMap.get(song.code).version) || 1;
                    }
                    song.version = baseVersion + 1;
                }
                
                if (song.form) {
                    delete song.form;
                }
            }
        });

        dataClonePraises.praise.sort((a, b) => {
            const nameA = a.name || "";
            const nameB = b.name || "";

            const initialA = getInitialLetter(nameA);
            const initialB = getInitialLetter(nameB);

            if (initialA !== initialB) {
                return initialA.localeCompare(initialB);
            }

            return normalizeText(nameA).localeCompare(normalizeText(nameB));
        });

        const letterCounters = {};
        dataClonePraises.praise.forEach(song => {
            const songName = song.name || "";
            const initial = getInitialLetter(songName);

            if (!letterCounters[initial]) {
                letterCounters[initial] = 1;
            } else {
                letterCounters[initial]++;
            }

            const paddedNumber = String(letterCounters[initial]).padStart(3, '0');
            song.code = `${initial}${paddedNumber}`;
        });
    }
  
    const textJson = JSON.stringify(dataClonePraises, null, 4);
    const jsContent = `window.data = ${textJson};`;

    const finalizeSuccessfulExport = () => {
        localStorage.setItem('customPraisesBackup', savedCustomSongs);
        localStorage.removeItem('customPraises'); 

        console.log("¡Exportado con éxito, versiones/fechas corregidas y 'customPraises' eliminado!");

        window.location.reload();
    };

    if (window.showSaveFilePicker) {
        showLoadingModal(`En proceso de guardado, espere por favor...`);

        try {
            const options = {
                suggestedName: exportFileName,
                types: [{
                    description: 'JavaScript Files',
                    accept: { 'text/javascript': ['.js'] },
                }],
            };

            const fileHandle = await window.showSaveFilePicker(options);
            const writableStream = await fileHandle.createWritable();
            await writableStream.write(jsContent);
            await writableStream.close();

            finalizeSuccessfulExport();
            return;

        } catch (error) {
            hideLoadingModal();
            if (error.name === 'AbortError') {
                showErrorModal("El usuario canceló la ventana de guardado. No se realizaron cambios.");
                return;
            } else {
                console.warn("Error con showSaveFilePicker, recurriendo al método tradicional...", error);
            }
        }
    }

    const blob = new Blob([jsContent], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = exportFileName;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    finalizeSuccessfulExport();
}