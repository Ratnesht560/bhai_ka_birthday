# Aman — A day well spent

A personalized, responsive birthday page with a clean editorial look, paper-white background, ink typography and signature cobalt-blue accents.

## Files
- `index.html` — page structure and editable copy
- `premium.css` — theme, layout, typography and responsive styling
- `script.js` — surprise toast, roast generator and birthday patch-notes reveal
- `assets/` — add Aman's photos and favicon

## Add photos
Place these files in `assets/`:
- `aman-01.png` — hero portrait
- `aman-02.jpg` — gallery photo
- `aman-03.jpg` — gallery photo

The supplied HTML expects these exact paths. If your files have different names or formats, update each image `src` in `index.html`. The original uploaded HTML referenced these assets, but the image files were not included with the HTML/CSS upload.

## Preview locally
Open `index.html` in a modern browser, or run a local server from this folder:

```bash
python -m http.server 8000
```

Open http://localhost:8000.

## Publish with GitHub Pages
1. Create a repository and upload the files and `assets/` folder to its root.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. Wait for deployment and open the generated URL.

No build step, dependencies, API keys or environment variables are needed.

## Personalization
- Main heading, birthday date, note and captions: edit `index.html`.
- Colors and typography: edit the CSS variables at the top of `premium.css`.
- Toast surprises and roast lines: edit the arrays in `script.js`.

Jokes are intentionally generic and friendly; replace them with your own inside jokes if you want a more personal touch.
