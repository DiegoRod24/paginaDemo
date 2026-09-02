(() => {
  const goToPortal = (event) => {
    const brand = event.target.closest?.('.brand-mini');
    if (!brand) return;

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
      up.addEventListener('click', () => {
        menu.scrollBy({ top: -Math.max(190, menu.clientHeight * 0.72), behavior: 'smooth' });
      });
    }

    if (down.dataset.bound !== '1') {
      down.dataset.bound = '1';
      down.addEventListener('click', () => {
        menu.scrollBy({ top: Math.max(190, menu.clientHeight * 0.72), behavior: 'smooth' });
      });
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
        const nextIndex = event.key === nextKey
          ? Math.min(buttons.length - 1, index + 1)
          : Math.max(0, index - 1);

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

    const candidates = hero.querySelectorAll('.world-actions .btn, .world-switch, .portal-world > span');
    candidates.forEach((node) => {
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
        svg.style.flex = '0 0 auto';
      } else if (isArch && (text.includes('sistemas') || text.includes('tecnolog'))) {
        node.dataset.worldDirection = 'right';
        node.style.display = 'inline-flex';
        node.style.alignItems = 'center';
        node.style.flexDirection = 'row';
        node.style.gap = '10px';
        svg.style.transform = 'none';
        svg.style.flex = '0 0 auto';
      }
    });
  };

  const ensureTransitionStyles = () => {
    if (document.getElementById('jym-world-transition-runtime')) return;
    const style = document.createElement('style');
    style.id = 'jym-world-transition-runtime';
    style.textContent = `
      .jym-world-transition{position:fixed;inset:0;z-index:99999;pointer-events:none;overflow:hidden;display:grid;place-items:center;opacity:0;animation:jymFadeIn .16s ease forwards;background:#030609}
      .jym-world-transition.is-tech{background:radial-gradient(circle at 50% 50%,rgba(0,217,255,.2),transparent 40%),#02080d}
      .jym-world-transition.is-arch{background:radial-gradient(circle at 50% 50%,rgba(217,168,61,.22),transparent 42%),#100a03}
      .jym-transition-grid{position:absolute;inset:-18%;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:54px 54px;opacity:.6}
      .jym-world-transition.is-tech .jym-transition-grid{transform:perspective(900px) rotateX(62deg);transform-origin:center bottom;background-image:linear-gradient(rgba(0,217,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(0,217,255,.07) 1px,transparent 1px)}
      .jym-transition-copy{position:relative;z-index:7;text-align:center;color:#fff;padding:24px;filter:drop-shadow(0 12px 30px rgba(0,0,0,.4))}
      .jym-transition-copy small{display:block;margin-bottom:10px;font-size:.68rem;font-weight:900;letter-spacing:.24em;opacity:.82}
      .jym-transition-copy strong{display:block;font-size:clamp(2rem,4.2vw,4.2rem);line-height:.95;letter-spacing:-.04em}
      .jym-transition-copy span{display:block;margin-top:13px;font-size:.72rem;letter-spacing:.18em;opacity:.72}
      .jym-code-rain span{position:absolute;left:var(--x);top:-14%;font:600 .62rem/1.2 monospace;color:#63f4ff;opacity:0;white-space:nowrap;animation:jymCodeFall .82s linear var(--d) both}
      .jym-scanline{position:absolute;left:0;right:0;top:-8%;height:2px;background:#8ff8ff;box-shadow:0 0 14px #00d9ff,0 0 46px #00d9ff;animation:jymScan .76s ease-in-out .08s both}
      .jym-tech-hud{position:absolute;left:50%;top:50%;width:260px;height:260px;transform:translate(-50%,-50%);border:1px solid rgba(0,217,255,.34);border-radius:50%;animation:jymHud .72s ease both}
      .jym-tech-hud:before,.jym-tech-hud:after{content:"";position:absolute;border:1px solid rgba(0,217,255,.24);border-radius:50%}.jym-tech-hud:before{inset:32px}.jym-tech-hud:after{inset:72px}
      .jym-blueprint{position:absolute;left:50%;top:50%;width:min(520px,72vw);height:300px;transform:translate(-50%,-50%);opacity:.88}
      .jym-blueprint i{position:absolute;display:block;background:#e4bd67;box-shadow:0 0 16px rgba(217,168,61,.35);transform-origin:left;animation:jymDraw .56s ease both}
      .jym-blueprint .w1{left:8%;bottom:18%;width:82%;height:2px}.jym-blueprint .w2{left:8%;bottom:18%;width:2px;height:62%;animation-delay:.08s}.jym-blueprint .w3{left:8%;top:20%;width:60%;height:2px;animation-delay:.16s}.jym-blueprint .w4{right:10%;top:20%;width:2px;height:62%;animation-delay:.24s}
      .jym-blueprint b{position:absolute;color:#e7c97f;font:700 .7rem/1 monospace;opacity:.8}.jym-blueprint .m1{left:38%;bottom:8%}.jym-blueprint .m2{right:2%;top:48%}
      .jym-material{position:absolute;height:14px;width:160px;border-radius:3px;background:linear-gradient(90deg,#6f421f,#c98a43,#75461f);box-shadow:0 10px 24px rgba(0,0,0,.35);animation:jymPiece .58s cubic-bezier(.2,.8,.2,1) both}.jym-material.p1{left:10%;top:27%}.jym-material.p2{right:10%;top:38%;animation-delay:.14s}.jym-material.p3{left:46%;bottom:18%;animation-delay:.26s}
      @keyframes jymFadeIn{to{opacity:1}}@keyframes jymCodeFall{0%{transform:translateY(-20vh);opacity:0}20%{opacity:.72}100%{transform:translateY(125vh);opacity:0}}@keyframes jymScan{to{top:112%}}@keyframes jymHud{0%{opacity:0;transform:translate(-50%,-50%) scale(.38)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}@keyframes jymDraw{0%{transform:scaleX(0);opacity:0}100%{transform:scaleX(1);opacity:1}}@keyframes jymPiece{0%{opacity:0;transform:translateY(-65px) rotate(-8deg)}100%{opacity:.86;transform:none}}
      @media(prefers-reduced-motion:reduce){.jym-world-transition *{animation-duration:.01ms!important;animation-iteration-count:1!important}}
    `;
    document.head.appendChild(style);
  };

  const buildWorldTransition = (target) => {
    ensureTransitionStyles();
    const overlay = document.createElement('div');
    overlay.className = `jym-world-transition is-${target}`;
    overlay.setAttribute('aria-hidden', 'true');

    if (target === 'tech') {
      const lines = ['JYM.SYSTEM_INIT();','AI_ENGINE.CONNECT();','API.GATEWAY.ONLINE();','BOT.AUTOMATION.READY();','DATA.PIPELINE.RUN();','WORKFLOW.SYNC();','SYSTEM.STATUS=ONLINE'];
      overlay.innerHTML = `
        <div class="jym-transition-grid"></div>
        <div class="jym-code-rain">${Array.from({length:36},(_,i)=>`<span style="--x:${(i*7.3)%100}%;--d:${(i%9)*.07}s">${lines[i%lines.length]}</span>`).join('')}</div>
        <div class="jym-scanline"></div>
        <div class="jym-tech-hud"></div>
        <div class="jym-transition-copy"><small>JYM SYSTEMS</small><strong>SISTEMA ONLINE</strong><span>IA · AUTOMATIZACIÓN · DATOS</span></div>`;
    } else {
      overlay.innerHTML = `
        <div class="jym-transition-grid"></div>
        <div class="jym-blueprint"><i class="w1"></i><i class="w2"></i><i class="w3"></i><i class="w4"></i><b class="m1">5.20 m</b><b class="m2">3.40 m</b></div>
        <div class="jym-material p1"></div><div class="jym-material p2"></div><div class="jym-material p3"></div>
        <div class="jym-transition-copy"><small>JYM ARQUITECTURA</small><strong>PROYECTO EN CONSTRUCCIÓN</strong><span>DISEÑO · EJECUCIÓN · ESPACIOS</span></div>`;
    }
    return overlay;
  };

  let transitionLocked = false;
  const interceptWorldSwitch = (event) => {
    const trigger = event.target.closest?.('.world-actions .btn, .world-switch');
    if (!trigger || trigger.dataset.transitionBypass === '1' || transitionLocked) return;

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

    const overlay = buildWorldTransition(target);
    document.body.appendChild(overlay);
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const delay = reducedMotion ? 60 : 860;

    window.setTimeout(() => {
      trigger.dataset.transitionBypass = '1';
      trigger.click();
      delete trigger.dataset.transitionBypass;
      window.setTimeout(() => overlay.remove(), reducedMotion ? 20 : 180);
      window.setTimeout(() => { transitionLocked = false; }, reducedMotion ? 80 : 260);
    }, delay);
  };

  const enhanceAll = () => {
    enhanceRoomCarousel();
    enhanceWorldDirections();
  };

  document.addEventListener('click', goToPortal, true);
  document.addEventListener('click', interceptWorldSwitch, true);
  document.addEventListener('DOMContentLoaded', enhanceAll);
  window.addEventListener('load', enhanceAll);
  window.addEventListener('resize', enhanceAll);

  const observer = new MutationObserver(() => window.requestAnimationFrame(enhanceAll));
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
})();
