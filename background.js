chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const activeTab = await chrome.tabs.get(activeInfo.tabId);
  
  // Agar current tab YouTube nahi hai, to sabhi YouTube tabs me video pause karo
  if (!activeTab.url.includes("youtube.com")) {
    chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
      for (let t of tabs) {
        chrome.scripting.executeScript({
          target: { tabId: t.id },
          func: () => {
            const video = document.querySelector("video");
            if (video && !video.paused) {
              video.pause();
            }
          }
        });
      }
    });
  }
});
