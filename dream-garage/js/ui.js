// js/ui.js
import { toggleFavorite, getFavorites } from './storage.js';
import { openModal } from './modal.js';

function createCard(car) {
  const favs = getFavorites();
  const isFav = favs.includes(car.id);

  return `
    <article class="card" data-id="${car.id}">
      <img class="thumb" loading="lazy" src="${car.img}" alt="${car.make} ${car.model} thumbnail" />
      <h3>${car.make} ${car.model} <small>(${car.year})</small></h3>
      <p><strong>Engine:</strong> ${car.engine}</p>
      <p><strong>HP:</strong> ${car.horsepower} &nbsp; <strong>Drivetrain:</strong> ${car.drivetrain}</p>

      <div class="tools">
        <button 
          class="details-btn" 
          aria-label="View details for ${car.make} ${car.model}">
          Details
        </button>

        <button 
          class="heart-btn ${isFav ? 'favorited' : ''}" 
          aria-pressed="${isFav}" 
          title="Toggle favorite">
          ♥
        </button>
      </div>
    </article>
  `;
}

export function renderCatalog(cars) {
  const container = document.getElementById('catalog') 
                   || document.getElementById('favorites');

  container.innerHTML = cars.map(createCard).join('');

  // open modal
  container.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.card');
      const id = card.dataset.id;
      const car = cars.find(c => c.id === id);
      openModal(renderDetails(car), `${car.make} ${car.model}`);
    });
  });

  // favorite toggle
  container.querySelectorAll('.heart-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const card = e.target.closest('.card');
      const id = card.dataset.id;

      const favs = toggleFavorite(id);

      // update UI for all matching cards (catalog + favorites page)
      document.querySelectorAll(`.card[data-id="${id}"] .heart-btn`)
        .forEach(b => {
          const active = favs.includes(id);
          b.classList.toggle('favorited', active);
          b.setAttribute('aria-pressed', String(active));
        });
    });
  });
}

function renderDetails(car) {
  return `
    <h2>${car.make} ${car.model} (${car.year})</h2>
    <img class="thumb" src="${car.img}" loading="lazy" alt="${car.make} ${car.model}" />
    <p><strong>Engine:</strong> ${car.engine}</p>
    <p><strong>Horsepower:</strong> ${car.horsepower}</p>
    <p><strong>Drivetrain:</strong> ${car.drivetrain}</p>
    <p><em>Car ID: ${car.id}</em></p>
  `;
}

export function initCatalogUI() {
  // keyboard or future expansion
}
