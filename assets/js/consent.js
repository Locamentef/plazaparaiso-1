/* ============================================================
   Plaza Paraíso · Banner de consentimiento de cookies (RGPD)
   Bloquea Google Analytics y Meta Pixel hasta que el usuario
   acepte. Al aceptar, dispara `pp:consent-granted` para que
   tracking.js cargue la analítica. La decisión se guarda en
   localStorage ('pp_consent' = granted | denied) y se puede
   cambiar con el botón flotante "Cookies".
   ============================================================ */
(function () {
  var KEY = 'pp_consent';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function injectStyles() {
    if (document.getElementById('pp-consent-styles')) return;
    var css = ''
      + '.pp-consent{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;width:min(680px,calc(100vw - 28px));'
      + 'background:var(--navy,#1b2240);color:var(--cream,#f7ead5);border-radius:18px;box-shadow:0 18px 50px rgba(0,0,0,.45);'
      + 'padding:20px 22px;display:flex;flex-direction:column;gap:14px;font-family:inherit;animation:pp-consent-in .35s ease}'
      + '@keyframes pp-consent-in{from{opacity:0;transform:translate(-50%,14px)}to{opacity:1;transform:translate(-50%,0)}}'
      + '.pp-consent__title{font-weight:800;font-size:1.02rem;letter-spacing:.01em}'
      + '.pp-consent__text{font-size:.86rem;line-height:1.5;color:rgba(247,234,213,.82);text-wrap:pretty}'
      + '.pp-consent__text a{color:var(--amber,#fabd49);text-decoration:underline;text-underline-offset:2px}'
      + '.pp-consent__row{display:flex;flex-wrap:wrap;gap:10px;align-items:center;justify-content:flex-end}'
      + '.pp-consent__btn{appearance:none;border:0;cursor:pointer;font:inherit;font-weight:800;text-transform:uppercase;letter-spacing:.04em;'
      + 'font-size:.78rem;padding:11px 20px;border-radius:999px;min-height:44px;transition:transform .12s ease,background .15s ease,color .15s ease}'
      + '.pp-consent__btn:active{transform:scale(.96)}'
      + '.pp-consent__btn--accept{background:var(--orange,#ef7f11);color:#fff}'
      + '.pp-consent__btn--accept:hover{background:#d96f06}'
      + '.pp-consent__btn--reject{background:transparent;color:var(--cream,#f7ead5);box-shadow:inset 0 0 0 2px rgba(247,234,213,.35)}'
      + '.pp-consent__btn--reject:hover{box-shadow:inset 0 0 0 2px rgba(247,234,213,.7)}'
      + '.pp-consent__reopen{position:fixed;left:16px;bottom:16px;z-index:9998;background:var(--navy,#1b2240);color:var(--cream,#f7ead5);'
      + 'border:0;cursor:pointer;font:inherit;font-weight:700;font-size:.72rem;text-transform:uppercase;letter-spacing:.06em;'
      + 'padding:9px 14px;border-radius:999px;box-shadow:0 6px 18px rgba(0,0,0,.3);opacity:.65;transition:opacity .15s ease}'
      + '.pp-consent__reopen:hover{opacity:1}'
      + '@media(min-width:560px){.pp-consent{flex-direction:row;align-items:center;gap:20px}.pp-consent__main{flex:1}.pp-consent__row{flex:0 0 auto}}';
    var s = document.createElement('style');
    s.id = 'pp-consent-styles';
    s.textContent = css;
    document.head.appendChild(s);
  }

  function grant() { set('granted'); try { window.dispatchEvent(new Event('pp:consent-granted')); } catch (e) {} close(); showReopen(); }
  function deny()  { set('denied'); close(); showReopen(); }

  function close() {
    var el = document.getElementById('pp-consent');
    if (el) el.remove();
  }

  function showReopen() {
    if (document.getElementById('pp-consent-reopen')) return;
    var b = document.createElement('button');
    b.id = 'pp-consent-reopen';
    b.type = 'button';
    b.className = 'pp-consent__reopen notranslate';
    b.textContent = 'Cookies';
    b.setAttribute('aria-label', 'Gestionar cookies');
    b.addEventListener('click', function () { b.remove(); showBanner(); });
    document.body.appendChild(b);
  }

  function showBanner() {
    if (document.getElementById('pp-consent')) return;
    injectStyles();
    var el = document.createElement('div');
    el.id = 'pp-consent';
    el.className = 'pp-consent notranslate';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-label', 'Consentimiento de cookies');
    el.translate = false;
    el.innerHTML =
      '<div class="pp-consent__main">'
      + '<div class="pp-consent__title">Tu privacidad</div>'
      + '<p class="pp-consent__text">Usamos cookies propias y de terceros para medir el tráfico y mejorar nuestra publicidad '
      + '(Google Analytics y Meta Pixel). Puedes aceptarlas o rechazarlas. Más info en nuestra '
      + '<a href="cookies.html">política de cookies</a>.</p>'
      + '</div>'
      + '<div class="pp-consent__row">'
      + '<button type="button" class="pp-consent__btn pp-consent__btn--reject" id="pp-consent-reject">Rechazar</button>'
      + '<button type="button" class="pp-consent__btn pp-consent__btn--accept" id="pp-consent-accept">Aceptar</button>'
      + '</div>';
    document.body.appendChild(el);
    document.getElementById('pp-consent-accept').addEventListener('click', grant);
    document.getElementById('pp-consent-reject').addEventListener('click', deny);
  }

  function init() {
    var choice = get();
    if (choice === 'granted') { showReopen(); }       // ya aceptó: tracking.js carga solo
    else if (choice === 'denied') { showReopen(); }    // ya rechazó: solo botón para cambiar
    else { showBanner(); }                             // primera visita
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
