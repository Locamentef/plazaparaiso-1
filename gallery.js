/* Plaza Paraíso — Galería de eventos
   Convierte cada .ev-gallery en un carrusel: arrastre con el ratón,
   scroll táctil y flechas prev/next. Mejora progresiva: sin JS, la
   galería sigue siendo desplazable. */
(function () {
  var PREV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  var NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';

  document.querySelectorAll('.ev-gallery').forEach(function (g) {
    if (g.dataset.galleryReady) return;
    g.dataset.galleryReady = '1';

    // Envolver la galería y añadir las flechas
    var wrap = document.createElement('div');
    wrap.className = 'ev-gallery-wrap';
    g.parentNode.insertBefore(wrap, g);
    wrap.appendChild(g);

    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'ev-gallery__arrow ev-gallery__arrow--prev';
    prev.setAttribute('aria-label', 'Ver fotos anteriores');
    prev.innerHTML = PREV;

    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'ev-gallery__arrow ev-gallery__arrow--next';
    next.setAttribute('aria-label', 'Ver más fotos');
    next.innerHTML = NEXT;

    wrap.appendChild(prev);
    wrap.appendChild(next);

    function pageBy() {
      var it = g.querySelector('.ev-gallery__item');
      var gap = parseFloat(getComputedStyle(g).columnGap) || 16;
      var w = it ? it.offsetWidth + gap : 280;
      var fit = Math.max(1, Math.floor((g.clientWidth + gap) / w));
      return w * fit;
    }

    prev.addEventListener('click', function () { g.scrollBy({ left: -pageBy(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { g.scrollBy({ left: pageBy(), behavior: 'smooth' }); });

    function update() {
      var scrollable = g.scrollWidth - g.clientWidth > 4;
      wrap.classList.toggle('is-scrollable', scrollable);
      prev.disabled = g.scrollLeft <= 2;
      next.disabled = g.scrollLeft >= g.scrollWidth - g.clientWidth - 2;
    }
    g.addEventListener('scroll', function () { window.requestAnimationFrame(update); });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    g.querySelectorAll('img').forEach(function (img) { img.addEventListener('load', update); });
    update();

    // Arrastrar para desplazar (ratón / puntero)
    var down = false, moved = false, startX = 0, startScroll = 0;
    g.addEventListener('pointerdown', function (e) {
      if (e.button !== undefined && e.button !== 0) return;
      down = true; moved = false; startX = e.clientX; startScroll = g.scrollLeft;
    });
    g.addEventListener('pointermove', function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      if (Math.abs(dx) > 6) {
        moved = true;
        g.classList.add('is-dragging');
        try { g.setPointerCapture(e.pointerId); } catch (_) {}
      }
      if (moved) g.scrollLeft = startScroll - dx;
    });
    function endDrag() { down = false; g.classList.remove('is-dragging'); }
    g.addEventListener('pointerup', endDrag);
    g.addEventListener('pointercancel', endDrag);

    // Si el usuario arrastró, no abrir la foto en grande
    g.addEventListener('click', function (e) {
      if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; }
    }, true);
  });
})();
