# 🧾 Google Doc Grid Drawer

This Node.js script fetches a publicly published Google Document containing a table of `(x, char, y)` entries and renders a grid based on those coordinates. It's useful for visualizing text-based layouts like ASCII art or grid-based designs stored in tables.

---

## 📦 Requirements

- Node.js v18 or higher
- NPM dependencies:
  - [`node-fetch`](https://www.npmjs.com/package/node-fetch)
  - [`cheerio`](https://www.npmjs.com/package/cheerio)

When you clone the repo, run `yarn` to install dependencies.

---

## 🚀 Usage

1. **Make sure your Google Doc is published to the web.**

   - In Google Docs:  
     **File → Share → Publish to web** → Copy the public URL.

2. **Run the script:**

```bash
yarn start
```

The script will fetch the table data from the published document and print the reconstructed grid to the console.

---

## 📄 Example Table Format

Your Google Doc table should look like this:

| x  | char | y  |
|----|------|----|
| 0  | █    | 0  |
| 1  | █    | 0  |
| 2  | █    | 0  |
| ...| ...  | ...|

Where:
- `x`: column number (left to right)
- `y`: row number (top to bottom)
- `char`: the character to place at that coordinate (e.g. `█`, `A`, `.`)

---

## 🧠 How It Works

- Fetches the raw HTML of the published Google Doc.
- Parses the first `<table>` element using Cheerio.
- Constructs a 2D map of `y` rows, each containing a map of `x` → `char`.
- Calculates the max width (`maxX`) and prints each row in order.

---

## 🛠️ Script Entry Point

```js
drawGridFromGoogleDoc("https://docs.google.com/document/d/e/2PACX-1vQGUck9HIFCyezsrBSnmENk5ieJuYwpt7YHYEzeNJkIb9OSDdx-ov2nRNReKQyey-cwJOoEKUhLmN9z/pub");
```

Replace the URL with your own published Google Doc link.

---

## 🖨️ Output Example

```text
████████░     ████████░   ██████████░    ███████░     ██░     ██░     ███░    ███░ ██░     ██░
██░     ██░ ███░     ███░ ██░          ███░    ██░   ████░   ████░      ██░  ██░   ██░     ██░
██░     ██░ ██░       ██░ ██░         ███░           ██░██░ ██░██░       ██░██░    ██░     ██░
████████░   ██░       ██░ ████████░   ██░           ███░ ██░██░ ██░       ███░     ██████████░
██░     ██░ ██░       ██░ ██░         ███░          ██░  █████░ ███░     ██░██░    ██░     ██░
██░     ██░ ███░     ███░ ██░          ███░    ██░ ███░   ███░   ██░    ██░  ██░   ██░     ██░
████████░     ████████░   ██████████░    ███████░  ██░           ███░ ███░    ███░ ██░     ██░
                                                                                              
```

---

## 🧹 Notes

- Only the first `<table>` in the document will be parsed.
- Rows and columns must contain valid integers for x and y.
- Characters will be rendered in their grid positions with spaces in between as needed.