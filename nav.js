/* nav.js — mobile burger toggle */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.nav__burger');
    var sw  = document.getElementById('nav-switch');
    if (!btn || !sw) return;
    btn.addEventListener('click', function () {
      sw.checked = !sw.checked;
      btn.setAttribute('aria-expanded', sw.checked ? 'true' : 'false');
    });
    /* close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sw.checked) {
        sw.checked = false;
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();
