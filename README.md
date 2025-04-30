![HOTSTAR IPL AD Muter](128.png?raw=true) 

# Hotstar Ad Muter

This Chrome extension auto mutes annoying ads on IPL live streams by intercepting Hotstar's ad tracking requests. It also dynamically determines how long to mute the tab based on ad metadata.

Provides respite to your ears by blocking the following ads out of the box: **Parle Marie, Vimal, Dream 11, Kamla Pasand, IPL ads with Navjot Singh Sidhu and Aakash Chopra**.

I use this for my personal use and may add or remove ads to mute in the future from the current list. Please read the customize section to add your own custom ad lists. 

---

## How to Install (Unpacked Extension)

1. **Clone or download** this repository to your computer.

   ```bash
   git clone https://github.com/pea1bee/hotstar-ipl-ad-mute
   cd hotstar-ipl-ad-mute
   ```

   OR

   download the zip here: 

2. **Open Chrome**, and go to the Extensions page:

   ```
   chrome://extensions/
   ```

3. **Enable Developer Mode** in the top-right corner (if not already enabled).

4. Click on **"Load unpacked"**.

5. Select `hotstar-ipl-ad-mute` folder.

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
