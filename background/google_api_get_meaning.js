const DEFAULT_HISTORY_SETTING = {
    enabled: true
};

export async function onMessageListener(request, sender, sendResponse) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${request.lang}/${request.word}`, {
        method: 'GET',
        credentials: 'omit',
    });
    const text = await response.text();
    var content = extractMeaning(text);
    
    content && browser.storage.local.get().then((results) => {
        let history = results.history || DEFAULT_HISTORY_SETTING;
        history.enabled && saveWord(content);
    });
    return {content};
}

function extractMeaning(text) {
    var result = JSON.parse(text);
    if (!result.length) {
        return {
            word: result.title,
            meaning: result.message,
            audioSrc: ""
        };
    }
    result = result[0]; // get the content of the json result

    var meaning = document.createElement("div");
    result.meanings.forEach((part_of_speech) => {
        var pos = document.createElement("p");
        pos.textContent = part_of_speech.partOfSpeech;
        meaning.appendChild(pos);

        part_of_speech.definitions.forEach((definition) => {
            var def = document.createElement("p");
            def.textContent = definition.definition;
            meaning.appendChild(def);
        });
    });

    return {
        word: result.word,
        meaning: meaning.outerHTML,
        audioSrc: result.phonetics[0].audio
    };
};


function saveWord(content) {
    let word = content.word,
        meaning = content.meaning,

        storageItem = browser.storage.local.get('definitions');

    storageItem.then((results) => {
        let definitions = results.definitions || {};

        definitions[word] = meaning;
        browser.storage.local.set({
            definitions
        });
    })
}