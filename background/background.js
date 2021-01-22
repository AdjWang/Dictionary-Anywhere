// import { onMessageListener } from './google_get_meaning.js';
import { onMessageListener } from './bing_get_meaning.js';


browser.runtime.onMessage.addListener(onMessageListener);

function saveWord (content) {
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
