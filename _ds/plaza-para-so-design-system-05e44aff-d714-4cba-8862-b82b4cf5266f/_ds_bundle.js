/* @ds-bundle: {"format":3,"namespace":"PlazaParaSoDesignSystem_05e44a","components":[{"name":"Badge","sourcePath":"components/brand/Badge.jsx"},{"name":"CategoryBar","sourcePath":"components/brand/CategoryBar.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"WaveDivider","sourcePath":"components/brand/WaveDivider.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"EventCard","sourcePath":"components/events/EventCard.jsx"},{"name":"EventLabel","sourcePath":"components/events/EventLabel.jsx"}],"sourceHashes":{"components/brand/Badge.jsx":"1f54ee90c4c7","components/brand/CategoryBar.jsx":"7053d652540c","components/brand/Logo.jsx":"62c1bb9d4884","components/brand/WaveDivider.jsx":"824592b51023","components/core/Button.jsx":"a2f2afc76f54","components/core/Tag.jsx":"2562b773bf60","components/events/EventCard.jsx":"5993c8247e81","components/events/EventLabel.jsx":"b91e5dddb296","ui_kits/website/app-data.js":"56e7459f3ea6","ui_kits/website/icons.js":"ab171953e82d","ui_kits/website/sections1.jsx":"e992862a33fd","ui_kits/website/sections2.jsx":"b37b1d525788"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.PlazaParaSoDesignSystem_05e44a = window.PlazaParaSoDesignSystem_05e44a || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Seal / date badge. Two shapes from the posters:
 *  · "burst"  — orange starburst seal, e.g. "¡AL AIRE LIBRE!"
 *  · "circle" — solid disc, e.g. the red "DEL 25 JUL AL 13 SEP" date stamp
 */
function Badge({
  shape = 'burst',
  color = 'orange',
  size = 120,
  rotate = -8,
  children,
  style,
  ...rest
}) {
  const fills = {
    orange: {
      bg: 'var(--plp-orange)',
      fg: '#fff'
    },
    red: {
      bg: 'var(--plp-red)',
      fg: '#fff'
    },
    navy: {
      bg: 'var(--plp-navy-800)',
      fg: 'var(--plp-cream-100)'
    },
    amber: {
      bg: 'var(--plp-amber)',
      fg: 'var(--plp-navy-900)'
    }
  };
  const f = fills[color] || fills.orange;

  // 24-point starburst polygon
  const points = (() => {
    const n = 24,
      cx = 50,
      cy = 50,
      outer = 50,
      inner = 41;
    let pts = [];
    for (let i = 0; i < n * 2; i++) {
      const r = i % 2 === 0 ? outer : inner;
      const a = Math.PI / n * i - Math.PI / 2;
      pts.push(`${(cx + r * Math.cos(a)).toFixed(2)}% ${(cy + r * Math.sin(a)).toFixed(2)}%`);
    }
    return pts.join(', ');
  })();
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: size,
      height: size,
      display: 'grid',
      placeItems: 'center',
      textAlign: 'center',
      background: f.bg,
      color: f.fg,
      borderRadius: shape === 'circle' ? '50%' : 0,
      clipPath: shape === 'burst' ? `polygon(${points})` : 'none',
      transform: `rotate(${rotate}deg)`,
      fontFamily: 'var(--font-sans)',
      fontWeight: 900,
      textTransform: 'uppercase',
      lineHeight: 1.05,
      letterSpacing: '0.02em',
      padding: shape === 'burst' ? '18%' : '12%',
      fontSize: `calc(${size}px * 0.14)`,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      transform: `rotate(${-rotate}deg)`
    }
  }, children));
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Badge.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Plaza Paraíso wordmark.
 *  · "compact" (default): the typeset "Pl.Paraíso" lockup in Esther — asset-free,
 *    used in every category bar.
 *  · "full": the full stacked wordmark PNG (pass `src`; three colour cuts ship
 *    in assets/logos/). Falls back to compact if no src given.
 */
function Logo({
  variant = 'compact',
  color = 'navy',
  src,
  height,
  style,
  ...rest
}) {
  const inks = {
    navy: 'var(--plp-navy-800)',
    cream: 'var(--plp-cream-100)',
    orange: 'var(--plp-orange)',
    red: 'var(--plp-red)',
    white: '#ffffff'
  };
  const ink = inks[color] || inks.navy;
  if (variant === 'full' && src) {
    return /*#__PURE__*/React.createElement("img", _extends({
      src: src,
      alt: "Plaza Para\xEDso",
      style: {
        height: height || '64px',
        width: 'auto',
        display: 'block',
        ...style
      }
    }, rest));
  }

  // Compact typeset lockup
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-label": "Plaza Para\xEDso",
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      color: ink,
      fontSize: height ? `calc(${typeof height === 'number' ? height + 'px' : height} * 0.62)` : '1.9rem',
      lineHeight: 1,
      letterSpacing: '0.005em',
      whiteSpace: 'nowrap',
      display: 'inline-block',
      ...style
    }
  }, rest), "Pl.Para\xEDso");
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/CategoryBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The poster header band — compact wordmark · category word · date+place.
 * Colour-coded per programme strand exactly as the printed carteles.
 */
function CategoryBar({
  category = 'musica',
  label,
  dates = 'Del 25 Jul al 13 Sep',
  place = 'Plaza de Toros · Torremolinos',
  style,
  ...rest
}) {
  const schemes = {
    musica: {
      bg: 'var(--plp-amber)',
      word: 'var(--plp-red)',
      ink: 'var(--plp-navy-900)',
      logo: 'navy'
    },
    teatro: {
      bg: 'var(--plp-navy-800)',
      word: 'var(--plp-orange)',
      ink: 'var(--plp-cream-100)',
      logo: 'cream'
    },
    gastro: {
      bg: 'var(--plp-red)',
      word: 'var(--plp-amber)',
      ink: '#fff',
      logo: 'cream'
    },
    ocio: {
      bg: 'var(--plp-orange)',
      word: 'var(--plp-cream-50)',
      ink: 'var(--plp-navy-900)',
      logo: 'navy'
    }
  };
  const labels = {
    musica: 'Música',
    teatro: 'Teatro',
    gastro: 'Gastro',
    ocio: 'Ocio'
  };
  const s = schemes[category] || schemes.musica;
  return /*#__PURE__*/React.createElement("header", _extends({
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr auto 1fr',
      alignItems: 'center',
      gap: '1rem',
      background: s.bg,
      color: s.ink,
      padding: '0.85rem clamp(1rem, 3vw, 2.2rem)',
      minHeight: 'var(--bar-h)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: 'start'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    color: s.logo,
    height: 46
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.03em',
      color: s.word,
      fontSize: 'clamp(1.6rem, 4vw, 2.6rem)',
      lineHeight: 1
    }
  }, label || labels[category]), /*#__PURE__*/React.createElement("div", {
    style: {
      justifySelf: 'end',
      textAlign: 'right',
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.02em',
      fontSize: 'clamp(0.7rem, 1.4vw, 0.95rem)',
      lineHeight: 1.25,
      color: s.ink
    }
  }, /*#__PURE__*/React.createElement("div", null, dates), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.3rem',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7.4.4 1 .4 1.4 0C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8zm0 11a3 3 0 110-6 3 3 0 010 6z"
  })), place)));
}
Object.assign(__ds_scope, { CategoryBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/CategoryBar.jsx", error: String((e && e.message) || e) }); }

// components/brand/WaveDivider.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The signature torn-paper sea-edge divider — layered Mediterranean
 * blue bands with a scalloped crest. Place between full-bleed sections.
 * Flip to point the crest upward.
 */
function WaveDivider({
  flip = false,
  height = 56,
  palette,
  background = 'transparent',
  style,
  ...rest
}) {
  const bands = palette || ['var(--plp-wave-foam)', 'var(--plp-wave-bright)', 'var(--plp-wave-mid)', 'var(--plp-wave-deep)'];
  return /*#__PURE__*/React.createElement("div", _extends({
    "aria-hidden": "true",
    style: {
      width: '100%',
      height,
      lineHeight: 0,
      background,
      transform: flip ? 'scaleY(-1)' : 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 1200 80",
    preserveAspectRatio: "none",
    width: "100%",
    height: "100%",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,30 Q30,8 60,30 T120,30 T180,30 T240,30 T300,30 T360,30 T420,30 T480,30 T540,30 T600,30 T660,30 T720,30 T780,30 T840,30 T900,30 T960,30 T1020,30 T1080,30 T1140,30 T1200,30 V80 H0 Z",
    fill: bands[0]
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0,44 Q30,24 60,44 T120,44 T180,44 T240,44 T300,44 T360,44 T420,44 T480,44 T540,44 T600,44 T660,44 T720,44 T780,44 T840,44 T900,44 T960,44 T1020,44 T1080,44 T1140,44 T1200,44 V80 H0 Z",
    fill: bands[1]
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0,56 Q30,40 60,56 T120,56 T180,56 T240,56 T300,56 T360,56 T420,56 T480,56 T540,56 T600,56 T660,56 T720,56 T780,56 T840,56 T900,56 T960,56 T1020,56 T1080,56 T1140,56 T1200,56 V80 H0 Z",
    fill: bands[2]
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0,68 Q30,56 60,68 T120,68 T180,68 T240,68 T300,68 T360,68 T420,68 T480,68 T540,68 T600,68 T660,68 T720,68 T780,68 T840,68 T900,68 T960,68 T1020,68 T1080,68 T1140,68 T1200,68 V80 H0 Z",
    fill: bands[3]
  })));
}
Object.assign(__ds_scope, { WaveDivider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/WaveDivider.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Plaza Paraíso primary action control.
 * Pill-shaped, uppercase, heavy Montserrat — the festival's ticket/CTA voice.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  iconRight,
  iconLeft,
  fullWidth = false,
  disabled = false,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: '0.8125rem',
      padding: '0.5rem 1.1rem',
      minHeight: 38
    },
    md: {
      fontSize: '0.9375rem',
      padding: '0.75rem 1.6rem',
      minHeight: 46
    },
    lg: {
      fontSize: '1.0625rem',
      padding: '1rem 2.2rem',
      minHeight: 56
    }
  };
  const variants = {
    primary: {
      background: 'var(--plp-orange)',
      color: '#fff',
      border: '2px solid transparent',
      '--hover-bg': 'var(--plp-orange-600)'
    },
    secondary: {
      background: 'var(--plp-navy-800)',
      color: 'var(--plp-cream-100)',
      border: '2px solid transparent',
      '--hover-bg': 'var(--plp-navy-700)'
    },
    red: {
      background: 'var(--plp-red)',
      color: '#fff',
      border: '2px solid transparent',
      '--hover-bg': 'var(--plp-red-700)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--plp-navy-800)',
      border: '2px solid var(--plp-navy-800)',
      '--hover-bg': 'var(--plp-navy-800)',
      '--hover-fg': 'var(--plp-cream-100)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--plp-navy-800)',
      border: '2px solid transparent',
      '--hover-bg': 'rgba(27,34,64,0.08)'
    }
  };
  const v = variants[variant] || variants.primary;
  const Comp = as;
  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontFamily: 'var(--font-sans)',
    fontWeight: 800,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    borderRadius: 'var(--radius-pill)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), transform var(--dur-fast) var(--ease-out)',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    lineHeight: 1,
    ...sizes[size],
    ...v,
    ...style
  };
  const onEnter = e => {
    if (disabled) return;
    const el = e.currentTarget;
    el.style.background = v['--hover-bg'] || el.style.background;
    if (v['--hover-fg']) el.style.color = v['--hover-fg'];
  };
  const onLeave = e => {
    if (disabled) return;
    const el = e.currentTarget;
    el.style.background = v.background;
    el.style.color = v.color;
    el.style.transform = 'none';
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.transform = 'scale(0.96)';
  };
  const onUp = e => {
    if (!disabled) e.currentTarget.style.transform = 'none';
  };
  return /*#__PURE__*/React.createElement(Comp, _extends({
    style: base,
    disabled: Comp === 'button' ? disabled : undefined,
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onMouseDown: onDown,
    onMouseUp: onUp
  }, rest), iconLeft && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-flex'
    }
  }, iconLeft), children, iconRight && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-flex'
    }
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Small category chip — colour-coded to the four programme strands.
 * Música · Teatro · Gastronomía · Ocio.
 */
function Tag({
  category = 'musica',
  children,
  size = 'md',
  style,
  ...rest
}) {
  const palette = {
    musica: {
      bg: 'var(--plp-amber)',
      fg: 'var(--plp-navy-900)'
    },
    teatro: {
      bg: 'var(--plp-navy-800)',
      fg: 'var(--plp-cream-100)'
    },
    gastro: {
      bg: 'var(--plp-red)',
      fg: '#fff'
    },
    ocio: {
      bg: 'var(--plp-orange)',
      fg: '#fff'
    },
    cream: {
      bg: 'var(--plp-cream-50)',
      fg: 'var(--plp-navy-800)'
    }
  };
  const labels = {
    musica: 'Música',
    teatro: 'Teatro',
    gastro: 'Gastronomía',
    ocio: 'Ocio'
  };
  const p = palette[category] || palette.musica;
  const sizes = {
    sm: {
      fontSize: '0.6875rem',
      padding: '0.25rem 0.6rem'
    },
    md: {
      fontSize: '0.8125rem',
      padding: '0.35rem 0.85rem'
    }
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)',
      background: p.bg,
      color: p.fg,
      lineHeight: 1,
      ...sizes[size],
      ...style
    }
  }, rest), children || labels[category]);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/events/EventLabel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * The floating cream capsule that names an event — navy headline, orange date.
 * The recurring label on every cartel ("BRESH · SÁBADO 12 SEP").
 */
function EventLabel({
  name,
  date,
  kicker,
  align = 'left',
  size = 'md',
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      name: '1.1rem',
      date: '0.8rem',
      pad: '0.6rem 1.1rem'
    },
    md: {
      name: '1.6rem',
      date: '0.95rem',
      pad: '0.8rem 1.5rem'
    },
    lg: {
      name: '2.3rem',
      date: '1.1rem',
      pad: '1rem 2rem'
    }
  };
  const z = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-block',
      background: 'var(--surface-pill)',
      borderRadius: 'var(--radius-pill)',
      padding: z.pad,
      boxShadow: 'var(--shadow-pill)',
      textAlign: align,
      maxWidth: '100%',
      ...style
    }
  }, rest), kicker && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 700,
      fontSize: '0.7rem',
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
      color: 'var(--plp-navy-500)',
      marginBottom: '0.15rem'
    }
  }, kicker), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '0.01em',
      lineHeight: 0.98,
      color: 'var(--plp-navy-800)',
      fontSize: z.name
    }
  }, name), date && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '0.03em',
      color: 'var(--plp-orange)',
      fontSize: z.date,
      marginTop: '0.2rem'
    }
  }, date));
}
Object.assign(__ds_scope, { EventLabel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/events/EventLabel.jsx", error: String((e && e.message) || e) }); }

// components/events/EventCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Full-bleed event card — programme photography under a floating EventLabel,
 * with an optional category Tag and a wave foot. The website's programme tile.
 */
function EventCard({
  image,
  name,
  date,
  kicker,
  category,
  href,
  ratio = '3 / 4',
  showWave = true,
  style,
  ...rest
}) {
  const Wrap = href ? 'a' : 'div';
  return /*#__PURE__*/React.createElement(Wrap, _extends({
    href: href,
    style: {
      position: 'relative',
      display: 'block',
      aspectRatio: ratio,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      background: 'var(--plp-navy-900)',
      boxShadow: 'var(--shadow-md)',
      textDecoration: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: name,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-bottom)'
    }
  }), category && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '1rem',
      left: '1rem'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    category: category
  })), showWave && /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 400 28",
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '4.5rem',
      width: '100%',
      height: 26,
      display: 'block'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,14 Q20,2 40,14 T80,14 T120,14 T160,14 T200,14 T240,14 T280,14 T320,14 T360,14 T400,14 V28 H0 Z",
    fill: "var(--plp-wave-mid)",
    opacity: "0.9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M0,20 Q20,10 40,20 T80,20 T120,20 T160,20 T200,20 T240,20 T280,20 T320,20 T360,20 T400,20 V28 H0 Z",
    fill: "var(--plp-wave-deep)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '1rem',
      right: '1rem',
      bottom: '1rem'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.EventLabel, {
    name: name,
    date: date,
    kicker: kicker,
    size: "md"
  })));
}
Object.assign(__ds_scope, { EventCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/events/EventCard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/app-data.js
try { (() => {
/* Plaza Paraíso — website content model (real programme, Torremolinos 2026) */
window.PLP_DATA = {
  meta: {
    dates: 'Del 25 Jul al 13 Sep',
    place: 'Plaza de Toros · Torremolinos',
    url: 'plazaparaiso.com',
    tagline: 'El punto de encuentro del verano',
    intro: 'Este verano 2026, la Plaza de Toros de Torremolinos se transforma en el gran punto de encuentro de la cultura: música, teatro, gastronomía y ocio en un entorno único al aire libre.'
  },
  events: [{
    id: 'laura',
    name: 'Laura Gallego',
    date: 'Vie 7 Ago',
    cat: 'musica',
    photo: 'laura',
    kicker: 'Concierto',
    price: '28€'
  }, {
    id: 'bresh',
    name: 'Bresh',
    date: 'Sáb 12 Sep',
    cat: 'musica',
    photo: 'bresh',
    kicker: 'La fiesta más linda',
    price: '22€'
  }, {
    id: 'locobongo',
    name: 'Loco Bongo',
    date: 'Todos los sábados',
    cat: 'ocio',
    photo: 'locobongo',
    kicker: 'Y especiales',
    price: '20€'
  }, {
    id: 'pilardos',
    name: 'Las Pilardos',
    date: 'Vie 21 Ago',
    cat: 'teatro',
    photo: 'pilardos',
    kicker: 'Operación Marbella',
    price: '18€'
  }, {
    id: 'furor',
    name: 'Furor The Show',
    date: 'Domingos de agosto',
    cat: 'ocio',
    photo: 'furor',
    kicker: 'con Alonso Caparrós',
    price: '18€'
  }, {
    id: 'sigue',
    name: 'Sigue la Luz',
    date: 'Jue 13 Ago',
    cat: 'teatro',
    photo: 'sigue',
    kicker: 'Xenon Spain y Paca la Piraña',
    price: '18€'
  }, {
    id: 'little',
    name: 'Little Italy',
    date: 'Jue 27 · Vie 28 Ago',
    cat: 'gastro',
    photo: 'littleitaly',
    kicker: 'Italia Gastrofest',
    price: 'Entrada libre'
  }],
  strands: [{
    cat: 'musica',
    title: 'Música',
    text: 'La música toma el escenario con una programación en directo para todos los gustos. Desde grandes artistas hasta propuestas emergentes, noches llenas de energía, ritmo y buen ambiente.'
  }, {
    cat: 'teatro',
    title: 'Teatro',
    text: 'Historias que emocionan, sorprenden y hacen reír. Una cuidada selección de espectáculos para todos los públicos: comedia, show y propuestas escénicas únicas al aire libre.'
  }, {
    cat: 'gastro',
    title: 'Gastronomía',
    text: 'Una selección de propuestas para todos los gustos: desde opciones informales hasta experiencias más especiales. Sabores, ambiente y buen rollo para compartir, descubrir y repetir.'
  }, {
    cat: 'ocio',
    title: 'Ocio',
    text: 'Mucho más que cultura. El punto de encuentro del verano: gastronomía, ambiente, actividades y planes para disfrutar con amigos, en pareja o en familia.'
  }],
  fechas: [{
    d: 'Sáb 25 Jul',
    e: 'Loco Bongo',
    cat: 'ocio'
  }, {
    d: 'Sáb 01 Ago',
    e: 'Loco Bongo',
    cat: 'ocio'
  }, {
    d: 'Dom 02 Ago',
    e: 'Furor The Show',
    cat: 'ocio'
  }, {
    d: 'Vie 07 Ago',
    e: 'Laura Gallego',
    cat: 'musica'
  }, {
    d: 'Dom 09 Ago',
    e: 'Furor The Show',
    cat: 'ocio'
  }, {
    d: 'Jue 13 Ago',
    e: 'Sigue la Luz',
    cat: 'teatro'
  }, {
    d: 'Sáb 15 Ago',
    e: 'Loco Bongo',
    cat: 'ocio'
  }, {
    d: 'Dom 16 Ago',
    e: 'Furor The Show',
    cat: 'ocio'
  }, {
    d: 'Vie 21 Ago',
    e: 'Las Pilardos · Operación Marbella',
    cat: 'teatro'
  }, {
    d: 'Jue 27 Ago',
    e: 'Little Italy · Gastrofest',
    cat: 'gastro'
  }, {
    d: 'Vie 28 Ago',
    e: 'Little Italy · Gastrofest',
    cat: 'gastro'
  }, {
    d: 'Sáb 12 Sep',
    e: 'Bresh',
    cat: 'musica'
  }, {
    d: 'Dom 13 Sep',
    e: 'Loco Bongo · Cierre de verano',
    cat: 'ocio'
  }],
  faqs: [{
    q: '¿Qué es Plaza Paraíso?',
    a: 'Un festival de verano en Torremolinos que reúne conciertos, teatro, gastronomía y ocio en un mismo espacio, con una experiencia cultural y de entretenimiento para todos los públicos.'
  }, {
    q: '¿Cuándo y dónde se celebra?',
    a: 'Del sábado 25 de julio al domingo 13 de septiembre en la Plaza de Toros de Torremolinos, un enclave emblemático que se transforma en un espacio único al aire libre.'
  }, {
    q: '¿A quién está dirigido?',
    a: 'A todos los públicos: desde familias hasta grupos de amigos o visitantes que buscan planes diferentes durante el verano en la Costa del Sol.'
  }, {
    q: '¿Se pueden comprar entradas en taquilla?',
    a: 'Sí, siempre que haya disponibilidad. Muchos eventos cuelgan el cartel de completo, así que recomendamos compra anticipada.'
  }, {
    q: '¿Hay aparcamiento disponible?',
    a: 'Sí, alrededor de la Plaza de Toros encontraréis espacio de sobra para aparcar.'
  }, {
    q: '¿El recinto está adaptado?',
    a: 'Sí, Plaza Paraíso dispone de accesos y espacios adaptados para personas con movilidad reducida.'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/app-data.js", error: String((e && e.message) || e) }); }

// ui_kits/website/icons.js
try { (() => {
/* Minimal icon set — Lucide-derived stroke paths + social glyphs.
   Exposed as window.Icon. Stroke icons inherit currentColor. */
(function () {
  const React = window.React;
  const STROKE = {
    'arrow-right': 'M5 12h14M12 5l7 7-7 7',
    'arrow-up-right': 'M7 17 17 7M7 7h10v10',
    'chevron-down': 'm6 9 6 6 6-6',
    'menu': 'M4 6h16M4 12h16M4 18h16',
    'x': 'M18 6 6 18M6 6l12 12',
    'calendar': 'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
    'ticket': 'M3 9a3 3 0 0 0 0 6v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2zM13 5v14',
    'map-pin': 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z',
    'check': 'M20 6 9 17l-5-5',
    'plus': 'M12 5v14M5 12h14',
    'minus': 'M5 12h14',
    'clock': 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z'
  };
  // filled brand-ish glyphs
  const FILL = {
    'instagram': 'M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2zm0 3.07A6.73 6.73 0 1 0 18.73 12 6.73 6.73 0 0 0 12 5.27zm0 11.1A4.37 4.37 0 1 1 16.37 12 4.37 4.37 0 0 1 12 16.37zm6.99-11.4a1.57 1.57 0 1 1-1.57-1.57 1.57 1.57 0 0 1 1.57 1.57z',
    'facebook': 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z',
    'tiktok': 'M16.5 5.5a4.5 4.5 0 0 0 3.5 1.66V10a7.5 7.5 0 0 1-3.5-.86v5.86a5.5 5.5 0 1 1-5.5-5.5c.2 0 .4 0 .6.03v2.6a2.9 2.9 0 1 0 2 2.77V2.5h2.9c0 .27.03.53.07.78A4.5 4.5 0 0 0 16.5 5.5z'
  };
  function Icon({
    name,
    size = 22,
    stroke = 2,
    style,
    ...rest
  }) {
    if (FILL[name]) {
      return React.createElement('svg', {
        width: size,
        height: size,
        viewBox: '0 0 24 24',
        fill: 'currentColor',
        style,
        'aria-hidden': true,
        ...rest
      }, React.createElement('path', {
        d: FILL[name]
      }));
    }
    const d = STROKE[name];
    return React.createElement('svg', {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: 'currentColor',
      strokeWidth: stroke,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      style,
      'aria-hidden': true,
      ...rest
    }, React.createElement('path', {
      d
    }));
  }
  window.Icon = Icon;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/icons.js", error: String((e && e.message) || e) }); }

// ui_kits/website/sections1.jsx
try { (() => {
/* Plaza Paraíso website — Nav, Hero, Marquee, Programa */
const {
  useState,
  useEffect
} = React;
const DS = window.PlazaParaSoDesignSystem_05e44a;
const Icon = window.Icon;
const D = window.PLP_DATA;
const PHOTO = id => `../../assets/imagery/photos/${id}.jpg`;

/* ----------------------------- NAV ----------------------------- */
function Nav({
  onBuy,
  onNav
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40 || document.querySelector('.plp-scroll')?.scrollTop > 40);
    const sc = document.querySelector('.plp-scroll');
    sc && sc.addEventListener('scroll', h);
    return () => sc && sc.removeEventListener('scroll', h);
  }, []);
  const links = [['Programa', 'programa'], ['Fechas', 'fechas'], ['FAQs', 'faqs'], ['Contacto', 'contacto']];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: scrolled ? 'rgba(27,34,64,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'saturate(140%) blur(8px)' : 'none',
      transition: 'background .3s var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '14px clamp(16px,4vw,40px)'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    onClick: e => {
      e.preventDefault();
      onNav('top');
    }
  }, /*#__PURE__*/React.createElement(DS.Logo, {
    color: "cream",
    height: 34
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 28
    },
    className: "plp-navlinks"
  }, links.map(([l, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    onClick: e => {
      e.preventDefault();
      onNav(id);
    },
    style: {
      color: 'var(--plp-cream-100)',
      fontWeight: 700,
      fontSize: 14,
      letterSpacing: '.03em',
      textTransform: 'uppercase'
    }
  }, l)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center',
      color: 'var(--plp-cream-200)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "facebook",
    size: 18
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 18
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "tiktok",
    size: 18
  })), /*#__PURE__*/React.createElement(DS.Button, {
    size: "sm",
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "ticket",
      size: 16
    }),
    onClick: onBuy
  }, "Entradas")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    className: "plp-burger",
    "aria-label": "Men\xFA",
    style: {
      display: 'none',
      background: 'none',
      border: 'none',
      color: 'var(--plp-cream-100)',
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: open ? 'x' : 'menu',
    size: 26
  }))), open && /*#__PURE__*/React.createElement("div", {
    className: "plp-mobilemenu",
    style: {
      background: 'var(--plp-navy-900)',
      padding: '8px 24px 20px',
      display: 'none',
      flexDirection: 'column',
      gap: 14
    }
  }, links.map(([l, id]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    href: '#' + id,
    onClick: e => {
      e.preventDefault();
      onNav(id);
      setOpen(false);
    },
    style: {
      color: 'var(--plp-cream-100)',
      fontWeight: 700,
      textTransform: 'uppercase',
      fontSize: 15
    }
  }, l)), /*#__PURE__*/React.createElement(DS.Button, {
    size: "sm",
    variant: "primary",
    onClick: () => {
      onBuy();
      setOpen(false);
    }
  }, "Entradas")));
}

/* ----------------------------- MARQUEE ----------------------------- */
function Marquee({
  items,
  color = 'var(--plp-navy-800)',
  bg = 'var(--plp-amber)'
}) {
  const row = items.join('   \u2726   ');
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      color,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '10px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'inline-block',
      animation: 'plp-marq 24s linear infinite',
      fontWeight: 900,
      textTransform: 'uppercase',
      letterSpacing: '.08em',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      paddingInline: 18
    }
  }, row), /*#__PURE__*/React.createElement("span", {
    style: {
      paddingInline: 18
    }
  }, row), /*#__PURE__*/React.createElement("span", {
    style: {
      paddingInline: 18
    }
  }, row)));
}

/* ----------------------------- HERO ----------------------------- */
function Hero({
  onDiscover,
  onBuy
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "plp-palm-bg",
    style: {
      position: 'relative',
      paddingTop: 'clamp(20px,5vw,50px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1000,
      margin: '0 auto',
      padding: '0 24px clamp(28px,5vw,56px)',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--plp-navy-500)',
      fontSize: 13,
      marginBottom: 18
    }
  }, "Torremolinos 2026"), /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logos/plazaparaiso-navy.png",
    alt: "Plaza Para\xEDso",
    style: {
      width: 'min(620px,82%)',
      margin: '0 auto'
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontSize: 'clamp(22px,3.4vw,30px)',
      color: 'var(--plp-navy-700)',
      marginTop: 14
    }
  }, D.meta.tagline), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    }),
    onClick: onBuy
  }, "Consigue tu entrada"), /*#__PURE__*/React.createElement(DS.Button, {
    variant: "outline",
    size: "lg",
    onClick: onDiscover
  }, "Descubre el para\xEDso")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 22,
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 26,
      color: 'var(--plp-navy-700)',
      fontWeight: 700,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 16
  }), D.meta.dates), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 16
  }), D.meta.place))), /*#__PURE__*/React.createElement(Marquee, {
    items: ['Plaza de Toros', 'Torremolinos', 'Al aire libre', 'Música', 'Teatro', 'Gastronomía', 'Ocio']
  }));
}

/* ----------------------------- PROGRAMA ----------------------------- */
function Programa({
  onPick
}) {
  const [filter, setFilter] = useState('all');
  const cats = [['all', 'Todo'], ['musica', 'Música'], ['teatro', 'Teatro'], ['gastro', 'Gastro'], ['ocio', 'Ocio']];
  const list = D.events.filter(e => filter === 'all' || e.cat === filter);
  return /*#__PURE__*/React.createElement("section", {
    id: "programa",
    style: {
      background: 'var(--plp-cream-50)',
      padding: 'clamp(40px,6vw,80px) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "plp-container"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 8,
      fontWeight: 800,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--plp-orange)',
      fontSize: 13
    }
  }, "El cartel"), /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: 'center',
      fontSize: 'clamp(36px,6vw,64px)',
      textTransform: 'uppercase',
      letterSpacing: '.01em',
      marginBottom: 22
    }
  }, "Programa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginBottom: 34
    }
  }, cats.map(([c, l]) => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setFilter(c),
    style: {
      border: '2px solid var(--plp-navy-800)',
      cursor: 'pointer',
      background: filter === c ? 'var(--plp-navy-800)' : 'transparent',
      color: filter === c ? 'var(--plp-cream-100)' : 'var(--plp-navy-800)',
      fontFamily: 'var(--font-sans)',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '.04em',
      fontSize: 13,
      padding: '8px 18px',
      borderRadius: 'var(--radius-pill)',
      transition: 'all .15s var(--ease-out)'
    }
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "plp-prog-grid"
  }, list.map(e => /*#__PURE__*/React.createElement(DS.EventCard, {
    key: e.id,
    image: PHOTO(e.photo),
    category: e.cat,
    name: e.name,
    date: e.date,
    kicker: e.kicker,
    href: "#",
    onClick: ev => {
      ev.preventDefault();
      onPick(e);
    }
  })))));
}
Object.assign(window, {
  Nav,
  Hero,
  Marquee,
  Programa
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections1.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/sections2.jsx
try { (() => {
/* Plaza Paraíso website — Strands, Fechas, Faqs, Footer, TicketSheet */

/* ----------------------------- STRANDS ----------------------------- */
function Strands() {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--plp-navy-900)',
      paddingBottom: 'clamp(40px,6vw,80px)'
    }
  }, /*#__PURE__*/React.createElement(DS.WaveDivider, {
    height: 56,
    background: "var(--plp-cream-50)"
  }), /*#__PURE__*/React.createElement("div", {
    className: "plp-container",
    style: {
      paddingTop: 'clamp(36px,5vw,64px)'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: 'center',
      color: 'var(--plp-cream-100)',
      fontSize: 'clamp(30px,5vw,52px)',
      textTransform: 'uppercase',
      marginBottom: 8
    }
  }, "Cuatro mundos, una plaza"), /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: 'var(--plp-cream-200)',
      maxWidth: 620,
      margin: '0 auto clamp(28px,4vw,48px)',
      fontSize: 17
    }
  }, "M\xFAsica, teatro, gastronom\xEDa y ocio conviven cada noche bajo el cielo de Torremolinos."), /*#__PURE__*/React.createElement("div", {
    className: "plp-strand-grid"
  }, D.strands.map(s => {
    const scheme = {
      musica: 'var(--plp-amber)',
      teatro: 'var(--plp-wave-bright)',
      gastro: 'var(--plp-red)',
      ocio: 'var(--plp-orange)'
    }[s.cat];
    return /*#__PURE__*/React.createElement("article", {
      key: s.cat,
      style: {
        background: 'var(--plp-navy-800)',
        borderRadius: 'var(--radius-lg)',
        padding: '26px 26px 28px',
        borderTop: `5px solid ${scheme}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12
      }
    }, /*#__PURE__*/React.createElement(DS.Tag, {
      category: s.cat
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        color: 'var(--plp-cream-100)',
        fontSize: 28,
        textTransform: 'uppercase',
        marginBottom: 10
      }
    }, s.title), /*#__PURE__*/React.createElement("p", {
      style: {
        color: 'var(--plp-cream-200)',
        fontSize: 15,
        lineHeight: 1.55
      }
    }, s.text));
  }))));
}

/* ----------------------------- FECHAS ----------------------------- */
function Fechas({
  onPick
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "fechas",
    style: {
      background: 'var(--plp-cream-100)',
      padding: 'clamp(40px,6vw,80px) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "plp-container",
    style: {
      maxWidth: 820
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 8,
      fontWeight: 800,
      letterSpacing: '.16em',
      textTransform: 'uppercase',
      color: 'var(--plp-orange)',
      fontSize: 13
    }
  }, "Agenda completa"), /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: 'center',
      fontSize: 'clamp(32px,5vw,56px)',
      textTransform: 'uppercase',
      marginBottom: 30
    }
  }, "Todas las fechas"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, D.fechas.map((f, i) => {
    const dot = {
      musica: 'var(--plp-amber)',
      teatro: 'var(--plp-navy-700)',
      gastro: 'var(--plp-red)',
      ocio: 'var(--plp-orange)'
    }[f.cat];
    return /*#__PURE__*/React.createElement("li", {
      key: i
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => onPick(f),
      style: {
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        alignItems: 'center',
        gap: 16,
        background: 'transparent',
        border: 'none',
        borderBottom: '1px solid var(--surface-line)',
        cursor: 'pointer',
        padding: '15px 6px',
        textAlign: 'left',
        transition: 'background .15s'
      },
      onMouseEnter: e => e.currentTarget.style.background = 'var(--plp-cream-50)',
      onMouseLeave: e => e.currentTarget.style.background = 'transparent'
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 96,
        fontWeight: 800,
        color: 'var(--plp-navy-800)',
        fontSize: 14,
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: 9,
        background: dot,
        flexShrink: 0
      }
    }), f.d), /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        color: 'var(--plp-navy-700)',
        fontSize: 15
      }
    }, f.e), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--plp-orange)',
        fontWeight: 800,
        fontSize: 12,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 5
      }
    }, "Entradas ", /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 14
    }))));
  }))));
}

/* ----------------------------- FAQS ----------------------------- */
function Faqs() {
  const [open, setOpen] = useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "faqs",
    style: {
      background: 'var(--plp-cream-50)',
      padding: 'clamp(40px,6vw,80px) 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "plp-container",
    style: {
      maxWidth: 760
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      textAlign: 'center',
      fontSize: 'clamp(32px,5vw,52px)',
      textTransform: 'uppercase',
      marginBottom: 30
    }
  }, "FAQs"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, D.faqs.map((f, i) => {
    const isOpen = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        background: '#fff',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(isOpen ? -1 : i),
      style: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 14,
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '18px 20px',
        textAlign: 'left',
        fontFamily: 'var(--font-sans)',
        fontWeight: 800,
        fontSize: 16,
        color: 'var(--plp-navy-800)'
      }
    }, f.q, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--plp-orange)',
        flexShrink: 0,
        transform: isOpen ? 'rotate(45deg)' : 'none',
        transition: 'transform .2s var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 20
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        maxHeight: isOpen ? 200 : 0,
        overflow: 'hidden',
        transition: 'max-height .3s var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        padding: '0 20px 18px',
        color: 'var(--plp-navy-500)',
        fontSize: 15,
        lineHeight: 1.55
      }
    }, f.a)));
  }))));
}

/* ----------------------------- FOOTER ----------------------------- */
function Footer({
  onBuy
}) {
  return /*#__PURE__*/React.createElement("footer", {
    id: "contacto",
    style: {
      background: 'var(--plp-navy-900)',
      color: 'var(--plp-cream-200)'
    }
  }, /*#__PURE__*/React.createElement(DS.WaveDivider, {
    height: 52,
    background: "var(--plp-cream-50)"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: 'clamp(40px,5vw,68px) 24px clamp(28px,4vw,40px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontWeight: 900,
      fontSize: 'clamp(26px,4vw,44px)',
      color: 'var(--plp-cream-100)',
      textTransform: 'uppercase',
      letterSpacing: '.02em'
    }
  }, "M\xE1s info ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--plp-amber)'
    }
  }, "plazaparaiso.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    }),
    onClick: onBuy
  }, "Pase Para\xEDso")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      justifyContent: 'center',
      marginTop: 28,
      color: 'var(--plp-cream-100)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "facebook",
    size: 22
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "instagram",
    size: 22
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "tiktok",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      display: 'flex',
      gap: 'clamp(20px,5vw,60px)',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '.06em',
      textTransform: 'uppercase',
      color: 'var(--plp-navy-500)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Organiza \xB7 Locamente \xB7 10 a\xF1os"), /*#__PURE__*/React.createElement("span", null, "Colabora \xB7 Ayuntamiento de Torremolinos")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      fontSize: 12,
      color: 'var(--plp-navy-500)'
    }
  }, "M\xFAsica, Gastronom\xEDa, Teatro y Ocio \xB7 Torremolinos 2026 \xB7 Todos los derechos reservados")));
}

/* ----------------------------- TICKET SHEET ----------------------------- */
function TicketSheet({
  event,
  onClose
}) {
  const [qty, setQty] = useState(2);
  const [done, setDone] = useState(false);
  if (!event) return null;
  const isLibre = (event.price || '').toLowerCase().includes('libre');
  const unit = isLibre ? 0 : parseInt(event.price);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 80,
      background: 'rgba(17,22,44,0.6)',
      backdropFilter: 'blur(4px)',
      display: 'grid',
      placeItems: 'center',
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 'min(440px,100%)',
      background: 'var(--plp-cream-50)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-lg)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height: 150
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: PHOTO(event.photo),
    alt: event.name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'var(--scrim-bottom)'
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar",
    style: {
      position: 'absolute',
      top: 12,
      right: 12,
      background: 'rgba(0,0,0,.4)',
      border: 'none',
      color: '#fff',
      borderRadius: 999,
      width: 34,
      height: 34,
      cursor: 'pointer',
      display: 'grid',
      placeItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 18,
      bottom: 12
    }
  }, /*#__PURE__*/React.createElement(DS.Tag, {
    category: event.cat
  }))), !done ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '20px 22px 24px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 26,
      textTransform: 'uppercase',
      color: 'var(--plp-navy-800)'
    }
  }, event.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      color: 'var(--plp-navy-500)',
      fontWeight: 700,
      fontSize: 13,
      marginTop: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 5,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 15
  }), event.date), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      gap: 5,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    size: 15
  }), "Plaza de Toros")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingTop: 18,
      borderTop: '1px solid var(--surface-line)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 800,
      color: 'var(--plp-navy-800)'
    }
  }, "Entradas"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(q => Math.max(1, q - 1)),
    style: qtyBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "minus",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 900,
      fontSize: 18,
      width: 22,
      textAlign: 'center'
    }
  }, qty), /*#__PURE__*/React.createElement("button", {
    onClick: () => setQty(q => Math.min(8, q + 1)),
    style: qtyBtn
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: 16
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--plp-navy-500)',
      fontWeight: 700,
      fontSize: 14
    }
  }, "Total"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-condensed)',
      fontSize: 34,
      color: 'var(--plp-navy-800)'
    }
  }, isLibre ? 'Gratis' : unit * qty + '€')), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "primary",
    fullWidth: true,
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    }),
    onClick: () => setDone(true)
  }, isLibre ? 'Reservar plaza' : 'Comprar entradas'))) : /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '34px 22px 30px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 64,
      height: 64,
      borderRadius: 999,
      background: 'var(--plp-amber)',
      display: 'grid',
      placeItems: 'center',
      margin: '0 auto 14px',
      color: 'var(--plp-navy-900)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 32
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 24,
      textTransform: 'uppercase',
      color: 'var(--plp-navy-800)'
    }
  }, "\xA1Nos vemos en la plaza!"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: 'var(--plp-navy-500)',
      marginTop: 8,
      fontSize: 15
    }
  }, qty, " ", qty > 1 ? 'entradas' : 'entrada', " \xB7 ", event.name, " \xB7 ", event.date), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(DS.Button, {
    variant: "outline",
    onClick: onClose
  }, "Seguir explorando")))));
}
const qtyBtn = {
  width: 36,
  height: 36,
  borderRadius: 999,
  border: '2px solid var(--plp-navy-800)',
  background: 'transparent',
  color: 'var(--plp-navy-800)',
  cursor: 'pointer',
  display: 'grid',
  placeItems: 'center'
};
Object.assign(window, {
  Strands,
  Fechas,
  Faqs,
  Footer,
  TicketSheet
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/sections2.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.CategoryBar = __ds_scope.CategoryBar;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.WaveDivider = __ds_scope.WaveDivider;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.EventCard = __ds_scope.EventCard;

__ds_ns.EventLabel = __ds_scope.EventLabel;

})();
