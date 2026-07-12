# 🖼️ Photo Stack Carousel

A responsive, animated 3D photo carousel with a stacked "frame" aesthetic — built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies.

![Vanilla JS](https://img.shields.io/badge/JavaScript-Vanilla-f7df1e?logo=javascript&logoColor=black)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)
![License: MIT](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- **Smooth 3D stack animation** — center card is sharp and prominent, side cards fade and tilt away with a spring-like easing curve
- **Fully responsive** — works seamlessly on desktop, tablet, and mobile
- **Multiple navigation methods:**
  - Drag / swipe (mouse and touch, powered by Pointer Events)
  - Arrow buttons (`‹` `›`)
  - Click on a side card to jump to it
  - Keyboard arrow keys
- **Live progress indicator** — dot pagination with an animated active-state pill
- **Frame counter** — `FRAME 01` / `01 / 05` style header that updates automatically
- **Per-slide captions** — title and location/subtitle for each photo
- **Zero dependencies** — just HTML, CSS, and JS, split into clean separate files

## 📁 Project Structure

```
├── index.html    # Markup
├── style.css     # Styling and animations
└── script.js     # Carousel logic and data
```

## 🚀 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/photo-stack-carousel.git
   cd photo-stack-carousel
   ```
2. Open `index.html` in your browser — that's it, no build step required.

## 🖌️ Customization

### Add your photos

Open `script.js` and edit the `images` array at the top:

```js
const images = [
  { src: "https://example.com/photo1.jpg", title: "Mount Fuji", location: "Yamanashi" },
  { src: "https://example.com/photo2.jpg", title: "Torii Gate",  location: "Hakone" },
  { src: "", title: "Photo Title", location: "Location" }, // empty src = placeholder card
];
```

- Add or remove objects to change the number of slides — dots and the frame counter update automatically.
- Leave `src` empty to show a placeholder card until you add a real image link.

### Change colors

All colors are defined as CSS variables at the top of `style.css`:

```css
:root{
  --paper: #f3ede2;   /* card background */
  --ink: #2a2620;      /* main text color */
  --moss: #3f4d38;     /* accent (active dot, hover states) */
}
```

### Adjust card size

```css
--card-w: clamp(150px, 26vw, 220px);
--card-h: calc(var(--card-w) * 1.32);
```

### Tune the animation

In `style.css`, on `.card`:

```css
transition: transform 0.65s cubic-bezier(.22,1,.36,1), opacity 0.55s ease;
```

Increase `0.65s` for a slower, dreamier motion, or decrease it for something snappier.

## 🌐 Browser Support

Works in all modern browsers that support Pointer Events and CSS custom properties (Chrome, Firefox, Safari, Edge — latest versions).

## 📄 License

MIT — free to use, modify, and distribute.
