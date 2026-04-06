# Design System: Alessandro Gonzaga Portfolio

A comprehensive library of design keys, components, and aesthetic principles used in the **Alessandro Gonzaga Portfolio**. This system prioritizes a **Bento Glassmorphism** aesthetic with a dark **Forest Green** motif.

---

## 🎨 Color Palette

### Primary Motif: Forest Green
Used for interactive elements, highlights, and status indicators.
- **Base Green (Primary 500):** `#178C57` (`text-green-500`, `bg-green-500`)
- **Deep Forest (Primary 600):** `#13734A` (`bg-green-600`)
- **Highlight (Emerald):** `#10B981` (`text-emerald-400`)
- **Dark Shadow:** `rgba(5, 46, 22, 0.3)` (Custom Green-950 shadow)

### Neutral & Glass Base
- **Background:** `#000000` (`bg-black`)
- **Glass Tint:** `rgba(0, 0, 0, 0.2)` (`bg-black/20`)
- **Glass Border:** `rgba(255, 255, 255, 0.1)` (`border-white/10`)
- **Text Primary:** `#FFFFFF` (`text-white`)
- **Text Muted:** `rgba(255, 255, 255, 0.6)` (`text-white/60`)

---

## ✨ UI Components

### 1. GlassCard (Bento Base)
The fundamental building block for the Bento grid.
- **Classes:** `bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl`
- **Hover Behavior:** `scale: 1.01`, `bg-white/15` (Framer Motion)
- **Shadow:** `shadow-lg`

### 2. GlassButton
Interactive elements following the glass aesthetic.
- **Primary:** `bg-green-800/40 hover:bg-green-700/50 border border-green-700/50`
- **Secondary:** `bg-green-950/40 hover:bg-green-900/50 border border-green-800/20`
- **Behavior:** `whileHover: { scale: 1.05 }`, `whileTap: { scale: 0.95 }`

### 3. Typography
- **Headings:** `Poppins` font, `font-bold`, `tracking-tight`.
- **Body:** `Inter` font, `antialiased`.
- **Gradients:** `bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent`

---

## 🍱 Layout & Structure

### Bento Grid Configuration
The home page utilizes a 3-column masonry/bento layout.
- **Max Width:** `max-w-7xl`
- **Desktop Padding:** `pt-36` (Home) / `pt-32` (Subpages)
- **Gap:** `gap-8`

### Dynamic Backgrounds
Cross-fading background images mapped to routes:
- **Home:** `/images/sunset-main.jpg`
- **Experience:** `/images/chicago-infra.jpg`
- **Projects:** `/images/mountains-purple.jpg`
- **Blog:** `/images/lake-blue.jpg`
- **About:** `/images/waterfall-vertical.jpg`
- **Overlay:** `bg-gradient-to-b from-black/30 via-black/20 to-black/60`

---

## 🤖 Agent Mode (AI Identity)

The AI Agent utilizes a specific set of "magical" visual cues:
- **Pulsing Border:** 2px solid green with a `green-700` inner glow.
- **Nav Highlight:** `agent-nav-glow` using `green-600` text shadows.
- **Sparkles:** Pixie dust particles using `radial-gradient(circle, #fff, rgba(21, 128, 61, 0))`.

---

## 🛠 Utility Classes

| Key | Tailwind Classes |
| :--- | :--- |
| **Glass Panel** | `.glass-panel` (backdrop-blur-xl + border-white/20) |
| **Forest Text** | `text-green-500` / `text-emerald-400` |
| **Bento Rounding** | `rounded-3xl` |
| **Section Icons** | `p-4 bg-white/5 rounded-2xl border border-white/5` |
