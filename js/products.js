/**
 * products.js - Dynamic Products Catalog fetched from Google Sheets
 * Echaar Equipments Pvt. Ltd.
 * Hierarchy: Products Tab -> Group Title -> Group -> Title
 * Spreadsheet ID: 11fGoU7WbGkKBaFy4hjnu2LpKTdgPFhW1eOxXWXkU658 | Sheet2 (gid: 1550103869)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Google Sheets Configuration
  const SHEET_ID = '11fGoU7WbGkKBaFy4hjnu2LpKTdgPFhW1eOxXWXkU658';
  const GID = '1550103869';
  const JSON_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`;
  const EXPORT_CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

  // 2. Embedded Fallback Data from Sheet2 (guarantees instantaneous rendering & offline reliability)
  const FALLBACK_PRODUCTS = [
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Hydro Energy",
    "title": "Axial Valve"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Hydro Energy",
    "title": "Deflector"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Hydro Energy",
    "title": "Intricate Machining of Seal Support"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Hydro Energy",
    "title": "Runner Center Guide"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Hydro Energy",
    "title": "Runner Guide Plate"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Hydro Energy",
    "title": "Seal Support"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Hydro Energy",
    "title": "Seal Support"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Hydro Energy",
    "title": "Wicket Gate"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "90 Degree Cable Guide Assembly"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Aluminium Platforms"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Aluminium Platforms"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Distance Plate"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Handrail Main Bearing Assembly"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Hoisting Eye"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Hub Entry Ladder Assembly"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Integrated-Sensor-Holder"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Lock Plate"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Locknut"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Nacelle Entry Ladder"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Oil Collecting Tray"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Reinforcement Plate"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Rotor Lock Assembly"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Rotor Lock Disc"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Rotor Lock Disc Assembly"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Spider Shaft"
  },
  {
    "url": "https://drive.google.com/file/d/1e5JHUIbY06XmIoys1LKjNnXfcrmxvdih/view?usp=sharing",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Windmill Energy",
    "title": "Yaw Assembly"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Oil & Gas",
    "title": "Bonnet"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Oil & Gas",
    "title": "Bonnets"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Oil & Gas",
    "title": "Crank Shaft"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Oil & Gas",
    "title": "Other Components for Oil Field"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Oil & Gas",
    "title": "Pinion"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Oil & Gas",
    "title": "Pinions"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Oil & Gas",
    "title": "Shafts"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Oil & Gas",
    "title": "Studded Tee for Oil Field"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Cold Rolling Mills",
    "title": "Backup Roll Chock"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Cold Rolling Mills",
    "title": "Breaker Roll"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Cold Rolling Mills",
    "title": "Hydraulic Shear Assembly"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Cold Rolling Mills",
    "title": "Metallic Tip Assembly"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Cold Rolling Mills",
    "title": "Outboard Support Assembly"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Cold Rolling Mills",
    "title": "Segments"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Cold Rolling Mills",
    "title": "Snubber Roll Assembly"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Cold Rolling Mills",
    "title": "Work Roll Chock"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Valves",
    "title": "Actuator"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Valves",
    "title": "Ball Valve"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Valves",
    "title": "Ball Valve"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Valves",
    "title": "Ball Valve"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Valves",
    "title": "Butterfly Gate Valve"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Valves",
    "title": "Butterfly Gate Valve"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Valves",
    "title": "Butterfly Gate Valve"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Valves",
    "title": "Butterfly Gate Valve"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Flinger(Back Side)"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Flinger(front Side)"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Housing For Rotary Actuator"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Housing For Rotary Actuator"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Housing for Rotary Actuators"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Housing for Rotary Actuators"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Hub Cap Adaptor"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Internal Seal Ring"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Manifold"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Manifold"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Manifold"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Retaining Ring"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Rings"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Construction Equipments",
    "title": "Thrust Ring"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Printing Machines",
    "title": "Auto paster Wall"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Printing Machines",
    "title": "Chrome Roller"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Printing Machines",
    "title": "Dampening Roller"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Printing Machines",
    "title": "Plate Cylinders"
  },
  {
    "url": "",
    "groupTitle": "Precision Manufacturing Division",
    "group": "Printing Machines",
    "title": "Swivel Arm Assembly copy"
  },
  {
    "url": "",
    "groupTitle": "Converting Machinery Division",
    "group": "Ci Flexopress",
    "title": "Ci Flexopress"
  },
  {
    "url": "",
    "groupTitle": "Converting Machinery Division",
    "group": "FlexoDelight",
    "title": "FlexoDelight"
  },
  {
    "url": "",
    "groupTitle": "Converting Machinery Division",
    "group": "Flexomaster",
    "title": "Flexomaster"
  },
  {
    "url": "",
    "groupTitle": "Converting Machinery Division",
    "group": "Flexointelligent",
    "title": "Flexointelligent"
  }
];

  // 3. Helper Functions
  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const extractDriveId = (url) => {
    if (!url) return '';
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    return match ? match[1] : '';
  };

  const getDriveThumbnail = (url, size = 'w800') => {
    const id = extractDriveId(url);
    if (!id) return '';
    return `https://lh3.googleusercontent.com/d/${id}`;
  };

  const getFallbackImage = (groupName) => {
    const grp = (groupName || '').toLowerCase();
    if (grp.includes('hydro')) return '../homepage%20images/Hydro%20Energy.png';
    if (grp.includes('wind')) return '../homepage%20images/Windmill%20Energy.webp';
    if (grp.includes('oil')) return '../homepage%20images/Oil%20and%20Gas.png';
    if (grp.includes('mill') || grp.includes('cold') || grp.includes('rolling')) return '../homepage%20images/Cold%20Rolling%20Mill.png';
    if (grp.includes('valve')) return '../homepage%20images/Valve.png';
    if (grp.includes('construction')) return '../homepage%20images/Construction%20machineries.png';
    if (grp.includes('printing')) return '../homepage%20images/High-Tech%20Printing%20Press%20Production%20Floor.webp';
    if (grp.includes('flexo') || grp.includes('delight') || grp.includes('master')) return '../homepage%20images/Golden-Hour%20Heavy%20Equipment%20Showcase.png';
    return '../homepage%20images/Precision%20Engineering.png';
  };

  // 4. CSV Parser
  const parseCsvToProducts = (csvText) => {
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
      const groupTitle = row[1] || '';
      const group = row[2] || '';
      const title = row[3] || '';

      if (idx === 0 && (url.toLowerCase() === 'url' || groupTitle.toLowerCase().includes('group'))) {
        continue;
      }

      const effectiveTitle = title || group;
      if (effectiveTitle && group) {
        items.push({ url, groupTitle, group, title: effectiveTitle });
      }
    }
    return items;
  };

  // 5. DOM Container Elements
  const dynamicContainer = document.getElementById('dynamicProductsContainer');

  // Modal Elements
  const modalBackdrop = document.getElementById('specsModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalImage = document.getElementById('modalImage');
  const modalDivision = document.getElementById('modalDivision');
  const modalDriveLink = document.getElementById('modalDriveLink');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  let allProducts = [...FALLBACK_PRODUCTS];
  let activeGroup = 'all';

  const updateDivisionHeader = (group) => {
    const titleEl = dynamicContainer ? dynamicContainer.querySelector('.division-title') : null;
    const subtitleEl = dynamicContainer ? dynamicContainer.querySelector('.division-subtitle') : null;
    if (!titleEl) return;

    if (!group || group.toLowerCase() === 'all') {
      titleEl.textContent = 'Precision Manufacturing & Converting Machinery Divisions';
      if (subtitleEl) {
        subtitleEl.textContent = 'High-precision manufactured components, tooling assemblies, and turnkey industrial fabrications.';
      }
    } else {
      const product = allProducts.find(p => p.group.toLowerCase() === group.toLowerCase());
      const divName = (product && product.groupTitle) ? product.groupTitle : 'Precision Manufacturing Division';
      titleEl.textContent = `${divName} • ${group}`;
      if (subtitleEl) {
        subtitleEl.textContent = `Showing manufactured components and heavy sub-assemblies for ${group}.`;
      }
    }
  };

  // 6. Render Products into DOM based on Hierarchy
  const renderCatalog = (products) => {
    if (!dynamicContainer) return;

    const groups = [...new Set(products.map(p => p.group).filter(Boolean))];

    // Compute counts per group
    const groupCounts = {};
    groups.forEach(g => {
      groupCounts[g] = products.filter(p => p.group === g).length;
    });

    // Check URL parameters on load
    const urlParams = new URLSearchParams(window.location.search);
    const paramGroup = urlParams.get('group');
    if (paramGroup) {
      if (paramGroup.toLowerCase() === 'all') {
        activeGroup = 'all';
      } else {
        const match = groups.find(g => g.trim().toLowerCase() === paramGroup.trim().toLowerCase());
        if (match) {
          activeGroup = match;
        }
      }
    }

    let currentDivisionTitle = 'Precision Manufacturing & Converting Machinery Divisions';
    let currentDivisionSubtitle = 'High-precision manufactured components, tooling assemblies, and turnkey industrial fabrications.';
    if (activeGroup !== 'all') {
      const activeProd = products.find(p => p.group.toLowerCase() === activeGroup.toLowerCase());
      const divName = (activeProd && activeProd.groupTitle) ? activeProd.groupTitle : 'Precision Manufacturing Division';
      currentDivisionTitle = `${divName} • ${activeGroup}`;
      currentDivisionSubtitle = `Showing manufactured components and heavy sub-assemblies for ${activeGroup}.`;
    }

    // Build HTML for Hierarchy
    let html = `
      <!-- LEVEL 2: GROUP TITLE (Child of Products Tab) -->
      <div class="division-header-box">
        <div class="division-info-left">
          <div class="division-badge-pill">
            <span>DIVISION CATALOG</span>
          </div>
          <h2 class="division-title">${escapeHtml(currentDivisionTitle)}</h2>
          <p class="division-subtitle">${escapeHtml(currentDivisionSubtitle)}</p>
        </div>
      </div>

      <!-- LEVEL 3: GROUP TABS (Child of Group Title) -->
      <div class="filter-tabs-container" role="tablist" aria-label="Product Groups" style="margin-top: 1.5rem;">
        <button type="button" class="filter-tab-btn ${activeGroup === 'all' ? 'active' : ''}" data-group="all" role="tab" aria-selected="${activeGroup === 'all'}">
          All Components <span class="tab-count">${products.length}</span>
        </button>
    `;

    groups.forEach(grp => {
      const isActive = activeGroup.toLowerCase() === grp.toLowerCase();
      html += `
        <button type="button" class="filter-tab-btn ${isActive ? 'active' : ''}" data-group="${escapeHtml(grp)}" role="tab" aria-selected="${isActive}">
          ${escapeHtml(grp)} <span class="tab-count">${groupCounts[grp] || 0}</span>
        </button>
      `;
    });

    html += `
      </div>

      <!-- LEVEL 4: PRODUCT CARDS GRID (Children of Group) -->
      <div class="products-grid" id="productsGrid">
    `;

    products.forEach((p, idx) => {
      const driveThumb = getDriveThumbnail(p.url, 'w800');
      const fallbackImg = getFallbackImage(p.group);

      html += `
        <article class="product-card" 
                 data-group="${escapeHtml(p.group)}" 
                 data-title="${escapeHtml(p.title)}" 
                 data-grouptitle="${escapeHtml(p.groupTitle)}"
                 data-index="${idx}"
                 title="Click to view ${escapeHtml(p.title)} details">
          <div class="product-img-wrapper">
            <img src="${driveThumb || fallbackImg}" 
                 alt="${escapeHtml(p.title)}" 
                 class="product-img" 
                 loading="lazy" 
                 onerror="this.onerror=null; this.src='${fallbackImg}';" />
            <div class="product-img-overlay"></div>
            <span class="product-group-badge">${escapeHtml(p.group)}</span>
          </div>

          <div class="product-content">
            <span class="product-division-subtext">${escapeHtml(p.groupTitle)}</span>
            <h3 class="product-title">${escapeHtml(p.title)}</h3>
            
            <div class="product-meta-row">
              <span class="meta-chip highlight">★ Precision Machined</span>
              <span class="meta-chip">100% QA Inspection</span>
            </div>
          </div>
        </article>
      `;
    });

    html += `</div>`;
    dynamicContainer.innerHTML = html;

    // Attach Tab Events
    const filterTabs = dynamicContainer.querySelectorAll('.filter-tab-btn');
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const selectedGroup = tab.getAttribute('data-group');
        window.selectProductGroup(selectedGroup, true);
      });
    });

    // Attach Modal triggers to full product card
    dynamicContainer.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', () => {
        const index = parseInt(card.getAttribute('data-index'), 10);
        openModal(allProducts[index]);
      });
    });

    applyFilters();
  };

  // 7. Filter Logic
  const applyFilters = () => {
    const cards = dynamicContainer ? dynamicContainer.querySelectorAll('.product-card') : [];
    cards.forEach(card => {
      const cardGroup = (card.getAttribute('data-group') || '').toLowerCase();
      const matchesGroup = (activeGroup === 'all' || cardGroup === activeGroup.toLowerCase());
      card.style.display = matchesGroup ? 'flex' : 'none';
    });
  };

  // 8. Global Group Selector (Used by Header Dropdown and Tab clicks)
  window.selectProductGroup = (groupName, updateHistory = true) => {
    if (!dynamicContainer) return;
    const filterTabs = dynamicContainer.querySelectorAll('.filter-tab-btn');
    if (!filterTabs.length) return;

    let targetGroup = 'all';
    if (groupName && groupName.toLowerCase() !== 'all') {
      const allTabs = Array.from(filterTabs);
      const match = allTabs.find(t => (t.getAttribute('data-group') || '').trim().toLowerCase() === groupName.trim().toLowerCase());
      if (match) {
        targetGroup = match.getAttribute('data-group');
      }
    }

    activeGroup = targetGroup;

    filterTabs.forEach(t => {
      const isTarget = (t.getAttribute('data-group') || '').toLowerCase() === activeGroup.toLowerCase();
      t.classList.toggle('active', isTarget);
      t.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    updateDivisionHeader(activeGroup);
    applyFilters();

    if (updateHistory) {
      const newUrl = activeGroup === 'all' ? 'products.html' : `products.html?group=${encodeURIComponent(activeGroup).replace(/%20/g, '+')}`;
      window.history.pushState(null, '', newUrl);
    }
  };

  window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const paramGroup = urlParams.get('group') || 'all';
    window.selectProductGroup(paramGroup, false);
  });

  // 9. Technical Specifications / Asset Modal
  const openModal = (product) => {
    if (!product || !modalBackdrop) return;

    if (modalCategory) modalCategory.textContent = product.group;
    if (modalTitle) modalTitle.textContent = product.title;
    if (modalDivision) modalDivision.textContent = product.groupTitle;

    const driveThumb = getDriveThumbnail(product.url, 'w1000');
    const fallback = getFallbackImage(product.group);
    if (modalImage) {
      modalImage.src = driveThumb || fallback;
      modalImage.alt = product.title;
      modalImage.onerror = () => {
        modalImage.src = fallback;
      };
    }

    if (modalDriveLink) {
      if (product.url && product.url.includes('drive.google.com')) {
        modalDriveLink.href = product.url;
        modalDriveLink.style.display = 'inline-flex';
      } else {
        modalDriveLink.style.display = 'none';
      }
    }

    if (modalInquireBtn) {
      modalInquireBtn.href = `mailto:info@echaar.com?subject=${encodeURIComponent(`Product Inquiry: ${product.title} - ${product.group} (${product.groupTitle})`)}`;
    }

    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });

  // 10. Fetch from Google Sheets live with multiple fallbacks
  const loadGoogleSheetsCatalog = async () => {
    try {
      const res = await fetch(JSON_URL);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const text = await res.text();
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) throw new Error('Invalid JSON from GViz');

      const data = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
      const rows = data.table?.rows || [];
      const fetchedItems = [];

      rows.forEach((r, idx) => {
        if (!r || !r.c) return;
        const url = r.c[0]?.v?.toString().trim() || '';
        const groupTitle = r.c[1]?.v?.toString().trim() || '';
        const group = r.c[2]?.v?.toString().trim() || '';
        const title = r.c[3]?.v?.toString().trim() || '';

        if (idx === 0 && (url.toLowerCase() === 'url' || groupTitle.toLowerCase().includes('group'))) {
          return;
        }

        const effectiveTitle = title || group;
        if (effectiveTitle && group) {
          fetchedItems.push({ url, groupTitle, group, title: effectiveTitle });
        }
      });

      if (fetchedItems.length > 0) {
        allProducts = fetchedItems;
        renderCatalog(allProducts);
        return;
      }
    } catch (jsonErr) {
      console.warn('Google Sheets JSON fetch error, trying CSV fallback...', jsonErr);
      try {
        const res = await fetch(CSV_URL);
        if (!res.ok) throw new Error(`CSV HTTP error ${res.status}`);
        const csvText = await res.text();
        const csvItems = parseCsvToProducts(csvText);
        if (csvItems.length > 0) {
          allProducts = csvItems;
          renderCatalog(allProducts);
          return;
        }
      } catch (csvErr) {
        console.warn('Google Sheets CSV fallback also failed, using embedded fallback data.', csvErr);
      }
    }

    // Default to embedded fallback data
    renderCatalog(allProducts);
  };

  // Initial immediate render with embedded data, then hydrate with live sheet data
  renderCatalog(allProducts);
  loadGoogleSheetsCatalog();
});
