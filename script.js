/* Blends Barbershop — interactions */
(function () {
  "use strict";

  // Current year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Shrinking sticky header
  var header = document.getElementById("siteHeader");
  var lastKnown = 0, ticking = false;
  function onScroll() {
    lastKnown = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (header) header.classList.toggle("shrink", lastKnown > 40);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle (side drawer)
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  var scrim = document.getElementById("navScrim");
  var navClose = document.getElementById("navClose");

  // Relocate drawer + scrim out of the header (whose backdrop-filter would
  // otherwise become the containing block for these position:fixed elements
  // and collapse them to the header's box). Make them direct children of body.
  if (mobileNav) { mobileNav.hidden = false; document.body.appendChild(mobileNav); }
  if (scrim) { scrim.hidden = false; document.body.appendChild(scrim); }

  var mobileBookBar = document.querySelector(".mobile-book-bar");
  var mainEl = document.getElementById("main");
  var navOpen = false;

  // Everything outside the drawer that should be inert while the drawer is open.
  function backgroundEls() {
    return [mainEl, header, mobileBookBar, document.querySelector(".site-footer")]
      .filter(Boolean);
  }

  function focusableIn(container) {
    return Array.prototype.filter.call(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ),
      function (el) {
        return el.offsetParent !== null || el.getClientRects().length > 0;
      }
    );
  }

  // When closed (and on desktop), the off-canvas drawer must not be tab-reachable
  // or exposed to screen readers. `inert` handles both in one shot.
  function setDrawerInert(isInert) {
    if (!mobileNav) return;
    if (isInert) {
      mobileNav.setAttribute("inert", "");
      mobileNav.setAttribute("aria-hidden", "true");
    } else {
      mobileNav.removeAttribute("inert");
      mobileNav.removeAttribute("aria-hidden");
    }
  }

  function setBackgroundInert(isInert) {
    backgroundEls().forEach(function (el) {
      if (isInert) el.setAttribute("inert", "");
      else el.removeAttribute("inert");
    });
  }

  function openNav() {
    if (!toggle || !mobileNav || navOpen) return;
    navOpen = true;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
    mobileNav.classList.add("open");
    if (scrim) scrim.classList.add("open");
    setDrawerInert(false);
    setBackgroundInert(true);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    // Move focus into the drawer.
    var focusables = focusableIn(mobileNav);
    (navClose || focusables[0] || mobileNav).focus();
  }

  function closeNav(restoreFocus) {
    if (!toggle || !mobileNav) return;
    navOpen = false;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    mobileNav.classList.remove("open");
    if (scrim) scrim.classList.remove("open");
    setBackgroundInert(false);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    setDrawerInert(true);
    if (restoreFocus !== false) toggle.focus();
  }

  // Trap Tab within the drawer while it's open.
  function trapTab(e) {
    if (!navOpen || e.key !== "Tab") return;
    var focusables = focusableIn(mobileNav);
    if (!focusables.length) { e.preventDefault(); return; }
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    var active = document.activeElement;
    if (e.shiftKey) {
      if (active === first || !mobileNav.contains(active)) {
        e.preventDefault(); last.focus();
      }
    } else {
      if (active === last || !mobileNav.contains(active)) {
        e.preventDefault(); first.focus();
      }
    }
  }

  if (toggle && mobileNav) {
    // Start closed → inert.
    setDrawerInert(true);

    toggle.addEventListener("click", function () {
      if (navOpen) closeNav(); else openNav();
    });
    mobileNav.addEventListener("click", function (e) {
      // Nav-link tap: let the browser navigate, then close (return focus to toggle
      // would fight the anchor jump, so keep focus where the anchor lands).
      if (e.target.closest("a")) closeNav(false);
    });
    if (navClose) navClose.addEventListener("click", function () { closeNav(true); });
    if (scrim) scrim.addEventListener("click", function () { closeNav(true); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && navOpen) { closeNav(true); return; }
      trapTab(e);
    });

    // Reset drawer + toggle state when crossing the desktop breakpoint.
    var mq = window.matchMedia("(min-width: 901px)");
    var onBreakpoint = function () {
      if (mq.matches && navOpen) {
        closeNav(false);
      }
      // On desktop the drawer is unused; keep it inert regardless.
      if (mq.matches) setDrawerInert(true);
      else if (!navOpen) setDrawerInert(true);
    };
    if (mq.addEventListener) mq.addEventListener("change", onBreakpoint);
    else if (mq.addListener) mq.addListener(onBreakpoint);
  }

  // Scroll-reveal via IntersectionObserver
  var reveals = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
