const targetAdIds = [
  "PARLE_MARIE", "KAMLA_PASAND", "VIMAL", "DREAM", "TATAIPL2025_IPL18_"
];

const durationRegexes = [
  /(\d{1,3})s(?:Eng(?:lish)?|Hin(?:di)?)/i,      // Matches "20sEng", "15sHindi", "10sHin", etc.
  /(?:HIN|ENG|HINDI|ENGLISH)[^\d]*(\d{1,3})/i    // Matches "HIN_10", "ENG_15"
];

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = new URL(details.url);
    const adName = url.searchParams.get("adName");
    console.log(`Ad name: ${adName}`);

    if (adName) {
      const adIdMatch = targetAdIds.some((id) => adName.includes(id));

      if (adIdMatch) {
        let durationSec = 10;
        for (const regex of durationRegexes) {
          const match = adName.match(regex);
          if (match) {
            durationSec = parseInt(match[1], 10);
            break;
          }
        }

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
