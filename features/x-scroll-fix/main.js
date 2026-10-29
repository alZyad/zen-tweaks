(() => {
  let muteUntil = 0;
  const scrollBy = window.scrollBy.bind(window);
  const enabled = () => document.documentElement.hasAttribute('data-zt-x-scroll-fix');

  window.scrollBy = (...args) => {
    if (enabled() && performance.now() < muteUntil) return;
    return scrollBy(...args);
  };

  document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) muteUntil = performance.now() + 500;
  });
})();
