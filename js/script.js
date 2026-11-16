/**
 * Echaar Equipments Pvt. Ltd. - Homepage Script
 * 
 * 1. Hero Carousel (Touch swipe, keyboard navigation, auto-play)
 * 2. Latest News Live Feed from Google Sheets (Auto-removal if empty)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. HERO CAROUSEL CONTROLLER
     ========================================================================== */
  const initHeroCarousel = () => {
    const carousel = document.querySelector('.hero-carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    if (!carousel || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    const autoPlayDelay = 5500; // 5.5 seconds
    let autoPlayTimer = null;

    // Build Indicator Dots dynamically
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.className = `indicator-dot ${i === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
        dot.addEventListener('click', () => {
          goToSlide(i);
          restartAutoPlay();
        });
        indicatorsContainer.appendChild(dot);
      }
    }

    const indicators = document.querySelectorAll('.indicator-dot');

    // Change Slide Function
    const goToSlide = (index) => {
      if (index >= totalSlides) {
        currentIndex = 0;
      } else if (index < 0) {
        currentIndex = totalSlides - 1;
      } else {
        currentIndex = index;
      }

      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentIndex);
      });

      indicators.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };

    const nextSlide = () => {
      goToSlide(currentIndex + 1);
    };

    const prevSlide = () => {
      goToSlide(currentIndex - 1);
    };

    // Arrow Click Events
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        restartAutoPlay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        restartAutoPlay();
      });
    }

    // Auto-Play Timer
    const startAutoPlay = () => {
      stopAutoPlay();
      autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
    };

    const stopAutoPlay = () => {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    };

    const restartAutoPlay = () => {
      stopAutoPlay();
      startAutoPlay();
    };

    // Pause on hover
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    // Touch / Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoPlay();
    }, { passive: true });

    const handleSwipe = () => {
      const swipeThreshold = 45;
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
      }
    };

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        restartAutoPlay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        restartAutoPlay();
      }
    });

    startAutoPlay();
  };

  /* ==========================================================================
     2. LATEST NEWS LIVE FEED (Google Sheets)
     ========================================================================== */
  const initLatestNews = () => {
    const newsSection = document.getElementById('homeNewsSection');
    const newsGrid = document.getElementById('newsCardsGrid');

    if (!newsSection || !newsGrid) return;

    const SHEET_ID = '11fGoU7WbGkKBaFy4hjnu2LpKTdgPFhW1eOxXWXkU658';
    const JSON_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;
    const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

    /**
     * Helper to escape HTML characters
     */
    const escapeHtml = (str) => {
      if (!str) return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    /**
     * Helper to format Google Sheets date strings (e.g. Date(2017,10,17) -> 17 Nov 2017)
     */
    const formatNewsDate = (raw) => {
      if (!raw) return '';
      const str = String(raw).trim();
      const dateMatch = str.match(/Date\((\d+),\s*(\d+),\s*(\d+)(?:,\s*\d+)*\)/i);
      if (dateMatch) {
        const year = parseInt(dateMatch[1], 10);
        const month = parseInt(dateMatch[2], 10); // 0-indexed in GViz
        const day = parseInt(dateMatch[3], 10);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = months[month] || '';
        return `${day} ${monthName} ${year}`;
      }
      const isoMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (isoMatch) {
        const year = isoMatch[1];
        const monthIdx = parseInt(isoMatch[2], 10) - 1;
        const day = parseInt(isoMatch[3], 10);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = months[monthIdx] || '';
        return `${day} ${monthName} ${year}`;
      }
      return str;
    };

    /**
     * Parses CSV string into structured news items (RFC 4180 compliant)
     */
    const parseCsvToItems = (csvText) => {
      const lines = [];
      let currentLine = [];
      let currentField = '';
      let insideQuotes = false;

      for (let i = 0; i < csvText.length; i++) {
        const char = csvText[i];
        const nextChar = csvText[i + 1];

        if (char === '"') {
          if (insideQuotes && nextChar === '"') {
            currentField += '"';
            i++;
          } else {
            insideQuotes = !insideQuotes;
          }
        } else if (char === ',' && !insideQuotes) {
          currentLine.push(currentField.trim());
          currentField = '';
        } else if ((char === '\r' || char === '\n') && !insideQuotes) {
          if (char === '\r' && nextChar === '\n') i++;
          currentLine.push(currentField.trim());
          if (currentLine.some(f => f.length > 0)) {
            lines.push(currentLine);
          }
          currentLine = [];
          currentField = '';
        } else {
          currentField += char;
        }
      }
      if (currentField.length > 0 || currentLine.length > 0) {
        currentLine.push(currentField.trim());
        if (currentLine.some(f => f.length > 0)) lines.push(currentLine);
      }

      const items = [];
      for (let idx = 0; idx < lines.length; idx++) {
        const row = lines[idx];
        const url = row[0] || '';
        const title = row[1] || '';
        const content = row[2] || '';
        const date = formatNewsDate(row[3] || '');
        const readMore = row[4] || '';

        if (idx === 0 && (title.toLowerCase() === 'title' || url.toLowerCase() === 'url')) {
          continue;
        }

        if (title || content) {
          items.push({ url, title, content, date, readMore });
        }
      }
      return items;
    };

    /**
     * Fetch from Google Sheets JSON endpoint with CSV fallback
     */
    const loadLatestNews = async () => {
      let items = [];

      try {
        const res = await fetch(JSON_URL);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const text = await res.text();
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');
        if (jsonStart === -1 || jsonEnd === -1) throw new Error('Invalid JSON format');

        const data = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
        const rows = data.table?.rows || [];

        rows.forEach((r, idx) => {
          if (!r || !r.c) return;
          const url = r.c[0]?.v?.toString().trim() || '';
          const title = r.c[1]?.v?.toString().trim() || '';
          const content = r.c[2]?.v?.toString().trim() || '';
          const rawDate = r.c[3]?.f?.toString().trim() || r.c[3]?.v?.toString().trim() || '';
          const date = formatNewsDate(rawDate);
          const readMore = r.c[4]?.v?.toString().trim() || '';

          if (idx === 0 && (title.toLowerCase() === 'title' || url.toLowerCase() === 'url')) {
            return;
          }

          if (title || content) {
            items.push({ url, title, content, date, readMore });
          }
        });
      } catch (jsonErr) {
        console.warn('JSON fetch failed, trying CSV fallback...', jsonErr);
        try {
          const res = await fetch(CSV_URL);
          if (!res.ok) throw new Error(`HTTP error ${res.status}`);
          const csvText = await res.text();
          items = parseCsvToItems(csvText);
        } catch (csvErr) {
          console.error('All Google Sheet fetch attempts failed:', csvErr);
          items = [];
        }
      }

      // Condition: if the excel sheet is blank, remove the entire latest news section from DOM
      if (!items || items.length === 0) {
        newsSection.remove();
        return;
      }

      // Build News Cards
      let html = '';
      items.forEach((item) => {
        const isDirectImage = item.url && /\.(jpeg|jpg|png|webp|svg|gif)(\?.*)?$/i.test(item.url);

        const dateBadge = item.date
          ? `<span class="news-card-date">
               <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                 <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                 <line x1="16" y1="2" x2="16" y2="6"></line>
                 <line x1="8" y1="2" x2="8" y2="6"></line>
                 <line x1="3" y1="10" x2="21" y2="10"></line>
               </svg>
               ${escapeHtml(item.date)}
             </span>`
          : '';

        const linkUrl = item.readMore || (!isDirectImage && /^https?:\/\//i.test(item.url) ? item.url : '');
        const actionBtn = linkUrl
          ? `<div class="news-card-action">
               <a href="${escapeHtml(linkUrl)}" target="_blank" rel="noopener noreferrer" class="news-read-more-btn">
                 Read More <span class="arrow">→</span>
               </a>
             </div>`
          : '';

        let mediaBanner = '';
        if (isDirectImage) {
          mediaBanner = `
            <div class="news-card-img-wrap">
              <img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.title)}" loading="lazy" onerror="this.parentElement.style.display='none'" />
            </div>
          `;
        } else {
          mediaBanner = `
            <div class="news-card-banner">
              <div class="news-badge-pill">
                <span class="badge-icon">🏆</span>
                <span class="badge-text">Industry Recognition</span>
              </div>
            </div>
          `;
        }

        html += `
          <article class="news-card">
            ${mediaBanner}
            <div class="news-card-body">
              <div class="news-card-meta">
                ${dateBadge}
                <span class="news-card-tag">Milestone</span>
              </div>
              <h3 class="news-card-title">${escapeHtml(item.title)}</h3>
              <p class="news-card-excerpt">${escapeHtml(item.content)}</p>
              ${actionBtn}
            </div>
          </article>
        `;
      });

      newsGrid.innerHTML = html;
      newsSection.style.display = 'block';
    };

    loadLatestNews();
  };

  // Run controllers
  initHeroCarousel();
  initLatestNews();
});
