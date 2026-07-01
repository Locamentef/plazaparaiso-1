/**
 * fv-modal.js — Fourvenues widget modal
 * Intercepta todos los clicks en enlaces a evento.html y abre el widget
 * de compra de entradas en un overlay modal, sin navegar a otra página.
 * 
 * Uso: <script src="assets/js/fv-modal.js" defer></script>
 * Compatible con todas las landings de Plaza Paraíso.
 */
(function () {
  'use strict';

  /* ── Configuración ─────────────────────────────────────────── */
  var FALLBACK_ORG      = 'locamente';
  var LOCO_BONGO_CODES  = ['MU39','AGRD','3SS6','M97E','4DIB','97ZJ','O70Q','1Z7B','6HGX'];

  /* ── Inyectar estilos del modal ─────────────────────────────── */
  var css = [
    '#fv-modal{display:none;position:fixed;inset:0;z-index:9999;align-items:center;justify-content:center;}',
    '#fv-modal.fv-open{display:flex;}',
    '#fv-backdrop{position:absolute;inset:0;background:rgba(10,14,36,.82);cursor:pointer;}',
    '#fv-panel{',
      'position:relative;z-index:1;',
      'background:#fff;border-radius:20px;',
      'width:min(860px,95vw);max-height:90vh;',
      'overflow-y:auto;overflow-x:hidden;',
      'box-shadow:0 24px 80px rgba(10,14,36,.5);',
    '}',
    '#fv-panel-head{',
      'display:flex;align-items:center;justify-content:space-between;',
      'padding:16px 20px 0;',
    '}',
    '#fv-close{',
      'display:flex;align-items:center;justify-content:center;',
      'width:36px;height:36px;border-radius:50%;border:none;cursor:pointer;',
      'background:#1b2240;color:#fff;font-size:18px;line-height:1;',
      'margin-left:auto;flex-shrink:0;transition:background .15s;',
    '}',
    '#fv-close:hover{background:#ef7f11;}',
    '#fv-widget-wrap{padding:12px 0 20px;min-height:300px;}',
    '#fv-spinner{',
      'display:flex;flex-direction:column;align-items:center;justify-content:center;',
      'gap:14px;padding:60px 20px;',
      'font-family:Montserrat,sans-serif;font-size:.9rem;color:#1b2240;',
    '}',
    '#fv-spinner-ring{',
      'width:40px;height:40px;border-radius:50%;',
      'border:3px solid rgba(27,34,64,.15);border-top-color:#ef7f11;',
      'animation:fv-spin .7s linear infinite;',
    '}',
    '@keyframes fv-spin{to{transform:rotate(360deg)}}',
    'body.fv-body-lock{overflow:hidden;}'
  ].join('');

  var styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── Crear DOM del modal ────────────────────────────────────── */
  var modal = document.createElement('div');
  modal.id   = 'fv-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Comprar entradas');
  modal.innerHTML = [
    '<div id="fv-backdrop"></div>',
    '<div id="fv-panel">',
      '<div id="fv-panel-head">',
        '<button id="fv-close" aria-label="Cerrar">✕</button>',
      '</div>',
      '<div id="fv-widget-wrap">',
        '<div id="fv-spinner">',
          '<div id="fv-spinner-ring"></div>',
          '<span>Cargando entradas…</span>',
        '</div>',
      '</div>',
    '</div>'
  ].join('');

  document.body.appendChild(modal);

  /* ── Helpers ────────────────────────────────────────────────── */
  function getOrgFallback(code) {
    return LOCO_BONGO_CODES.indexOf((code || '').toUpperCase()) !== -1
      ? 'loco-bongo-torremolinos'
      : FALLBACK_ORG;
  }

  var _savedHash = '';

  function openModal(eventHash, orgSlug) {
    _savedHash = window.location.hash;
    if (history.replaceState) {
      history.replaceState(null, '', '#' + eventHash);
    }

    modal.classList.add('fv-open');
    document.body.classList.add('fv-body-lock');

    var wrap = document.getElementById('fv-widget-wrap');

    // En preview (dominio no autorizado) mostrar aviso en lugar de widget vacío
    var host   = window.location.hostname;
    var isProd = host === 'www.plazaparaiso.com' || host === 'plazaparaiso.com';

    if (!isProd) {
      wrap.innerHTML = [
        '<div style="padding:40px 24px;text-align:center;font-family:Montserrat,sans-serif;color:#1b2240;">',
          '<div style="font-size:2.5rem;margin-bottom:12px;">🎟️</div>',
          '<p style="font-weight:700;font-size:1.1rem;margin:0 0 8px;">Widget de entradas</p>',
          '<p style="font-size:.9rem;opacity:.7;margin:0;">',
            'El formulario de compra carga aquí en producción<br>',
            '(<strong>plazaparaiso.com</strong>).',
          '</p>',
        '</div>'
      ].join('');
      return;
    }

    // Producción: cargar el script del widget
    var s = document.createElement('script');
    s.src  = 'https://www.fourvenues.com/assets/iframe/' + orgSlug;
    s.type = 'text/javascript';
    s.onload = function () {
      setTimeout(function () {
        var spinner = document.getElementById('fv-spinner');
        if (spinner) spinner.style.display = 'none';
      }, 400);
    };
    s.onerror = function () {
      wrap.innerHTML = '<div style="padding:40px;text-align:center;font-family:Montserrat,sans-serif;color:#d62828;">No se pudo cargar el widget.</div>';
    };
    wrap.appendChild(s);
  }

  function closeModal() {
    modal.classList.remove('fv-open');
    document.body.classList.remove('fv-body-lock');

    // Restaurar hash original
    if (history.replaceState) {
      history.replaceState(null, '', _savedHash || window.location.pathname + window.location.search);
    }

    // Limpiar widget para que la próxima apertura cargue de nuevo
    var wrap = document.getElementById('fv-widget-wrap');
    wrap.innerHTML = [
      '<div id="fv-spinner">',
        '<div id="fv-spinner-ring"></div>',
        '<span>Cargando entradas…</span>',
      '</div>'
    ].join('');
  }

  /* ── Event listeners del modal ──────────────────────────────── */
  document.getElementById('fv-backdrop').addEventListener('click', closeModal);
  document.getElementById('fv-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('fv-open')) closeModal();
  });

  /* ── Interceptar clicks en links a evento.html ──────────────── */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href*="evento.html"]');
    if (!a) return;

    e.preventDefault();

    var href      = a.getAttribute('href') || '';
    var hashPart  = href.split('#')[1] || '';          // e.g. events/bresh---...-5IVL
    var code      = hashPart.split('/').pop() || '';   // last segment = event code/slug

    // Intentar la API de Channel Manager (solo disponible en Netlify)
    fetch('/api/eventos')
      .then(function (res) {
        if (!res.ok) throw new Error('api-unavailable');
        return res.json();
      })
      .then(function (data) {
        var events = data.events || [];
        var match  = events.find(function (ev) {
          return ev.slug && ev.slug.toUpperCase() === code.toUpperCase();
        });
        var org = (match && match.organizationSlug) ? match.organizationSlug : getOrgFallback(code);
        openModal(hashPart, org);
      })
      .catch(function () {
        // API no disponible en local/preview → fallback estático
        openModal(hashPart, getOrgFallback(code));
      });
  });

})();
