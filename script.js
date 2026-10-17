const rooms = [
  { id: 1, name: "Deluxe Room", type: "Deluxe", description: "A calm room with a queen bed and a work desk.", price: 3200, icon: "🛏️", guests: 2 },
  { id: 2, name: "Family Suite", type: "Suite", description: "Extra space for a comfortable family stay.", price: 5600, icon: "🛋️", guests: 4 },
  { id: 3, name: "Garden View", type: "View", description: "A bright room overlooking the garden.", price: 4100, icon: "🌿", guests: 2 }
];

const roomList = document.querySelector("#roomList");
const searchInput = document.querySelector("#roomSearch");
const emptyMessage = document.querySelector("#emptyMessage");
const toast = document.querySelector("#toast");

function renderRooms(query = "") {
  const filteredRooms = rooms.filter(room =>
    `${room.name} ${room.type} ${room.description}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  roomList.innerHTML = filteredRooms.map(room => `
    <article class="room-card">
      <div class="room-art" aria-hidden="true">${room.icon}</div>
      <div class="room-content">
        <h3>${room.name}</h3>
        <p>${room.description}</p>
        <p>Up to ${room.guests} guests</p>
        <div class="room-meta">
          <span class="price">₹${room.price.toLocaleString("en-IN")} <small>/ night</small></span>
          <button class="book-button" data-room="${room.name}">Book demo</button>
        </div>
      </div>
    </article>
  `).join("");

  emptyMessage.classList.toggle("hidden", filteredRooms.length > 0);
}

searchInput.addEventListener("input", event => renderRooms(event.target.value));

roomList.addEventListener("click", event => {
  const button = event.target.closest("[data-room]");
  if (!button) return;
  toast.textContent = `Demo only: ${button.dataset.room} selected. No reservation was created.`;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2800);
});

renderRooms();
