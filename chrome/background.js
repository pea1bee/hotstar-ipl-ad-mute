chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = new URL(details.url);
    const adName = url.searchParams.get("adName") || "Unknown Ad";

    // Default mute duration in seconds
    let durationSec = 10;

    // Attempt to extract duration from adName if possible
    const durationRegexes = [
      /(\d{1,3})s(?:Eng(?:lish)?|Hin(?:di)?)/i,
      /(?:HIN|ENG|HINDI|ENGLISH)[^\d]*(\d{1,3})/i
    ];

    for (const regex of durationRegexes) {
      const match = adName.match(regex);
      if (match) {
        durationSec = parseInt(match[1], 10);
        break;
      }
    }

    console.log(`Muting ad "${adName}" for ${durationSec} seconds`);

    const tabs = await chrome.tabs.query({ url: "*://*.hotstar.com/*" });

    for (const tab of tabs) {
      if (!tab.mutedInfo.muted) {
        chrome.tabs.update(tab.id, { muted: true });

        setTimeout(() => {
          chrome.tabs.get(tab.id, (updatedTab) => {
            if (updatedTab && updatedTab.mutedInfo.muted) {
              chrome.tabs.update(tab.id, { muted: false });
            }
          });
        }, (durationSec * 1000) - 100); // Slight buffer before unmuting
      }
    }
  },
  {
    urls: ["*://bifrost-api.hotstar.com/v1/events/track/ct_impression*"]
  }
);
