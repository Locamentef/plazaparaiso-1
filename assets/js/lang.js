/* ============================================================
   Plaza Paraíso · Selector de idioma (banderas)
   Traduce TODA la página con Google Translate, SIN recargar:
   acciona directamente el <select> oculto del widget, de modo
   que también funciona dentro de la vista previa.
   Idiomas: Español (predeterminado), Inglés, Francés, Alemán.
   La elección se guarda en localStorage y se reaplica al
   cargar cada página.
   ============================================================ */
(function () {
  var STORE_KEY = 'pp_lang';
  var LANGS = [
    { code: 'es', flag: 'es', label: 'Español' },
    { code: 'en', flag: 'gb', label: 'English' },
    { code: 'fr', flag: 'fr', label: 'Français' },
    { code: 'de', flag: 'de', label: 'Deutsch' }
  ];

  function savedLang() {
    try { return localStorage.getItem(STORE_KEY) || 'es'; } catch (e) { return 'es'; }
  }
  function store(lang) {
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) {}
  }

  /* ---- Drive Google's hidden <select> directly (no reload) ---- */
  function applyLang(lang) {
    var combo = document.querySelector('.goog-te-combo');
    if (!combo) return false;
    combo.value = (lang === 'es') ? '' : lang;
    combo.dispatchEvent(new Event('change'));
    // some builds listen on 'input'
    combo.dispatchEvent(new Event('input'));
    return true;
  }

  function applyWhenReady(lang) {
    if (applyLang(lang)) return;
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      if (applyLang(lang) || tries > 60) clearInterval(iv);
    }, 150);
  }

  function setLang(lang) {
    store(lang);
    markActive(lang);
    if (lang === 'es') {
      // Restaurar idioma original: si el widget no puede revertir
      // limpiamente sin recarga, recargamos como respaldo.
      if (!applyLang('es')) {
        clearGoogCookie();
        location.reload();
        return;
      }
      // Forzar restauración del original
      setTimeout(function () {
        var combo = document.querySelector('.goog-te-combo');
        if (combo) { combo.value = ''; combo.dispatchEvent(new Event('change')); }
      }, 50);
    } else {
      applyWhenReady(lang);
    }
  }

  function clearGoogCookie() {
    var host = location.hostname;
    var exp = ';expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    document.cookie = 'googtrans=' + exp;
    document.cookie = 'googtrans=' + exp + ';domain=' + host;
    document.cookie = 'googtrans=' + exp + ';domain=.' + host;
  }

  /* ---- Active flag state ---- */
  function markActive(lang) {
    document.querySelectorAll('.lang-flag').forEach(function (b) {
      var on = b.getAttribute('data-lang') === lang;
      b.classList.toggle('is-active', on);
      if (on) b.setAttribute('aria-current', 'true');
      else b.removeAttribute('aria-current');
    });
  }

  /* ---- Switcher markup ---- */
  function buildSwitcher(current) {
    var wrap = document.createElement('div');
    wrap.className = 'lang-switch notranslate';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Seleccionar idioma');
    wrap.translate = false;
    LANGS.forEach(function (l) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lang-flag' + (l.code === current ? ' is-active' : '');
      b.setAttribute('data-lang', l.code);
      b.setAttribute('aria-label', l.label);
      b.setAttribute('title', l.label);
      if (l.code === current) b.setAttribute('aria-current', 'true');
      var img = document.createElement('img');
      img.src = 'https://flagcdn.com/w40/' + l.flag + '.png';
      img.srcset = 'https://flagcdn.com/w80/' + l.flag + '.png 2x';
      img.width = 22; img.height = 16; img.alt = '';
      img.loading = 'lazy'; img.decoding = 'async';
      b.appendChild(img);
      b.addEventListener('click', function () { setLang(l.code); });
      wrap.appendChild(b);
    });
    return wrap;
  }

  /* ---- Styles ---- */
  function injectStyles() {
    if (document.getElementById('lang-switch-styles')) return;
    var css = ''
      + '.lang-switch{display:inline-flex;align-items:center;gap:6px}'
      + '.lang-flag{padding:2px;margin:0;border:0;background:transparent;cursor:pointer;line-height:0;border-radius:5px;opacity:.5;transition:opacity .15s ease,transform .15s ease}'
      + '.lang-flag:hover{opacity:1;transform:translateY(-1px)}'
      + '.lang-flag:focus-visible{outline:2px solid var(--orange,#ef7f11);outline-offset:2px}'
      + '.lang-flag.is-active{opacity:1}'
      + '.lang-flag.is-active img{box-shadow:0 0 0 2px var(--orange,#ef7f11),0 1px 3px rgba(0,0,0,.35)}'
      + '.lang-flag img{display:block;width:22px;height:16px;border-radius:3px;object-fit:cover;box-shadow:0 1px 3px rgba(0,0,0,.3)}'
      + '.nav__right .lang-switch{display:inline-flex;margin-right:2px;gap:5px}'
      + '@media(max-width:919px){.nav__right{gap:8px}.nav__right .lang-switch{gap:4px;margin-right:0}.nav__right .lang-flag{padding:1px}.nav__right .lang-flag img{width:19px;height:14px}}'
      + '.nav__mobile .lang-switch{justify-content:center;gap:14px;margin-top:14px;padding-top:14px;border-top:1px solid rgba(247,234,213,.18)}'
      + '.nav__mobile .lang-flag{opacity:.7}'
      + '.nav__mobile .lang-flag img{width:34px;height:25px}'
      /* hide Google Translate chrome but keep the widget functional */
      + '.goog-te-banner-frame.skiptranslate,.goog-te-gadget-icon{display:none !important}'
      + 'body{top:0 !important}'
      + '#google_translate_element{position:absolute !important;left:-9999px !important;top:-9999px !important;width:1px;height:1px;overflow:hidden}'
      + '.goog-tooltip,.goog-tooltip:hover{display:none !important}'
      + '.goog-text-highlight{background:none !important;box-shadow:none !important}';
    var s = document.createElement('style');
    s.id = 'lang-switch-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ---- Google Translate bootstrap ---- */
  function loadGoogle() {
    if (document.getElementById('google_translate_element')) return;
    var holder = document.createElement('div');
    holder.id = 'google_translate_element';
    holder.className = 'notranslate';
    document.body.appendChild(holder);

    window.googleTranslateElementInit = function () {
      try {
        new google.translate.TranslateElement({
          pageLanguage: 'es',
          includedLanguages: 'en,fr,de,es',
          autoDisplay: false
        }, 'google_translate_element');
      } catch (e) {}
      // reaplica el idioma guardado una vez creado el combo
      var lang = savedLang();
      if (lang && lang !== 'es') applyWhenReady(lang);
    };
    var sc = document.createElement('script');
    sc.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    sc.async = true;
    sc.onerror = function () { console.warn('[lang] No se pudo cargar Google Translate'); };
    document.body.appendChild(sc);
  }

  /* ---- Init ---- */
  function init() {
    injectStyles();
    var current = savedLang();

    var right = document.querySelector('.nav__right');
    if (right) {
      var sw = buildSwitcher(current);
      var cta = right.querySelector('a.btn');
      var burger = right.querySelector('.nav__burger');
      if (cta) right.insertBefore(sw, cta);
      else if (burger) right.insertBefore(sw, burger);
      else right.appendChild(sw);
    }
    var mobile = document.querySelector('.nav__mobile');
    if (mobile) mobile.appendChild(buildSwitcher(current));

    loadGoogle();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
