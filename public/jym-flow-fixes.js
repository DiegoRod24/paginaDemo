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

  document.addEventListener('click', goToPortal, true);
  document.addEventListener('DOMContentLoaded', enhanceRoomCarousel);
  window.addEventListener('load', enhanceRoomCarousel);
  window.addEventListener('resize', enhanceRoomCarousel);

  const observer = new MutationObserver(() => window.requestAnimationFrame(enhanceRoomCarousel));
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
})();
