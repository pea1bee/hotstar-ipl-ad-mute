![HOTSTAR IPL AD Muter](chrome/128.png?raw=true) 
# Hotstar Ad Muter

This tiny browser extension auto mutes certain ads in live sport streams on Hotstar like IPL by intercepting Hotstar's ad tracking pixels. It also dynamically determines how long to mute by guessing the duration of the ad from the ad identifier.

Provides respite to your ears by muting the following ads out of the box: **Parle Marie, Vimal Elaichi, Kamla Pasand, My11 Circle, anything with Navjot Singh Sidhu or Aakash Chopra**.

Made this browser add-on for personal use and may add or remove ads to mute in the future from the current list. Please read the customize section to add your own custom ad lists. 

---

## Installation 

1. **Clone** this repository to your computer 

   ```bash
   git clone https://github.com/pea1bee/hotstar-ipl-ad-mute
   ```
   
   (alternatively, you can download the zip here: https://github.com/pea1bee/hotstar-ipl-ad-mute/archive/refs/heads/main.zip)

## Google Chrome installation

1. **Open Chrome**, and go to `chrome://extensions/`
2. **Enable Developer Mode** in the top-right corner (if not already enabled).
3. Click on **"Load unpacked"**.
4. Select `chrome` folder inside `hotstar-ipl-ad-mute` folder.
5. Enjoy muted ads during live sport streams!

## Mozilla Firefox installation
1. **Open Firefox**
2. Enter `about:debugging` in the URL bar
3. Click **This Firefox**
4. Click **Load Temporary Add-on**
5. Select `manifest.json` file inside `hotstar-ipl-ad-mute/firefox` folder.
6. Enjoy muted ads during live sport streams!

Note: The extension installs and remains installed until you remove it or restart Firefox.

## Microsoft Edge installation

1.  **Open Edge**, and go to `edge://extensions/`
2.  **Enable Developer Mode** in the bottom-left corner (if not already enabled).
3.  Click on **"Load unpacked"**.
4.  Select the `edge` folder inside the `hotstar-ipl-ad-mute` folder.
5.  Enjoy muted ads during live sport streams!

---

## Customize

You can customize which ads are muted by modifying the `targetAdIds` array in `background.js`.  
To add a new ad keyword:

```js
const targetAdIds = [
  "PARLE_MARIE",
  "KAMLA_PASAND",
  "DREAM11",
  // Add your own here
];
```

### Steps to find ad identifiers:
1. **Open Chrome**, and go to the Extensions page `chrome://extensions/`.
2. Find and select `Hotstar IPL Ad Muter` extension. Click on "Details".
3. Click on the section labeled "Inspect views"
4. **During the IPL livestream**, look for the console log `Ad detected:` followed by the `adName`.
5. Add full or unique parts ad identifiers you want to mute to the `targetAdIds` array in `background.js`

Alternatively, you can also open your browser dev tools and look for URLs that begin with `https://bifrost-api.hotstar.com/v1/events/track/ct_impression` in the **Network tab** during a live sport stream and get the ad identifier from the `adName` query parameter.

---


## Caveats
- Sometimes when greedy broadcasters think they can sneak in one more ad but the next over is just about to begin so they have to abruptly cut short the ad, this may cause a few seconds of muted live action
- This extension may break if Hotstar change their current tracking pixel URLs or change the format or keywords used in their ad identifiers

## License

MIT © 2025
