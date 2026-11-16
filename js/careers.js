/**
 * careers.js - Dynamic Careers Page fetched from Google Sheets
 * Echaar Equipments Pvt. Ltd.
 * Spreadsheet ID: 11fGoU7WbGkKBaFy4hjnu2LpKTdgPFhW1eOxXWXkU658 | gid: 1074809507
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Google Sheets Configuration
  const SHEET_ID = '11fGoU7WbGkKBaFy4hjnu2LpKTdgPFhW1eOxXWXkU658';
  const GID = '1074809507';
  const JSON_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`;

  // 2. Embedded Fallback Data matching the Google Spreadsheet
  const FALLBACK_JOBS = [
    {
      post: 'Department Head',
      department: 'Machine Shop',
      vacancies: '5',
      qualification: 'B.Tech Mechanical',
      experience: '5+ Years',
      location: 'Gujrat',
      description: 'A dynamic person carrying pleasant personality with an extraordinary communication and inter personnel skills with an experience of 8+ years in handling key corporate branches. The person is responsible to take care the assigned key accounts in terms of approaching, understanding requirements, efficient and result oriented liasoning between the account and company for all kind of pre-sales and after sales activities. Ultimate goal would be to establish very strong and long lasting relationship with sales and service.',
      applyUrl: 'https://google.com'
    }
  ];

  // 3. DOM Elements
  const jobsContainer = document.getElementById('jobsContainer');
  const emptyState = document.getElementById('jobsEmptyState');

  // Modal Elements
  const jobModal = document.getElementById('jobModal');
  const jobModalClose = document.getElementById('jobModalClose');
  const modalJobDept = document.getElementById('modalJobDept');
  const modalJobTitle = document.getElementById('modalJobTitle');
  const modalJobVacancies = document.getElementById('modalJobVacancies');
  const modalJobQualification = document.getElementById('modalJobQualification');
  const modalJobExperience = document.getElementById('modalJobExperience');
  const modalJobLocation = document.getElementById('modalJobLocation');
  const modalJobDescription = document.getElementById('modalJobDescription');
  const modalApplyLink = document.getElementById('modalApplyLink');
  const modalEmailApply = document.getElementById('modalEmailApply');

  let allJobs = [...FALLBACK_JOBS];

  // 4. Helper: Sanitize Strings & Links
  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const sanitizeUrl = (rawUrl, jobTitle = '') => {
    if (!rawUrl) {
      return `mailto:careers@echaar.com?subject=${encodeURIComponent(`Application for ${jobTitle}`)}`;
    }
    const trimmed = rawUrl.trim();
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }
    if (trimmed.includes('.') && !trimmed.includes(' ')) {
      return `https://${trimmed}`;
    }
    return `mailto:careers@echaar.com?subject=${encodeURIComponent(`Application for ${jobTitle}`)}`;
  };

  // 5. CSV Parser
  const parseCsvToJobs = (csvText) => {
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
      const post = row[0] || '';
      const department = row[1] || '';
      const vacancies = row[2] || '';
      const qualification = row[3] || '';
      const experience = row[4] || '';
      const location = row[5] || '';
      const description = row[6] || '';
      const applyUrl = row[7] || '';

      // Skip header row
      if (idx === 0 && (post.toLowerCase() === 'post' || department.toLowerCase() === 'department')) {
        continue;
      }

      if (post && department) {
        items.push({
          post,
          department,
          vacancies: vacancies || '',
          qualification: qualification || '',
          experience: experience || '',
          location: location || '',
          description: description || '',
          applyUrl: sanitizeUrl(applyUrl, post)
        });
      }
    }
    return items;
  };

  // 6. Render Job Board
  const renderJobBoard = (jobs) => {
    if (!jobsContainer) return;

    if (!jobs || jobs.length === 0) {
      jobsContainer.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) {
      emptyState.style.display = 'none';
    }

    // Render Job Cards Grid
    let cardsHtml = '';
    jobs.forEach((job, index) => {
      const vacanciesText = job.vacancies ? `${escapeHtml(job.vacancies)} ${parseInt(job.vacancies, 10) === 1 ? 'Opening' : 'Openings'}` : 'Open';
      const cleanApplyUrl = sanitizeUrl(job.applyUrl, job.post);

      cardsHtml += `
        <article class="job-card" data-department="${escapeHtml(job.department)}" data-index="${index}">
          <div class="job-card-header">
            <div class="job-badges-group">
              <span class="job-dept-badge">${escapeHtml(job.department)}</span>
              <span class="job-vacancies-badge">${vacanciesText}</span>
            </div>
          </div>

          <h3 class="job-post-title">${escapeHtml(job.post)}</h3>

          <div class="job-specs-grid">
            <div class="job-spec-item">
              <span class="spec-label">📍 Location</span>
              <span class="spec-value">${escapeHtml(job.location)}</span>
            </div>
            <div class="job-spec-item">
              <span class="spec-label">⏱ Experience</span>
              <span class="spec-value">${escapeHtml(job.experience)}</span>
            </div>
            <div class="job-spec-item">
              <span class="spec-label">🎓 Qualification</span>
              <span class="spec-value">${escapeHtml(job.qualification)}</span>
            </div>
          </div>

          <div class="job-desc-block">
            <span class="job-desc-heading">Job Description</span>
            <p class="job-desc-text">${escapeHtml(job.description)}</p>
          </div>

          <div class="job-actions-row">
            <a href="${cleanApplyUrl}" target="_blank" rel="noopener noreferrer" class="btn-job-apply" title="Apply for ${escapeHtml(job.post)}">
              Apply Now ↗
            </a>
            <button type="button" class="btn-job-details" data-index="${index}" aria-label="View details for ${escapeHtml(job.post)}">
              View Details
            </button>
          </div>
        </article>
      `;
    });

    jobsContainer.innerHTML = cardsHtml;

    // Attach Details Modal Triggers
    jobsContainer.querySelectorAll('.btn-job-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const index = parseInt(btn.getAttribute('data-index'), 10);
        openJobModal(allJobs[index]);
      });
    });
  };

  // 8. Job Details Modal Management
  const openJobModal = (job) => {
    if (!job || !jobModal) return;

    if (modalJobDept) modalJobDept.textContent = job.department;
    if (modalJobTitle) modalJobTitle.textContent = job.post;
    if (modalJobVacancies) modalJobVacancies.textContent = job.vacancies || 'Open';
    if (modalJobQualification) modalJobQualification.textContent = job.qualification || 'N/A';
    if (modalJobExperience) modalJobExperience.textContent = job.experience || 'N/A';
    if (modalJobLocation) modalJobLocation.textContent = job.location || 'Gujrat';
    if (modalJobDescription) {
      modalJobDescription.innerHTML = `<p>${escapeHtml(job.description)}</p>`;
    }

    const cleanApplyUrl = sanitizeUrl(job.applyUrl, job.post);
    if (modalApplyLink) {
      modalApplyLink.href = cleanApplyUrl;
    }

    if (modalEmailApply) {
      const subject = encodeURIComponent(`Application for ${job.post} - ${job.department}`);
      const body = encodeURIComponent(
        `Dear HR Team,\n\nI am applying for the position of "${job.post}" in the "${job.department}" department at Echaar Equipments Pvt. Ltd.\n\nQualifications: ${job.qualification}\nExperience: ${job.experience}\nLocation: ${job.location}\n\nPlease find attached my updated resume for your review.\n\nBest regards,\n[Your Name]\n[Contact Details]`
      );
      modalEmailApply.href = `mailto:careers@echaar.com?subject=${subject}&body=${body}`;
    }

    jobModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  const closeJobModal = () => {
    if (!jobModal) return;
    jobModal.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  if (jobModalClose) jobModalClose.addEventListener('click', closeJobModal);
  if (jobModal) {
    jobModal.addEventListener('click', (e) => {
      if (e.target === jobModal) closeJobModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && jobModal && jobModal.classList.contains('is-open')) {
      closeJobModal();
    }
  });

  // 9. Fetch Live Google Sheet Data
  const fetchCareersFromGoogleSheets = async () => {
    try {
      const res = await fetch(JSON_URL);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const text = await res.text();
      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');
      if (jsonStart === -1 || jsonEnd === -1) throw new Error('Invalid GViz JSON');

      const data = JSON.parse(text.substring(jsonStart, jsonEnd + 1));
      const rows = data.table?.rows || [];
      const fetched = [];

      rows.forEach((r, idx) => {
        if (!r || !r.c) return;
        const post = r.c[0]?.v?.toString().trim() || '';
        const department = r.c[1]?.v?.toString().trim() || '';
        const vacancies = r.c[2]?.v?.toString().trim() || '';
        const qualification = r.c[3]?.v?.toString().trim() || '';
        const experience = r.c[4]?.v?.toString().trim() || '';
        const location = r.c[5]?.v?.toString().trim() || '';
        const description = r.c[6]?.v?.toString().trim() || '';
        const applyUrl = r.c[7]?.v?.toString().trim() || '';

        // Skip header
        if (idx === 0 && (post.toLowerCase() === 'post' || department.toLowerCase() === 'department')) {
          return;
        }

        if (post && department) {
          fetched.push({
            post,
            department,
            vacancies: vacancies || '',
            qualification: qualification || '',
            experience: experience || '',
            location: location || '',
            description: description || '',
            applyUrl: sanitizeUrl(applyUrl, post)
          });
        }
      });

      if (fetched.length > 0) {
        allJobs = fetched;
        renderJobBoard(allJobs);
        return;
      }
    } catch (jsonErr) {
      console.warn('GViz JSON fetch failed, attempting CSV endpoint...', jsonErr);
      try {
        const res = await fetch(CSV_URL);
        if (!res.ok) throw new Error(`CSV HTTP ${res.status}`);
        const csvText = await res.text();
        const csvJobs = parseCsvToJobs(csvText);
        if (csvJobs.length > 0) {
          allJobs = csvJobs;
          renderJobBoard(allJobs);
          return;
        }
      } catch (csvErr) {
        console.warn('CSV fallback failed, falling back to embedded jobs data.', csvErr);
      }
    }

    // Default to fallback data
    renderJobBoard(allJobs);
  };

  // Initial immediate render with fallback, followed by live hydration
  renderJobBoard(allJobs);
  fetchCareersFromGoogleSheets();
});
