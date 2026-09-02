(() => {
  const matrixTokens = [
    'JYM.init()\n010101\nAI.ONLINE', 'API\nBOT\nDATA', 'AUTOMATION\nSYSTEM READY',
    'if(task){run();}\n> compiling...', 'NODE\nFLOW\nSYNC', 'PYTHON\nSQL\nCLOUD',
    'BOT.start()\nAPI.connect()', 'DATA.stream()\nAI.assist()', '01001101\n01011001',
    'JYM.SYSTEMS\nONLINE', 'AUTO\nRPA\nAI', 'BUILD\nDEPLOY\nRUN'
  ];

  const ensureLayer = hero => {
    let layer = hero.querySelector(':scope > .jym-world-transition');
    if (!layer) {
      layer = document.createElement('div');
      layer.className = 'jym-world-transition';
      layer.setAttribute('aria-hidden', 'true');
      hero.appendChild(layer);
    }
    return layer;
  };

  const ensureAmbient = (world, mode) => {
    if (!world || world.querySelector(':scope > .jym-world-ambient')) return;
    const ambient = document.createElement('div');
    ambient.className = `jym-world-ambient jym-world-ambient-${mode}`;
    ambient.setAttribute('aria-hidden', 'true');

    if (mode === 'tech') {
      ambient.innerHTML = `
        <div class="jym-tech-grid"></div>
        <div class="jym-tech-code">
          <span>JYM://AUTOMATION</span><span>API.CONNECT()</span><span>AI_ASSIST = TRUE</span><span>DATA → FLOW → ACTION</span>
        </div>
        <div class="jym-tech-hud"><i></i><i></i><i></i></div>
        <div class="jym-tech-node n1"></div><div class="jym-tech-node n2"></div><div class="jym-tech-node n3"></div>
        <div class="jym-tech-link l1"></div><div class="jym-tech-link l2"></div>
        <div class="jym-world-status">SYSTEM READY</div>
      `;
    } else {
      ambient.innerHTML = `
        <div class="jym-arch-grid"></div>
        <div class="jym-arch-house">
          <i class="roof"></i><i class="wall w1"></i><i class="wall w2"></i><i class="floor f1"></i><i class="floor f2"></i>
        </div>
        <div class="jym-arch-measure m1">5.20 m</div><div class="jym-arch-measure m2">3.40 m</div>
        <div class="jym-arch-material mat1"></div><div class="jym-arch-material mat2"></div><div class="jym-arch-material mat3"></div>
        <div class="jym-world-status">PROYECTO EN TRAZO</div>
      `;
    }
    world.prepend(ambient);
  };

  const renderTech = layer => {
    const rain = matrixTokens.concat(matrixTokens.slice(0, 6)).map((token, index) => {
      const x = 3 + (index * 5.45) % 94;
      const delay = (index % 7) * 0.035;
      return `<span style="--x:${x}%;--d:${delay}s">${token}</span>`;
    }).join('');

    layer.innerHTML = `
      <div class="world-wash"></div>
      <div class="jym-matrix-rain">${rain}</div>
      <div class="jym-tech-scan"></div>
      <div class="jym-transition-title"><b>JYM SYSTEMS</b><small>COMPILANDO · AUTOMATIZANDO · CONECTANDO</small></div>
    `;
  };

  const renderArch = layer => {
    layer.innerHTML = `
      <div class="world-wash"></div>
      <div class="jym-blueprint"></div>
      <i class="jym-arch-line" style="left:16%;top:30%;width:58%;--d:.05s"></i>
      <i class="jym-arch-line" style="left:24%;top:47%;width:62%;--d:.12s"></i>
      <i class="jym-arch-line" style="left:12%;top:65%;width:52%;--d:.18s"></i>
      <i class="jym-arch-line v" style="left:28%;top:18%;--h:48%;--d:.08s"></i>
      <i class="jym-arch-line v" style="left:53%;top:24%;--h:54%;--d:.15s"></i>
      <i class="jym-arch-line v" style="left:74%;top:19%;--h:45%;--d:.2s"></i>
      <i class="jym-wood-slab" style="--x:18%;--y:62%;--r:2deg;--d:.20s"></i>
      <i class="jym-wood-slab" style="--x:41%;--y:49%;--r:-2deg;--d:.28s"></i>
      <i class="jym-wood-slab" style="--x:60%;--y:35%;--r:1deg;--d:.36s"></i>
      <div class="jym-hammer-hit">🔨</div>
      <div class="jym-transition-title"><b>JYM ARQUITECTURA</b><small>TRAZANDO · ENSAMBLANDO · CONSTRUYENDO</small></div>
    `;
  };

  const runTransition = (hero, mode) => {
    if (!hero || hero.dataset.worldAnimating === '1') return;
    hero.dataset.worldAnimating = '1';
    const layer = ensureLayer(hero);
    layer.className = `jym-world-transition ${mode}`;
    mode === 'tech' ? renderTech(layer) : renderArch(layer);
    requestAnimationFrame(() => layer.classList.add('is-active'));

    window.setTimeout(() => {
      layer.classList.remove('is-active');
      hero.dataset.worldAnimating = '0';
    }, 880);
  };

  const bindHero = () => {
    const hero = document.querySelector('.hero-portal');
    if (!hero) return;

    const tech = hero.querySelector('.portal-tech');
    const arch = hero.querySelector('.portal-arch');
    ensureAmbient(tech, 'tech');
    ensureAmbient(arch, 'arch');

    if (hero.dataset.jymHeroBound === '1') return;
    hero.dataset.jymHeroBound = '1';

    hero.addEventListener('pointerdown', event => {
      const world = event.target.closest('.portal-world');
      if (!world || !hero.contains(world)) return;
      if (world.classList.contains('portal-tech')) runTransition(hero, 'tech');
      if (world.classList.contains('portal-arch')) runTransition(hero, 'arch');
    }, true);
  };

  const observer = new MutationObserver(() => requestAnimationFrame(bindHero));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', bindHero);
  window.addEventListener('load', bindHero);
  bindHero();
})();
