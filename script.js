document.getElementById("year").textContent = new Date().getFullYear();

// Scroll-reveal animation (must exist before anything calls observeReveals)
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);

function observeReveals() {
  document.querySelectorAll("[data-reveal]:not(.in-view)").forEach((el) => {
    revealObserver.observe(el);
  });
}

observeReveals();

// Video cards, featured row, and game filters
const grid = document.getElementById("videoGrid");
const featuredGrid = document.getElementById("featuredGrid");
const featuredBlock = document.getElementById("featuredBlock");
const filterRow = document.getElementById("videoFilters");

function createVideoCard(video, i) {
  const card = document.createElement("a");
  card.className = "video-card";
  card.href = `https://www.youtube.com/watch?v=${video.id}`;
  card.target = "_blank";
  card.rel = "noopener";
  card.setAttribute("data-reveal", "");
  card.style.setProperty("--d", `${(i % 4) * 0.08}s`);
  card.innerHTML = `
    <div class="thumb-wrap">
      <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}" loading="lazy" />
      <span class="play-icon">&#9658;</span>
    </div>
    <div class="video-info">
      <span class="video-category">${video.game}</span>
      <h3 class="video-title">${video.title}</h3>
    </div>
  `;
  return card;
}

function renderFeatured() {
  const featured = VIDEOS.filter((v) => v.featured);
  if (!featured.length) {
    featuredBlock.style.display = "none";
    return;
  }
  featuredGrid.innerHTML = "";
  featured.forEach((video, i) => featuredGrid.appendChild(createVideoCard(video, i)));
}

let activeGame = "All";

function renderGrid() {
  const list = activeGame === "All" ? VIDEOS : VIDEOS.filter((v) => v.game === activeGame);
  grid.innerHTML = "";
  list.forEach((video, i) => grid.appendChild(createVideoCard(video, i)));
  observeReveals();
}

function renderFilters() {
  const games = ["All", ...new Set(VIDEOS.map((v) => v.game))];
  filterRow.innerHTML = "";
  games.forEach((game) => {
    const pill = document.createElement("button");
    pill.className = "filter-pill";
    pill.textContent = game;
    pill.classList.toggle("active", game === activeGame);
    pill.addEventListener("click", () => {
      activeGame = game;
      filterRow.querySelectorAll(".filter-pill").forEach((p) => {
        p.classList.toggle("active", p.textContent === game);
      });
      renderGrid();
    });
    filterRow.appendChild(pill);
  });
}

renderFeatured();
renderFilters();
renderGrid();
observeReveals();

// Sticky navbar shadow on scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 10);
});

// Mobile menu toggle
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  menuToggle.classList.toggle("open");
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.classList.remove("open");
  });
});
