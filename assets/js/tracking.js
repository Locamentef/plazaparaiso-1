/* ============================================================
   Plaza Paraíso · Capa de medición (GA4 + Meta Pixel)
   ------------------------------------------------------------
   PASO ÚNICO DE CONFIGURACIÓN:
   Pega aquí tu ID de Google Analytics 4 y tu ID de Meta Pixel.
   Mientras tengan el valor de ejemplo, NO se carga nada externo
   y los eventos se muestran en la consola (DEBUG) para poder
   comprobarlos. En cuanto pongas los IDs reales, empieza a
   enviar a GA4 y a Meta automáticamente, en TODAS las páginas.
   ============================================================ */
window.PP_TRACK_CONFIG = window.PP_TRACK_CONFIG || {
  GA4_ID:        'G-BHMT2HPE9S',     // ← tu ID de GA4 (Admin → Flujos de datos)
  META_PIXEL_ID: '1715018873258485',  // ← tu ID de Meta Pixel (Eventos → Orígenes de datos)
  GTM_ID:        'GTM-P6BSNSRF',      // ← tu contenedor de Google Tag Manager
  DEBUG:         false               // ← ponlo en false cuando esté en producción
};

(function () {
  var C = window.PP_TRACK_CONFIG;
  var GA_ON  = C.GA4_ID && C.GA4_ID.indexOf('XXXX') === -1;
  var FB_ON  = C.META_PIXEL_ID && C.META_PIXEL_ID.indexOf('XXXX') === -1;
  var GTM_ON = C.GTM_ID && C.GTM_ID.indexOf('XXXX') === -1;
  var DEBUG  = !!C.DEBUG;

  /* ---------- Consentimiento (RGPD) ---------- */
  var loaded = false;
  function hasConsent() { try { return localStorage.getItem('pp_consent') === 'granted'; } catch (e) { return false; } }

  /* ---------- Carga de GA4 + Meta Pixel (SOLO con consentimiento) ---------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  // Consent Mode v2: por defecto denegado hasta que el usuario acepte.
  gtag('consent', 'default', { ad_storage: 'denied', analytics_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', wait_for_update: 500 });

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    if (GTM_ON) {
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
        var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
        j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
        f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', C.GTM_ID);
    }
    if (GA_ON) {
      var ga = document.createElement('script');
      ga.async = true;
      ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + C.GA4_ID;
      document.head.appendChild(ga);
      gtag('js', new Date());
      gtag('consent', 'update', { ad_storage: 'granted', analytics_storage: 'granted', ad_user_data: 'granted', ad_personalization: 'granted' });
      gtag('config', C.GA4_ID, { send_page_view: true });
    }
    if (FB_ON) {
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, 'script', 'https://connect.facebook.net/es_ES/fbevents.js');
      fbq('init', C.META_PIXEL_ID);
      fbq('track', 'PageView');
    }
    log('Analítica cargada (consentimiento OK) · GTM=' + (GTM_ON ? 'ON' : 'OFF'));
    fireViewContent();
  }
  window.ppLoadAnalytics = loadAnalytics;
  window.addEventListener('pp:consent-granted', loadAnalytics);

  /* ---------- Emisores ---------- */
  function ga4(name, params) { if (GA_ON && loaded) try { gtag('event', name, params || {}); } catch (e) {} }
  function meta(name, params, custom) {
    if (!FB_ON || !loaded) return;
    try { custom ? fbq('trackCustom', name, params || {}) : fbq('track', name, params || {}); } catch (e) {}
  }
  function log(label, data) { if (DEBUG) try { console.log('%c[PP-TRACK] ' + label, 'color:#ef7f11;font-weight:bold', data || ''); } catch (e) {} }

  /* API pública por si quieres disparar eventos a mano */
  window.ppTrack = function (gaName, gaParams, fb) {
    ga4(gaName, gaParams);
    if (fb && fb.name) meta(fb.name, fb.params || gaParams, fb.custom);
    log(gaName, gaParams);
  };

  /* ---------- Utilidades ---------- */
  function pageMeta() {
    var b = document.body || {};
    var ev = b.getAttribute && b.getAttribute('data-event-name');
    var cat = null;
    if (b.className) {
      var m = b.className.match(/ev--(\w+)/);
      if (m) cat = ({ musica: 'Música', teatro: 'Teatro', gastro: 'Gastronomía', ocio: 'Ocio' })[m[1]] || m[1];
    }
    return { event: ev, category: cat };
  }
  function priceFromPage() {
    var el = document.querySelector('.buybar__price b, .ev-buy__price');
    if (!el) return null;
    var m = (el.textContent || '').replace(',', '.').match(/(\d+(\.\d+)?)/);
    return m ? parseFloat(m[1]) : null;
  }
  function eventNameFrom(el) {
    var a = el.closest('a');
    if (a) {
      var lab = a.getAttribute('aria-label');
      if (lab) return lab.split('—')[0].split('·')[0].trim();
    }
    return pageMeta().event || document.title;
  }

  /* ---------- ViewContent en páginas de evento ---------- */
  function fireViewContent() {
    var pm = pageMeta();
    if (!pm.event) return;
    var value = priceFromPage();
    var params = {
      content_name: pm.event,
      content_category: pm.category || undefined,
      content_type: 'event',
      currency: 'EUR'
    };
    if (value != null) params.value = value;
    ga4('view_item', {
      currency: 'EUR',
      value: value || undefined,
      items: [{ item_name: pm.event, item_category: pm.category || undefined, price: value || undefined }]
    });
    meta('ViewContent', params);
    log('ViewContent', params);
  }

  /* ---------- Delegación de clics ---------- */
  function classify(a) {
    var href = (a.getAttribute('href') || '').toLowerCase();
    var dt = (a.getAttribute('data-track') || '').toLowerCase();
    if (href.indexOf('fourvenues') > -1 || dt.indexOf('compra') > -1 || dt === 'cta-entradas') return 'checkout';
    if (dt.indexOf('abono') > -1) return 'checkout';
    if (dt.indexOf('evento-') === 0) return 'event';
    if (dt.indexOf('cat-') === 0) return 'category';
    if (href.indexOf('tel:') === 0) return 'phone';
    if (href.indexOf('mailto:') === 0) return 'email';
    if (href.indexOf('wa.me') > -1 || href.indexOf('whatsapp') > -1) return 'whatsapp';
    if (/instagram|facebook|tiktok|youtube|youtu\.be/.test(href)) return 'social';
    if (dt.indexOf('nav-') === 0 || dt.indexOf('newsletter') > -1) return 'nav';
    if (a.target === '_blank' || /^https?:/.test(href) && href.indexOf(location.hostname) === -1) return 'outbound';
    return null;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a, button[data-track]');
    if (!a) return;
    var kind = a.tagName === 'A' ? classify(a) : null;
    var name = eventNameFrom(a);
    var href = a.getAttribute('href') || '';

    switch (kind) {
      case 'checkout': {
        var value = priceFromPage();
        var p = { content_name: name, content_type: 'event', currency: 'EUR' };
        if (value != null) p.value = value;
        meta('InitiateCheckout', p);
        ga4('begin_checkout', { currency: 'EUR', value: value || undefined, items: [{ item_name: name, price: value || undefined }] });
        ga4('select_promotion', { promotion_name: 'Comprar entrada', item_name: name });
        log('InitiateCheckout', p);
        break;
      }
      case 'event':
        meta('ViewContent', { content_name: name, content_type: 'event' });
        ga4('select_content', { content_type: 'event', item_id: name });
        log('select_content (evento)', name); break;
      case 'category':
        ga4('select_content', { content_type: 'category', item_id: a.textContent.trim() });
        meta('Search', { search_string: a.textContent.trim() }, false);
        log('select_content (categoría)', a.textContent.trim()); break;
      case 'phone':
        meta('Contact', { method: 'phone' }); ga4('contact', { method: 'phone' }); log('Contact (teléfono)'); break;
      case 'email':
        meta('Contact', { method: 'email' }); ga4('contact', { method: 'email' }); log('Contact (email)'); break;
      case 'whatsapp':
        meta('Contact', { method: 'whatsapp' }); ga4('contact', { method: 'whatsapp' }); log('Contact (WhatsApp)'); break;
      case 'social':
        ga4('social_click', { network: href }); meta('SocialClick', { url: href }, true); log('social_click', href); break;
      case 'nav':
        ga4('navigation', { link_text: (a.textContent || '').trim().slice(0, 40), link_url: href }); break;
      case 'outbound':
        ga4('outbound_click', { link_url: href }); log('outbound_click', href); break;
    }
  }, true);

  /* ---------- Newsletter ---------- */
  function bindForms() {
    var f = document.getElementById('form-newsletter');
    if (f && !f.__ppBound) {
      f.__ppBound = true;
      f.addEventListener('submit', function () {
        meta('Lead', { content_name: 'Newsletter' });
        meta('Subscribe', { content_name: 'Newsletter' });
        ga4('generate_lead', { method: 'newsletter' });
        ga4('sign_up', { method: 'newsletter' });
        log('Lead / Subscribe (newsletter)');
      });
    }
    var cf = document.getElementById('form-contacto') || document.querySelector('form[action*="web3forms"]:not(#form-newsletter)');
    if (cf && !cf.__ppBound) {
      cf.__ppBound = true;
      cf.addEventListener('submit', function () {
        meta('Lead', { content_name: 'Contacto' });
        meta('Contact', { method: 'form' });
        ga4('generate_lead', { method: 'contact_form' });
        log('Lead (contacto)');
      });
    }
  }

  /* ---------- Vídeo ---------- */
  function bindVideo() {
    var reel = document.getElementById('reels-play');
    if (reel && !reel.__ppBound) {
      reel.__ppBound = true;
      reel.addEventListener('change', function () {
        if (reel.checked) { ga4('video_start', { video_title: 'Reel Plaza Paraíso' }); meta('VideoPlay', { title: 'Reel' }, true); log('video_start (reel)'); }
      });
    }
    document.querySelectorAll('.ev-video, .ev-video__facade').forEach(function (v) {
      if (v.__ppBound) return; v.__ppBound = true;
      v.addEventListener('click', function () {
        var t = pageMeta().event || 'Vídeo evento';
        ga4('video_start', { video_title: t }); meta('VideoPlay', { title: t }, true); log('video_start', t);
      });
    });
  }

  /* ---------- Profundidad de scroll ---------- */
  function bindScroll() {
    var marks = [25, 50, 75, 100], done = {};
    function onScroll() {
      var h = document.documentElement;
      var pct = (h.scrollTop + window.innerHeight) / h.scrollHeight * 100;
      marks.forEach(function (m) {
        if (!done[m] && pct >= m) { done[m] = true; ga4('scroll', { percent_scrolled: m }); log('scroll ' + m + '%'); }
      });
      if (done[100]) window.removeEventListener('scroll', onScroll);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Init ---------- */
  function init() {
    log('Tracking activo · GA4=' + (GA_ON ? 'ON' : 'OFF (placeholder)') + ' · Meta=' + (FB_ON ? 'ON' : 'OFF (placeholder)') + ' · Consentimiento=' + (hasConsent() ? 'OK' : 'pendiente'));
    if (hasConsent()) loadAnalytics();
    bindForms();
    bindVideo();
    bindScroll();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
