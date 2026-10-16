# DreamHouse — 3D Frontend Website

A responsive futuristic “My Dream House” project website with an interactive 3D house model.

## Files
- `index.html` — page structure
- `style.css` — responsive visual design and animations
- `script.js` — Three.js 3D house, orbit controls, feature modals and interactions

## Run it
Three.js uses ES modules, so run this folder through a local development server rather than opening `index.html` directly.

### Option A: VS Code
1. Open the repository folder in VS Code.
2. Install the **Live Server** extension if needed.
3. Right-click `index.html` → **Open with Live Server**.

### Option B: Python
Open a terminal in this folder and run:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Notes
- An internet connection is needed for the Three.js CDN and Google Fonts.
- This is frontend-only; there is no backend or database.
- The 3D house is built from Three.js geometry in code, so users can rotate it by dragging.
