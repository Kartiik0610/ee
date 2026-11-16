/**
 * contact.js - Interactive Contact Us Page
 * Echaar Equipments Pvt. Ltd.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inquiry Form Management
  const contactForm = document.getElementById('contactForm');
  const successBanner = document.getElementById('formSuccessBanner');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value.trim() || '';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const company = document.getElementById('contactCompany')?.value.trim() || '';
      const inquiryType = document.getElementById('contactType')?.value || 'General Inquiry';
      const subject = document.getElementById('contactSubject')?.value.trim() || 'Technical Inquiry';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      // Compose Email Content
      const mailSubject = encodeURIComponent(`[${inquiryType}] ${subject} - ${company}`);
      const mailBody = encodeURIComponent(
        `Dear Echaar Equipments Commercial & Technical Team,\n\n` +
        `I would like to submit an inquiry with the following details:\n\n` +
        `Name: ${name}\n` +
        `Company: ${company}\n` +
        `Email: ${email}\n` +
        `Phone / Mobile: ${phone}\n` +
        `Inquiry Category: ${inquiryType}\n` +
        `Subject: ${subject}\n\n` +
        `Technical Specifications / Message:\n` +
        `${message}\n\n` +
        `Please review and revert with technical feasibility / quotation.\n\n` +
        `Best regards,\n` +
        `${name}`
      );

      // Show user success feedback
      if (successBanner) {
        successBanner.classList.add('active');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Launch default email client
      window.location.href = `mailto:sales@echaar.com?cc=info@echaar.com&subject=${mailSubject}&body=${mailBody}`;

      // Reset form after short delay
      setTimeout(() => {
        contactForm.reset();
      }, 1000);
    });
  }

  // 2. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close all others
        faqItems.forEach(i => i.classList.remove('active'));

        // Toggle clicked item
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // 3. Mobile Navbar Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      menuToggle.classList.toggle('is-open');
    });
  }

  // 4. Current Year in Footer
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 5. Back to Top Button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
