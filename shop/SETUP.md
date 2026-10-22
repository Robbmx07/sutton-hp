# Sutton Shopping List: setup guide

The shopping list runs from GitHub Pages at **https://robbmx07.github.io/sutton-hp/shop/**, with the list saved in its own Google Sheet behind the family passcode, like the other apps. The Kroger connection lives in that sheet's script, so the Kroger keys and sign-in never sit in GitHub or on anyone's phone.

You need about 20 minutes on a computer, plus **Code.gs**, the script Claude sent you.

The app only **adds items to the Kroger cart**. It can't place an order: checkout always happens in the Kroger app.

---

## Part 1: The Google Sheet and script

1. Go to **sheets.new** while signed in to your Google account.
2. Rename the spreadsheet **Sutton Shopping List**. Use a new sheet, not one of the other apps' sheets.
3. Open **Extensions → Apps Script**.
4. Delete the sample code and paste in all of **Code.gs**.
5. Near the top, replace `PUT_THE_FAMILY_PASSCODE_HERE` with the family passcode, the same one the other apps use. Keep the quotes. Leave the two Kroger lines as they are for now.
6. Click **Save**.
7. In the function dropdown, choose **setup**, then click **Run**.
   1. Click **Review permissions** and choose your account.
   2. At "Google hasn't verified this app," click **Advanced**, then **Go to … (unsafe)**, then **Allow**. It asks for email permission so it can warn you if someone keeps guessing the passcode, and for "external service" permission so it can talk to Kroger.
8. Click **Deploy → New deployment**, then the gear icon, then **Web app**.
   - **Execute as:** Me
   - **Who has access:** Anyone. The passcode is what protects it.
9. Click **Deploy**, then copy the **Web app URL**. It ends in `/exec`. You'll use it twice below.

## Part 2: The Kroger developer app

1. Go to **developer.kroger.com** and create a free developer account. You can sign in with the family Kroger account.
2. Create (register) a new application. Name it something like **Sutton Shopping List**.
   - **Redirect URI:** paste the **Web app URL** from Part 1, exactly as copied.
   - **APIs / scopes:** include **Products**, **Locations** and **Cart** (scopes `product.compact` and `cart.basic:write`).
   - If it asks for an environment, pick **Production**.
3. Save it, then copy the app's **Client ID** and **Client Secret**.

## Part 3: Put the Kroger keys in the script

1. Back in Apps Script, replace `PASTE_KROGER_CLIENT_ID_HERE` and `PASTE_KROGER_CLIENT_SECRET_HERE` with the Client ID and Client Secret. Keep the quotes.
2. Click **Save**.
3. Click **Deploy → Manage deployments**, the pencil icon, set **Version** to **New version**, and click **Deploy**. The URL stays the same.

## Part 4: Connect the app

1. Send the **Web app URL** to Claude. Claude will put it into the shopping list and the kitchen board for you.

   Or do it yourself: on GitHub, edit **sutton-hp → shop/index.html**, replace `PASTE_YOUR_WEB_APP_URL_HERE` with the URL (keep the quotes) and commit. Do the same for `PASTE_SHOPPING_LIST_WEB_APP_URL_HERE` in **home/index.html** to show the list on the kitchen board.
2. Open **https://robbmx07.github.io/sutton-hp/shop/** and enter the family passcode.
3. Tap **⚙︎ Settings**:
   1. Under **Store**, type your ZIP code, tap **Find stores**, and pick your usual Kroger.
   2. Under **How you get groceries**, leave **Delivery** selected.
   3. Under **Kroger account**, tap **Connect Kroger** and sign in to the family Kroger account. When the tab says "Kroger is connected," close it and go back to the list.
4. On each phone (and the kitchen iPad, if you like): open the link in Safari, enter the passcode, then **Share → Add to Home Screen**.

---

## Using it

- **Add** anything that's running low. Adding something that's already on the list bumps its count instead of adding a second line.
- **Match** each new item to a Kroger product once. After that, the list remembers it whenever that name is added again, and **Usuals** gives one-tap re-adds.
- Prices are your store's current Kroger prices. **SALE** means Kroger has it on promotion. **BELOW USUAL** appears once there are a few days of price history and today's price is at least 10% under the usual.
- The bottom bar adds up the ticked items and shows how far you are from the free-delivery minimum. Change the minimum in Settings if Kroger changes it.
- **Send to Kroger cart** sends every ticked, matched item at once and marks them as sent, so they're never sent twice. Untick anything you want to hold for later.
- After you check out in the Kroger app, tap **Done shopping** to clear the sent items.

## Good to know

- **Kroger sign-in.** If Kroger ever asks to be signed in again, the Send button changes to **Connect Kroger to send**. Tap it and sign in once more.
- **Wrong passcodes.** After 10 wrong tries, the list locks for 6 hours and you get an email.
- **Changing the passcode.** Edit the `FAMILY_PASSCODE` line in Apps Script, save, then **Deploy → Manage deployments**, the pencil icon, **New version**, **Deploy**.
- **Privacy.** The app's code is public on GitHub, but the list, the passcode and the Kroger keys aren't. Never upload Code.gs to GitHub.
- **The `store` tab** in the sheet is the app's raw data. Don't edit it by hand.
