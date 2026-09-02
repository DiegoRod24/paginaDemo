(() => {
  const goToPortal = (event) => {
    const brand = event.target.closest?.('.brand-mini');
    if (!brand) return;

    document.querySelectorAll('.jym-world-transition').forEach(node => node.remove());
    document.documentElement.classList.remove('jym-transition-running');

    event.preventDefault();
    event.stopPropagation();

    const cleanUrl = `${window.location.origin}${window.location.pathname}`;
    if (window.location.href === cleanUrl || window.location.href === `${cleanUrl}#inicio`) {
      window.location.reload();
      return;
    }
    window.location.assign(cleanUrl);
  };

  const centerRoomButton = (menu, button, behavior = 'smooth') => {
    if (!menu || !button) return;
    const horizontal = window.matchMedia('(max-width: 820px)').matches;
    if (horizontal) {
      const target = button.offsetLeft - (menu.clientWidth - button.offsetWidth) / 2;
      menu.scrollTo({ left: Math.max(0, target), behavior });
      return;
    }
    const target = button.offsetTop - (menu.clientHeight - button.offsetHeight) / 2;
    menu.scrollTo({ top: Math.max(0, target), behavior });
  };

  const refreshArrowState = (menu, up, down) => {
    const horizontal = window.matchMedia('(max-width: 820px)').matches;
    if (horizontal) {
      up.disabled = true;
      down.disabled = true;
      return;
    }
    const maxScroll = Math.max(0, menu.scrollHeight - menu.clientHeight);
    up.disabled = menu.scrollTop <= 2;
    down.disabled = menu.scrollTop >= maxScroll - 2;
  };

  const enhanceRoomCarousel = () => {
    const shell = document.querySelector('.arch-showroom .showroom-shell');
    const menu = shell?.querySelector('.room-menu');
    if (!shell || !menu) return;

    menu.classList.add('room-menu-carousel');
    menu.setAttribute('role', 'listbox');
    menu.setAttribute('aria-label', 'Proyectos de arquitectura JYM');

    let up = shell.querySelector(':scope > .room-menu-arrow-up');
    let down = shell.querySelector(':scope > .room-menu-arrow-down');

    if (!up) {
      up = document.createElement('button');
      up.type = 'button';
      up.className = 'room-menu-arrow room-menu-arrow-up';
      up.setAttribute('aria-label', 'Ver proyectos anteriores');
      up.innerHTML = '<span aria-hidden="true">⌃</span>';
      shell.appendChild(up);
    }
    if (!down) {
      down = document.createElement('button');
      down.type = 'button';
      down.className = 'room-menu-arrow room-menu-arrow-down';
      down.setAttribute('aria-label', 'Ver proyectos siguientes');
      down.innerHTML = '<span aria-hidden="true">⌄</span>';
      shell.appendChild(down);
    }

    if (up.dataset.bound !== '1') {
      up.dataset.bound = '1';
      up.addEventListener('click', () => menu.scrollBy({ top: -Math.max(190, menu.clientHeight * .72), behavior: 'smooth' }));
    }
    if (down.dataset.bound !== '1') {
      down.dataset.bound = '1';
      down.addEventListener('click', () => menu.scrollBy({ top: Math.max(190, menu.clientHeight * .72), behavior: 'smooth' }));
    }

    if (menu.dataset.bound !== '1') {
      menu.dataset.bound = '1';
      menu.addEventListener('scroll', () => refreshArrowState(menu, up, down), { passive: true });
      menu.addEventListener('wheel', (event) => {
        if (window.matchMedia('(max-width: 820px)').matches) return;
        const dominant = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
        if (!dominant) return;
        menu.scrollBy({ top: dominant, behavior: 'auto' });
        event.preventDefault();
      }, { passive: false });
      menu.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button || !menu.contains(button)) return;
        window.setTimeout(() => centerRoomButton(menu, button), 70);
      });
      menu.addEventListener('keydown', (event) => {
        const horizontal = window.matchMedia('(max-width: 820px)').matches;
        const previousKey = horizontal ? 'ArrowLeft' : 'ArrowUp';
        const nextKey = horizontal ? 'ArrowRight' : 'ArrowDown';
        if (event.key !== previousKey && event.key !== nextKey) return;
        const buttons = [...menu.querySelectorAll('button')];
        const current = document.activeElement;
        const activeIndex = Math.max(0, buttons.findIndex(button => button.classList.contains('active')));
        const index = buttons.includes(current) ? buttons.indexOf(current) : activeIndex;
        const nextIndex = event.key === nextKey ? Math.min(buttons.length - 1, index + 1) : Math.max(0, index - 1);
        buttons[nextIndex]?.focus();
        buttons[nextIndex]?.click();
        centerRoomButton(menu, buttons[nextIndex]);
        event.preventDefault();
      });
    }

    menu.querySelectorAll(':scope > button').forEach(button => {
      button.setAttribute('role', 'option');
      button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
    });

    const active = menu.querySelector('button.active');
    if (active && active.dataset.centered !== '1') {
      menu.querySelectorAll('button[data-centered="1"]').forEach(node => delete node.dataset.centered);
      active.dataset.centered = '1';
      window.setTimeout(() => centerRoomButton(menu, active, 'smooth'), 0);
    }
    refreshArrowState(menu, up, down);
  };

  const normalizeText = (value = '') => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

  const enhanceWorldDirections = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const isTech = hero.classList.contains('hero-tech');
    const isArch = hero.classList.contains('hero-arch');
    if (!isTech && !isArch) return;

    hero.querySelectorAll('.world-actions .btn, .world-switch').forEach(node => {
      const text = normalizeText(node.textContent);
      const svg = node.querySelector('svg');
      if (!svg) return;
      if (isTech && text.includes('arquitectura')) {
        node.dataset.worldDirection = 'left';
        node.style.display = 'inline-flex';
        node.style.alignItems = 'center';
        node.style.flexDirection = 'row-reverse';
        node.style.gap = '10px';
        svg.style.transform = 'rotate(180deg)';
      } else if (isArch && (text.includes('sistemas') || text.includes('tecnolog'))) {
        node.dataset.worldDirection = 'right';
        node.style.display = 'inline-flex';
        node.style.alignItems = 'center';
        node.style.flexDirection = 'row';
        node.style.gap = '10px';
        svg.style.transform = 'none';
      }
      svg.style.flex = '0 0 auto';
    });
  };

  const ensureTransitionStyles = () => {
    if (document.getElementById('jym-world-transition-runtime')) return;
    const style = document.createElement('style');
    style.id = 'jym-world-transition-runtime';
    style.textContent = `
      html.jym-transition-running{cursor:progress}.jym-world-transition{position:fixed;inset:0;z-index:99999;pointer-events:auto;overflow:hidden;display:grid;place-items:center;opacity:0;animation:jymFadeIn .14s ease forwards;background:#030609}.jym-world-transition.is-exiting{animation:jymFadeOut .18s ease forwards}.jym-world-transition.is-tech{background:radial-gradient(circle at 50% 50%,rgba(0,217,255,.2),transparent 40%),#02080d}.jym-world-transition.is-arch{background:radial-gradient(circle at 50% 50%,rgba(217,168,61,.22),transparent 42%),#100a03}
      .jym-transition-grid{position:absolute;inset:-18%;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:54px 54px;opacity:.6}.jym-world-transition.is-tech .jym-transition-grid{transform:perspective(900px) rotateX(62deg);transform-origin:center bottom;background-image:linear-gradient(rgba(0,217,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,217,255,.07) 1px,transparent 1px)}
      .jym-transition-copy{position:relative;z-index:7;text-align:center;color:#fff;padding:24px}.jym-transition-copy small{display:block;margin-bottom:10px;font-size:.68rem;font-weight:900;letter-spacing:.24em;opacity:.82}.jym-transition-copy strong{display:block;font-size:clamp(2rem,4.2vw,4.2rem);line-height:.95;letter-spacing:-.04em}.jym-transition-copy span{display:block;margin-top:13px;font-size:.72rem;letter-spacing:.18em;opacity:.72}
      .jym-code-rain span{position:absolute;left:var(--x);top:-14%;font:600 .62rem/1.2 monospace;color:#63f4ff;opacity:0;white-space:nowrap;animation:jymCodeFall .7s linear var(--d) both}.jym-scanline{position:absolute;left:0;right:0;top:-8%;height:2px;background:#8ff8ff;box-shadow:0 0 14px #00d9ff,0 0 46px #00d9ff;animation:jymScan .62s ease-in-out .05s both}.jym-tech-hud{position:absolute;left:50%;top:50%;width:260px;height:260px;transform:translate(-50%,-50%);border:1px solid rgba(0,217,255,.34);border-radius:50%;animation:jymHud .6s ease both}.jym-tech-hud:before,.jym-tech-hud:after{content:"";position:absolute;border:1px solid rgba(0,217,255,.24);border-radius:50%}.jym-tech-hud:before{inset:32px}.jym-tech-hud:after{inset:72px}
      .jym-blueprint{position:absolute;left:50%;top:50%;width:min(520px,72vw);height:300px;transform:translate(-50%,-50%);opacity:.88}.jym-blueprint i{position:absolute;display:block;background:#e4bd67;box-shadow:0 0 16px rgba(217,168,61,.35);transform-origin:left;animation:jymDraw .48s ease both}.jym-blueprint .w1{left:8%;bottom:18%;width:82%;height:2px}.jym-blueprint .w2{left:8%;bottom:18%;width:2px;height:62%;animation-delay:.06s}.jym-blueprint .w3{left:8%;top:20%;width:60%;height:2px;animation-delay:.12s}.jym-blueprint .w4{right:10%;top:20%;width:2px;height:62%;animation-delay:.18s}.jym-blueprint b{position:absolute;color:#e7c97f;font:700 .7rem/1 monospace;opacity:.8}.jym-blueprint .m1{left:38%;bottom:8%}.jym-blueprint .m2{right:2%;top:48%}
      .jym-material{position:absolute;height:14px;width:160px;border-radius:3px;background:linear-gradient(90deg,#6f421f,#c98a43,#75461f);box-shadow:0 10px 24px rgba(0,0,0,.35);animation:jymPiece .48s cubic-bezier(.2,.8,.2,1) both}.jym-material.p1{left:10%;top:27%}.jym-material.p2{right:10%;top:38%;animation-delay:.1s}.jym-material.p3{left:46%;bottom:18%;animation-delay:.2s}
      @keyframes jymFadeIn{to{opacity:1}}@keyframes jymFadeOut{to{opacity:0}}@keyframes jymCodeFall{0%{transform:translateY(-20vh);opacity:0}20%{opacity:.72}100%{transform:translateY(125vh);opacity:0}}@keyframes jymScan{to{top:112%}}@keyframes jymHud{0%{opacity:0;transform:translate(-50%,-50%) scale(.38)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}@keyframes jymDraw{0%{transform:scaleX(0);opacity:0}100%{transform:scaleX(1);opacity:1}}@keyframes jymPiece{0%{opacity:0;transform:translateY(-65px) rotate(-8deg)}100%{opacity:.86;transform:none}}
      @media(prefers-reduced-motion:reduce){.jym-world-transition *{animation-duration:.01ms!important;animation-iteration-count:1!important}}
    `;
    document.head.appendChild(style);
  };

  const buildWorldTransition = target => {
    ensureTransitionStyles();
    document.querySelectorAll('.jym-world-transition').forEach(node => node.remove());
    const overlay = document.createElement('div');
    overlay.className = `jym-world-transition is-${target}`;
    overlay.setAttribute('aria-hidden', 'true');
    if (target === 'tech') {
      const lines = ['JYM.SYSTEM_INIT();','AI_ENGINE.CONNECT();','API.GATEWAY.ONLINE();','BOT.AUTOMATION.READY();','DATA.PIPELINE.RUN();','WORKFLOW.SYNC();','SYSTEM.STATUS=ONLINE'];
      overlay.innerHTML = `<div class="jym-transition-grid"></div><div class="jym-code-rain">${Array.from({length:30},(_,i)=>`<span style="--x:${(i*7.3)%100}%;--d:${(i%8)*.055}s">${lines[i%lines.length]}</span>`).join('')}</div><div class="jym-scanline"></div><div class="jym-tech-hud"></div><div class="jym-transition-copy"><small>JYM SYSTEMS</small><strong>SISTEMA ONLINE</strong><span>IA · AUTOMATIZACIÓN · DATOS</span></div>`;
    } else {
      overlay.innerHTML = `<div class="jym-transition-grid"></div><div class="jym-blueprint"><i class="w1"></i><i class="w2"></i><i class="w3"></i><i class="w4"></i><b class="m1">5.20 m</b><b class="m2">3.40 m</b></div><div class="jym-material p1"></div><div class="jym-material p2"></div><div class="jym-material p3"></div><div class="jym-transition-copy"><small>JYM ARQUITECTURA</small><strong>PROYECTO EN CONSTRUCCIÓN</strong><span>DISEÑO · EJECUCIÓN · ESPACIOS</span></div>`;
    }
    return overlay;
  };

  let transitionLocked = false;
  let transitionSafetyTimer = 0;
  const cleanupTransition = () => {
    window.clearTimeout(transitionSafetyTimer);
    document.querySelectorAll('.jym-world-transition').forEach(node => node.remove());
    document.documentElement.classList.remove('jym-transition-running');
    transitionLocked = false;
  };

  const interceptWorldSwitch = event => {
    const trigger = event.target.closest?.('.world-actions button, .world-switch');
    if (!trigger || transitionLocked) return;
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const text = normalizeText(trigger.textContent);
    let target = null;
    if (hero.classList.contains('hero-tech') && text.includes('arquitectura')) target = 'arch';
    if (hero.classList.contains('hero-arch') && (text.includes('sistemas') || text.includes('tecnolog'))) target = 'tech';
    if (!target) return;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
    transitionLocked = true;
    document.documentElement.classList.add('jym-transition-running');

    const overlay = buildWorldTransition(target);
    document.body.appendChild(overlay);
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const delay = reducedMotion ? 40 : 660;

    transitionSafetyTimer = window.setTimeout(cleanupTransition, 1700);
    window.setTimeout(() => {
      try {
        document.removeEventListener('click', interceptWorldSwitch, true);
        trigger.click();
      } finally {
        window.setTimeout(() => document.addEventListener('click', interceptWorldSwitch, true), 0);
      }
      overlay.classList.add('is-exiting');
      window.setTimeout(cleanupTransition, reducedMotion ? 30 : 190);
    }, delay);
  };

  const ensureSceneEnhancementStyles = () => {
    if (document.getElementById('jym-scene-enhancement-runtime')) return;
    const style = document.createElement('style');
    style.id = 'jym-scene-enhancement-runtime';
    style.textContent = `
      .world-model{isolation:isolate}.jym-scene-overlay{position:absolute;inset:0;z-index:6;pointer-events:none;overflow:hidden}.jym-scene-overlay-tech .jym-data-panel{position:absolute;min-width:112px;padding:9px 11px;border:1px solid rgba(0,217,255,.38);border-radius:12px;background:linear-gradient(145deg,rgba(2,18,30,.82),rgba(3,10,17,.68));box-shadow:inset 0 0 22px rgba(0,217,255,.06),0 0 24px rgba(0,217,255,.08);backdrop-filter:blur(8px);color:#eaffff;animation:jymFloatPanel 4.8s ease-in-out infinite}.jym-scene-overlay-tech .jym-data-panel small{display:block;color:#62efff;font:800 .48rem/1.2 monospace;letter-spacing:.15em}.jym-scene-overlay-tech .jym-data-panel b{display:block;margin-top:3px;font:900 .78rem/1.1 system-ui}.jym-scene-overlay-tech .jym-data-panel span{display:block;margin-top:5px;color:#68ffbd;font:700 .47rem/1 monospace;letter-spacing:.09em}.jym-scene-overlay-tech .panel-api{left:9%;top:21%}.jym-scene-overlay-tech .panel-bot{right:9%;top:26%;animation-delay:-1.2s}.jym-scene-overlay-tech .panel-data{right:12%;bottom:22%;animation-delay:-2.4s}.jym-scene-overlay-tech .jym-node-line{position:absolute;height:1px;transform-origin:left;background:linear-gradient(90deg,rgba(0,217,255,.08),rgba(98,239,255,.7),rgba(0,217,255,.08));box-shadow:0 0 12px rgba(0,217,255,.24);opacity:.56}.jym-scene-overlay-tech .l1{left:21%;top:38%;width:26%;transform:rotate(12deg)}.jym-scene-overlay-tech .l2{right:20%;top:43%;width:23%;transform:rotate(-13deg)}.jym-scene-overlay-tech .l3{right:20%;bottom:34%;width:25%;transform:rotate(14deg)}.jym-scene-overlay-tech .jym-core-pulse{position:absolute;left:50%;top:51%;width:360px;height:360px;transform:translate(-50%,-50%);border:1px solid rgba(0,217,255,.12);border-radius:50%;box-shadow:0 0 60px rgba(0,217,255,.05);animation:jymCorePulse 3.6s ease-in-out infinite}.jym-scene-overlay-arch .jym-arch-label{position:absolute;left:50%;bottom:14%;transform:translateX(-50%);padding:7px 12px;border:1px solid rgba(217,168,61,.32);border-radius:999px;background:rgba(27,17,7,.72);backdrop-filter:blur(8px);color:#e7c678;font:800 .5rem/1 monospace;letter-spacing:.12em;white-space:nowrap}.jym-scene-overlay-arch .jym-plan-line{position:absolute;height:1px;background:linear-gradient(90deg,transparent,rgba(217,168,61,.5),transparent);opacity:.42}.jym-scene-overlay-arch .a1{left:12%;bottom:27%;width:31%}.jym-scene-overlay-arch .a2{right:11%;top:34%;width:27%;transform:rotate(-12deg)}.jym-scene-overlay-arch .a3{left:23%;top:26%;width:22%;transform:rotate(8deg)}.jym-scene-overlay-arch .jym-dimension{position:absolute;color:#dcb661;font:700 .52rem/1 monospace;opacity:.64}.jym-scene-overlay-arch .d1{left:22%;bottom:30%}.jym-scene-overlay-arch .d2{right:20%;top:32%}.jym-scene-overlay-arch .jym-warm-glow{position:absolute;left:50%;top:50%;width:420px;height:300px;transform:translate(-50%,-50%);background:radial-gradient(circle,rgba(217,168,61,.11),transparent 67%);filter:blur(12px);animation:jymWarmPulse 4.2s ease-in-out infinite}@keyframes jymFloatPanel{0%,100%{transform:translateY(0);opacity:.78}50%{transform:translateY(-8px);opacity:1}}@keyframes jymCorePulse{0%,100%{transform:translate(-50%,-50%) scale(.96);opacity:.42}50%{transform:translate(-50%,-50%) scale(1.04);opacity:.76}}@keyframes jymWarmPulse{0%,100%{opacity:.45;transform:translate(-50%,-50%) scale(.96)}50%{opacity:.76;transform:translate(-50%,-50%) scale(1.05)}}@media(max-width:900px){.jym-scene-overlay-tech .jym-data-panel{transform:scale(.82);transform-origin:center}.jym-scene-overlay-tech .panel-api{left:4%}.jym-scene-overlay-tech .panel-bot{right:4%}.jym-scene-overlay-tech .panel-data{display:none}.jym-scene-overlay-arch .jym-dimension{display:none}}@media(prefers-reduced-motion:reduce){.jym-scene-overlay *{animation:none!important}}
    `;
    document.head.appendChild(style);
  };

  const enhanceInternalScenes = () => {
    ensureSceneEnhancementStyles();
    const techModel = document.querySelector('.hero-tech .world-model-tech');
    if (techModel && !techModel.querySelector('.jym-scene-overlay-tech')) {
      const overlay = document.createElement('div');
      overlay.className = 'jym-scene-overlay jym-scene-overlay-tech';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = `<div class="jym-core-pulse"></div><div class="jym-node-line l1"></div><div class="jym-node-line l2"></div><div class="jym-node-line l3"></div><div class="jym-data-panel panel-api"><small>JYM NODE</small><b>API</b><span>CONNECTED</span></div><div class="jym-data-panel panel-bot"><small>AI ENGINE</small><b>BOT</b><span>ONLINE</span></div><div class="jym-data-panel panel-data"><small>PIPELINE</small><b>DATA</b><span>SYNC 100%</span></div>`;
      techModel.appendChild(overlay);
    }
    const archModel = document.querySelector('.hero-arch .world-model-arch');
    if (archModel && !archModel.querySelector('.jym-scene-overlay-arch')) {
      const overlay = document.createElement('div');
      overlay.className = 'jym-scene-overlay jym-scene-overlay-arch';
      overlay.setAttribute('aria-hidden', 'true');
      overlay.innerHTML = `<div class="jym-warm-glow"></div><div class="jym-plan-line a1"></div><div class="jym-plan-line a2"></div><div class="jym-plan-line a3"></div><span class="jym-dimension d1">5.20 m</span><span class="jym-dimension d2">3.40 m</span><div class="jym-arch-label">PLANO JYM · DISEÑO + EJECUCIÓN</div>`;
      archModel.appendChild(overlay);
    }
  };

  const enhanceAll = () => { enhanceRoomCarousel(); enhanceWorldDirections(); enhanceInternalScenes(); };
  document.addEventListener('click', goToPortal, true);
  document.addEventListener('click', interceptWorldSwitch, true);
  document.addEventListener('DOMContentLoaded', enhanceAll);
  window.addEventListener('load', enhanceAll);
  window.addEventListener('resize', enhanceAll);
  window.addEventListener('pageshow', cleanupTransition);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') cleanupTransition(); });

  const observer = new MutationObserver(() => window.requestAnimationFrame(enhanceAll));
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
})();
