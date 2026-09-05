/* ======================================================
   LAS ABEJAS - JS MEJORADO
   HANSSY ROY
   Optimizado para PC + CELULAR
====================================================== */


/* ======================================================
   ELEMENTOS
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
   VARIABLES
====================================================== */

let running = false;
let soundEnabled = true;
let audioContext = null;

let animationToken = 0;


/* ======================================================
   UTILIDADES
====================================================== */

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function isMobile() {
    return window.innerWidth <= 700;
}


/* ======================================================
   PARTÍCULAS
====================================================== */

function createParticles() {

    if (!particles) return;

    particles.innerHTML = "";

    const amount = isMobile() ? 35 : 70;

    for (let i = 0; i < amount; i++) {

        const particle = document.createElement("div");

        particle.className = "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        const size =
            2 + Math.random() * 3;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particle.style.opacity =
            .2 + Math.random() * .6;

        particle.animate(
            [
                {
                    transform:
                        "translate3d(0,0,0) scale(1)"
                },
                {
                    transform:
                        `translate3d(
                            ${-20 + Math.random() * 40}px,
                            -${30 + Math.random() * 80}px,
                            0
                        ) scale(.2)`
                }
            ],
            {
                duration:
                    4000 + Math.random() * 5000,

                iterations: Infinity,

                delay:
                    Math.random() * 4000,

                easing:
                    "ease-in-out"
            }
        );

        particles.appendChild(particle);
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

            const AudioCtx =
                window.AudioContext ||
                window.webkitAudioContext;

            if (!AudioCtx) return;

            audioContext =
                new AudioCtx();
        }

        if (
            audioContext.state ===
            "suspended"
        ) {
            audioContext.resume();
        }

    } catch (error) {
        console.log("Audio no disponible");
    }
}


function beep(
    frequency = 440,
    duration = .15,
    type = "sine",
    volume = .035
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

        oscillator.frequency.setValueAtTime(
            frequency,
            audioContext.currentTime
        );

        gain.gain.setValueAtTime(
            .001,
            audioContext.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            volume,
            audioContext.currentTime + .02
        );

        gain.gain.exponentialRampToValueAtTime(
            .001,
            audioContext.currentTime + duration
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + duration + .02
        );

    } catch (error) {
        console.log("Error de audio");
    }
}


/* ======================================================
   SONIDO DE ABEJA
====================================================== */

function beeSound() {

    if (!soundEnabled) return;

    initAudio();

    if (!audioContext) return;

    try {

        const oscillator =
            audioContext.createOscillator();

        const gain =
            audioContext.createGain();

        oscillator.type = "sawtooth";

        oscillator.frequency.setValueAtTime(
            145,
            audioContext.currentTime
        );

        oscillator.frequency.linearRampToValueAtTime(
            190,
            audioContext.currentTime + .35
        );

        gain.gain.setValueAtTime(
            .001,
            audioContext.currentTime
        );

        gain.gain.linearRampToValueAtTime(
            .018,
            audioContext.currentTime + .05
        );

        gain.gain.exponentialRampToValueAtTime(
            .001,
            audioContext.currentTime + .4
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();

        oscillator.stop(
            audioContext.currentTime + .42
        );

    } catch (error) {}
}


/* ======================================================
   TEXTO
====================================================== */

async function showSceneText(text) {

    if (!sceneText) return;

    sceneText.classList.remove("show");

    await wait(180);

    sceneText.textContent = text;

    sceneText.classList.add("show");
}


function hideSceneText() {

    if (!sceneText) return;

    sceneText.classList.remove("show");
}


/* ======================================================
   PROGRESO
====================================================== */

function progress(percent) {

    if (!progressBar) return;

    progressBar.style.width =
        Math.max(0, Math.min(100, percent)) + "%";
}


/* ======================================================
   RESET COMPLETO
====================================================== */

function resetScene() {

    animationToken++;

    bee.getAnimations().forEach(
        animation => animation.cancel()
    );

    fly.getAnimations().forEach(
        animation => animation.cancel()
    );

    bee.style.transition = "none";
    fly.style.transition = "none";

    bee.style.left = "17%";
    bee.style.bottom = "48%";

    fly.style.right = "12%";
    fly.style.bottom = "47%";

    bee.style.transform =
        "translate3d(0,0,0) scale(1) rotate(0deg)";

    fly.style.transform =
        "translate3d(0,0,0) scale(1) rotate(0deg)";

    honey.classList.remove("show");
    poop.classList.remove("show");
    quote.classList.remove("show");
    ending.classList.remove("show");

    document
        .querySelectorAll(".bubble")
        .forEach(bubble => {
            bubble.classList.remove("active");
        });

    hideSceneText();

    progress(0);

    /*
       Volvemos a activar las transiciones
       después de un pequeño frame.
    */

    requestAnimationFrame(() => {

        bee.style.transition =
            "left 1.8s cubic-bezier(.22,.61,.36,1), bottom 1.8s cubic-bezier(.22,.61,.36,1)";

        fly.style.transition =
            "right 1.8s cubic-bezier(.22,.61,.36,1), bottom 1.8s cubic-bezier(.22,.61,.36,1)";

    });
}


/* ======================================================
   ABEJA: MOVIMIENTO NATURAL
====================================================== */

async function moveBeeToHoney() {

    beeSound();

    /*
       Primero un pequeño vuelo hacia arriba.
    */

    bee.style.transform =
        "translate3d(0,-12px,0) scale(1.02) rotate(-2deg)";

    await wait(250);

    /*
       Después avanza hacia la miel.
    */

    bee.style.left =
        isMobile() ? "30%" : "40%";

    bee.style.bottom =
        isMobile() ? "38%" : "38%";

    bee.style.transform =
        "translate3d(0,0,0) scale(1.05) rotate(4deg)";

    await wait(1400);

    /*
       Pequeño movimiento de frenado.
    */

    bee.style.transform =
        "translate3d(0,-5px,0) scale(1.03) rotate(0deg)";

    await wait(250);

    bee.style.transform =
        "translate3d(0,0,0) scale(1.02) rotate(-2deg)";
}


/* ======================================================
   ABEJA: PEQUEÑO VUELO ALREDEDOR DE LA MIEL
====================================================== */

async function beeInspectHoney() {

    beeSound();

    bee.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(-2deg) scale(1)"
            },
            {
                transform:
                    "translate3d(10px,-10px,0) rotate(5deg) scale(1.04)"
            },
            {
                transform:
                    "translate3d(18px,2px,0) rotate(2deg) scale(1.02)"
            },
            {
                transform:
                    "translate3d(8px,8px,0) rotate(-4deg) scale(1)"
            },
            {
                transform:
                    "translate3d(0,0,0) rotate(-2deg) scale(1)"
            }
        ],
        {
            duration: 1600,
            easing: "ease-in-out"
        }
    );

    await wait(1600);
}


/* ======================================================
   MOSCA: SE ACERCA A LA MIERDA
====================================================== */

async function moveFlyToPoop() {

    /*
       La mosca NO va directamente.
       Hace un recorrido curvado.
    */

    fly.style.right =
        isMobile() ? "16%" : "18%";

    fly.style.bottom =
        isMobile() ? "36%" : "37%";

    fly.style.transform =
        "translate3d(0,-8px,0) rotate(-4deg) scale(1.02)";

    await wait(900);

    /*
       Segundo movimiento: baja hacia la mierda.
    */

    fly.style.right =
        isMobile() ? "8%" : "9%";

    fly.style.bottom =
        isMobile() ? "28%" : "29%";

    fly.style.transform =
        "translate3d(0,0,0) rotate(5deg) scale(1)";

    await wait(1100);

    /*
       Se queda flotando cerca de ella.
    */

    fly.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(4deg)"
            },
            {
                transform:
                    "translate3d(-7px,-9px,0) rotate(-4deg)"
            },
            {
                transform:
                    "translate3d(5px,-3px,0) rotate(5deg)"
            },
            {
                transform:
                    "translate3d(0,0,0) rotate(4deg)"
            }
        ],
        {
            duration: 900,
            iterations: 2,
            easing: "ease-in-out"
        }
    );

    await wait(1800);
}


/* ======================================================
   MOSCA: MOVIMIENTO DE CURIOSIDAD
====================================================== */

function shakeFly() {

    fly.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) rotate(3deg)"
            },
            {
                transform:
                    "translate3d(-6px,-4px,0) rotate(-5deg)"
            },
            {
                transform:
                    "translate3d(7px,-7px,0) rotate(7deg)"
            },
            {
                transform:
                    "translate3d(-4px,2px,0) rotate(-3deg)"
            },
            {
                transform:
                    "translate3d(0,0,0) rotate(3deg)"
            }
        ],
        {
            duration: 1000,
            easing: "ease-in-out"
        }
    );
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

            }, index * 180);
        }
    );
}


/* ======================================================
   MOSCA HUYE
====================================================== */

async function flyAway() {

    fly.getAnimations().forEach(
        animation => animation.cancel()
    );

    fly.animate(
        [
            {
                transform:
                    "translate3d(0,0,0) scale(1) rotate(4deg)"
            },
            {
                transform:
                    "translate3d(-30px,-50px,0) scale(1.05) rotate(-10deg)"
            },
            {
                transform:
                    "translate3d(90px,-130px,0) scale(.75) rotate(12deg)"
            },
            {
                transform:
                    "translate3d(300px,-280px,0) scale(.3) rotate(20deg)"
            },
            {
                transform:
                    "translate3d(650px,-500px,0) scale(.05) rotate(30deg)"
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
   ABEJA SE VA A TRABAJAR
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
                    "translate3d(-10px,-30px,0) rotate(-7deg) scale(1.02)"
            },
            {
                transform:
                    "translate3d(80px,-70px,0) rotate(8deg) scale(1)"
            },
            {
                transform:
                    "translate3d(260px,-170px,0) rotate(12deg) scale(.85)"
            },
            {
                transform:
                    "translate3d(520px,-300px,0) rotate(18deg) scale(.5)"
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
   FLASH CINEMATOGRÁFICO
====================================================== */

function flash() {

    const flashElement =
        document.createElement("div");

    flashElement.style.position = "absolute";
    flashElement.style.inset = "0";
    flashElement.style.zIndex = "500";
    flashElement.style.background = "white";
    flashElement.style.pointerEvents = "none";

    movie.appendChild(flashElement);

    flashElement.animate(
        [
            {
                opacity: 0
            },
            {
                opacity: .65
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
        () => flashElement.remove(),
        700
    );
}


/* ======================================================
   FRASE FINAL
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
   PELÍCULA PRINCIPAL
====================================================== */

async function playMovie() {

    if (running) return;

    running = true;

    const currentToken =
        ++animationToken;

    resetScene();

    initAudio();

    intro.classList.add("hide");

    movie.classList.add("active");

    await wait(900);

    if (currentToken !== animationToken) return;


    /* ==================================================
       ESCENA 1
    ================================================== */

    progress(8);

    await showSceneText(
        "🌅 Un nuevo día comienza..."
    );

    await wait(1500);


    /* ==================================================
       ESCENA 2
    ================================================== */

    progress(18);

    await showSceneText(
        "🐝 Y la abeja sale a trabajar."
    );

    beeSound();

    bee.style.left =
        isMobile() ? "18%" : "25%";

    bee.style.bottom =
        isMobile() ? "47%" : "48%";

    bee.style.transform =
        "translate3d(0,-4px,0) rotate(-2deg)";

    await wait(1700);


    /* ==================================================
       ESCENA 3
    ================================================== */

    progress(28);

    await showSceneText(
        "🐝 Tiene algo mejor que hacer..."
    );

    await wait(1100);

    await showSceneText(
        "🍯 ...que perder el tiempo."
    );

    await wait(800);

    await moveBeeToHoney();


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

    await wait(900);

    await beeInspectHoney();

    await wait(500);


    /* ==================================================
       ESCENA 5
    ================================================== */

    progress(50);

    await showSceneText(
        "🪰 Pero entonces aparece una mosca..."
    );

    await wait(900);

    await moveFlyToPoop();


    /* ==================================================
       ESCENA 6
    ================================================== */

    progress(60);

    poop.classList.add("show");

    showBubbles();

    beep(
        160,
        .3,
        "square",
        .035
    );

    await showSceneText(
        "💩 Muy orgullosa de lo suyo."
    );

    await wait(600);

    shakeFly();

    await wait(1200);


    /* ==================================================
       ESCENA 7
    ================================================== */

    progress(68);

    await showSceneText(
        "🪰 La mosca quiere discutir."
    );

    shakeFly();

    await wait(1300);

    await showSceneText(
        "🐝 Pero la abeja no pierde su tiempo."
    );

    await wait(1500);


    /* ==================================================
       ESCENA 8
    ================================================== */

    progress(76);

    await flyAway();

    beep(
        220,
        .2,
        "square",
        .025
    );

    await showSceneText(
        "💨 La mosca se va."
    );

    await wait(1300);


    /* ==================================================
       ESCENA 9
    ================================================== */

    progress(82);

    await beeLeave();

    await showSceneText(
        "🐝 La abeja continúa con su trabajo."
    );

    await wait(1500);


    /* ==================================================
       ESCENA 10
    ================================================== */

    progress(90);

    await showQuote();

    await wait(700);


    /* ==================================================
       FINAL
    ================================================== */

    progress(100);

    quote.classList.remove("show");

    flash();

    await wait(550);

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

        /*
           En móvil volvemos a colocar todo
           correctamente antes de comenzar.
        */

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

        /*
           Cancelamos la secuencia actual.
        */

        animationToken++;

        running = false;

        bee.getAnimations().forEach(
            animation => animation.cancel()
        );

        fly.getAnimations().forEach(
            animation => animation.cancel()
        );

        hideSceneText();

        quote.classList.remove("show");

        progress(100);

        ending.classList.add("show");

        beep(
            520,
            .15,
            "sine",
            .03
        );
    }
);


/* ======================================================
   PARALLAX PC
====================================================== */

movie.addEventListener(
    "mousemove",
    event => {

        /*
           En móvil no usamos mousemove.
        */

        if (isMobile()) return;

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
            ) scale(1.03)`;
    }
);


/* ======================================================
   PARALLAX CELULAR
====================================================== */

window.addEventListener(
    "deviceorientation",
    event => {

        if (
            !movie.classList.contains("active")
        ) {
            return;
        }

        if (!isMobile()) return;

        if (!sun) return;

        const x =
            (event.gamma || 0) / 45;

        const y =
            (event.beta || 0) / 90;

        sun.style.transform =
            `translate3d(
                ${x * 10}px,
                ${y * 7}px,
                0
            ) scale(1.03)`;
    },
    {
        passive: true
    }
);


/* ======================================================
   ORIENTACIÓN DE PANTALLA
====================================================== */

window.addEventListener(
    "resize",
    () => {

        /*
           Regeneramos menos partículas
           en móvil si cambia el tamaño.
        */

        createParticles();

    }
);


/* ======================================================
   EVITAR DOBLE TOQUE ACCIDENTAL
====================================================== */

[startBtn, replayBtn, soundBtn, skipBtn]
    .forEach(button => {

        if (!button) return;

        button.addEventListener(
            "touchend",
            event => {

                /*
                   Evita que algunos celulares
                   disparen dos veces el botón.
                */

                event.preventDefault();
            },
            {
                passive: false
            }
        );
    });

