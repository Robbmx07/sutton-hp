/* Sutton theme switch. Load in <head> (before the page draws) so there's no light flash.
   - Choice is remembered per device in localStorage ("sutton-theme"): "dark" (default), "light" or "auto".
   - Sets <html data-theme="dark|light">; "auto" follows the phone/computer setting live.
   - Draws a Dark / Light / Auto button into every element with [data-sutton-theme].
   Written for old Safari (iOS 12): no optional chaining or newer syntax. */
(function () {
  var KEY = 'sutton-theme', root = document.documentElement;
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function getPref() { try { return localStorage.getItem(KEY) || 'dark'; } catch (e) { return 'dark'; } }
  function setPref(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function resolve(p) { return p === 'auto' ? (mq && mq.matches ? 'dark' : 'light') : p; }
  function apply() {
    var p = getPref(), t = resolve(p);
    root.setAttribute('data-theme', t);
    root.setAttribute('data-theme-pref', p);
    var metas = document.querySelectorAll('meta[name="theme-color"]:not([data-keep])'); /* data-keep: app sets its own (e.g. a colored header) */
    for (var i = 0; i < metas.length; i++) metas[i].removeAttribute('media');
    if (metas.length) metas[0].setAttribute('content', getComputedStyle(root).getPropertyValue('--s-bg').trim() || (t === 'dark' ? '#121614' : '#F6F7F3'));
    drawButtons();
  }
  var ICON = {
    dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>'
  };
  var LABEL = { dark: 'Dark', light: 'Light', auto: 'Auto' }, NEXT = { dark: 'light', light: 'auto', auto: 'dark' };
  function drawButtons() {
    var slots = document.querySelectorAll('[data-sutton-theme]'), p = getPref();
    for (var i = 0; i < slots.length; i++) {
      var s = slots[i], b = s.querySelector('button.s-theme');
      if (!b) {
        b = document.createElement('button'); b.type = 'button';
        b.className = 's-theme' + (s.hasAttribute('data-on-dark') ? ' on-dark-header' : '');
        b.addEventListener('click', function () { setPref(NEXT[getPref()] || 'dark'); apply(); });
        s.appendChild(b);
      }
      b.innerHTML = ICON[p] + '<span>' + LABEL[p] + '</span>';
      b.setAttribute('aria-label', 'Theme: ' + LABEL[p] + '. Tap to change.');
    }
  }
  apply();
  if (mq) { var on = function () { if (getPref() === 'auto') apply(); }; if (mq.addEventListener) mq.addEventListener('change', on); else if (mq.addListener) mq.addListener(on); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', drawButtons); else drawButtons();
  window.SuttonTheme = { get: getPref, set: function (v) { setPref(v); apply(); } };
})();
