# Sutton House Points: setup guide

You need about 20 minutes on a computer. You'll set up three things:

1. **A Google Sheet.** This is where your points, rewards, and history are stored.
2. **A small script attached to that Sheet.** It lets the app read and save data, and only answers when it's given your household passcode.
3. **The app itself.** It lives on GitHub Pages, and you'll both add it to your phones' home screens.

Erica never needs an account. You use your existing Google and GitHub accounts once, during setup.

---

## Part 1: The Google Sheet and script (about 10 minutes)

1. Go to **sheets.new** while signed in to your Google account. A blank spreadsheet opens.
2. Rename it **Sutton House Points** by clicking "Untitled spreadsheet" at the top left.
3. Open **Extensions → Apps Script**. A code editor opens in a new tab.
4. Delete the sample code in the editor (`function myFunction() {...}`).
5. Open **Code.gs** from this folder, copy all of it, and paste it into the editor.
6. Near the top, find this line:
   ```
   const HOUSEHOLD_PASSCODE = 'change-me';
   ```
   Replace `change-me` with a passcode only you and Erica will know, for example `'porch-light-2026'`. Keep the quotes.
7. Click the **Save** (disk) icon.
8. Run the one-time setup:
   1. In the toolbar, use the function dropdown to choose **setup**, then click **Run**.
   2. Google asks you to authorize the script. Click **Review permissions** and choose your account.
   3. You'll see **"Google hasn't verified this app."** That's expected, because you wrote it. Click **Advanced**, then **Go to Sutton House Points (unsafe)**, then **Allow**.
9. Publish the script as a web app:
   1. Click **Deploy → New deployment**.
   2. Click the gear icon next to "Select type" and choose **Web app**.
   3. Set **Execute as** to **Me**.
   4. Set **Who has access** to **Anyone**. This lets the app reach the script without anyone signing in; the passcode is what protects it.
   5. Click **Deploy** and allow access again if asked.
10. Copy the **Web app URL**. It's long and ends in `/exec`. Keep it handy for Part 2.

## Part 2: Put the app on GitHub Pages (about 10 minutes)

1. Open **index.html** from this folder in a text editor (Notepad works).
2. Near the top of the `<script>` section, find this line:
   ```
   const API_URL = 'PASTE_YOUR_WEB_APP_URL_HERE';
   ```
   Paste your Web app URL between the quotes, then save the file.
3. On github.com, click **+ → New repository**.
   - Name: something not obvious, like `sutton-hp`.
   - Visibility: **Public**. Free GitHub Pages requires a public repo. The code is visible to anyone who looks, but your data and passcode are not; they stay in your Google Sheet.
   - Click **Create repository**.
4. On the new repo page, click **uploading an existing file** (or **Add file → Upload files**).
5. Drag in all six files: `index.html`, `manifest.webmanifest`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, and `SETUP.md`. Do **not** upload `Code.gs`, because it contains your passcode.
6. Click **Commit changes**.
7. Turn on Pages:
   1. Go to **Settings → Pages**.
   2. Under "Branch," choose **main** and **/(root)**, then click **Save**.
   3. After a minute or two, the page shows your site address, for example `https://robbmx07.github.io/sutton-hp/`.

## Part 3: Your phone

1. Open the site address in **Safari** (iPhone) or **Chrome** (Android).
2. Enter the household passcode and tap **Unlock**.
3. Tap **I'm Robert**.
4. The app fills itself in with your 70 tasks, 8 weekly goals, and settings the first time it connects.
5. Add it to your home screen:
   - **iPhone:** tap Share, then **Add to Home Screen**.
   - **Android:** tap the ⋮ menu, then **Add to Home screen** (or **Install app**).

## Part 4: Share it with Erica

1. Text Erica the site address.
2. Tell her the passcode in person or by phone. Keep it out of the same text as the link.
3. She opens the link, enters the passcode, taps **I'm Erica**, and adds it to her home screen the same way.
4. That's all. She doesn't need an account or a sign-in, and you both see the same balances, rewards, and history.

---

## Good to know

- **Syncing.** The app checks for new entries every 20 seconds while it's open, and again whenever you switch back to it.
- **Readable backup.** In the Google Sheet, open the **House Points** menu and choose **Refresh History tab**. That gives you a plain, sortable log of every chore and cash-in. If the menu doesn't appear, reload the sheet. Don't edit the `store` tab by hand; it's the app's raw data.
- **Changing the passcode.**
  1. In Apps Script, edit the `HOUSEHOLD_PASSCODE` line and save.
  2. Click **Deploy → Manage deployments**, then the pencil icon.
  3. Set **Version** to **New version** and click **Deploy**. The URL stays the same.
  4. Each phone will ask for the new passcode the next time it connects.
- **Updating the app.** Edit `index.html` in the GitHub repo (pencil icon → **Commit changes**). The phones pick up the change the next time the app is opened fresh.
- **Privacy, in plain terms.** Anyone with both the site address and the passcode can see and change your data. The site is marked to stay out of search results, but treat the passcode like a house key.
- **Lost a phone or want to reset who's who?** Tap **switch** next to your name. To make a phone forget the passcode, clear the site's data in that phone's browser settings.
