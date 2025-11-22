const spotlightContainer = document.querySelector("#spotlight-container");

async function loadSpotlights() {
  const response = await fetch("data/members.json");
  const members = await response.json(); // JSON IS AN ARRAY

  // only silver (2) or gold (3)
  const premium = members.filter(
    m => m.membership === 2 || m.membership === 3
  );

  if (premium.length === 0) {
    spotlightContainer.innerHTML = "<p>No spotlight members found.</p>";
    return;
  }

  // shuffle randomly
  const shuffled = premium.sort(() => Math.random() - 0.5);

  // show 2 or 3
  const count = premium.length >= 3 ? 3 : premium.length;
  const selected = shuffled.slice(0, count);

  spotlightContainer.innerHTML = "";

  selected.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("spotlight-card");

    card.innerHTML = `
      <img src="${member.image}" alt="${member.name} logo">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="level ${member.membership === 3 ? "gold" : "silver"}">
        ${member.membership === 3 ? "Gold Member" : "Silver Member"}
      </p>
    `;

    spotlightContainer.appendChild(card);
  });
}

loadSpotlights();
