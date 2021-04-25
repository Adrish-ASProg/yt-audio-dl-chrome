const ALLOWED_PAGE = "youtube.com";

chrome.tabs.onUpdated.addListener(onTabUpdated);
chrome.pageAction.onClicked.addListener(onToolbarBtnClicked);

function onTabUpdated(tabId, changeInfo, tab) {
  if (!tabId || !tab.url) return;
  togglePageActionVisibility(tabId, tab.url)
}

function togglePageActionVisibility(tabId, url) {
  if (url.includes(ALLOWED_PAGE)) {
    chrome.pageAction.show(tabId);
  } else {
    chrome.pageAction.hide(tabId);
  }
}

function onToolbarBtnClicked(tab) {
  chrome.runtime.sendNativeMessage("com.asoft.ytdl", { text: tab.url });
}
