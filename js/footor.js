document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic copyright year
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Smooth back-to-top scrolling
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Newsletter form handler with inline confirmation
  const footerForm = document.getElementById('footerForm');
  if (footerForm) {
    footerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = footerForm.querySelector('input[type="email"]');
      const submitBtn = footerForm.querySelector('button[type="submit"]');

      if (input && input.value.trim()) {
        const originalBtnContent = submitBtn ? submitBtn.innerHTML : '→';
        if (submitBtn) {
          submitBtn.innerHTML = '✓';
          submitBtn.style.background = '#22c55e';
          submitBtn.style.color = '#ffffff';
        }

        // Show inline feedback message if present or created
        let msg = footerForm.parentElement.querySelector('.newsletter-message');
        if (!msg) {
          msg = document.createElement('p');
          msg.className = 'newsletter-message';
          footerForm.parentElement.appendChild(msg);
        }
        msg.className = 'newsletter-message success';
        msg.textContent = 'Thank you for subscribing to Echaar updates!';

        input.value = '';

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.style.background = '';
            submitBtn.style.color = '';
          }
          setTimeout(() => {
            if (msg) msg.style.display = 'none';
          }, 3500);
        }, 2000);
      }
    });
  }
});