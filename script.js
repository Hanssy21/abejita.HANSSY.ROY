/* ======================================================
   LAS ABEJAS - ANIMACIÓN CINEMATOGRÁFICA
   HANSSY ROY
====================================================== */

const intro = document.getElementById("intro");
const movie = document.getElementById("movie");

const startBtn = document.getElementById("startBtn");
const replayBtn = document.getElementById("replayBtn");
const soundBtn = document.getElementById("soundBtn");
const skipBtn = document.getElementById("skipBtn");

const bee = document.getElementById("bee");
const fly = document.getElementById("fly");
const honey = document.getElementById("honey");
const poop = document.getElementById("poop");

const quote = document.getElementById("quote");
const ending = document.getElementById("ending");

const sceneText = document.getElementById("sceneText");
const particles = document.getElementById("particles");
const progressBar = document.getElementById("progressBar");
const sun = document.querySelector(".sun");


/* ======================================================
   ESTADO
====================================================== */

let running = false;
let soundEnabled = true;
let audioContext = null;
let sequence = 0;


/* ======================================================
   UTILIDADES
====================================================== */

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function mobile() {
    return window.innerWidth <= 700;
}

function cancelAnimations(element) {
    if (!element) return;

    element.getAnimations().forEach(animation => {
        animation.cancel();
    });
}


/* ======================================================
   PARTÍCULAS
====================================================== */

function createParticles() {

    particles.innerHTML = "";

    const amount = mobile() ? 30 : 60;

    for (let i = 0; i < amount; i++) {

        const p = document.createElement("div");

        p.className = "particle";

        p.style.left =
            Math.random() * 100 + "%";

        p.style.top =
            Math.random() * 100 + "%";

        const size =
            2 + Math.random() * 3;

        p.style.width = size + "px";
        p.style.height = size + "px";

        p.style.opacity =
            .2 + Math.random() * .6;

        p.animate(
            [
                {
                    transform:
                        "translate3d(0,0,0) scale(1)"
                },
                {
                    transform:
                        `translate3d(
                            ${-20 + Math.random() * 40}px,
                            -${30 + Math.random() * 90}px,
                            0
                        ) scale(.2)`
                }
            ],
            {
                duration:
                    3500 + Math.random() * 5000,

                delay:
                    Math.random() * 4000,

                iterations:
                    Infinity,

                easing:
                    "ease-in-out"
            }
        );

        particles.appendChild(p);
    }
}

createParticles();


/* ======================================================
   AUDIO
====================================================== */

function initAudio() {

    if (!soundEnabled) return;

    try {

        if (!audioContext) {

            const AudioContext =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioContext) return;

            audioContext =
                new AudioContext();
        }

        if (
            audioContext.state === "suspended"
        ) {
            audioContext.resume();
        }

    } catch (error) {}
}


function beep(
    frequency = 440,
    duration = .15,
    type = "sine",
    volume = .03
) {

    if (!soundEnabled) return;

    initAudio();

    if (!audioContext) return;

    try {

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = type;

        oscillator.frequency.value =
            frequency;

        gain.gain.setValueAtTime(
            .001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            volume,
            audioContext.currentTime + .03
        );

        gain.gain.exponentialRampToValueAtTime(
            .001,
            audioContext.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime +
            duration +
            .03
        );

    } catch (error) {}
}


/* ======================================================
   SONIDO ABEJA
====================================================== */

function beeSound() {

    if (!soundEnabled) return;

    initAudio();

    if (!audioContext) return;

    try {

        const osc =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        osc.type = "sawtooth";

        osc.frequency.setValueAtTime(
            140,
            audioContext.currentTime
        );

        osc.frequency.linearRampToValueAtTime(
            185,
            audioContext.currentTime + .4
        );

        gain.gain.setValueAtTime(
            .001,
            audioContext.currentTime
        );

        gain.gain.linearRampToValueAtTime(
            .016,
            audioContext.currentTime + .05
        );

        gain.gain.exponentialRampToValueAtTime(
            .001,
            audioContext.currentTime + .42
        );

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.start();

        osc.stop(
            audioContext.currentTime + .45
        );

    } catch (error) {}
}


/* ======================================================
   TEXTO
====================================================== */

async function showSceneText(text) {

    sceneText.classList.remove("show");

    await wait(180);

    sceneText.textContent = text;

    sceneText.classList.add("show");
}

function hideSceneText() {
    sceneText.classList.remove("show");
}


/* ======================================================
   PROGRESO
====================================================== */

function progress(value) {

    progressBar.style.width =
        Math.max(0, Math.min(100, value)) + "%";
}


/* ======================================================
   RESET
====================================================== */

function resetScene() {

    sequence++;

    cancelAnimations(bee);
    cancelAnimations(fly);

    bee.style.transition = "none";
    fly.style.transition = "none";

    /*
       ABEJA
    */

    bee.style.left =
        mobile() ? "8%" : "17%";

    bee.style.bottom =
        mobile() ? "45%" : "48%";

    bee.style.transform =
        "translate3d(0,0,0) rotate(0deg) scale(1)";


    /*
       MOSCA
    */

    fly.style.right =
        mobile() ? "-2%" : "8%";

    fly.style.bottom =
        mobile() ? "47%" : "48%";

    fly.style.transform =
        "translate3d(0,0,0) rotate(0deg) scale(1)";


    honey.classList.remove("show");
    poop.classList.remove("show");

    quote.classList.remove("show");
    ending.classList.remove("show");

    document
        .querySelectorAll(".bubble")
        .forEach(b => {
            b.classList.remove("active");
        });

    hideSceneText();

    progress(0);

    requestAnimationFrame(() => {

        bee.style.transition =
            "left 2s cubic-bezier(.22,.61,.36,1), bottom 2s cubic-bezier(.22,.61,.36,1)";

        fly.style.transition =
            "right 2s cubic-bezier(.22,.61,.36,1), bottom 2s cubic-bezier(.22,.61,.36,1)";
    });
}


/* ======================================================
   🐝 ABEJA - DESPEGUE
====================================================== */

async function beeTakeOff() {

    beeSound();

    bee.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(-3deg) scale(1)"
            },
            {
                transform:
                    "translate3d(8px,-18px,0) rotate(3deg) scale(1.03)"
            },
            {
                transform:
                    "translate3d(15px,-5px,0) rotate(-2deg) scale(1)"
            }
        ],
        {
            duration: 900,
            easing: "ease-in-out"
        }
    );

    await wait(900);
}


/* ======================================================
   🐝 ABEJA - VUELO CURVO HACIA MIEL
====================================================== */

async function beeFlyToHoney() {

    const left =
        mobile() ? "30%" : "40%";

    const bottom =
        mobile() ? "38%" : "38%";

    bee.style.left = left;
    bee.style.bottom = bottom;

    bee.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(-3deg) scale(1)"
            },
            {
                transform:
                    "translate3d(18px,-22px,0) rotate(5deg) scale(1.04)"
            },
            {
                transform:
                    "translate3d(8px,-8px,0) rotate(-3deg) scale(1.03)"
            },
            {
                transform:
                    "translate3d(0,0,0) rotate(2deg) scale(1)"
            }
        ],
        {
            duration: 1900,
            easing: "ease-in-out"
        }
    );

    await wait(1900);

    beeSound();
}


/* ======================================================
   🐝 ABEJA - REVOLTEO CERCA DE MIEL
====================================================== */

async function beeWorkAroundHoney() {

    bee.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(-2deg) scale(1)"
            },
            {
                transform:
                    "translate3d(10px,-12px,0) rotate(5deg) scale(1.04)"
            },
            {
                transform:
                    "translate3d(18px,0,0) rotate(1deg) scale(1.02)"
            },
            {
                transform:
                    "translate3d(8px,8px,0) rotate(-5deg) scale(1)"
            },
            {
                transform:
                    "translate3d(-5px,0,0) rotate(-2deg) scale(1)"
            },
            {
                transform:
                    "translate3d(0,0,0) rotate(-2deg) scale(1)"
            }
        ],
        {
            duration: 2200,
            easing: "ease-in-out"
        }
    );

    await wait(2200);
}


/* ======================================================
   🪰 MOSCA - ENTRADA
====================================================== */

async function flyEnter() {

    /*
       Entra desde el extremo derecho.
       NO se acerca a la abeja.
    */

    fly.style.right =
        mobile() ? "15%" : "17%";

    fly.style.bottom =
        mobile() ? "44%" : "45%";

    fly.animate(
        [
            {
                transform:
                    "translate3d(70px,20px,0) scale(.75) rotate(8deg)"
            },
            {
                transform:
                    "translate3d(35px,-15px,0) scale(.9) rotate(-5deg)"
            },
            {
                transform:
                    "translate3d(0,0,0) scale(1) rotate(4deg)"
            }
        ],
        {
            duration: 1800,
            easing: "ease-out"
        }
    );

    await wait(1800);
}


/* ======================================================
   🪰 MOSCA - BAJA HACIA LA MIERDA
====================================================== */

async function flyGoToPoop() {

    /*
       La mosca se mantiene completamente
       en el lado derecho.
    */

    fly.style.right =
        mobile() ? "5%" : "7%";

    fly.style.bottom =
        mobile() ? "29%" : "30%";

    fly.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(4deg) scale(1)"
            },
            {
                transform:
                    "translate3d(-15px,15px,0) rotate(-5deg) scale(1.03)"
            },
            {
                transform:
                    "translate3d(8px,8px,0) rotate(6deg) scale(.98)"
            },
            {
                transform:
                    "translate3d(0,0,0) rotate(2deg) scale(1)"
            }
        ],
        {
            duration: 1500,
            easing: "ease-in-out"
        }
    );

    await wait(1500);
}


/* ======================================================
   🪰 MOSCA - SE QUEDA EN LA MIERDA
====================================================== */

async function flyStayAtPoop() {

    /*
       Este movimiento es el más importante.

       La mosca NO viaja hacia la abeja.
       Solo revolotea alrededor de la mierda.
    */

    fly.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(3deg)"
            },
            {
                transform:
                    "translate3d(-8px,-10px,0) rotate(-6deg)"
            },
            {
                transform:
                    "translate3d(7px,-5px,0) rotate(5deg)"
            },
            {
                transform:
                    "translate3d(10px,5px,0) rotate(-4deg)"
            },
            {
                transform:
                    "translate3d(-5px,9px,0) rotate(4deg)"
            },
            {
                transform:
                    "translate3d(0,0,0) rotate(3deg)"
            }
        ],
        {
            duration: 1800,
            iterations: 2,
            easing: "ease-in-out"
        }
    );

    await wait(3600);
}


/* ======================================================
   💩 APARECE
====================================================== */

function showPoop() {

    poop.classList.remove("show");

    void poop.offsetWidth;

    poop.classList.add("show");
}


/* ======================================================
   BURBUJAS
====================================================== */

function showBubbles() {

    const bubbles =
        document.querySelectorAll(".bubble");

    bubbles.forEach(
        (bubble, index) => {

            bubble.classList.remove("active");

            void bubble.offsetWidth;

            setTimeout(() => {

                bubble.classList.add("active");

            }, index * 250);
        }
    );
}


/* ======================================================
   🪰 MOSCA HACE PEQUEÑA PAUSA
====================================================== */

async function flyLookAround() {

    fly.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(2deg)"
            },
            {
                transform:
                    "translate3d(-12px,-5px,0) rotate(-6deg)"
            },
            {
                transform:
                    "translate3d(8px,-8px,0) rotate(6deg)"
            },
            {
                transform:
                    "translate3d(0,0,0) rotate(2deg)"
            }
        ],
        {
            duration: 1300,
            easing: "ease-in-out"
        }
    );

    await wait(1300);
}


/* ======================================================
   🪰 MOSCA SE VA
====================================================== */

async function flyLeave() {

    fly.getAnimations().forEach(
        animation => animation.cancel()
    );

    fly.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) scale(1) rotate(3deg)"
            },
            {
                transform:
                    "translate3d(30px,-40px,0) scale(.9) rotate(-8deg)"
            },
            {
                transform:
                    "translate3d(100px,-100px,0) scale(.7) rotate(10deg)"
            },
            {
                transform:
                    "translate3d(240px,-210px,0) scale(.35) rotate(20deg)"
            },
            {
                transform:
                    "translate3d(500px,-400px,0) scale(.05) rotate(30deg)"
            }
        ],
        {
            duration: 1900,
            easing: "cubic-bezier(.1,.8,.2,1)",
            fill: "forwards"
        }
    );

    await wait(1900);
}


/* ======================================================
   🐝 ABEJA CONTINÚA TRABAJANDO
====================================================== */

async function beeContinueWorking() {

    bee.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(-2deg) scale(1)"
            },
            {
                transform:
                    "translate3d(-8px,-10px,0) rotate(4deg) scale(1.03)"
            },
            {
                transform:
                    "translate3d(10px,-18px,0) rotate(-4deg) scale(1.02)"
            },
            {
                transform:
                    "translate3d(5px,5px,0) rotate(3deg) scale(1)"
            },
            {
                transform:
                    "translate3d(0,0,0) rotate(-2deg) scale(1)"
            }
        ],
        {
            duration: 2000,
            easing: "ease-in-out"
        }
    );

    await wait(2000);
}


/* ======================================================
   🐝 ABEJA SE MARCHA
====================================================== */

async function beeLeave() {

    bee.getAnimations().forEach(
        animation => animation.cancel()
    );

    bee.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(-2deg) scale(1)"
            },
            {
                transform:
                    "translate3d(-10px,-25px,0) rotate(-6deg) scale(1.02)"
            },
            {
                transform:
                    "translate3d(50px,-65px,0) rotate(7deg) scale(.9)"
            },
            {
                transform:
                    "translate3d(180px,-140px,0) rotate(12deg) scale(.7)"
            },
            {
                transform:
                    "translate3d(400px,-260px,0) rotate(17deg) scale(.35)"
            }
        ],
        {
            duration: 2100,
            easing: "cubic-bezier(.2,.8,.2,1)",
            fill: "forwards"
        }
    );

    await wait(2100);
}


/* ======================================================
   FLASH
====================================================== */

function flash() {

    const f =
        document.createElement("div");

    f.style.position = "absolute";
    f.style.inset = "0";
    f.style.zIndex = "500";
    f.style.background = "white";
    f.style.pointerEvents = "none";

    movie.appendChild(f);

    f.animate(
        [
            {
                opacity: 0
            },
            {
                opacity: .5
            },
            {
                opacity: 0
            }
        ],
        {
            duration: 650,
            easing: "ease-out"
        }
    );

    setTimeout(
        () => f.remove(),
        700
    );
}


/* ======================================================
   FRASE
====================================================== */

async function showQuote() {

    hideSceneText();

    quote.classList.remove("show");

    void quote.offsetWidth;

    quote.classList.add("show");

    beep(
        500,
        .18,
        "sine",
        .035
    );

    await wait(4800);
}


/* ======================================================
   PELÍCULA
====================================================== */

async function playMovie() {

    if (running) return;

    running = true;

    const mySequence = ++sequence;

    resetScene();

    initAudio();

    intro.classList.add("hide");
    movie.classList.add("active");

    await wait(900);

    if (mySequence !== sequence) return;


    /* ==================================================
       ESCENA 1
    ================================================== */

    progress(7);

    await showSceneText(
        "🌅 Un nuevo día comienza..."
    );

    await wait(1500);


    /* ==================================================
       ESCENA 2
    ================================================== */

    progress(16);

    await showSceneText(
        "🐝 Y la abeja sale a trabajar."
    );

    await beeTakeOff();

    await wait(300);


    /* ==================================================
       ESCENA 3
    ================================================== */

    progress(27);

    await showSceneText(
        "🐝 Tiene algo mejor que hacer..."
    );

    await wait(1000);

    await showSceneText(
        "🍯 ...que perder el tiempo."
    );

    await wait(700);

    await beeFlyToHoney();


    /* ==================================================
       ESCENA 4
    ================================================== */

    progress(40);

    honey.classList.add("show");

    flash();

    beep(
        650,
        .25,
        "sine",
        .045
    );

    await showSceneText(
        "🍯 Crear algo bueno."
    );

    await wait(1000);

    await beeWorkAroundHoney();


    /* ==================================================
       ESCENA 5
    ================================================== */

    progress(50);

    await showSceneText(
        "🪰 Mientras tanto..."
    );

    await wait(900);

    /*
       LA MOSCA APARECE EN EL OTRO LADO
    */

    await flyEnter();


    /* ==================================================
       ESCENA 6
    ================================================== */

    progress(58);

    showPoop();

    showBubbles();

    beep(
        160,
        .3,
        "square",
        .035
    );

    await showSceneText(
        "💩 La mosca encuentra algo que le encanta."
    );

    await wait(800);

    await flyGoToPoop();


    /* ==================================================
       ESCENA 7
    ================================================== */

    progress(66);

    await showSceneText(
        "🪰 Y decide quedarse ahí."
    );

    await flyStayAtPoop();


    /* ==================================================
       ESCENA 8
    ================================================== */

    progress(74);

    await showSceneText(
        "🪰 La mosca quiere llamar la atención."
    );

    await flyLookAround();

    await wait(500);

    await showSceneText(
        "🐝 La abeja ni siquiera se detiene."
    );

    /*
       LA ABEJA SE MUEVE CERCA DE LA MIEL,
       LA MOSCA SIGUE EN LA MIERDA.
    */

    await Promise.all([
        beeContinueWorking(),
        flyStayAtPoop()
    ]);


    /* ==================================================
       ESCENA 9
    ================================================== */

    progress(82);

    await showSceneText(
        "💨 Cada uno sigue su camino."
    );

    await flyLeave();

    await wait(500);

    await beeContinueWorking();


    /* ==================================================
       ESCENA 10
    ================================================== */

    progress(89);

    await showSceneText(
        "🐝 La abeja sigue creando."
    );

    await wait(1000);

    await beeLeave();


    /* ==================================================
       FRASE
    ================================================== */

    progress(94);

    await showQuote();

    await wait(700);


    /* ==================================================
       FINAL
    ================================================== */

    progress(100);

    quote.classList.remove("show");

    flash();

    await wait(600);

    ending.classList.add("show");

    beep(
        520,
        .2,
        "sine",
        .045
    );

    running = false;
}


/* ======================================================
   INICIAR
====================================================== */

startBtn.addEventListener(
    "click",
    () => {

        initAudio();

        playMovie();
    }
);


/* ======================================================
   REPETIR
====================================================== */

replayBtn.addEventListener(
    "click",
    async () => {

        if (running) return;

        ending.classList.remove("show");

        await wait(500);

        resetScene();

        await wait(150);

        playMovie();
    }
);


/* ======================================================
   SONIDO
====================================================== */

soundBtn.addEventListener(
    "click",
    () => {

        soundEnabled =
            !soundEnabled;

        soundBtn.textContent =
            soundEnabled
                ? "🔊"
                : "🔇";

        if (soundEnabled) {

            initAudio();

            beep(
                500,
                .1,
                "sine",
                .03
            );
        }
    }
);


/* ======================================================
   SALTAR
====================================================== */

skipBtn.addEventListener(
    "click",
    () => {

        if (!running) return;

        sequence++;

        running = false;

        cancelAnimations(bee);
        cancelAnimations(fly);

        hideSceneText();

        quote.classList.remove("show");

        progress(100);

        ending.classList.add("show");
    }
);


/* ======================================================
   PARALLAX PC
====================================================== */

movie.addEventListener(
    "mousemove",
    event => {

        if (mobile()) return;

        if (!sun) return;

        const x =
            event.clientX /
            window.innerWidth -
            .5;

        const y =
            event.clientY /
            window.innerHeight -
            .5;

        sun.style.transform =
            `translate3d(
                ${x * 15}px,
                ${y * 10}px,
                0
            ) scale(1.04)`;
    }
);


/* ======================================================
   PARALLAX CELULAR
====================================================== */

window.addEventListener(
    "deviceorientation",
    event => {

        if (!mobile()) return;

        if (
            !movie.classList.contains("active")
        ) {
            return;
        }

        if (!sun) return;

        const x =
            (event.gamma || 0) / 45;

        const y =
            (event.beta || 0) / 90;

        sun.style.transform =
            `translate3d(
                ${x * 8}px,
                ${y * 6}px,
                0
            ) scale(1.03)`;
    },
    {
        passive: true
    }
);


/* ======================================================
   RESIZE
====================================================== */

let resizeTimer;

window.addEventListener(
    "resize",
    () => {

        clearTimeout(resizeTimer);

        resizeTimer =
            setTimeout(() => {
                createParticles();
            }, 300);
    }
);


/* ======================================================
   PREVENIR DOBLE TOQUE
====================================================== */

[
    startBtn,
    replayBtn,
    soundBtn,
    skipBtn
].forEach(button => {

    if (!button) return;

    button.addEventListener(
        "touchend",
        event => {

            event.preventDefault();

        },
        {
            passive: false
        }
    );
});
