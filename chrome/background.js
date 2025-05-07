const targetAdIds = [
  "PARLE_MARIE",
  "KAMLA_PASAND",
  "VIMAL",
  "MY11C",
  "POKER_BAAZI",
  "VICKS",
  "POLICY_BAZAAR",
  "PHONEPE",
  "TATAIPL2025_JDDDIPL",
  "GOOGLE_PIXEL",
  "SAMSUNG_S25",
  "CAMPA_COLA",
  "VIVO",
  "PR-25-011191_TATAIPL2025_IPL18_ipl18HANGOUTEVR20sEng_English_VCTA_NA", //sidhu ipl ad"
  "PR-25-012799_TATAIPL2025_IPL18_IPL18BHOJPURI20sBHOmob_Hindi_VCTA_20" // bhojpuri ipl ad 
];

const durationRegexes = [
  /(\d{1,3})s(?:Eng(?:lish)?|Hin(?:di)?)/i,      // "20sEng", "15sHindi", "10sHin"
  /(?:HIN|ENG|HINDI|ENGLISH)[^\d]*(\d{1,3})/i    // "HIN_10", "ENG_15"
];

console.log("Hotstar Adblocker extension loaded");

chrome.webRequest.onBeforeRequest.addListener(
  async (details) => {
    const url = new URL(details.url);
    const adName = url.searchParams.get("adName");
    console.log(`Ad id: ${adName}`);

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

        console.log(`Muting ${adName} for ${durationSec} seconds`);

        const tabs = await chrome.tabs.query({ url: "*://*.hotstar.com/*" });

        for (const tab of tabs) {
          if (!tab.mutedInfo.muted) {
            chrome.tabs.update(tab.id, { muted: true });
          //  console.log(`Muted tab ${tab.id}`);

            setTimeout(() => {
              chrome.tabs.get(tab.id, (updatedTab) => {
                if (updatedTab && updatedTab.mutedInfo.muted) {
                  chrome.tabs.update(tab.id, { muted: false });
                //  console.log(`Unmuted tab ${tab.id}`);
                }
              });
            }, (durationSec * 1000) - 100); // some buffer for next tracking pixel
          }
        }
      }
    }
  },
  {
    urls: ["*://bifrost-api.hotstar.com/v1/events/track/ct_impression*"]
  }
);
