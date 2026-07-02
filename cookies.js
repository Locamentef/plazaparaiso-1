/* ============================================================
   Plaza Paraíso · Consentimiento de cookies + carga de píxeles
   + eventos de conversión (Google Analytics 4 + Meta Pixel)
   ------------------------------------------------------------
   Los píxeles solo se cargan tras ACEPTAR el banner (RGPD).
   Un enlace con [data-cookie-settings] reabre el banner.
   ============================================================ */
window.PLP_GA_ID    = "G-BHMT2HPE9S";     // Google Analytics 4
window.PLP_PIXEL_ID = "1715018873258485"; // Meta / Facebook Pixel

(function () {
  "use strict";
  var KEY = "plp-cookie-consent";          // "granted" | "denied"
  function getConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function setConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function clearConsent() { try { localStorage.removeItem(KEY); } catch (e) {} }

  window.PLP_CONSENT = (getConsent() === "granted");

  /* ---- Helper de evento (dispara a GA4 y a Meta a la vez) ---- */
  window.plpTrack = function (gaName, gaParams, fbName, fbParams, fbCustom) {
    if (!window.PLP_CONSENT) return;
    try { if (window.gtag) window.gtag("event", gaName, gaParams || {}); } catch (e) {}
    try { if (window.fbq && fbName) window.fbq(fbCustom ? "trackCustom" : "track", fbName, fbParams || {}); } catch (e) {}
  };

  /* ---- Carga de píxeles SOLO con consentimiento ---- */
  function loadTrackers() {
    if (window.PLP_TRACKERS_LOADED) return;
    window.PLP_TRACKERS_LOADED = true;
    window.PLP_CONSENT = true;
    // Google Analytics 4
    if (window.PLP_GA_ID) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + window.PLP_GA_ID;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", window.PLP_GA_ID);
    }
    // Meta (Facebook) Pixel
    if (window.PLP_PIXEL_ID) {
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0";
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("init", window.PLP_PIXEL_ID);
      window.fbq("track", "PageView");
    }
    // Registra el contenido visto (landing de evento)
    var ev = (document.body.getAttribute("data-event-name") || "").trim();
    if (ev) {
      window.plpTrack("view_item",
        { items: [{ item_name: ev, item_category: "Evento" }] },
        "ViewContent", { content_name: ev, content_type: "product" });
    }
  }

  /* ============================================================
     EVENTOS DE CONVERSIÓN
     ============================================================ */
  function eventName(el) {
    var card = el.closest && el.closest("[data-event-name]");
    if (card) return card.getAttribute("data-event-name");
    var b = document.body.getAttribute("data-event-name");
    if (b) return b;
    var c = el.closest && el.closest(".event-card");
    if (c) { var n = c.querySelector(".event-card__name"); if (n) return n.textContent.trim(); }
    return "";
  }

  function wireEvents() {
    if (window.PLP_WIRED) return;
    window.PLP_WIRED = true;

    // Reabrir preferencias de cookies desde el footer
    document.addEventListener("click", function (e) {
      var t = e.target.closest("[data-cookie-settings]");
      if (!t) return;
      e.preventDefault();
      clearConsent();
      var existing = document.querySelector(".cookie-banner");
      if (existing) existing.parentNode.removeChild(existing);
      build();
    });

    // Compra de entradas + redes sociales
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a, button");
      if (!a) return;
      var txt = (a.textContent || "").toLowerCase();
      var href = (a.getAttribute && a.getAttribute("href")) || "";
      var isBuy =
        a.classList.contains("tt-buy") ||
        /entrada|comprar|abono|consigue tu entrada/.test(txt) ||
        /fourvenues\.com/.test(href) ||
        (/entradas\.html/.test(href) && /entrada|comprar|consigue/.test(txt));
      if (isBuy && !/info|más informaci/.test(txt)) {
        var ev = eventName(a) || "Entradas Plaza Paraíso";
        window.plpTrack(
          "begin_checkout",
          { items: [{ item_name: ev, item_category: "Entrada" }] },
          "InitiateCheckout",
          { content_name: ev, content_category: "Entradas", currency: "EUR" }
        );
        return;
      }
      if (/instagram|facebook|tiktok/.test(href)) {
        var red = /instagram/.test(href) ? "Instagram" : /facebook/.test(href) ? "Facebook" : "TikTok";
        window.plpTrack("social_click", { network: red }, "Contact", { method: red }, false);
      }
    }, true);

    // Reel de la home
    var reel = document.getElementById("reels-play");
    if (reel) {
      reel.addEventListener("change", function () {
        if (reel.checked) {
          window.plpTrack("video_start", { video_title: "Reel Plaza Paraíso" },
            "ViewContent", { content_name: "Reel Plaza Paraíso", content_type: "video" });
        }
      });
    }

    // Formularios (newsletter / contacto)
    document.addEventListener("submit", function (e) {
      var form = e.target;
      if (!form || form.tagName !== "FORM") return;
      var label = (form.getAttribute("aria-label") || "").toLowerCase();
      if (/bolet|newsletter|suscri/.test(label)) {
        window.plpTrack("sign_up", { method: "newsletter" }, "Subscribe", { content_name: "Newsletter" });
      } else {
        window.plpTrack("generate_lead", { form: "contacto" }, "Lead", { content_name: "Formulario de contacto" });
      }
    }, true);
  }

  /* ---- Banner ---- */
  function build() {
    if (document.querySelector(".cookie-banner")) return;
    var b = document.createElement("div");
    b.className = "cookie-banner";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-live", "polite");
    b.setAttribute("aria-label", "Aviso de cookies");
    b.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<div class="cookie-banner__text">' +
          '<strong>Usamos cookies 🍪</strong>' +
          '<p>Utilizamos cookies propias y de terceros para analizar el tráfico y mejorar tu experiencia. ' +
          'Puedes aceptarlas o rechazarlas. Consulta nuestra <a href="cookies.html" class="cookie-banner__link">política de cookies</a>.</p>' +
        '</div>' +
        '<div class="cookie-banner__actions">' +
          '<button type="button" class="btn btn--outline cookie-banner__btn" data-cc="deny">Rechazar</button>' +
          '<button type="button" class="btn btn--primary cookie-banner__btn" data-cc="accept">Aceptar</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(b);
    requestAnimationFrame(function () { b.classList.add("is-visible"); });

    function decide(choice) {
      setConsent(choice);
      b.classList.remove("is-visible");
      setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 300);
      if (choice === "granted") loadTrackers();
    }
    b.querySelector('[data-cc="accept"]').addEventListener("click", function () { decide("granted"); });
    b.querySelector('[data-cc="deny"]').addEventListener("click", function () { decide("denied"); });
  }

  /* ---- Arranque ---- */
  function boot() {
    wireEvents();
    var stored = getConsent();
    if (stored === "granted") { loadTrackers(); return; }
    if (stored === "denied") { return; }
    build();  // primera visita
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
