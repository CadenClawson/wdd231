const display = document.querySelector("#directory");
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");

let membersData = []; 

async function getMembers() {
  try {
    console.log("Fetching members.json from: data/members.json");
    const response = await fetch("data/members.json", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
  
    if (Array.isArray(data)) {
      membersData = data;
      console.log("members.json returned an array with", membersData.length, "entries.");
    } else if (data && Array.isArray(data.members)) {
      membersData = data.members;
      console.log("members.json returned an object with members array of length", membersData.length);
    } else {
      throw new Error("Unexpected JSON format. Expected an array or { members: [...] }");
    }

    displayMembers(membersData, "grid");
  } catch (err) {
    console.error("Error loading members:", err);
    display.innerHTML = `<p class="error">Sorry — could not load member data. Check console for details.</p>`;
  }
}

function displayMembers(members, viewType) {
 
  display.innerHTML = "";

  display.className = viewType === "grid" ? "grid" : "list";

  if (!members || members.length === 0) {
    display.innerHTML = "<p>No members to display.</p>";
    return;
  }

  members.forEach((member, index) => {
    const card = document.createElement("section");
    card.classList.add(viewType === "grid" ? "member-card" : "member-list-item");

    if (viewType === "grid" && member.image) {
      const img = document.createElement("img");
      img.src = member.image;
      img.alt = member.name + " image";
      img.loading = "lazy";
      card.appendChild(img);
    }

    const name = document.createElement("h3");
    name.textContent = member.name || "Unnamed business";

    const desc = document.createElement("p");
    desc.textContent = member.description || "";

    const addr = document.createElement("p");
    addr.textContent = member.address || "";

    const phone = document.createElement("p");
    phone.textContent = member.phone || "";

    const site = document.createElement("a");
    site.href = member.website || "#";
    site.textContent = "Visit Website";
    site.target = "_blank";
    site.rel = "noopener";

    card.appendChild(name);
    if (desc.textContent) card.appendChild(desc);
    if (addr.textContent) card.appendChild(addr);
    if (phone.textContent) card.appendChild(phone);
    card.appendChild(site);

    display.appendChild(card);
  });
}

gridBtn.addEventListener("click", () => {
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
  displayMembers(membersData, "grid");
});

listBtn.addEventListener("click", () => {
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
  displayMembers(membersData, "list");
});

getMembers();
