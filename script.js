/* ============================================================
   EDIT ME: wedding date/time used by the countdown on every page.
   Format: new Date("YYYY-MM-DDTHH:MM:SS")
   ============================================================ */
const WEDDING_DATE = new Date("2026-09-12T17:00:00");

/* ---------- Envelope opening sequence (index.html only) ---------- */
function initEnvelope() {
  const screen = document.getElementById("envelope-screen");
  const envelope = document.getElementById("envelope");
  const seal = document.getElementById("wax-seal");
  if (!screen || !envelope || !seal) return;

  // Skip the animation on repeat visits within the same session
  if (sessionStorage.getItem("envelopeOpened") === "true") {
    screen.setAttribute("hidden", "");
    document.body.classList.remove("locked");
    return;
  }

  document.body.classList.add("locked");

  const openEnvelope = () => {
    if (envelope.classList.contains("is-opening")) return;
    envelope.classList.add("is-opening");
    sessionStorage.setItem("envelopeOpened", "true");

    setTimeout(() => {
      screen.classList.add("dismissed");
      document.body.classList.remove("locked");
    }, 1500);

    setTimeout(() => {
      screen.setAttribute("hidden", "");
    }, 2500);
  };

  seal.addEventListener("click", openEnvelope);
  seal.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openEnvelope();
    }
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ---------- Countdown ---------- */
function initCountdown() {
  const daysEl = document.getElementById("cd-days");
  const hoursEl = document.getElementById("cd-hours");
  const minsEl = document.getElementById("cd-mins");
  const secsEl = document.getElementById("cd-secs");
  if (!daysEl) return;

  const pad = (n) => String(Math.max(n, 0)).padStart(2, "0");

  const tick = () => {
    const now = new Date();
    let diff = WEDDING_DATE - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = pad(days);
    hoursEl.textContent = pad(hours);
    minsEl.textContent = pad(mins);
    secsEl.textContent = pad(secs);
  };

  tick();
  setInterval(tick, 1000);
}

/* ---------- Mobile nav toggle ---------- */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- Panels clickable as whole cards (index.html) ---------- */
function initPanelHitboxes() {
  document.querySelectorAll(".panel").forEach((panel) => {
    const link = panel.querySelector(".panel-link");
    if (!link) return;
    panel.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      window.location.href = link.getAttribute("href");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initEnvelope();
  initReveal();
  initCountdown();
  initNavToggle();
  initPanelHitboxes();
});
