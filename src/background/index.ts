// Background service worker for GetMyBrief Chrome Extension

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('GetMyBrief installed');

    // Set default settings
    chrome.storage.local.set({
      'getmybrief-settings-storage': {
        state: {
          deepseekApiKey: '',
          driveFolderId: '1hC1B2heWUyfBHQPPRnbcdeZ9tGzict1T',
          defaultTemplate: 'reel-completo',
          autoSave: true,
          activeTab: 'chat',
          isGoogleConnected: false,
        },
      },
    });
  }
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'GET_AUTH_TOKEN') {
    chrome.identity.getAuthToken({ interactive: true }, (result) => {
      if (chrome.runtime.lastError) {
        sendResponse({ error: chrome.runtime.lastError.message });
      } else {
        // Handle both old string format and new object format
        const token = typeof result === 'string' ? result : result?.token;
        sendResponse({ token });
      }
    });
    return true; // Keep channel open for async response
  }

  if (message.type === 'REVOKE_AUTH_TOKEN') {
    chrome.identity.getAuthToken({ interactive: false }, (result) => {
      const token = typeof result === 'string' ? result : result?.token;
      if (token) {
        chrome.identity.removeCachedAuthToken({ token }, () => {
          sendResponse({ success: true });
        });
      } else {
        sendResponse({ success: true });
      }
    });
    return true;
  }

  return false;
});

// Handle keyboard commands
chrome.commands?.onCommand.addListener((command) => {
  if (command === '_execute_action') {
    // Open popup
    chrome.action.openPopup();
  }
});

// Log service worker activation
console.log('GetMyBrief service worker activated');
