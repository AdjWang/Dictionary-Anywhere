// import { onMessageListener } from './google_get_meaning.js';
import { onMessageListener } from './google_api_get_meaning.js';

browser.runtime.onMessage.addListener(onMessageListener);
