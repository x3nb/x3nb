// Small theme helper: randomize slight rotations for cutout elements
// and add micro-interactions for "stickers" and tape.
// Drop this in place of your existing app.js (it also preserves previous gating code).

document.addEventListener('DOMContentLoaded', () => {
  // Preserve previous gating logic placeholder (no-op here)
  function isMember() { return false; }

  // Apply small random rotation to every .cutout to mimic hand-glued cutouts
  (function applyCutoutRotations() {
    const els = document.querySelectorAll('.cutout');
    els.forEach((el, i) => {
      // deterministic-ish rotation based on index so layout is stable
      const rot = (i % 3 === 0) ? -4 : (i % 3 === 1) ? 3 : -2;
      const dx = (i % 2 === 0) ? -2 : 1;
      el.style.transform = `rotate(${rot}deg) translateX(${dx}px)`;
    });
  })();

  // Add subtle sticker pinch animation on hover
  document.querySelectorAll('.sticker, .sticker-sm').forEach(s => {
    s.addEventListener('mouseenter', () => {
      s.style.transform = (s.classList.contains('sticker-sm')) ? 'rotate(-3deg) scale(1.02)' : 'rotate(0deg) scale(1.03)';
      s.style.transition = 'transform 140ms ease';
    });
    s.addEventListener('mouseleave', () => {
      // return to original rotation applied by CSS
      s.style.transform = '';
    });
  });

  // Basic gating logic for reply form (matches earlier templates)
  const replyForm = document.getElementById('post-reply');
  const gateWarning = document.querySelector('.gate-warning');
  if (replyForm) {
    if (isMember()) {
      replyForm.classList.remove('hidden');
      if (gateWarning) gateWarning.classList.add('hidden');
    } else {
      replyForm.classList.add('hidden');
      if (gateWarning) gateWarning.classList.remove('hidden');
    }
    replyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Demo: connect to your forum provider or serverless endpoint to post replies.');
    });
  }

  // Swap auth link text
  const authLink = document.getElementById('auth-link');
  if (authLink) {
    authLink.textContent = isMember() ? 'Account' : 'Log in';
    authLink.href = isMember() ? 'profile.html' : 'auth.html';
  }
});
