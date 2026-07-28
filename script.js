            let tracker = { survival: 100, morality: 0, currentChapter: 1, activeNode: "start" };
let narrativeMatrix = {}; // Loaded dynamically from chapter files

// Fetch chapter data without locking up mobile memory
async function loadChapter(chapterNum) {
    try {
        const response = await fetch(`./chapter_${chapterNum}.json`);
        if (!response.ok) throw new Error("Failed to pull chapter log");
        narrativeMatrix = await response.json();
        tracker.currentChapter = chapterNum;
        return true;
    } catch (error) {
        console.error("Core loading malfunction:", error);
        alert(`CRITICAL ERROR: Chapter ${chapterNum} ledger file missing or corrupted.`);
        return false;
    }
}

async function startGameFromMenu() {
    const startScreen = document.getElementById("main-menu-screen");
    if (startScreen) {
        startScreen.style.opacity = "0";
        setTimeout(() => { startScreen.style.display = "none"; }, 500);
    }
    
    // Dynamically load Chapter 1 file before initializing UI
    const ready = await loadChapter(1);
    if (ready) {
        drawScreen("start");
    }
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

async function executeLoadGame() {
    const savedData = localStorage.getItem("musa_chronicles_save");
    if (savedData) {
        const parsed = JSON.parse(savedData);
        const ready = await loadChapter(parsed.currentChapter);
        if (ready) {
            tracker = parsed;
            alert("SAVE FILE RECOVERED");
            const startScreen = document.getElementById("main-menu-screen");
            if (startScreen) startScreen.style.display = "none";
            drawScreen(tracker.activeNode);
            const overlay = document.getElementById("save-menu-overlay");
            if (overlay) overlay.style.display = "none";
        }
    } else {
        alert("NO RECORD FOUND");
    }
}

function restartCycle() {
    tracker = { survival: 100, morality: 0, currentChapter: 1, activeNode: "start" };
    const overlay = document.getElementById("save-menu-overlay");
    if (overlay) overlay.style.display = "none";
    const startScreen = document.getElementById("main-menu-screen");
    if (startScreen) startScreen.style.display = "flex";
    startGameFromMenu();
}

async function drawScreen(nodeKey) {
    // Handle transition between chapters smoothly
    if (nodeKey.startsWith("next_chapter_")) {
        const nextNum = parseInt(nodeKey.replace("next_chapter_", ""));
        const ready = await loadChapter(nextNum);
        if (ready) {
            drawScreen("start");
        }
        return;
    }

    tracker.activeNode = nodeKey;
    const node = narrativeMatrix[nodeKey];
    if (!node) return;

    if (node.deltaStat) {
        if (node.deltaStat.survival !== undefined) tracker.survival += node.deltaStat.survival;
        if (node.deltaStat.morality !== undefined) tracker.morality += node.deltaStat.morality;
        tracker.survival = Math.max(0, Math.min(100, tracker.survival));
    }

    document.getElementById("stat-survival").innerText = tracker.survival;
    
    let pathText = "NEUTRAL";
    if (tracker.morality >= 15) pathText = "HEROIC";
    if (tracker.morality <= -15) pathText = "RUTHLESS";
    document.getElementById("stat-alignment").innerText = pathText;

    if (tracker.survival <= 0 && nodeKey !== "defeat") {
        drawScreen("defeat");
        return;
    }

    document.getElementById("name-plate").innerText = node.name;
    document.getElementById("story-text").innerText = node.text;
    document.getElementById("game-viewport").style.backgroundImage = `url('./${node.bg}')`;

    if (node.flash) {
        const flash = document.getElementById("flash-overlay");
        flash.style.backgroundColor = node.flash;
        flash.style.opacity = "0.5";
        setTimeout(() => { flash.style.opacity = "0"; }, 150);
    }

        if (node.vibrate && "vibrate" in navigator) {
        navigator.vibrate(node.vibrate);
        }
            

    const choiceDeck = document.getElementById("choice-deck");
    choiceDeck.innerHTML = "";
    node.choices.forEach(choice => {
        const btn = document.createElement("div");
        btn.className = "action-card";
        btn.innerText = choice.text;
        btn.addEventListener("click", () => drawScreen(choice.target));
        choiceDeck.appendChild(btn);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("initiate-btn").addEventListener("click", startGameFromMenu);
    document.getElementById("load-btn").addEventListener("click", executeLoadGame);
    document.getElementById("hud-menu-btn").addEventListener("click", toggleSaveMenu);
    document.getElementById("quick-save-btn").addEventListener("click", executeSaveGame);
    document.getElementById("quick-load-btn").addEventListener("click", executeLoadGame);
    document.getElementById("restart-btn").addEventListener("click", restartCycle);
    document.getElementById("close-menu-btn").addEventListener("click", toggleSaveMenu);
    
    document.getElementById("save-menu-overlay").addEventListener("click", (e) => {
        if (e.target.id === "save-menu-overlay") toggleSaveMenu();
    });
});
        
