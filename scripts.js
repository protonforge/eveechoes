const ship = {
    name: "Marshal",
    hull: 25000,
    shield: 20000,
    powergrid: 10000,
    slots: {
        high: 8,
        mid: 6,
        low: 5,
        drone: 2
    }
};

const modules = [
    { name: "Concord Large Pulse Laser", type: "Weapon", slotType: "High", powergrid: 2500, damage: 850 },
    { name: "Gist X-Type Large Shield Booster", type: "Shield Booster", slotType: "Mid", powergrid: 500, shieldBoost: 1200 },
    { name: "Republic Fleet Gyrostabilizer", type: "Damage Modifier", slotType: "Low", powergrid: 10, damageBonus: 1.1 },
    { name: "Caldari Navy Wasp", type: "Drone", slotType: "Drone", damage: 500 }
];

let selectedSlot = null;

// Initialize slots
function createSlots() {
    Object.keys(ship.slots).forEach(slotType => {
        const container = document.getElementById(`${slotType}-slots`);
        for (let i = 0; i < ship.slots[slotType]; i++) {
            const slot = document.createElement("div");
            slot.classList.add("slot");
            slot.textContent = `${slotType} Slot`;
            slot.dataset.slotType = slotType;
            slot.onclick = () => openModuleSelection(slot);
            container.appendChild(slot);
        }
    });
}

// Open module selection
function openModuleSelection(slot) {
    selectedSlot = slot;
    document.getElementById("module-list").innerHTML = "";
    
    const slotType = slot.dataset.slotType;
    const compatibleModules = modules.filter(m => m.slotType.toLowerCase() === slotType);

    compatibleModules.forEach(module => {
        const moduleDiv = document.createElement("div");
        moduleDiv.classList.add("module");
        moduleDiv.textContent = module.name;
        moduleDiv.onclick = () => fitModule(module);
        document.getElementById("module-list").appendChild(moduleDiv);
    });

    document.getElementById("module-selection").classList.remove("hidden");
}

// Fit module into slot
function fitModule(module) {
    if (!selectedSlot) return;

    selectedSlot.textContent = module.name;
    updateStats(module);

    closeModuleSelection();
}

// Update ship stats
function updateStats(module) {
    if (module.shieldBoost) {
        let shield = document.getElementById("shield");
        shield.textContent = parseInt(shield.textContent) + module.shieldBoost;
    }
    
    if (module.damage) {
        let hull = document.getElementById("hull");
        hull.textContent = parseInt(hull.textContent) + module.damage;
    }
    
    if (module.powergrid) {
        let powergrid = document.getElementById("powergrid");
        powergrid.textContent = parseInt(powergrid.textContent) - module.powergrid;
    }
}

// Close module selection
function closeModuleSelection() {
    document.getElementById("module-selection").classList.add("hidden");
}

createSlots();
