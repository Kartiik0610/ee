document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.about-tab-btn');
  const tabPanels = document.querySelectorAll('.about-tab-panel');

  if (tabButtons.length === 0 || tabPanels.length === 0) return;

  const activateTab = (tabId) => {
    // 1. Deactivate all buttons and panels
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabPanels.forEach(panel => panel.classList.remove('active'));

    // 2. Activate target button and panel
    const targetBtn = document.querySelector(`.about-tab-btn[data-tab="${tabId}"]`);
    const targetPanel = document.getElementById(tabId);

    if (targetBtn && targetPanel) {
      targetBtn.classList.add('active');
      targetPanel.classList.add('active');

      // Update URL hash without scrolling the whole page
      if (history.pushState) {
        history.pushState(null, null, `#${tabId}`);
      } else {
        location.hash = `#${tabId}`;
      }
    }
  };

  // Click event listeners
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      activateTab(tabId);

      // On mobile view, scroll slightly to content area
      if (window.innerWidth <= 992) {
        const contentArea = document.querySelector('.about-content-area');
        if (contentArea) {
          const yOffset = -75;
          const y = contentArea.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });

  // Handle URL hash on load
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    activateTab(hash);
  }

  // Handle hash change
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    if (newHash && document.getElementById(newHash)) {
      activateTab(newHash);
    }
  });
});
