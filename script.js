// Sample ships.json data (to simulate the actual data structure)
const ships = {
  "marshal": {
    "name": "Marshal",
    "highSlots": [
      { "name": "Weapon System 1" },
      { "name": "Weapon System 2" },
      { "name": "Weapon System 3" },
      { "name": "Weapon System 4" }
    ]
  }
};

// Function to render the high slots
function renderHighSlots() {
  const ship = ships.marshal; // Getting Marshal ship data
  const highSlots = ship.highSlots; // Extracting high slot data

  const fittingMenu = document.getElementById('fitting-menu');
  const totalHighSlots = highSlots.length;

  // The range for the top quarter: 325° to 45°, i.e., 280° total
  const startAngle = 325;  // Starting angle for the first slot
  const angleStep = 280 / (totalHighSlots - 1);  // Distribute over the range

  // Dynamically create high slot elements
  highSlots.forEach((slot, index) => {
    const fittingItem = document.createElement('div');
    fittingItem.classList.add('fitting-item');

    // Calculate angle for each slot based on index
    const angle = startAngle + (angleStep * index);
    
    // Apply rotation and position based on angle
    fittingItem.style.transform = `rotate(${angle}deg) translateY(-130px)`;

    const slotName = document.createElement('span');
    slotName.textContent = slot.name;

    fittingItem.appendChild(slotName);
    fittingMenu.appendChild(fittingItem);
  });
}

// Call the function to render high slots
renderHighSlots();
