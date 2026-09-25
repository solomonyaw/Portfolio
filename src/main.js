/**
 * Solomon Yaw Adeklo - Personal Portfolio JavaScript
 * Strictly Vanilla JavaScript (No Frameworks)
 */

// ==========================================
// 1. PROJECTS DATA
// Easily add or modify affiliate projects here.
// The website automatically generates cards from this array.
// ==========================================
const projects = [
  {
    id: "jetup",
    title: "Jetup",
    verifiedPartner: true,
    partnerBadgeText: "Verified Partner",
    logos: [
      {
        name: "Jetup",
        src: "/assets/images/jetup-logo.svg",
        fallback: "/assets/images/jetup-logo.png"
      },
      {
        name: "TAG Markets",
        src: "/assets/images/tag-markets-logo.svg",
        fallback: "/assets/images/tag-markets-logo.png"
      },
      {
        name: "Sonic AI",
        src: "/assets/images/sonic-ai-logo.svg",
        fallback: "/assets/images/sonic-ai-logo.png"
      }
    ],
    description: "I am a verified partner of Jetup where we promote copy trading among people with little or no experience in forex trading. Experienced traders can also take advantage. Jetup utilizes a ten-level deep multi-level marketing network structure for its compensation plan. If you want a pathway to financial freedom then Jetup is that solution.",
    disclaimer: "Risk Disclaimer: Copy trading and forex trading involve financial risk. Past performance does not guarantee future results. Please conduct your own research and understand the risks before participating.",
    website: "https://www.jetup.website/",
    displayUrl: "www.jetup.website",
    flyer: "/assets/images/jetup-flyer.jpg",
    flyerAlt: "Jetup Copy Trading Promotional Flyer - Trade Smarter Not Harder"
  }
];

// ==========================================
// 2. PROJECT CARD GENERATOR
// Renders project cards dynamically into #projects-container
// ==========================================
function renderProjects(items) {
  const container = document.getElementById("projects-container");
  if (!container) return;

  container.innerHTML = items.map((proj) => {
    // Generate logos HTML
    const logosHtml = proj.logos.map((logo) => `
      <div class="logo-badge" title="${logo.name}">
        <img
          src="${logo.src}"
          alt="${logo.name} logo"
          onerror="if(this.src !== '${logo.fallback}') this.src='${logo.fallback}';"
        />
      </div>
    `).join("");

    // Generate verified badge HTML
    const badgeHtml = proj.verifiedPartner ? `
      <div class="verified-badge">
        <span class="badge-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <span>${proj.partnerBadgeText || "Verified Partner"}</span>
      </div>
    ` : "";

    // Generate disclaimer HTML
    const disclaimerHtml = proj.disclaimer ? `
      <div class="risk-disclaimer">
        <span class="risk-icon">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </span>
        <div>
          <strong>Risk Disclaimer:</strong> ${proj.disclaimer.replace(/^Risk Disclaimer:\s*/i, "")}
        </div>
      </div>
    ` : "";

    return `
      <article class="project-card" data-project-id="${proj.id}">
        <div class="project-grid">
          
          <!-- Left Column: Information -->
          <div class="project-info">
            ${badgeHtml}
            <h3 class="project-name">${proj.title}</h3>
            
            <div class="logos-row">
              ${logosHtml}
            </div>

            <p class="project-description">
              ${proj.description}
            </p>

            ${disclaimerHtml}

            <div class="project-actions">
              <a
                href="${proj.website}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary"
              >
                <span>Learn More</span>
                <svg viewBox="0 0 24 24" fill="none">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>

              <a
                href="${proj.website}"
                target="_blank"
                rel="noopener noreferrer"
                class="website-link"
              >
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
                <span>${proj.displayUrl}</span>
              </a>
            </div>
          </div>

          <!-- Right Column: Promotional Flyer -->
          <div class="flyer-wrapper">
            <div
              class="flyer-card"
              role="button"
              tabindex="0"
              aria-label="Click to enlarge flyer for ${proj.title}"
              onclick="openFlyerModal('${proj.flyer}', '${proj.title} Promotional Flyer', '${proj.website}', '${proj.displayUrl}')"
              onkeydown="if(event.key === 'Enter' || event.key === ' ') { openFlyerModal('${proj.flyer}', '${proj.title} Promotional Flyer', '${proj.website}', '${proj.displayUrl}'); }"
            >
              <img
                src="${proj.flyer}"
                alt="${proj.flyerAlt}"
                class="flyer-img"
                loading="lazy"
              />
              <div class="flyer-overlay">
                <span class="flyer-badge">
                  <svg viewBox="0 0 24 24" fill="none">
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <polyline points="9 21 3 21 3 15"></polyline>
                    <line x1="21" y1="3" x2="14" y2="10"></line>
                    <line x1="3" y1="21" x2="10" y2="14"></line>
                  </svg>
                  <span>Click to view flyer</span>
                </span>
              </div>
            </div>
            <div class="flyer-hint">Click flyer to inspect full size</div>
          </div>

        </div>
      </article>
    `;
  }).join("");
}

// ==========================================
// 3. LIGHTBOX MODAL FUNCTIONALITY
// ==========================================
function openFlyerModal(imgSrc, title, websiteUrl, displayUrl) {
  const modal = document.getElementById("flyer-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalLink = document.getElementById("modal-visit-link");

  if (!modal || !modalImg) return;

  modalImg.src = imgSrc;
  modalImg.alt = title;
  if (modalTitle) modalTitle.textContent = title;
  if (modalLink) {
    modalLink.href = websiteUrl;
    modalLink.innerHTML = `<span>Visit ${displayUrl}</span> <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>`;
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeFlyerModal() {
  const modal = document.getElementById("flyer-modal");
  if (!modal) return;
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// Expose open/close functions globally for inline handlers
window.openFlyerModal = openFlyerModal;
window.closeFlyerModal = closeFlyerModal;

// ==========================================
// 4. COPY TO CLIPBOARD & TOAST
// ==========================================
function copyToClipboard(text, label, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied ${label} to clipboard!`);
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(`Copied ${label} to clipboard!`);
  } catch (err) {
    console.error("Copy failed", err);
  }
  document.body.removeChild(textArea);
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

window.copyToClipboard = copyToClipboard;

// ==========================================
// 5. DOM INITIALIZATION & EVENT LISTENERS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  // Render projects
  renderProjects(projects);

  // Header scroll state
  const header = document.querySelector(".site-header");
  const backToTopBtn = document.getElementById("btn-back-to-top");

  // Navigation Links
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");
  const sections = ["home", "about", "projects", "contact"].map((id) => document.getElementById(id)).filter(Boolean);

  function onScroll() {
    const scrollY = window.scrollY;

    // Header background blur on scroll
    if (header) {
      if (scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 300) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    }

    // Active navigation highlight
    const scrollPosition = scrollY + 140;
    let currentId = "home";

    for (const section of sections) {
      if (scrollPosition >= section.offsetTop) {
        currentId = section.id;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href === `#${currentId}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // Run once initially

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close mobile nav when clicking a link
    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Smooth scroll offset navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 75;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Modal backdrop click to close
  const modal = document.getElementById("flyer-modal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeFlyerModal();
      }
    });
  }

  // Escape key to close modal or mobile menu
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeFlyerModal();
      if (mobileNav && mobileNav.classList.contains("open")) {
        mobileNav.classList.remove("open");
        if (menuToggle) menuToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Back to top button action
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }
});
