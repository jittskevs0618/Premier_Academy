/* Premier Academy — site behaviour.
   Navigation, hero slider, gallery lightbox, form handling, language toggle. */
(function () {
  'use strict';

  var DESKTOP = window.matchMedia('(min-width: 992px)');
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  /* ---------------------------------------------------------------- Footer */
  var yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Marks that scripting is live — used by the test harness and available for
  // CSS that should only apply when JS has initialised.
  document.documentElement.setAttribute('data-pa-ready', '1');

  /* ------------------------------------------------------------ Navigation */
  var nav = $('#primary-nav');
  var navToggle = $('#nav-toggle');
  var navClose = $('#nav-close');
  var scrim = $('#nav-scrim');
  var lastFocus = null;

  function openNav() {
    lastFocus = document.activeElement;
    nav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    if (scrim) scrim.hidden = false;
    document.body.classList.add('nav-open');
    if (navClose) navClose.focus();
  }

  function closeNav() {
    nav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    if (scrim) scrim.hidden = true;
    document.body.classList.remove('nav-open');
    collapseAll();
    if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus();
  }

  function collapseAll() {
    $$('.is-expanded', nav).forEach(function (el) { el.classList.remove('is-expanded'); });
    $$('.nav__toggle[aria-expanded="true"]', nav).forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.contains('is-open') ? closeNav() : openNav();
    });
  }
  if (navClose) navClose.addEventListener('click', closeNav);
  if (scrim) scrim.addEventListener('click', closeNav);

  // Submenu toggles — used on mobile only; desktop opens them on hover/focus.
  $$('.nav__toggle').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (DESKTOP.matches) return;
      var parent = btn.parentElement;
      var open = parent.classList.toggle('is-expanded');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  // On mobile a tap on a parent link opens its submenu rather than navigating.
  $$('.nav__item--has-children > .nav__link, .nav__subitem--parent > .nav__sublink').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (DESKTOP.matches) return;
      var parent = link.parentElement;
      if (!parent.classList.contains('is-expanded')) {
        e.preventDefault();
        parent.classList.add('is-expanded');
        var btn = $('.nav__toggle', parent);
        if (btn) btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Reset state when crossing the desktop breakpoint.
  var onBreakpoint = function () {
    if (DESKTOP.matches) {
      nav.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      if (scrim) scrim.hidden = true;
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
      collapseAll();
    }
  };
  if (DESKTOP.addEventListener) DESKTOP.addEventListener('change', onBreakpoint);
  else if (DESKTOP.addListener) DESKTOP.addListener(onBreakpoint);

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (nav && nav.classList.contains('is-open')) closeNav();
  });

  // Header shadow once the page scrolls.
  var header = $('#site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------- Hero slider */
  var slider = $('.slider');
  if (slider) {
    var slides = $$('.slide', slider);
    var dots = $$('.slider__dot', slider);
    var index = 0;
    var timer = null;
    var INTERVAL = 6000;
    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        var active = n === index;
        s.classList.toggle('is-active', active);
        if (active) s.removeAttribute('aria-hidden');
        else s.setAttribute('aria-hidden', 'true');
      });
      dots.forEach(function (d, n) { d.classList.toggle('is-active', n === index); });
    }
    function next() { show(index + 1); }
    function prev() { show(index - 1); }
    function start() { if (!reduceMotion && slides.length > 1) timer = setInterval(next, INTERVAL); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    var nextBtn = $('.slider__arrow--next', slider);
    var prevBtn = $('.slider__arrow--prev', slider);
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); restart(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); restart(); });
    dots.forEach(function (d) {
      d.addEventListener('click', function () { show(Number(d.dataset.slide)); restart(); });
    });

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', start);

    // Touch swipe.
    var startX = null;
    slider.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; stop(); }, { passive: true });
    slider.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 45) { dx < 0 ? next() : prev(); }
      startX = null;
      start();
    }, { passive: true });

    start();
  }

  /* ------------------------------------------------------ Gallery lightbox */
  var lightboxLinks = $$('[data-lightbox]');
  if (lightboxLinks.length) {
    var box = null;
    var boxIndex = 0;
    var openerFocus = null;

    function render() {
      var link = lightboxLinks[boxIndex];
      var img = $('img', link);
      $('.lightbox__img', box).src = link.getAttribute('href');
      $('.lightbox__img', box).alt = img ? img.alt : '';
      $('.lightbox__counter', box).textContent = (boxIndex + 1) + ' / ' + lightboxLinks.length;
    }

    function openBox(i) {
      openerFocus = document.activeElement;
      boxIndex = i;
      box = document.createElement('div');
      box.className = 'lightbox';
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      box.setAttribute('aria-label', 'Image viewer');
      box.innerHTML =
        '<img class="lightbox__img" src="" alt="">' +
        '<button class="lightbox__btn lightbox__close" type="button" aria-label="Close">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>' +
        '<button class="lightbox__btn lightbox__prev" type="button" aria-label="Previous image">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg></button>' +
        '<button class="lightbox__btn lightbox__next" type="button" aria-label="Next image">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></button>' +
        '<p class="lightbox__counter"></p>';
      document.body.appendChild(box);
      document.body.classList.add('nav-open');
      render();

      $('.lightbox__close', box).addEventListener('click', closeBox);
      $('.lightbox__next', box).addEventListener('click', function (e) { e.stopPropagation(); boxIndex = (boxIndex + 1) % lightboxLinks.length; render(); });
      $('.lightbox__prev', box).addEventListener('click', function (e) { e.stopPropagation(); boxIndex = (boxIndex - 1 + lightboxLinks.length) % lightboxLinks.length; render(); });
      box.addEventListener('click', function (e) { if (e.target === box) closeBox(); });
      $('.lightbox__close', box).focus();
    }

    function closeBox() {
      if (!box) return;
      box.remove();
      box = null;
      document.body.classList.remove('nav-open');
      if (openerFocus) openerFocus.focus();
    }

    lightboxLinks.forEach(function (link, i) {
      link.addEventListener('click', function (e) { e.preventDefault(); openBox(i); });
    });

    document.addEventListener('keydown', function (e) {
      if (!box) return;
      if (e.key === 'Escape') closeBox();
      if (e.key === 'ArrowRight') { boxIndex = (boxIndex + 1) % lightboxLinks.length; render(); }
      if (e.key === 'ArrowLeft') { boxIndex = (boxIndex - 1 + lightboxLinks.length) % lightboxLinks.length; render(); }
    });
  }

  /* ------------------------------------------------------------- Accordion */
  // <details> handles the open/close itself; close siblings for a cleaner read.
  $$('.accordion').forEach(function (group) {
    var items = $$('.accordion__item', group);
    items.forEach(function (item) {
      item.addEventListener('toggle', function () {
        if (!item.open) return;
        items.forEach(function (other) { if (other !== item) other.open = false; });
      });
    });
  });

  /* ----------------------------------------------------------------- Forms */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function setError(field, message) {
    var input = $('.input', field) || $('input', field);
    var slot = $('.field__error', field);
    if (slot) slot.textContent = message || '';
    if (input) {
      if (message) input.setAttribute('aria-invalid', 'true');
      else input.removeAttribute('aria-invalid');
    }
    return !message;
  }

  function validate(form) {
    var ok = true;
    $$('.field', form).forEach(function (field) {
      var input = $('.input', field);
      if (!input) return;
      var value = (input.value || '').trim();
      var label = (($('label', field) || {}).textContent || 'This field').replace('*', '').trim();

      if (input.required && !value) ok = setError(field, label + ' is required.') && ok;
      else if (value && input.type === 'email' && !EMAIL.test(value)) ok = setError(field, 'Enter a valid email address.') && ok;
      else if (value && input.type === 'tel' && value.replace(/[^\d]/g, '').length < 7) ok = setError(field, 'Enter a valid phone number.') && ok;
      else setError(field, '');
    });
    return ok;
  }

  $$('form[data-form]').forEach(function (form) {
    var status = $('.form__status', form);
    var submit = $('button[type="submit"]', form);

    // Clear an error as soon as the visitor starts fixing it.
    $$('.input', form).forEach(function (input) {
      input.addEventListener('input', function () {
        var field = input.closest('.field');
        if (field && input.getAttribute('aria-invalid')) setError(field, '');
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      // Bare newsletter inputs have no .field wrapper — check them directly.
      var email = form.querySelector('input[type="email"]');
      if (!form.querySelector('.field') && email) {
        if (!EMAIL.test((email.value || '').trim())) {
          if (status) { status.textContent = 'Please enter a valid email address.'; status.className = 'form__status is-error'; }
          email.focus();
          return;
        }
      } else if (!validate(form)) {
        if (status) { status.textContent = 'Please correct the highlighted fields.'; status.className = 'form__status is-error'; }
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }

      var action = form.getAttribute('action') || '';
      if (/YOUR_(FORM|NEWSLETTER)_ID/.test(action)) {
        if (status) {
          status.textContent = 'Form backend is not configured yet — set the endpoint in build/site.js and rebuild.';
          status.className = 'form__status is-error';
        }
        return;
      }

      if (submit) { submit.disabled = true; submit.dataset.label = submit.textContent; submit.textContent = 'Sending…'; }
      if (status) { status.textContent = ''; status.className = 'form__status'; }

      fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          form.reset();
          if (status) {
            status.textContent = form.dataset.form === 'newsletter'
              ? 'Thank you — you are subscribed.'
              : 'Thank you. We have received your message and will be in touch shortly.';
            status.className = 'form__status is-success';
          }
        })
        .catch(function () {
          if (status) {
            status.textContent = 'Something went wrong. Please call (626) 765-3519 or email info@premier-academy.com.';
            status.className = 'form__status is-error';
          }
        })
        .finally(function () {
          if (submit) { submit.disabled = false; submit.textContent = submit.dataset.label || 'Submit'; }
        });
    });
  });

  /* ------------------------------------------------------- Language toggle */
  // The WordPress site has a full Chinese tree at /zh/. That tree is not part of
  // this rebuild yet, so the button links there and says so if it is missing.
  var LANG_KEY = 'pa-lang';
  var langButtons = $$('.langswitch__btn');

  function applyLang(lang) {
    langButtons.forEach(function (b) { b.classList.toggle('is-active', b.dataset.lang === lang); });
    try { localStorage.setItem(LANG_KEY, lang); } catch (err) { /* private mode */ }
  }

  try {
    var saved = localStorage.getItem(LANG_KEY);
    if (saved === 'en') applyLang('en');
  } catch (err) { /* private mode */ }

  langButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.dataset.lang;
      if (lang === 'en') { applyLang('en'); return; }

      // Probe before navigating so visitors never land on a 404.
      fetch('/zh/', { method: 'HEAD' })
        .then(function (res) {
          if (res.ok) { applyLang('zh'); window.location.href = '/zh/'; }
          else throw new Error('missing');
        })
        .catch(function () {
          window.alert('中文版本即将上线。\n\nThe Chinese version of this site is coming soon. Please call (626) 765-3519 — we speak Mandarin.');
        });
    });
  });
})();
