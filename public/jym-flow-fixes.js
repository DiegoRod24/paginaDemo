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
    const target = button.offsetTop - (menu.clientHeight - button.offsetHeight) / 2;
    menu.scrollTo({ top: Math.max(0, target), behavior });
  };

  const enhanceRoomCarousel = () => {
    const shell = document.querySelector('.arch-showroom .showroom-shell');
    const menu = shell?.querySelector('.room-menu');
    if (!shell || !menu) return;

    menu.classList.add('room-menu-carousel');

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
      menu.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button || !menu.contains(button)) return;
        window.setTimeout(() => centerRoomButton(menu, button), 70);
      });

      menu.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
        const buttons = [...menu.querySelectorAll('button')];
        const current = document.activeElement;
        const index = Math.max(0, buttons.indexOf(current));
        const nextIndex = event.key === 'ArrowDown'
          ? Math.min(buttons.length - 1, index + 1)
          : Math.max(0, index - 1);
        buttons[nextIndex]?.focus();
        centerRoomButton(menu, buttons[nextIndex]);
        event.preventDefault();
      });
    }

    const active = menu.querySelector('button.active');
    if (active && active.dataset.centered !== '1') {
      menu.querySelectorAll('button[data-centered="1"]').forEach(node => delete node.dataset.centered);
      active.dataset.centered = '1';
      window.setTimeout(() => centerRoomButton(menu, active, 'auto'), 0);
    }
  };

  document.addEventListener('click', goToPortal, true);
  document.addEventListener('DOMContentLoaded', enhanceRoomCarousel);
  window.addEventListener('load', enhanceRoomCarousel);

  const observer = new MutationObserver(() => window.requestAnimationFrame(enhanceRoomCarousel));
  observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
})();
