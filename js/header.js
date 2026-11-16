/**
 * header.js - Glassmorphism Navigation Bar, Mobile Drawer, and Live Sheet 2 Dropdown Synchronization
 * Echaar Equipments Pvt. Ltd.
 * Hierarchy: Products -> Division (Group Title) -> Group (Sub-assemblies)
 * Live Sheet 2 (gid: 1550103869)
 */

document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.glass-navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  const navLinks = document.querySelectorAll('.nav-link');

  // 1. Create or bind mobile backdrop overlay
  let backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  const closeMobileMenu = () => {
    if (menuToggle) menuToggle.classList.remove('is-active');
    if (navMenu) navMenu.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  const openMobileMenu = () => {
    if (menuToggle) menuToggle.classList.add('is-active');
    if (navMenu) navMenu.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // 2. Mobile Menu Toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('active');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on backdrop click
    backdrop.addEventListener('click', closeMobileMenu);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });

    // Close on window resize if moving to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 992) {
        closeMobileMenu();
      }
    });
  }

  // 3. Products Dropdown Synchronization with Google Sheet 2 (gid: 1550103869)
  const PRODUCTS_NAV_BASELINE = [
    {
      division: 'Converting Machinery Division',
      groups: [
        'Ci Flexopress',
        'FlexoDelight',
        'Flexointelligent',
        'Flexomaster'
      ]
    },
    {
      division: 'Precision Manufacturing Division',
      groups: [
        'Hydro Energy',
        'Windmill Energy',
        'Oil & Gas',
        'Cold Rolling Mills',
        'Valves',
        'Construction Equipments',
        'Printing Machines'
      ]
    }
  ];

  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  /**
   * Render multi-column Products Dropdown into the DOM
   */
  const renderProductsDropdown = (divisionList) => {
    const productDropdownContainers = document.querySelectorAll('.nav-item.has-dropdown');
    productDropdownContainers.forEach(item => {
      const parentLink = item.querySelector('.nav-link');
      if (!parentLink) return;
      const href = parentLink.getAttribute('href') || '';
      const text = parentLink.textContent.trim().toLowerCase();
      if (!href.includes('products.html') && !text.includes('products')) return;

      const dropdownMenu = item.querySelector('.dropdown-menu');
      if (!dropdownMenu) return;

      dropdownMenu.classList.add('products-menu');

      // Determine base URL for products link (e.g. products.html or html/products.html)
      const baseHref = href.split('?')[0].split('#')[0] || 'products.html';

      let html = '';
      divisionList.forEach(divObj => {
        const itemsHtml = divObj.groups.map(grp => {
          const encoded = encodeURIComponent(grp).replace(/%20/g, '+');
          return `
            <li class="dropdown-item">
              <a href="${baseHref}?group=${encoded}" data-group="${escapeHtml(grp)}">
                <span class="group-dot"></span>
                ${escapeHtml(grp)}
              </a>
            </li>
          `;
        }).join('');

        html += `
          <div class="dropdown-division-col">
            <li class="dropdown-group-header">
              <span class="division-badge">Division</span>
              <span class="division-name">${escapeHtml(divObj.division)}</span>
            </li>
            ${itemsHtml}
          </div>
        `;
      });

      dropdownMenu.innerHTML = html;
    });
  };

  // Immediate baseline render to guarantee zero delay or flicker
  renderProductsDropdown(PRODUCTS_NAV_BASELINE);

  /**
   * Live Google Sheet 2 Fetcher & Real-Time Synchronization
   */
  const syncProductsNavWithSheet2 = async () => {
    const SHEET_ID = '11fGoU7WbGkKBaFy4hjnu2LpKTdgPFhW1eOxXWXkU658';
    const GID = '1550103869';
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

    try {
      const res = await fetch(gvizUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start === -1 || end === -1) return;

      const json = JSON.parse(text.substring(start, end + 1));
      const rows = json.table?.rows || [];

      // Map divisions to Set of unique groups in sheet order
      const divMap = new Map();

      rows.forEach((r, idx) => {
        if (!r || !r.c) return;
        const div = r.c[1]?.v?.toString().trim() || '';
        const grp = r.c[2]?.v?.toString().trim() || '';

        if (idx === 0 && (div.toLowerCase().includes('group') || grp.toLowerCase().includes('group'))) {
          return;
        }

        if (div && grp) {
          if (!divMap.has(div)) {
            divMap.set(div, new Set());
          }
          divMap.get(div).add(grp);
        }
      });

      if (divMap.size > 0) {
        const liveDivisions = [];
        divMap.forEach((groupsSet, divName) => {
          liveDivisions.push({
            division: divName,
            groups: Array.from(groupsSet)
          });
        });

        renderProductsDropdown(liveDivisions);
      }
    } catch (e) {
      // Retains baseline data if offline or network failure
      console.info('Navbar Products using baseline Sheet 2 data');
    }
  };

  syncProductsNavWithSheet2();

  // 4. Seamless Click Handling when already on products.html
  document.addEventListener('click', (e) => {
    const itemLink = e.target.closest('.dropdown-item a');
    if (!itemLink) return;

    const href = itemLink.getAttribute('href');
    if (!href || !href.includes('products.html')) return;

    const currentPath = window.location.pathname;
    const isCurrentProductsPage = currentPath.endsWith('products.html') || currentPath.includes('products.html');
    if (isCurrentProductsPage) {
      const url = new URL(itemLink.href, window.location.origin);
      const groupParam = url.searchParams.get('group');
      if (groupParam && typeof window.selectProductGroup === 'function') {
        e.preventDefault();
        window.history.pushState(null, '', itemLink.href);
        window.selectProductGroup(groupParam);
        closeMobileMenu();
      }
    }
  });

  // 5. Mobile Dropdown Accordion
  dropdownItems.forEach((item) => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');

    if (link && dropdown) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          const isOpen = dropdown.classList.contains('mobile-open');
          
          // Close other open mobile dropdowns
          document.querySelectorAll('.dropdown-menu.mobile-open').forEach(menu => {
            if (menu !== dropdown) menu.classList.remove('mobile-open');
          });

          dropdown.classList.toggle('mobile-open', !isOpen);
          const arrow = link.querySelector('.arrow-icon');
          if (arrow) {
            arrow.style.transform = !isOpen ? 'rotate(180deg)' : '';
          }
        }
      });
    }
  });

  // 6. Dynamic Active State Handler
  const currentPath = window.location.pathname.replace(/\/$/, '');
  let currentPage = currentPath.split('/').pop() || 'index.html';
  if (!currentPage.includes('.html')) {
    currentPage = 'index.html';
  }

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href !== '#') {
      const targetPage = href.split('/').pop().split('#')[0];
      if (targetPage === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    }
  });

  // 7. High-performance Scroll Handler using Class Toggle
  const handleScroll = () => {
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger once on initial load

  // 8. Echaar Special Scroll Reading Progress Line
  let progressBar = document.querySelector('.echaar-scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'echaar-scroll-progress';
    document.body.appendChild(progressBar);
  }

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight > 0) {
      const progressPercent = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
      progressBar.style.width = `${progressPercent}%`;
    }
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  updateScrollProgress();
});