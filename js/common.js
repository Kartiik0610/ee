/**
 * Echaar Equipments Pvt. Ltd. - Common Global Utilities (common.js)
 */

window.EchaarApp = window.EchaarApp || {
  version: '1.0.0',
  smoothScrollTo: (targetSelector) => {
    const target = document.querySelector(targetSelector);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
