const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d", { alpha: false }); // Optimize for performance

const uiTitle = document.querySelector(".soft-title");
const uiInstructions = document.querySelector(".soft-instructions");
const restartBtn = document.getElementById("restartBtn");

// Sounds - We will catch errors if files don't exist yet
const playSound = (id) => {
    try {
        const sound = document.getElementById(id);
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {}); // Catch autoplay restrictions
        }
    } catch (e) { console.warn("Audio play failed", e); }
};

// State
let width, height;
let shapes = [];
let draggingShape = null;
let dragOffsetX = 0, dragOffsetY = 0;
let isAnimating = true;
let score = 0;
const totalShapes = 5;

// Soft pastel palette
const palette = [
    { fill: "#FFB3BA", stroke: "#FF9EAA" }, // Soft Pink
    { fill: "#FFDFBA", stroke: "#FFCBA4" }, // Soft Orange
    { fill: "#FFFFBA", stroke: "#FFFACD" }, // Soft Yellow
    { fill: "#BAFFC9", stroke: "#A9E8B8" }, // Soft Green
    { fill: "#BAE1FF", stroke: "#A9D0F5" }  // Soft Blue
];

class Shape {
    constructor(x, y, radius, colorObj, type) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colorObj.fill;
        this.stroke = colorObj.stroke;
        this.type = type; // 'circle', 'square', 'triangle'
        this.isPopped = false;

        // Gentle "breathing" animation
        this.baseRadius = radius;
        this.pulse = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;

        // Gentle floating
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
    }

    update() {
        if (this.isPopped) return;

        // Breathing effect
        this.pulse += this.pulseSpeed;
        this.radius = this.baseRadius + Math.sin(this.pulse) * 5;

        // Floating effect
        if (this !== draggingShape) {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges gently
            if (this.x - this.radius < 0 || this.x + this.radius > width) this.vx *= -1;
            if (this.y - this.radius < 0 || this.y + this.radius > height) this.vy *= -1;

            // Keep strictly within bounds
            this.x = Math.max(this.radius, Math.min(width - this.radius, this.x));
            this.y = Math.max(this.radius, Math.min(height - this.radius, this.y));
        }
    }

    draw(ctx) {
        if (this.isPopped) return;

        ctx.save();
        ctx.translate(this.x, this.y);

        // Soft shadow for "plush" feel
        ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 3;
        ctx.shadowOffsetY = 5;

        ctx.beginPath();
        if (this.type === 'circle') {
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
        } else if (this.type === 'square') {
            const size = this.radius * 1.5;
            // Rounded rectangle for softness
            ctx.roundRect(-size/2, -size/2, size, size, 15);
        } else if (this.type === 'triangle') {
            const size = this.radius * 1.2;
            ctx.moveTo(0, -size);
            ctx.lineTo(size, size);
            ctx.lineTo(-size, size);
            ctx.closePath();
        }

        ctx.fillStyle = this.color;
        ctx.fill();

        // Soft inner glow/highlight to look tactile
        ctx.shadowColor = "transparent";
        ctx.lineWidth = 4;
        ctx.strokeStyle = this.stroke;
        ctx.stroke();

        ctx.restore();
    }

    contains(px, py) {
        if (this.isPopped) return false;
        const dx = px - this.x;
        const dy = py - this.y;
        return Math.sqrt(dx * dx + dy * dy) < this.radius * 1.2; // Generous hit area for kids
    }
}

// Polyfill for roundRect
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.beginPath();
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
    return this;
  }
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    width = canvas.width;
    height = canvas.height;
}

function initGame() {
    resize();
    shapes = [];
    score = 0;
    uiTitle.textContent = "Max's Sensory Shapes";
    uiInstructions.textContent = "Tap the shapes!";
    restartBtn.classList.add("hidden");

    const types = ['circle', 'square', 'triangle'];

    for (let i = 0; i < totalShapes; i++) {
        const radius = Math.min(width, height) * 0.12; // Responsive size
        const x = radius * 2 + Math.random() * (width - radius * 4);
        const y = radius * 2 + Math.random() * (height - radius * 4);
        const color = palette[i % palette.length];
        const type = types[Math.floor(Math.random() * types.length)];
        shapes.push(new Shape(x, y, radius, color, type));
    }

    // Start background music on first interaction
    document.addEventListener("pointerdown", () => playSound("bgm"), { once: true });
}

function handleTap(e) {
    e.preventDefault();
    const touch = e.touches ? e.touches[0] : e;
    const rect = canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    // Check hit
    for (let i = shapes.length - 1; i >= 0; i--) {
        const shape = shapes[i];
        if (shape.contains(x, y)) {
            // "Pop" the shape
            shape.isPopped = true;
            playSound("popSound");
            score++;

            // Create particle effect or just simple visual pop (omitted for simplicity, but could add later)

            if (score >= totalShapes) {
                // Win state
                setTimeout(() => {
                    playSound("successSound");
                    playSound("chimeSound");
                    uiTitle.textContent = "Yay! Good job!";
                    uiInstructions.textContent = "You found them all.";
                    restartBtn.classList.remove("hidden");
                }, 500);
            }
            break; // Only pop one at a time
        }
    }
}

// Event Listeners
window.addEventListener("resize", resize);
canvas.addEventListener("pointerdown", handleTap); // Pointer events handle mouse and touch
restartBtn.addEventListener("click", initGame);

// Prevent default touch behaviors
canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });

// Game Loop
function loop() {
    // Fill background with warm off-white
    ctx.fillStyle = "#FDF6EC";
    ctx.fillRect(0, 0, width, height);

    // Draw grid pattern (subtle felt texture simulation)
    ctx.strokeStyle = "rgba(0,0,0,0.02)";
    ctx.lineWidth = 1;
    for(let i=0; i<width; i+=40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, height); ctx.stroke();
    }
    for(let i=0; i<height; i+=40) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(width, i); ctx.stroke();
    }

    shapes.forEach(shape => {
        shape.update();
        shape.draw(ctx);
    });

    if (isAnimating) {
        requestAnimationFrame(loop);
    }
}

// Start
initGame();
loop();

// Visibility changes (Battery save)
document.addEventListener("visibilitychange", () => {
    isAnimating = !document.hidden;
    if (isAnimating) loop();
});
