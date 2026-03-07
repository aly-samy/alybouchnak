const drawingBoard = document.getElementById("drawing-board");
const paletteContainer = document.getElementById("palette-container");
const uiTitle = document.querySelector(".soft-title");
const uiInstructions = document.querySelector(".soft-instructions");
const restartBtn = document.getElementById("restartBtn");

// Sounds - Catch errors if files don't exist yet
const playSound = (id) => {
    try {
        const sound = document.getElementById(id);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {}); // Catch autoplay restrictions
        }
    } catch (e) { console.warn("Audio play failed", e); }
};

// Soft pastel palette inspired by Mia's rainbow
const palette = [
    { name: "Pink", color: "#FFB3BA" },
    { name: "Orange", color: "#FFDFBA" },
    { name: "Yellow", color: "#FFFFBA" },
    { name: "Green", color: "#BAFFC9" },
    { name: "Blue", color: "#BAE1FF" },
    { name: "Purple", color: "#E0BBE4" }
];

let selectedColor = palette[0].color;
let totalParts = 0;
let coloredParts = 0;

// The SVG for the drawing (A simple cute flower/bloom)
const svgContent = `
<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
    <!-- Stem & Leaves -->
    <path class="colorable" d="M200,300 C200,350 180,380 180,400 M200,320 C150,330 120,300 120,280 C150,280 180,300 200,320 M200,340 C250,350 280,320 280,300 C250,300 220,320 200,340" />

    <!-- Petals -->
    <path class="colorable" d="M200,100 C250,50 300,100 280,150 C260,200 200,200 200,200 C200,200 140,200 120,150 C100,100 150,50 200,100 Z" />
    <path class="colorable" d="M280,150 C340,130 380,180 340,230 C300,280 200,200 200,200 Z" />
    <path class="colorable" d="M120,150 C60,130 20,180 60,230 C100,280 200,200 200,200 Z" />
    <path class="colorable" d="M200,200 C200,200 300,280 270,330 C240,380 180,320 200,280 Z" />
    <path class="colorable" d="M200,200 C200,200 100,280 130,330 C160,380 220,320 200,280 Z" />

    <!-- Center of the flower -->
    <circle class="colorable" cx="200" cy="200" r="50" />
</svg>
`;

function initGame() {
    coloredParts = 0;
    uiTitle.textContent = "Mia's Creative Coloring";
    uiInstructions.textContent = "Pick a color and tap the picture!";
    restartBtn.classList.add("hidden");
    drawingBoard.classList.remove("win-pulse");

    // Inject SVG
    drawingBoard.innerHTML = svgContent;

    // Setup colorable parts
    const parts = document.querySelectorAll(".colorable");
    totalParts = parts.length;

    parts.forEach(part => {
        // Prevent drag selection
        part.addEventListener('dragstart', e => e.preventDefault());

        part.addEventListener("pointerdown", (e) => {
            e.preventDefault(); // Stop scrolling on touch

            // Start background music on first interaction
            document.addEventListener("pointerdown", () => playSound("bgm"), { once: true });

            if (part.style.fill !== selectedColor) {
                // If it was white before, increment the colored counter
                const isFirstTimeColoring = !part.classList.contains("colored") && (!part.style.fill || part.style.fill === "rgb(255, 255, 255)" || part.style.fill === "#FFFFFF");

                part.style.fill = selectedColor;

                // Add soft bounce animation
                part.classList.remove("colored");
                void part.offsetWidth; // trigger reflow
                part.classList.add("colored");

                playSound("popSound");

                if (isFirstTimeColoring) {
                    coloredParts++;
                    checkWin();
                }
            }
        });
    });

    // Build Palette
    paletteContainer.innerHTML = "";
    palette.forEach((colorObj, index) => {
        const swatch = document.createElement("div");
        swatch.classList.add("swatch");
        if (index === 0) swatch.classList.add("selected");
        swatch.style.backgroundColor = colorObj.color;

        swatch.addEventListener("pointerdown", (e) => {
            e.preventDefault();
            // Start background music on first interaction
            document.addEventListener("pointerdown", () => playSound("bgm"), { once: true });

            selectedColor = colorObj.color;
            playSound("popSound"); // Subtle feedback for color change

            // Update UI
            document.querySelectorAll(".swatch").forEach(s => s.classList.remove("selected"));
            swatch.classList.add("selected");
        });

        paletteContainer.appendChild(swatch);
    });
}

function checkWin() {
    if (coloredParts >= totalParts) {
        setTimeout(() => {
            playSound("successSound");
            playSound("chimeSound");
            uiTitle.textContent = "Beautiful!";
            uiInstructions.textContent = "What a lovely painting.";
            drawingBoard.classList.add("win-pulse");
            restartBtn.classList.remove("hidden");
            paletteContainer.style.pointerEvents = "none"; // disable palette on win
            paletteContainer.style.opacity = "0.5";
        }, 300);
    }
}

// Event Listeners
restartBtn.addEventListener("click", () => {
    paletteContainer.style.pointerEvents = "auto";
    paletteContainer.style.opacity = "1";
    initGame();
});

// Prevent default touch behaviors on the main container to stop bouncing/scrolling
document.addEventListener('touchmove', (e) => {
    if(e.target.closest('#game-container')) {
        e.preventDefault();
    }
}, { passive: false });

// Start
initGame();
