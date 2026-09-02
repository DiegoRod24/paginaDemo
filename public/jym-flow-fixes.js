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

  document.addEventListener('click', goToPortal, true);
})();
