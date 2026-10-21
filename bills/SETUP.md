# Sutton Bill Book: setup guide

The bill book runs from GitHub Pages at **https://robbmx07.github.io/sutton-hp/bills/**, with your data in a Google Sheet. Erica never needs an account.

You need about 10 minutes on a computer, plus two files Claude sent you:

- **Code.gs**: the script for the Google Sheet. The household passcode is already in it.
- **bill-book-backup-2026-10-21.json**: your bills, paychecks, Kroger groceries and payment history from the Claude version.

---

## Part 1: The Google Sheet and script

1. Go to **sheets.new** while signed in to your Google account.
2. Rename the spreadsheet **Sutton Bill Book**. Use a new sheet, not the House Points one.
3. Open **Extensions → Apps Script**.
4. Delete the sample code, then paste in all of **Code.gs** and click **Save**.
5. Run the one-time setup:
   1. In the function dropdown, choose **setup**, then click **Run**.
   2. Click **Review permissions** and choose your account.
   3. At "Google hasn't verified this app," click **Advanced**, then **Go to … (unsafe)**, then **Allow**. It asks for email permission so it can warn you if someone keeps guessing the passcode.
6. Click **Deploy → New deployment**, then the gear icon, then **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone. The passcode is what protects it.
7. Click **Deploy**, then copy the **Web app URL**. It ends in `/exec`.

## Part 2: Connect the app to the sheet

Send the Web app URL to Claude in your chat, and Claude will put it in the app for you.

Or do it yourself:
1. On GitHub, open **sutton-hp → bills → index.html** and click the pencil icon.
2. Search for `PASTE_YOUR_WEB_APP_URL_HERE` and replace it with your URL. Keep the quotes.
3. Click **Commit changes**. The site updates in a minute or two.

## Part 3: Your phone, and bringing your data over

1. Open **https://robbmx07.github.io/sutton-hp/bills/** in **Safari**.
2. Enter the passcode and tap **Unlock**, then tap **I'm Robert**.
3. To bring over your data, use a computer, or put the backup file in iCloud Drive or Files first. Then go to **More → Restore from backup** and choose **bill-book-backup-2026-10-21.json**. Do this once, on one device.
4. Tap **Share → Add to Home Screen**.

## Part 4: Erica's phone

1. Text Erica the link: **https://robbmx07.github.io/sutton-hp/bills/**
2. Tell her the passcode in person, not in the same text.
3. She opens the link in Safari, enters the passcode, taps **I'm Erica**, then **Share → Add to Home Screen**.

---

## Good to know

- **Syncing.** Each phone checks for changes every 20 seconds while the app is open, and whenever you switch back to it. Changes made with no signal save automatically once the phone reconnects. The top line says "Saving…" until they do.
- **Wrong passcodes.** After 10 wrong tries, the bill book locks for 6 hours and you get an email. If you didn't cause it, change the passcode (below).
- **Changing the passcode.** In Apps Script, edit the `HOUSEHOLD_PASSCODE` line and save. Then click **Deploy → Manage deployments**, the pencil icon, set **Version** to **New version**, and click **Deploy**. The URL stays the same, and each phone asks for the new passcode.
- **Readable copy in the sheet.** In the Google Sheet, use **Bill Book → Refresh readable tabs** for plain **Bills** and **Payments** tabs. Don't edit the `store` tab by hand; it's the app's raw data.
- **This phone.** **More → This phone** lets you switch between Robert and Erica, or lock the phone so it asks for the passcode again.
- **Privacy.** The app's code is public on GitHub, but your data and passcode aren't. They stay in your Google Sheet. Anyone with both the link and the passcode can see and change your bills, so treat the passcode like a house key. Never upload Code.gs to GitHub.
