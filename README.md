# Hotstar IPL Ad Muter

This Chrome extension auto mutes ads on IPL live streams when specific ad tracking requests (like those containing "PARLE_MARIE") are detected. It dynamically determines how long to mute the tab based on ad metadata.

Provides respite to your ears by blocking the following ads out of the box: **Parle Marie, Vimal, Dream 11, Kamla Pasand, IPL ads with Navjot Singh Sidhu and Aakash Chopra**.

---

## How to Install (Unpacked Extension)

1. **Clone or download** this repository to your computer.

   ```bash
   git clone https://github.com/yourusername/hotstar-ad-muter-extension.git
   cd hotstar-ad-muter-extension
   ```

2. **Open Chrome**, and go to the Extensions page:

   ```
   chrome://extensions/
   ```

3. **Enable Developer Mode** in the top-right corner (if not already enabled).

4. Click on **"Load unpacked"**.

5. Select `hotstar-ad-muter-extension` folder.

6. Enjoy muted ads!

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
5. Add full or unique parts of this ad identifier in the `targetAdIds` array in `background.js`

---

## Caveats
- Sometimes ads are cut short abruptly when the next over is about to begin, which may cause a few seconds of muted live action
- This extension will break if Hotstar change the ad tracking URLs or change the format or keywords in ad identifiers

## License

MIT © 2025
