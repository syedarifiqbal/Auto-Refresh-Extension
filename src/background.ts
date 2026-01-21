import { StorageSchema, DEFAULT_SETTINGS, DEFAULT_SAFETY_SETTINGS } from './types/index.js';

console.log('Dashboard Auto Refresh: Service worker started');

chrome.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === 'install') {
    console.log('Dashboard Auto Refresh: Extension installed');

    const initialStorage: StorageSchema = {
      rules: {},
      globalSettings: DEFAULT_SETTINGS,
      safetySettings: DEFAULT_SAFETY_SETTINGS,
      isPaused: false
    };

    await chrome.storage.sync.set(initialStorage);
    console.log('Dashboard Auto Refresh: Initial settings saved');
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Dashboard Auto Refresh: Message received', message);

  if (message.type === 'GET_STATUS') {
    sendResponse({ status: 'active' });
  }

  return true;
});

export {};
