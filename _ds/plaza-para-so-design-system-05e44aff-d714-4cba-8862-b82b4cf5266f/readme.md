# Plaza Paraíso · Design System

**Plaza Paraíso** is a first-edition summer culture festival held at the **Plaza de Toros (bullring) of Torremolinos**, Málaga, from **25 July to 13 September 2026**. It turns the historic bullring into "the meeting point of the summer" (*el punto de encuentro del verano*), programming four strands — **Música, Teatro, Gastronomía y Ocio** — across one open-air season.

It is aimed at locals from Torremolinos and Málaga and at tourists holidaying on the Costa del Sol. Organised by **Locamente** (celebrating 10 años) with the collaboration of the **Ayuntamiento de Torremolinos**.

**SEO focus:** *Plaza Paraíso Torremolinos* · *planes que hacer en Torremolinos* · *qué hacer en Torremolinos verano 2026*.

### Programme (2026)
Laura Gallego (concierto) · Bresh · Loco Bongo · Las Pilardos *Operación Marbella* · Furor The Show (con Alonso Caparrós) · Sigue la Luz (Xenon Spain y Paca la Piraña) · Little Italy *Gastrofest* — *y más por confirmar*.

### Sources reviewed
- **Live site:** https://www.plazaparaiso.com (WordPress / Elementor; Google Fonts). Programme, FAQs and copy were lifted from here.
- **Brand assets (uploaded):** 3 logo cuts (`LOGOPLPARAISO*.png`), the `Esther.otf` display face, the official colour swatch, and 6 square carteles (Música/Teatro/Gastro/Ocio + the line-up + Bresh).
- Social: Instagram / Facebook / TikTok @plazaparaisotorremolinos.

---

## CONTENT FUNDAMENTALS

**Language:** Spanish (Spain), `es_ES`. Warm, inviting, summery — never corporate.

**Voice & address:** Speaks to *tú/vosotros* implicitly through imperatives and shared excitement ("Consigue tu entrada", "Descubre el paraíso", "Nos vemos en la plaza"). Inclusive and festive. The festival is the host inviting you in.

**Casing:**
- The wordmark is title-case Didone ("Plaza Paraíso").
- Almost everything else in the UI is **UPPERCASE** and heavy — category words, event names, CTAs, dates, footer.
- Body/descriptive paragraphs are sentence case.

**Tone words:** veraniego, vibrante, abierto, cercano, cultural, fiesta. A touch of cheeky Andalusian camp (drag shows, *Operación Marbella*) balanced by an elegant serif wordmark.

**Punctuation flourishes:** Spanish opening marks (¡ ¿) used proudly — "¡AL AIRE LIBRE!". Star/sparkle dividers ✦ in marquees. The `.com` and brand URL is always called out ("MÁS INFO **PLAZAPARAISO.COM**").

**Dates:** Spanish, abbreviated, uppercase — "DEL 25 JUL AL 13 SEP", "SÁBADO 12 SEP", "JUE 27 · VIE 28 AGO".

**Emoji:** Used sparingly in marketing/meta copy (☀️🌴🇮🇹) but **not** inside the UI chrome. Prefer the brand's own motifs (waves, palms, seals) over emoji in product surfaces.

**Sample copy:**
> "Este verano 2026, la Plaza de Toros de Torremolinos se transforma en el gran punto de encuentro del verano."
> "Música, Teatro, Gastronomía y Ocio."
> "Y más por confirmar."

---

## VISUAL FOUNDATIONS

**Overall vibe:** A sun-drenched Mediterranean beach-club poster. Cream paper, hot orange and red sun tones, deep navy ink, and layered blue *sea waves*. Equal parts elegant (the Didone wordmark) and loud festival (heavy condensed caps, photographic carteles).

**Colour** (`tokens/colors.css`)
- Navy `#1b2240` — primary ink, headers, footers, overlays.
- Red `#d62828` — Gastro/Música accents, the circular date stamp.
- Orange `#ef7f11` — **primary action colour**, dates inside capsules, CTAs.
- Amber `#fabd49` — Música bar, warm fills, success.
- Cream `#f7ead5` — the default canvas and every floating capsule.
- Wave blues `#8fc4ec → #1f3a7a` — the divider motif only (Mediterranean sea).
- Pink/magenta appears **in event photography** (Bresh/Loco Bongo neon) but is *not* a UI colour.

**Category colour-coding:** Música = amber bar / red word · Teatro = navy bar / orange word · Gastro = red bar / amber word · Ocio = orange bar / cream word.

**Type** (`tokens/typography.css`)
- **Esther** (provided OTF) — high-contrast Didone display serif. The wordmark voice and elegant headlines. *Note:* the logo wordmark is a custom lockup; use the logo PNGs for the wordmark itself and Esther for supporting display type.
- **Montserrat** — workhorse heavy grotesque. Category bars, capsules, CTAs, body. Weights 400–900; 800/900 do most of the heavy lifting. *(Substitute — see Caveats.)*
- **Anton** — tall condensed black for stacked line-up posters, alternating orange/navy lines. *(Substitute.)*

**Backgrounds:** Either **cream paper with faded palm-tree silhouettes** (radial-gradient washes), flat brand-colour bands, or **full-bleed event photography**. No noise/grain, no purple gradients.

**The wave divider — the signature motif:** layered torn-paper sea bands (foam → bright → mid → deep blue) with a scalloped crest, placed between every full-bleed/colour section. Provided as `<WaveDivider>` (SVG) and the `.plp-wave` CSS utility.

**Seals & stamps:** an orange **starburst seal** ("¡AL AIRE LIBRE!") and a solid **circular date stamp** (red), both slightly rotated for a stuck-on feel.

**Capsules:** event names live in **fully-rounded cream pills** (`--radius-pill`) that float over photography with a soft navy-tinted shadow — heavy navy name, orange date underneath.

**Imagery vibe:** warm, saturated, nightlife-bright; concert and drag-show photography. Always under a bottom **protection scrim** when text sits on top.

**Corners & elevation:** radii 8/14/24/36 and full-pill; soft warm-tinted shadows (`--shadow-sm/md/lg/pill`). Cards = white or navy surface, generous radius, soft shadow, no hard borders (an optional category-coloured top rule).

**Motion:** gentle. `--ease-out` for most transitions, a playful `--ease-bounce` for pops. Buttons darken on hover and shrink to 0.96 on press. A slow horizontal **marquee** strip ("PLAZA DE TOROS ✦ TORREMOLINOS ✦ AL AIRE LIBRE"). All decorative motion respects `prefers-reduced-motion`.

**Hover/press:** hover = darker shade of the same colour (or fill-invert on outline); press = `scale(0.96)`. Links lighten/underline-free.

**Layout:** centered max-width ~1200px, generous outdoor-poster spacing on an 8-pt grid. Min 44px hit targets.

---

## ICONOGRAPHY

The brand is **photo- and type-led**, not icon-led. There is no proprietary icon font. Iconography is intentionally minimal:
- A small **map-pin** glyph next to the venue, and a **calendar** glyph next to dates — both simple line icons.
- **Star/sparkle ✦** as a marquee separator and the **starburst seal** shape.
- **Social marks** (Facebook, Instagram, TikTok) in the nav and footer.

For product surfaces (the UI kit) we ship `ui_kits/website/icons.js` exposing `window.Icon` — a small set of **Lucide-derived** stroke glyphs (`arrow-right`, `chevron-down`, `calendar`, `map-pin`, `ticket`, `menu`, `x`, `plus`, `check`, `clock`) plus three filled social marks. **Substitution:** Lucide is used as the closest open match to the site's lightweight line icons; swap for the brand's own set if one is provided. Avoid emoji as UI icons. Never hand-draw decorative illustrations — use the logo cuts, the carteles, and the wave/seal motifs.

---

## INDEX

**Root**
- `styles.css` — global entry point (import list only). Consumers link this.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill manifest for download/Claude Code use.

**`tokens/`** — `fonts.css` (Esther @font-face + Google import), `colors.css`, `typography.css`, `spacing.css`, `effects.css` (radii/shadows/wave/scrims/motion), `base.css` (element defaults + `.plp-display`, `.plp-stack`, `.plp-eyebrow`, `.plp-container`, `.plp-palm-bg`, `.plp-wave`).

**`components/`** (React primitives, namespace `window.PlazaParaSoDesignSystem_05e44a`)
- `core/` — **Button**, **Tag**
- `brand/` — **Logo**, **WaveDivider**, **Badge**, **CategoryBar**
- `events/` — **EventLabel**, **EventCard**

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the Design System tab.

**`ui_kits/website/`** — interactive recreation of plazaparaiso.com.

**`templates/`** — `cartel/` (single-event square poster) and `lineup/` (full line-up poster) starting folders.

**`assets/`** — `logos/` (cream/navy/orange cuts), `fonts/Esther.otf`, `imagery/` (carteles + `photos/` clean crops).
