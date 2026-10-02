/* ==========================================================================
   Ocean Park — interactions
   Everything you might want to personalize lives in CONFIG below.
   ========================================================================== */

const CONFIG = {
    ambientBubbles: 22,
    catchableBubbles: 5,
    catchesToFinish: 10,
    typingSpeedMs: 24,
    fishCount: 7,
    jellyfishCount: 2,
    sharkCount: 1,
    whaleCount: 1,
    sealionCount: 1,
    seahorseCount: 1,
    octopusCount: 1,
    turtleCount: 1,
    letter: "This might not be as good as any Ocean Park, but just know, swimming through life feels so much better with you beside me. Thank you for diving into this wide, strange, and wonderful world with me. As time passes, we keep going deeper and deeper, and with every step, you give me more reasons why it has always been you. No matter what life brings, whether it's the highs or the lows, I would always choose to go through it all with you. Happy 11th Monthsary and soon our 1st Anniversary my pretty baby Iah. I love you so much! Forever yours, Charles."
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ==========================================================================
   0. The gate — click to dive in, unlocks audio + starts the park
   ========================================================================== */

const gate = document.getElementById('gate');
const enterBtn = document.getElementById('enterBtn');
const bgMusic = document.getElementById('bgMusic');
const soundToggle = document.getElementById('soundToggle');
const soundIcon = document.getElementById('soundIcon');

enterBtn.addEventListener('click', () => {
    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => {
        /* Autoplay can still be blocked on some browsers — the sound
           toggle below lets her start it manually if that happens. */
    });
    gate.classList.add('gate-hidden');
    startPark();
}, { once: true });

soundToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().catch(() => { });
        soundToggle.classList.remove('muted');
        soundIcon.textContent = '\u266A';
    } else {
        bgMusic.pause();
        soundToggle.classList.add('muted');
        soundIcon.textContent = '\u266A\u0338';
    }
});

/* ==========================================================================
   1. Fish & jellyfish — ambient swimmers, purely atmospheric
   ========================================================================== */

const FISH_COLORS = [
    { body: '#ff9a4d', belly: '#ffe0b3' },
    { body: '#4db8ff', belly: '#d6f2ff' },
    { body: '#ffd84d', belly: '#fff6cc' },
    { body: '#ff6b81', belly: '#ffd6dd' }
];

function fishSvg(colors) {
    return `
    <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
        <g class="fin" style="transform-origin: 78px 25px;">
            <polygon points="75,25 98,10 98,40" fill="${colors.body}" opacity="0.9"/>
        </g>
        <ellipse cx="42" cy="25" rx="34" ry="17" fill="${colors.body}"/>
        <ellipse cx="46" cy="30" rx="22" ry="9" fill="${colors.belly}"/>
        <polygon points="25,18 40,8 46,20" fill="${colors.body}" opacity="0.85"/>
        <circle cx="18" cy="21" r="3.2" fill="#0a1a26"/>
        <circle cx="19" cy="20" r="1.1" fill="#fff"/>
    </svg>`;
}

function sharkSvg(uid) {
    const gradId = `sharkGrad${uid}`;
    const bellyId = `sharkBelly${uid}`;
    return `
    <svg viewBox="0 0 240 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#8a9aa6"/>
                <stop offset="55%" stop-color="#5c6f7d"/>
                <stop offset="100%" stop-color="#425460"/>
            </linearGradient>
            <linearGradient id="${bellyId}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#eef3f5"/>
                <stop offset="100%" stop-color="#cfd9dd"/>
            </linearGradient>
        </defs>
        <!-- tail fin -->
        <g class="fin" style="transform-origin: 210px 50px;">
            <path d="M205,48 C222,22 236,14 238,10 C232,30 228,44 226,50 C230,58 234,74 239,90 C226,82 215,70 205,54 Z"
                fill="${'#4a5c68'}"/>
        </g>
        <!-- body -->
        <path d="M4,55 C10,25 55,8 115,8 C160,8 196,22 214,46
                 C198,52 150,58 115,58 C55,58 14,68 4,55 Z"
            fill="url(#${gradId})"/>
        <!-- belly -->
        <path d="M18,52 C40,64 90,70 130,67 C165,64 190,56 205,48
                 C190,60 150,72 110,72 C65,72 30,66 18,52 Z"
            fill="url(#${bellyId})"/>
        <!-- dorsal fin -->
        <path d="M100,10 C104,-16 118,-28 128,-30 C122,-14 120,0 122,11 Z" fill="#53646f"/>
        <!-- pectoral fin -->
        <path d="M70,46 C62,62 46,72 34,76 C42,62 52,50 62,42 Z" fill="#4a5c68"/>
        <!-- gills -->
        <path d="M58,22 C56,30 56,38 58,44" stroke="#3a4a54" stroke-width="2" fill="none" opacity="0.6"/>
        <path d="M66,20 C64,29 64,38 66,45" stroke="#3a4a54" stroke-width="2" fill="none" opacity="0.6"/>
        <path d="M74,19 C72,28 72,38 74,46" stroke="#3a4a54" stroke-width="2" fill="none" opacity="0.6"/>
        <!-- snout + eye -->
        <ellipse cx="12" cy="40" rx="10" ry="14" fill="url(#${gradId})"/>
        <circle cx="14" cy="33" r="2.6" fill="#0a1216"/>
        <circle cx="14.6" cy="32.2" r="0.9" fill="#fff"/>
    </svg>`;
}

function jellySvg() {
    return `
    <svg viewBox="0 0 60 80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="30" cy="26" rx="26" ry="22" fill="rgba(216,180,255,0.55)"/>
        <ellipse cx="30" cy="22" rx="18" ry="14" fill="rgba(255,255,255,0.3)"/>
        <path d="M12 42 Q10 60 8 76" stroke="rgba(216,180,255,0.45)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M22 44 Q22 62 20 78" stroke="rgba(216,180,255,0.4)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M32 45 Q33 63 34 79" stroke="rgba(216,180,255,0.45)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M42 43 Q45 61 48 77" stroke="rgba(216,180,255,0.4)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    </svg>`;
}

function whaleSvg(uid) {
    const gradId = `whaleGrad${uid}`;
    const bellyId = `whaleBelly${uid}`;
    return `
    <svg viewBox="0 0 260 110" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3b6f8a"/>
                <stop offset="60%" stop-color="#2a4f66"/>
                <stop offset="100%" stop-color="#1c3a4d"/>
            </linearGradient>
            <linearGradient id="${bellyId}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#eaf6fa"/>
                <stop offset="100%" stop-color="#cfe8ef"/>
            </linearGradient>
        </defs>
        <!-- tail fluke -->
        <g class="fin" style="transform-origin: 196px 55px;">
            <path d="M190,40 C215,10 240,0 255,5 C245,25 230,40 212,50 C230,55 248,65 258,88 C240,95 215,85 192,66 Z"
                fill="#23485c"/>
        </g>
        <!-- body -->
        <path d="M8,55 C8,20 55,6 120,6 C165,6 192,22 196,50
                 C192,70 160,88 110,88 C55,88 8,80 8,55 Z" fill="url(#${gradId})"/>
        <!-- belly -->
        <path d="M14,62 C40,78 90,86 130,83 C160,80 180,70 190,58
                 C176,76 140,92 100,92 C58,92 26,80 14,62 Z" fill="url(#${bellyId})"/>
        <!-- pectoral fin -->
        <path d="M70,58 C58,78 40,90 26,94 C36,78 48,64 60,54 Z" fill="#23485c"/>
        <!-- blowhole -->
        <circle cx="35" cy="14" r="2.4" fill="#0e2430"/>
        <!-- eye -->
        <circle cx="20" cy="46" r="3" fill="#0a1a22"/>
        <circle cx="21" cy="45" r="1" fill="#fff"/>
    </svg>`;
}

function sealionSvg(uid) {
    const gradId = `sealionGrad${uid}`;
    return `
    <svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#a9875c"/>
                <stop offset="100%" stop-color="#6e5536"/>
            </linearGradient>
        </defs>
        <!-- tail -->
        <g class="fin" style="transform-origin: 150px 44px;">
            <path d="M145,34 C160,22 172,20 178,22 C172,32 165,40 155,46 C165,48 174,56 178,66 C168,64 155,56 146,48 Z"
                fill="#6e5536"/>
        </g>
        <!-- body -->
        <path d="M10,46 C8,22 35,10 70,10 C105,10 140,20 150,40
                 C140,58 100,68 65,66 C30,64 12,60 10,46 Z" fill="url(#${gradId})"/>
        <!-- front flipper -->
        <path d="M55,52 C48,68 36,78 24,82 C32,66 42,54 50,46 Z" fill="#6e5536"/>
        <!-- eye -->
        <circle cx="18" cy="28" r="2.6" fill="#1a1008"/>
        <circle cx="19" cy="27" r="0.9" fill="#fff"/>
        <!-- nose -->
        <ellipse cx="6" cy="32" rx="4" ry="3" fill="#2a1c10"/>
    </svg>`;
}

function seahorseSvg(uid) {
    const color = uid % 2 === 0 ? '#e8b64d' : '#d97a98';
    const belly = uid % 2 === 0 ? '#f6d888' : '#edaac0';
    return `
    <svg viewBox="0 0 60 120" xmlns="http://www.w3.org/2000/svg">
        <path d="M30,6 C40,6 46,14 43,22 C50,26 53,36 48,44
                 C54,48 56,58 50,66 C53,74 50,84 41,88
                 C44,94 41,102 33,105 C35,98 31,95 27,97
                 C20,100 15,94 17,87 C9,85 5,76 9,68
                 C3,63 2,52 9,46 C4,39 7,28 16,24
                 C13,16 18,8 27,7 C28,6 29,6 30,6 Z"
            fill="${color}"/>
        <path d="M26,30 C32,30 36,34 35,40 C40,42 42,48 38,53
                 C41,57 40,63 35,66 C30,62 27,54 27,46 C27,40 26,35 26,30 Z"
            fill="${belly}" opacity="0.7"/>
        <path d="M30,12 C34,8 40,8 43,11 C39,12 35,14 32,17 Z" fill="${color}"/>
        <circle cx="33" cy="16" r="2.6" fill="#1a1008"/>
        <circle cx="34" cy="15" r="0.9" fill="#fff"/>
        <path d="M17,87 C12,93 12,102 19,108" stroke="${color}" stroke-width="5" fill="none" stroke-linecap="round"/>
    </svg>`;
}

function octopusSvg(uid) {
    const gradId = `octoGrad${uid}`;
    const hue = uid % 2 === 0 ? ['#ff9ecb', '#c0538f'] : ['#9fb8ff', '#5668c7'];
    return `
    <svg viewBox="0 0 140 150" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="${gradId}" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stop-color="${hue[0]}"/>
                <stop offset="100%" stop-color="${hue[1]}"/>
            </radialGradient>
        </defs>
        <g class="tentacle t1"><path d="M40,70 C30,90 20,100 10,130" stroke="${hue[1]}" stroke-width="10" fill="none" stroke-linecap="round"/></g>
        <g class="tentacle t2"><path d="M55,78 C48,100 44,112 40,138" stroke="${hue[1]}" stroke-width="10" fill="none" stroke-linecap="round"/></g>
        <g class="tentacle t3"><path d="M70,80 C70,104 70,118 70,142" stroke="${hue[1]}" stroke-width="10" fill="none" stroke-linecap="round"/></g>
        <g class="tentacle t4"><path d="M85,78 C92,100 96,112 100,138" stroke="${hue[1]}" stroke-width="10" fill="none" stroke-linecap="round"/></g>
        <g class="tentacle t5"><path d="M100,70 C110,90 120,100 130,130" stroke="${hue[1]}" stroke-width="10" fill="none" stroke-linecap="round"/></g>
        <ellipse cx="70" cy="45" rx="42" ry="36" fill="url(#${gradId})"/>
        <circle cx="55" cy="38" r="5" fill="#2a0a1c"/>
        <circle cx="85" cy="38" r="5" fill="#2a0a1c"/>
        <circle cx="56" cy="37" r="1.6" fill="#fff"/>
        <circle cx="86" cy="37" r="1.6" fill="#fff"/>
    </svg>`;
}

function turtleSvg(uid) {
    const shellId = `turtleShell${uid}`;
    return `
    <svg viewBox="0 0 140 90" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="${shellId}" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#6aa35a"/>
                <stop offset="100%" stop-color="#3f6b3a"/>
            </linearGradient>
        </defs>
        <!-- tail -->
        <path d="M116,52 L135,57 L116,59 Z" fill="#7fae63"/>
        <!-- back flipper -->
        <g class="fin" style="transform-origin: 100px 56px;">
            <path d="M92,56 C102,70 116,78 128,80 C124,67 114,57 104,50 Z" fill="#7fae63"/>
        </g>
        <!-- underside -->
        <ellipse cx="72" cy="57" rx="44" ry="11" fill="#d9c98a"/>
        <!-- shell -->
        <path d="M28,57 C28,22 58,9 80,9 C106,9 122,34 118,57 Z" fill="url(#${shellId})"/>
        <!-- shell pattern -->
        <ellipse cx="74" cy="30" rx="15" ry="10" fill="rgba(0,0,0,0.14)"/>
        <ellipse cx="50" cy="42" rx="10" ry="8" fill="rgba(0,0,0,0.12)"/>
        <ellipse cx="98" cy="42" rx="10" ry="8" fill="rgba(0,0,0,0.12)"/>
        <!-- front flipper -->
        <g class="fin" style="transform-origin: 50px 54px;">
            <path d="M54,56 C46,72 32,82 14,85 C22,70 34,58 44,50 Z" fill="#8fbf6a"/>
        </g>
        <!-- head -->
        <ellipse cx="20" cy="49" rx="15" ry="10" fill="#8fbf6a"/>
        <circle cx="13" cy="45" r="2.6" fill="#0a1a10"/>
        <circle cx="13.8" cy="44.2" r="0.9" fill="#fff"/>
    </svg>`;
}

/* --------------------------------------------------------------------------
   Unified wander engine — every creature picks a new random spot, turns to
   face it, swims there at its own pace, pauses, then picks another. This is
   what gives the "random swim, random turns" feel instead of straight
   one-way laps.
   -------------------------------------------------------------------------- */

function spawnCreature(layer, opts) {
    const el = document.createElement('div');
    el.className = `fish ${opts.extraClass || ''}`.trim();
    el.innerHTML = opts.svg;
    el.style.width = `${opts.width}px`;
    el.style.height = `${opts.height}px`;
    el.style.position = 'absolute';
    if (opts.opacity) el.style.opacity = opts.opacity;

    const { innerWidth: w, innerHeight: h } = window;
    let x = Math.random() * (w - opts.width);
    let y = h * (opts.yRange[0] + Math.random() * (opts.yRange[1] - opts.yRange[0]));
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    layer.appendChild(el);

    if (prefersReducedMotion) return el;

    function goToRandomSpot() {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const targetX = Math.random() * Math.max(vw - opts.width, 40);
        const targetY = vh * (opts.yRange[0] + Math.random() * (opts.yRange[1] - opts.yRange[0]));
        const dx = targetX - x;
        const dy = targetY - y;
        const distance = Math.max(Math.hypot(dx, dy), 1);
        const speed = opts.speedMin + Math.random() * (opts.speedMax - opts.speedMin);
        const duration = distance / speed;

        if (opts.flip) {
            // Artwork faces left by default, so moving right (dx > 0) needs a flip.
            el.style.transform = dx >= 0 ? 'scaleX(-1)' : 'scaleX(1)';
        }

        el.style.transition = `left ${duration}s linear, top ${duration}s linear`;
        el.style.left = `${targetX}px`;
        el.style.top = `${targetY}px`;
        x = targetX;
        y = targetY;

        const idle = opts.idleMin + Math.random() * (opts.idleMax - opts.idleMin);
        setTimeout(goToRandomSpot, duration * 1000 + idle);
    }

    setTimeout(goToRandomSpot, Math.random() * 1200);
    return el;
}

function startSwimmers() {
    const layer = document.getElementById('fishLayer');

    for (let i = 0; i < CONFIG.fishCount; i += 1) {
        const colors = FISH_COLORS[i % FISH_COLORS.length];
        const size = 34 + Math.random() * 30;
        spawnCreature(layer, {
            svg: fishSvg(colors), width: size, height: size * 0.5,
            flip: true, yRange: [0.1, 0.62],
            speedMin: 28, speedMax: 65, idleMin: 600, idleMax: 2600
        });
    }

    for (let i = 0; i < CONFIG.sharkCount; i += 1) {
        const size = 170 + Math.random() * 70;
        spawnCreature(layer, {
            svg: sharkSvg(`s${i}`), width: size, height: size * 0.42,
            flip: true, yRange: [0.2, 0.6], opacity: 0.9,
            speedMin: 22, speedMax: 40, idleMin: 1000, idleMax: 3000,
            extraClass: 'shark'
        });
    }

    for (let i = 0; i < CONFIG.whaleCount; i += 1) {
        const size = 190 + Math.random() * 60;
        spawnCreature(layer, {
            svg: whaleSvg(`w${i}`), width: size, height: size * 0.42,
            flip: true, yRange: [0.06, 0.4], opacity: 0.85,
            speedMin: 14, speedMax: 26, idleMin: 1500, idleMax: 4000,
            extraClass: 'whale'
        });
    }

    for (let i = 0; i < CONFIG.sealionCount; i += 1) {
        const size = 80 + Math.random() * 40;
        spawnCreature(layer, {
            svg: sealionSvg(`sl${i}`), width: size, height: size * 0.5,
            flip: true, yRange: [0.3, 0.68],
            speedMin: 35, speedMax: 70, idleMin: 500, idleMax: 2200,
            extraClass: 'sealion'
        });
    }

    for (let i = 0; i < CONFIG.seahorseCount; i += 1) {
        const size = 30 + Math.random() * 20;
        spawnCreature(layer, {
            svg: seahorseSvg(i), width: size * 0.5, height: size,
            flip: false, yRange: [0.45, 0.78],
            speedMin: 4, speedMax: 10, idleMin: 2500, idleMax: 6000,
            extraClass: 'seahorse'
        });
    }

    for (let i = 0; i < CONFIG.octopusCount; i += 1) {
        const size = 60 + Math.random() * 30;
        spawnCreature(layer, {
            svg: octopusSvg(i), width: size, height: size * 1.07,
            flip: false, yRange: [0.4, 0.72],
            speedMin: 6, speedMax: 14, idleMin: 2000, idleMax: 5000,
            extraClass: 'octopus'
        });
    }

    for (let i = 0; i < CONFIG.jellyfishCount; i += 1) {
        const size = 36 + Math.random() * 26;
        spawnCreature(layer, {
            svg: jellySvg(), width: size * 0.75, height: size,
            flip: false, yRange: [0.06, 0.55],
            speedMin: 5, speedMax: 12, idleMin: 1500, idleMax: 4000,
            extraClass: 'jellyfish'
        });
    }

    for (let i = 0; i < CONFIG.turtleCount; i += 1) {
        const size = 90 + Math.random() * 30;
        spawnCreature(layer, {
            svg: turtleSvg(`t${i}`), width: size, height: size * 0.64,
            flip: true, yRange: [0.25, 0.68],
            speedMin: 12, speedMax: 24, idleMin: 1500, idleMax: 4000,
            extraClass: 'turtle'
        });
    }
}

/* ==========================================================================
   2. Bubbles — many ambient rising ones, plus catchable ones that pop and
      carry light down into the treasure chest, typing the letter as they go
   ========================================================================== */

function startPark() {
    startSwimmers();

    const layer = document.getElementById('bubblesLayer');
    const chest = document.getElementById('chest');
    const chestGlow = document.getElementById('chestGlow');
    const instruction = document.getElementById('instruction');
    const replayBtn = document.getElementById('replayBtn');
    const paraEl = document.getElementById('para1');
    const fullText = CONFIG.letter;
    const charsPerCatch = Math.ceil(fullText.length / CONFIG.catchesToFinish);

    let charIndex = 0;
    let catchesUsed = 0;
    let finished = false;

    function render() {
        paraEl.textContent = fullText.slice(0, charIndex);
        if (!finished) {
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            paraEl.appendChild(cursor);
        }
    }

    function typeChars(count) {
        let remaining = count;
        function step() {
            if (remaining <= 0 || charIndex >= fullText.length) {
                if (charIndex >= fullText.length) {
                    finished = true;
                    render();
                    onFinished();
                }
                return;
            }
            charIndex += 1;
            remaining -= 1;
            render();
            setTimeout(step, CONFIG.typingSpeedMs);
        }
        step();
    }

    function onFinished() {
        chest.classList.add('open');
        chestGlow.classList.add('full');
        instruction.textContent = 'the chest is open \u2014 that\u2019s the whole letter, love';
        setTimeout(() => replayBtn.classList.add('visible'), 500);
    }

    render();

    function viewport() {
        return { w: window.innerWidth, h: window.innerHeight };
    }

    function randomSpot() {
        const { w, h } = viewport();
        return {
            x: 10 + Math.random() * (w - 40),
            y: 10 + Math.random() * (h * 0.78)
        };
    }

    function spawnAmbientBubble() {
        const el = document.createElement('div');
        el.className = 'bubble ambient';
        const size = 4 + Math.random() * 8;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.left = `${Math.random() * 100}%`;
        el.style.bottom = `-20px`;
        el.style.setProperty('--sway', `${(Math.random() - 0.5) * 60}px`);
        el.style.animationDuration = `${8 + Math.random() * 10}s`;
        el.style.animationDelay = `-${Math.random() * 14}s`;
        layer.appendChild(el);
    }

    for (let i = 0; i < CONFIG.ambientBubbles; i += 1) {
        spawnAmbientBubble();
    }

    function wander(el) {
        if (prefersReducedMotion) return;
        const loop = () => {
            if (!el.isConnected || el.classList.contains('popping')) return;
            const spot = randomSpot();
            el.style.left = `${spot.x}px`;
            el.style.top = `${spot.y}px`;
            setTimeout(loop, 3400 + Math.random() * 2600);
        };
        setTimeout(loop, Math.random() * 1500);
    }

    function spawnCatchableBubble() {
        const el = document.createElement('div');
        el.className = 'bubble catchable';
        const size = 20 + Math.random() * 14;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        const spot = randomSpot();
        el.style.left = `${spot.x}px`;
        el.style.top = `${spot.y}px`;
        layer.appendChild(el);
        wander(el);
        el.addEventListener('click', () => popBubble(el));
        return el;
    }

    for (let i = 0; i < CONFIG.catchableBubbles; i += 1) {
        spawnCatchableBubble();
    }

    function popBubble(el) {
        if (el.classList.contains('popping') || finished) return;
        const chestRect = chest.getBoundingClientRect();
        el.classList.add('popping');
        el.style.left = `${chestRect.left + chestRect.width / 2 - 6}px`;
        el.style.top = `${chestRect.top + chestRect.height * 0.3}px`;

        setTimeout(() => {
            el.remove();
            catchesUsed = Math.min(catchesUsed + 1, CONFIG.catchesToFinish);
            typeChars(charsPerCatch);

            if (catchesUsed === 1) {
                instruction.textContent = 'keep popping \u2014 the chest is starting to glow';
            }
        }, 600);

        setTimeout(() => {
            if (!finished) spawnCatchableBubble();
        }, 850);
    }

    replayBtn.addEventListener('click', () => {
        finished = false;
        charIndex = 0;
        catchesUsed = 0;
        render();
        chest.classList.remove('open');
        chestGlow.classList.remove('full');
        replayBtn.classList.remove('visible');
        instruction.textContent = 'pop the bubbles drifting by \u2014 they\u2019re carrying something down to the chest';
        layer.querySelectorAll('.bubble.catchable').forEach((el) => el.remove());
        for (let i = 0; i < CONFIG.catchableBubbles; i += 1) {
            spawnCatchableBubble();
        }
    });
}