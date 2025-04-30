const targetAdIds = [
  "PARLE_MARIE", "KAMLA_PASAND", "VIMAL", "DREAM"
];

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = new URL(details.url);
    const adName = url.searchParams.get("adName");
    console.log(`Ad name: ${adName}`);

    if (adName) {
      const adIdMatch = targetAdIds.some((id) => adName.includes(id));

      if (adIdMatch) {
        const match = adName.match(/(?:HINDI|HIN|ENG|ENGLISH)_([0-9]{1,3})$/i);
        const durationSec = match ? parseInt(match[1], 10) : 10;
        console.log(`Ad detected: ${adName} — muting for ${durationSec} seconds`);

        const tabs = await chrome.tabs.query({ url: "*://*.hotstar.com/*" });

        for (const tab of tabs) {
          if (!tab.mutedInfo.muted) {
            chrome.tabs.update(tab.id, { muted: true });
            console.log(`Muted tab ${tab.id}`);

            setTimeout(() => {
              chrome.tabs.get(tab.id, (updatedTab) => {
                if (updatedTab && updatedTab.mutedInfo.muted) {
                  chrome.tabs.update(tab.id, { muted: false });
                  console.log(`Unmuted tab ${tab.id}`);
                }
              });
            }, durationSec * 1000);
          }
        }
      }
    }
  },
  {
    urls: ["*://bifrost-api.hotstar.com/v1/events/track/ct_impression*"]
  }
);
