/* ============================================================
   Plaza Paraíso · Botón flotante de WhatsApp con selector de evento
   Número: +34 617 07 87 28
   No cargar en furor.html (tiene su propio botón).
   ============================================================ */
(function () {
  'use strict';

  var PHONE = '34617078728';
  var EVENTS = [
    { id: 'bresh',          label: 'Bresh',                  emoji: '🎉' },
    { id: 'loco-bongo',     label: 'Loco Bongo',             emoji: '🥁' },
    { id: 'furor',          label: 'Furor The Show',         emoji: '🌟' },
    { id: 'little-italy',   label: 'Little Italy Gastrofest',emoji: '🍝' },
    { id: 'general',        label: 'Otra pregunta / General',emoji: '💬' }
  ];

  /* Auto-detectar evento de la página actual */
  function detectCurrentEvent() {
    var bodyEvent = document.body && document.body.getAttribute('data-event-name');
    if (!bodyEvent) return null;
    var name = bodyEvent.toLowerCase();
    for (var i = 0; i < EVENTS.length; i++) {
      if (name.indexOf(EVENTS[i].id.replace(/-/g, ' ').replace('op. ', '')) > -1 ||
          name.indexOf(EVENTS[i].id) > -1 ||
          EVENTS[i].label.toLowerCase().indexOf(name) > -1) {
        return EVENTS[i];
      }
    }
    return null;
  }

  /* Generar URL de WhatsApp */
  function waUrl(eventLabel) {
    var msg;
    if (eventLabel === 'Otra pregunta / General') {
      msg = 'Hola! Tengo una pregunta sobre Plaza Paraíso Torremolinos.';
    } else {
      msg = 'Hola! Tengo una pregunta sobre ' + eventLabel + ' en Plaza Paraíso Torremolinos.';
    }
    return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(msg);
  }

  /* ── Estilos ─────────────────────────────────────────── */
  var css = [
    '.pp-wa{position:fixed;bottom:22px;right:22px;z-index:9990;display:flex;flex-direction:column;align-items:flex-end;gap:12px;font-family:inherit}',

    /* Botón */
    '.pp-wa__btn{width:58px;height:58px;border-radius:50%;background:#25d366;color:#fff;border:0;cursor:pointer;',
    'display:flex;align-items:center;justify-content:center;',
    'box-shadow:0 6px 24px rgba(0,0,0,.28);',
    'transition:transform .18s ease,background .18s ease;',
    'position:relative;}',
    '.pp-wa__btn:hover{background:#1ebe57;transform:scale(1.07);}',
    '.pp-wa__btn:active{transform:scale(.95);}',
    '.pp-wa__btn svg{width:30px;height:30px;flex-shrink:0;}',

    /* Etiqueta */
    '.pp-wa__label{position:absolute;right:68px;top:50%;transform:translateY(-50%);',
    'background:var(--navy,#1b2240);color:var(--cream,#f7ead5);',
    'font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;',
    'padding:7px 13px;border-radius:999px;box-shadow:0 4px 14px rgba(0,0,0,.22);',
    'pointer-events:none;',
    'opacity:0;transition:opacity .2s ease;}',
    '.pp-wa__btn:hover .pp-wa__label,.pp-wa__btn:focus .pp-wa__label{opacity:1;}',

    /* Popup */
    '.pp-wa__popup{width:min(300px,calc(100vw - 28px));',
    'background:var(--navy,#1b2240);color:var(--cream,#f7ead5);',
    'border-radius:16px;box-shadow:0 16px 48px rgba(0,0,0,.4);',
    'overflow:hidden;',
    'transform-origin:bottom right;',
    'transition:opacity .2s ease,transform .2s ease;}',
    '.pp-wa__popup[hidden]{display:none;}',
    '.pp-wa__popup--entering{opacity:0;transform:scale(.92) translateY(8px);}',

    /* Cabecera popup */
    '.pp-wa__popup-head{background:rgba(255,255,255,.06);',
    'padding:14px 16px 12px;',
    'display:flex;align-items:center;justify-content:space-between;gap:8px;}',
    '.pp-wa__popup-title{font-size:.82rem;font-weight:800;text-transform:uppercase;',
    'letter-spacing:.06em;color:var(--amber,#fabd49);line-height:1.2;}',
    '.pp-wa__popup-close{background:none;border:0;cursor:pointer;color:rgba(247,234,213,.5);',
    'padding:4px;border-radius:6px;display:flex;transition:color .15s;}',
    '.pp-wa__popup-close:hover{color:var(--cream,#f7ead5);}',
    '.pp-wa__popup-close svg{width:16px;height:16px;}',

    /* Lista de eventos */
    '.pp-wa__events{padding:8px;display:flex;flex-direction:column;gap:2px;}',
    '.pp-wa__event{display:flex;align-items:center;gap:10px;',
    'padding:10px 12px;border-radius:10px;border:0;cursor:pointer;',
    'background:none;color:var(--cream,#f7ead5);',
    'font-family:inherit;font-size:.85rem;font-weight:600;text-align:left;',
    'transition:background .15s ease,color .15s ease;width:100%;}',
    '.pp-wa__event:hover{background:var(--orange,#ef7f11);color:#fff;}',
    '.pp-wa__event--active{background:rgba(239,127,17,.18);color:var(--amber,#fabd49);}',
    '.pp-wa__event-emoji{font-size:1rem;flex-shrink:0;width:22px;text-align:center;}',
    '.pp-wa__event-name{flex:1;}'
  ].join('');

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ── HTML ────────────────────────────────────────────── */
  var currentEvent = detectCurrentEvent();

  var eventsHtml = EVENTS.map(function (ev) {
    var isActive = currentEvent && currentEvent.id === ev.id ? ' pp-wa__event--active' : '';
    return '<button type="button" class="pp-wa__event' + isActive + '" data-id="' + ev.id + '" data-label="' + ev.label + '">'
      + '<span class="pp-wa__event-emoji" aria-hidden="true">' + ev.emoji + '</span>'
      + '<span class="pp-wa__event-name">' + ev.label + '</span>'
      + '</button>';
  }).join('');

  var wrap = document.createElement('div');
  wrap.className = 'pp-wa';
  wrap.setAttribute('role', 'region');
  wrap.setAttribute('aria-label', 'Contactar por WhatsApp');
  wrap.innerHTML =
    '<div class="pp-wa__popup" hidden id="pp-wa-popup" role="dialog" aria-label="Elige un evento">'
      + '<div class="pp-wa__popup-head">'
        + '<span class="pp-wa__popup-title">¿Sobre qué evento<br>tienes una duda?</span>'
        + '<button type="button" class="pp-wa__popup-close" aria-label="Cerrar">'
          + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>'
        + '</button>'
      + '</div>'
      + '<div class="pp-wa__events">' + eventsHtml + '</div>'
    + '</div>'
    + '<button type="button" class="pp-wa__btn" id="pp-wa-toggle" aria-expanded="false" aria-controls="pp-wa-popup" aria-label="Contactar por WhatsApp">'
      + '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>'
      + '<span class="pp-wa__label">¿Tienes alguna duda?</span>'
    + '</button>';

  document.body.appendChild(wrap);

  /* ── Lógica ──────────────────────────────────────────── */
  var popup  = document.getElementById('pp-wa-popup');
  var toggle = document.getElementById('pp-wa-toggle');

  function openPopup() {
    popup.removeAttribute('hidden');
    popup.classList.add('pp-wa__popup--entering');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        popup.classList.remove('pp-wa__popup--entering');
      });
    });
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closePopup() {
    popup.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    if (popup.hasAttribute('hidden')) {
      openPopup();
    } else {
      closePopup();
    }
  });

  popup.querySelector('.pp-wa__popup-close').addEventListener('click', closePopup);

  /* Click en evento → abrir WhatsApp */
  popup.querySelectorAll('.pp-wa__event').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var label = btn.getAttribute('data-label');
      var url = waUrl(label);
      closePopup();
      /* Tracking */
      if (window.dataLayer) {
        window.dataLayer.push({ event: 'whatsapp_open', event_label: label });
      }
      window.open(url, '_blank', 'noopener');
    });
  });

  /* Cerrar al hacer clic fuera */
  document.addEventListener('click', function (e) {
    if (!popup.hasAttribute('hidden') && !wrap.contains(e.target)) {
      closePopup();
    }
  });

  /* Cerrar con Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !popup.hasAttribute('hidden')) closePopup();
  });

})();
