let tracker = { survival: 100, morality: 0, activeNode: "act1_start" };

const narrativeMatrix = {
    act1_start: {
        text: "Musa snaps awake. His scar pulses bright gold. Around his luxury penthouse apartment, furniture is levitating—transmuting entirely into solid gold bullion. Your out-of-control magic is breaking the room's physical structure.",
        name: "Musa",
        bg: "apartment.png", 
        choices: [
            { text: "✨ Absorb the wealth-magic to protect the building", target: "act1_hero_absorb" },
            { text: "💥 Detonate the golden structures to force a way out", target: "act1_villain_detonate" }
        ]
    },
    act1_hero_absorb: {
        text: "You channel the raw wealth-magic safely back into your core. The floating objects settle, but the intense physical drain makes your pulse race wildly.",
        name: "System",
        bg: "apartment.png", 
        flash: "#ffcc00",
        vibrate:, // High-performance Android double pulse
        deltaStat: { survival: -15, morality: 10 },
        choices: [{ text: "Head down into the rain-slicked city alleys", target: "act1_alley_entry" }]
    },
    act1_villain_detonate: {
        text: "You smile coldly and detonate the structures. Gold shrapnel bursts outward, obliterating the wall. You drop smoothly down into the wet concrete corridors below.",
        name: "Narrator",
        bg: "apartment.png", 
        flash: "#ff3333",
        vibrate:, // Heavy crash haptic rumble
        deltaStat: { survival: 0, morality: -10 },
        choices: [{ text: "Step out into the smoky back alleys", target: "act1_alley_entry" }]
    },
    act1_alley_entry: {
        text: "Cold rain pours down. Suddenly, an elite assassin from the Ministry of Wealth steps from the shadows, blocking your path with an activated glowing runic blade.",
        name: "Alchemist Assassin",
        bg: "alley.png", 
        choices: [
            { text: "🛡️ Raise a protective gold shield and question them", target: "act1_hero_shield" },
            { text: "⚡ Infuse their heavy armor with dense magic, crushing them", target: "act1_villain_crush" }
        ]
    },
    act1_hero_shield: {
        text: "Your shield blocks their strike! The magic collision creates a blinding white flash. The assassin jumps backward into the dark, leaving you bleeding but uncorrupted.",
        name: "Narrator",
        bg: "alley.png", 
        flash: "#ffffff",
        vibrate:, // Fight clashing rhythm
        deltaStat: { survival: -20, morality: 15 },
        choices: [{ text: "Stumble forward into the deeper streets", target: "act2_intro" }]
    },
    act1_villain_crush: {
        text: "Their iron gear transforms into solid, heavy gold bullion, crushing them instantly to the wet asphalt. A purple shockwave clears the rain. You walk past without looking back.",
        name: "Narrator",
        bg: "alley.png", 
        flash: "#800080",
        vibrate:, // Twin bone crushing impacts
        deltaStat: { survival: 5, morality: -20 },
        choices: [{ text: "March forward to claim your kingdom", target: "act2_intro" }]
    },
    act2_intro: {
        text: "The city sirens begin to wail across the high-rise grid. The Ministry knows an unsanctioned gold Lord is active. Red drone sensors sweep the brick walls above you.",
        name: "Suit AI",
        bg: "alley.png", 
        choices: [
            { text: "🕵️‍♂️ Slip into the neon underground subway system", target: "act2_subway" },
            { text: "🗼 Climb the external fire escape to cross the rooftops", target: "act2_rooftops" }
        ]
    },
    act2_subway: {
        text: "You drop down the shaking metallic steps. The train platform is dark, but ancient magical wards hum beneath the third rail. Suddenly, your closest friend and mentor, Albus Kojo, appears near the shadows.",
        name: "Narrator",
        bg: "alley.png", 
        choices: [{ text: "Approach Albus for help escaping the grid", target: "act2_betrayal" }]
    },
    act2_rooftops: {
        text: "The wind rips across your wet wizard robes. As you scale the high scaffolding, an automated sniper drone locks onto your gold-scar energy signature!",
        name: "System",
        bg: "apartment.png", 
        flash: "#ff3333",
        vibrate:,
        deltaStat: { survival: -25 },
        choices: [
            { text: "Cast an acceleration charm to jump the gap", target: "act2_roof_jump" },
            { text: "Transmute the roof scaffolding into a solid defensive bunker", target: "act2_roof_bunker" }
        ]
    },
    act2_roof_jump: {
        text: "You sprint and leap across the massive urban gap. You crash through a glass skylight, landing directly inside the old subway tunnels below.",
        name: "Musa",
        bg: "alley.png",
        vibrate:,
        deltaStat: { survival: -10 },
        choices: [{ text: "Recover and look around the dark train tunnels", target: "act2_subway" }]
    },
    act2_roof_bunker: {
        text: "The iron structural beams turn to solid gold shielding, absorbing the sniper blast perfectly. You slide down the ventilation shaft right onto the underground train platform.",
        name: "Narrator",
        bg: "apartment.png",
        vibrate:,
        choices: [{ text: "Step onto the quiet concrete platform", target: "act2_subway" }]
    },
    act2_betrayal: {
        text: "Albus Kojo looks at you with sorrow, holding a binding magic seal. 'Forgive me, Musa. The Ministry offered me infinite resources. Your gold magic threatens the stability of the entire wizard economy.'",
        name: "Albus Kojo",
        bg: "alley.png", 
        flash: "#ffcc00",
        vibrate:,
        choices: [
            { text: "🤝 Try to reason with Albus and surrender peaceful terms", target: "act2_hero_surrender" },
            { text: "🗡️ Unleash a lethal golden curse directly into his chest", target: "act2_villain_kill" }
        ]
    },
    act2_hero_surrender: {
        text: "You lower your wand. Albus steps forward and locks the glowing runic cuffs onto your wrists. The heavy binding spells snap into place, stripping your stats significantly.",
        name: "Narrator",
        bg: "alley.png",
        vibrate:,
        deltaStat: { survival: -30, morality: 25 },
        choices: [{ text: "Enter the transport vehicle toward the Ministry Vaults", target: "act3_intro" }]
    },
    act2_villain_kill: {
        text: "Zero hesitation. Your golden curse strikes Albus dead-center. His body transmutes into a cold, lifeless gold statue on the concrete floor. You take his master keycard from his hands.",
        name: "Musa",
        bg: "alley.png",
        flash: "#ff3333",
        vibrate:,
        deltaStat: { survival: 0, morality: -30 },
        choices: [{ text: "Use his card to break into the Ministry Vault networks", target: "act3_intro" }]
    },
    act3_intro: {
        text: "You stand before the heavy vault gates of the Neo-Ministry Bank. Millions of gold coins hum with stored magical current. This is the source of their absolute tracking dominion.",
        name: "System",
        bg: "apartment.png", 
        choices: [
            { text: "Continue the deep campaign story...", target: "act1_start" } 
        ]
    },
    defeat: {
        text: "Your survival vitality hits 0%. The golden tracking runes on your skin shatter as your life force fades into the dark rain.",
        name: "System",
        bg: "alley.png",
        flash: "#ff0000",
        vibrate:,
        choices: []
    }
};

function startGameFromMenu() {
    // Android 10+ requires an active user tap gesture before allowing haptic feedback or storage hooks
    triggerVibration([100, 50, 100]); 
    const startScreen = document.getElementById("main-menu-screen");
    if (startScreen) {
        startScreen.style.opacity = "0";
        setTimeout(() => { startScreen.style.display = "none"; }, 500);
    }
    drawScreen("act1_start");
}

function toggleSaveMenu() {
    const overlay = document.getElementById("save-menu-overlay");
    if (overlay) {
        overlay.style.display = (overlay.style.display === "flex") ? "none" : "flex";
    }
}

function executeSaveGame() {
    localStorage.setItem("musa_chronicles_save", JSON.stringify(tracker));
    alert("PROGRESS LOGGED SUCCESSFULLY");
    toggleSaveMenu();
}

function executeLoadGame() {
    const saved = localStorage.getItem("musa_chronicles_save");
    if (saved) {
        tracker = JSON.parse(saved);
        const startScreen = document.getElementById("main-menu-screen");
        if(startScreen) startScreen.style.display = "none";
        drawScreen(tracker.activeNode);
        const overlay = document.getElementById("save-menu-overlay");
        if(overlay) overlay.style.display = "none";
    } else {
        alert("NO LOG DATA LOCATED");
    }
}

function performFlashTransition(color) {
    const overlay = document.getElementById("flash-overlay");
    if (!overlay) return;
    overlay.style.backgroundColor = color;
    overlay.style.opacity = "0.8";
    setTimeout(() => {
        overlay.style.transition = "opacity 0.5s ease-in-out";
        overlay.style.opacity = "0";
        setTimeout(() => { overlay.style.transition = "opacity 0.1s ease-out"; }, 500);
    }, 100);
}

function triggerVibration(pattern) {
    if ("vibrate" in navigator && pattern) { 
        navigator.vibrate(pattern); 
    }
}

function drawScreen(nodeKey) {
    const data = narrativeMatrix[nodeKey];
    if (!data) return;

    tracker.activeNode = nodeKey;

    if (data.flash) performFlashTransition(data.flash);
    if (data.vibrate) triggerVibration(data.vibrate);

    if (data.deltaStat) {
        if (data.deltaStat.survival) tracker.survival += data.deltaStat.survival;
        if (data.deltaStat.morality) tracker.morality += data.deltaStat.morality;
        
tracker.survival = Math.max(0, Math.min(100, tracker.survival));document.getElementById("stat-survival").innerText = tracker.survival;let alignmentText = "NEUTRAL";if (tracker.morality > 5) alignmentText = "HERO";if (tracker.morality < -5) alignmentText = "RUTHLESS VILLAIN";const alignTag = document.getElementById("stat-alignment");if (alignTag) {alignTag.innerText = alignmentText;alignTag.style.color = tracker.morality >= 0 ? "#00ffcc" : "#ff3333";}delete data.deltaStat;}if (tracker.survival <= 0 && nodeKey !== "defeat") {drawScreen("defeat");return;}const viewport = document.getElementById("game-viewport");if (viewport) viewport.style.backgroundImage = url('${data.bg}');document.getElementById("name-plate").innerText = data.name;document.getElementById("story-text").innerText = data.text;const choicesBox = document.getElementById("choice-deck");const indicator = document.getElementById("advance-indicator");if (!choicesBox || !indicator) return;choicesBox.innerHTML = "";if (data.choices && data.choices.length > 0) {indicator.style.display = "none";data.choices.forEach(opt => {const card = document.createElement("div");card.className = "action-card";card.innerText = opt.text;card.onclick = (e) => { e.stopPropagation(); drawScreen(opt.target); };choicesBox.appendChild(card);});} else {indicator.style.display = "block";indicator.innerText = "End of Node - Open Menu To Reset";}}function triggerNext() {const current = narrativeMatrix[tracker.activeNode];if (current && current.choices && current.choices.length === 1) {drawScreen(current.choices.target);}}function restartCycle() {tracker.survival = 100;tracker.morality = 0;document.getElementById("stat-survival").innerText = tracker.survival;const alignTag = document.getElementById("stat-alignment");if (alignTag) {alignTag.innerText = "NEUTRAL";alignTag.style.color = "#00ffcc";}const overlay = document.getElementById("save-menu-overlay");if (overlay) overlay.style.display = "none";const startScreen = document.getElementById("main-menu-screen");if(startScreen) {startScreen.style.display = "flex";startScreen.style.opacity = "1";}drawScreen("act1_start");}