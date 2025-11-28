import { places } from "../data/discover.mjs";

const grid = document.getElementById("discoverGrid");
const visitMessage = document.getElementById("visitMessage");

function makeCard(place, index) {
  const card = document.createElement("article");
  card.className = "discover-card";
  card.style.gridArea = `a${index + 1}`; 

  card.innerHTML = `
    <h3>${place.title}</h3>
    <figure>
      <img src="${place.image}" alt="${place.title} photo" width="300" height="200" loading="lazy">
      <figcaption>${place.title}</figcaption>
    </figure>
    <address>${place.address}</address>
    <p>${place.description}</p>
    <button class="learn-more" aria-label="Learn more about ${place.title}">Learn more</button>
  `;
  return card;
}

function renderCards() {
  grid.innerHTML = "";
  places.forEach((p, i) => {
    const card = makeCard(p, i);
    grid.appendChild(card);
  });
}

function showVisitMessage() {
  try {
    const key = "wvc_last_visit";
    const now = Date.now();
    const raw = localStorage.getItem(key);
    if (!raw) {
      visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const prev = Number(raw);
      const diffMs = now - prev;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffMs < 1000 * 60 * 60 * 24) {
        visitMessage.textContent = "Back so soon! Awesome!";
      } else if (diffDays === 1) {
        visitMessage.textContent = "You last visited 1 day ago.";
      } else {
        visitMessage.textContent = `You last visited ${diffDays} days ago.`;
      }
    }
    localStorage.setItem(key, String(now));
  } catch (e) {
    console.error("localStorage error:", e);
  }
}

renderCards();
showVisitMessage();
