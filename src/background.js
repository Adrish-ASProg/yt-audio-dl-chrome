import { getYTPlaylistId, getYTVideoId } from "./yt-url-utils";

chrome.tabs.onUpdated.addListener(togglePageActionVisibility);
chrome.pageAction.onClicked.addListener(onToolbarBtnClicked);

function togglePageActionVisibility(tabId, changeInfo, tab) {
  if (!tabId || !tab.url) return;

  if (shouldDisplayPageAction(tab.url)) {
    chrome.pageAction.show(tabId);
  } else {
    chrome.pageAction.hide(tabId);
  }
}

function shouldDisplayPageAction(url) {
  const id = getYTVideoId(url);
  const playlistId = getYTPlaylistId(url);

  return (id != null || playlistId != null);
}

function onToolbarBtnClicked(tab) {
  const id = getYTVideoId(tab.url);
  const playlistId = getYTPlaylistId(tab.url);

  chrome.runtime.sendNativeMessage("com.asoft.ytdl", { text: id || playlistId });
}
