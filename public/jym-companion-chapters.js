(() => {
  const CHAPTERS = {
    tech: [
      { key: 'home', label: 'Inicio', ids: ['inicio'] },
      { key: 'solutions', label: 'Soluciones', ids: ['showroom','cuellos-botella','servicios'] },
      { key: 'demos', label: 'Demos y casos', ids: ['laboratorio','casos-reales','automatizacion'] },
      { key: 'process', label: 'Proceso', ids: ['proceso'] },
      { key: 'contact', label: 'Contacto', ids: ['contacto'] },
    ],
    arch: [
      { key: 'home', label: 'Inicio', ids: ['inicio'] },
      { key: 'projects', label: 'Proyectos', ids: ['showroom','casos'] },
      { key: 'services', label: 'Servicios', ids: ['servicios'] },
      { key: 'process', label: 'Proceso', ids: ['proceso','automatizacion'] },
      { key: 'contact', label: 'Contacto', ids: ['contacto'] },
    ],
  };

  let raf = 0;
  let lastSignature = '';

  const currentMode = () => {
    const mode = document.documentElement.dataset.mode;
    return mode === 'tech' || mode === 'arch' ? mode : null;
  };

  const visibleChapter = mode => {
    const chapters = CHAPTERS[mode];
    if (!chapters) return null;
    const line = window.innerHeight * .48;
    let winner = chapters[0];
    let best = Infinity;

    chapters.forEach(chapter => {
      chapter.ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const inside = rect.top <= line && rect.bottom >= line;
        const distance = inside ? 0 : Math.min(Math.abs(rect.top - line), Math.abs(rect.bottom - line));
        if (distance < best) {
          best = distance;
          winner = chapter;
        }
      });
    });

    return winner;
  };

  const ensureBadge = companion => {
    let badge = companion.querySelector('.jym-companion-chapter-badge');
    if (badge) return badge;
    badge = document.createElement('div');
    badge.className = 'jym-companion-chapter-badge';
    badge.setAttribute('aria-hidden', 'true');
    companion.appendChild(badge);
    return badge;
  };

  const ensureGestureLayer = companion => {
    let layer = companion.querySelector('.jym-companion-gesture-layer');
    if (layer) return layer;
    layer = document.createElement('div');
    layer.className = 'jym-companion-gesture-layer';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = `
      <span class="jym-gesture-icon g-main"></span>
      <span class="jym-gesture-icon g-secondary"></span>
      <i class="jym-gesture-line gl-a"></i>
      <i class="jym-gesture-line gl-b"></i>`;
    companion.querySelector('.companion-character-stage')?.appendChild(layer);
    return layer;
  };

  const apply = () => {
    raf = 0;
    const mode = currentMode();
    if (!mode) return;

    const companion = document.querySelector(`.companion-system.companion-${mode}`);
    if (!companion) return;

    const chapters = CHAPTERS[mode];
    const chapter = visibleChapter(mode);
    if (!chapter) return;

    const index = chapters.findIndex(item => item.key === chapter.key);
    const signature = `${mode}:${chapter.key}`;

    companion.dataset.jymChapter = chapter.key;
    document.documentElement.dataset.jymChapter = chapter.key;

    const badge = ensureBadge(companion);
    badge.innerHTML = `<small>${String(index + 1).padStart(2,'0')} / 05</small><b>${chapter.label}</b>`;
    ensureGestureLayer(companion);

    if (signature !== lastSignature) {
      companion.classList.remove('jym-chapter-enter');
      void companion.offsetWidth;
      companion.classList.add('jym-chapter-enter');
      window.setTimeout(() => companion.classList.remove('jym-chapter-enter'), 850);
      lastSignature = signature;
    }
  };

  const schedule = () => {
    if (raf) return;
    raf = requestAnimationFrame(apply);
  };

  document.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('load', schedule);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class','data-mode']
  });
})();
