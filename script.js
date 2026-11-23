(() => {
  const root = document.body;
  const toggle = document.getElementById('theme-toggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(theme) {
    root.dataset.theme = theme;
    toggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
    if (metaTheme) metaTheme.content = theme === 'light' ? '#f8f7f4' : '#101917';
    try { localStorage.setItem('aryan-portfolio-theme', theme); } catch (_) { /* private mode */ }
  }
  let storedTheme;
  try { storedTheme = localStorage.getItem('aryan-portfolio-theme'); } catch (_) { /* private mode */ }
  setTheme(storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : (prefersDark ? 'dark' : 'light'));
  toggle.addEventListener('click', () => setTheme(root.dataset.theme === 'light' ? 'dark' : 'light'));

  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('primary-nav');
  function closeMenu() {
    nav.classList.remove('is-open');
    menuToggle.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    menuToggle.classList.toggle('is-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
  });

  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  const filterStatus = document.getElementById('filter-status');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach(b => {
      const selected = b === button;
      b.classList.toggle('active', selected);
      b.setAttribute('aria-pressed', String(selected));
    });
    let count = 0;
    cards.forEach(card => {
      const visible = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.hidden = !visible;
      if (visible) count++;
    });
    filterStatus.textContent = `Showing ${count} project${count === 1 ? '' : 's'}`;
  }));

  const copyButton = document.getElementById('copy-email');
  const copyLabel = document.getElementById('copy-label');
  const copyStatus = document.getElementById('copy-status');
  copyButton.addEventListener('click', async () => {
    const email = 'aryankapur11@icloud.com';
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(email);
      copyLabel.textContent = 'Email copied!';
      copyStatus.textContent = 'Email address copied to clipboard.';
      window.setTimeout(() => { copyLabel.textContent = 'Copy email address'; }, 2200);
    } catch (_) {
      window.location.href = `mailto:${email}`;
      copyStatus.textContent = 'Opening your email app.';
    }
  });

  const year = document.getElementById('current-year');
  year.textContent = String(new Date().getFullYear());

  const readingBar = document.getElementById('reading-bar');
  let ticking = false;
  function updateReadingBar() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    readingBar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateReadingBar); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', updateReadingBar);
  updateReadingBar();
})();
