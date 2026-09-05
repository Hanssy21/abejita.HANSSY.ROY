/* ======================================================
   ELEMENTOS
====================================================== */

const intro =
    document.getElementById("intro");

const movie =
    document.getElementById("movie");

const startBtn =
    document.getElementById("startBtn");

const replayBtn =
    document.getElementById("replayBtn");

const soundBtn =
    document.getElementById("soundBtn");

const skipBtn =
    document.getElementById("skipBtn");

const bee =
    document.getElementById("bee");

const fly =
    document.getElementById("fly");

const honey =
    document.getElementById("honey");

const poop =
    document.getElementById("poop");

const quote =
    document.getElementById("quote");

const ending =
    document.getElementById("ending");

const sceneText =
    document.getElementById("sceneText");

const particles =
    document.getElementById("particles");

const progressBar =
    document.getElementById("progressBar");


/* ======================================================
   VARIABLES
====================================================== */

let running = false;

let soundEnabled = true;

let audioContext = null;


/* ======================================================
   UTILIDAD
====================================================== */

function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* ======================================================
   PARTÍCULAS
====================================================== */

function createParticles() {

    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const particle =
            document.createElement("div");

        particle.className =
            "particle";

        particle.style.left =
            Math.random() * 100 + "%";

        particle.style.top =
            Math.random() * 100 + "%";

        const size =
            2 + Math.random() * 4;

        particle.style.width =
            size + "px";

        particle.style.height =
            size + "px";

        particle.style.opacity =
            .2 + Math.random() * .8;

        particle.animate(

            [
                {
                    transform:
                        "translateY(0) scale(1)"
                },

                {
                    transform:
                        `translateY(-${
                            30 +
                            Math.random() * 100
                        }px) scale(.2)`
                }

            ],

            {
                duration:
                    3000 +
                    Math.random() * 6000,

                iterations:
                    Infinity,

                delay:
                    Math.random() * 5000
            }

        );

        particles.appendChild(
            particle
        );

    }

}

createParticles();


/* ======================================================
   AUDIO
====================================================== */

function initAudio() {

    if (!soundEnabled) {
        return;
    }

    if (!audioContext) {

        audioContext =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

    }

    if (
        audioContext.state ===
        "suspended"
    ) {

        audioContext.resume();

    }

}


function beep(
    frequency = 440,
    duration = .15,
    type = "sine",
    volume = .04
) {

    if (!soundEnabled) {
        return;
    }

    initAudio();

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type =
        type;

    oscillator.frequency.value =
        frequency;

    gain.gain.setValueAtTime(
        volume,
        audioContext.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        .001,
        audioContext.currentTime +
        duration
    );

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start();

    oscillator.stop(
        audioContext.currentTime +
        duration
    );

}


/* ======================================================
   SONIDO DE ABEJA
====================================================== */

function beeSound() {

    if (!soundEnabled) {
        return;
    }

    initAudio();

    const oscillator =
        audioContext.createOscillator();

    const gain =
        audioContext.createGain();

    oscillator.type =
        "sawtooth";

    oscillator.frequency.value =
        150;

    gain.gain.value =
        .015;

    oscillator.connect(gain);

    gain.connect(
        audioContext.destination
    );

    oscillator.start();

    oscillator.frequency.linearRampToValueAtTime(
        190,
        audioContext.currentTime + .25
    );

    oscillator.stop(
        audioContext.currentTime + .3
    );

}


/* ======================================================
   TEXTO DE ESCENA
====================================================== */

async function showSceneText(text) {

    sceneText.classList.remove(
        "show"
    );

    await wait(200);

    sceneText.textContent =
        text;

    sceneText.classList.add(
        "show"
    );

}


function hideSceneText() {

    sceneText.classList.remove(
        "show"
    );

}


/* ======================================================
   PROGRESO
====================================================== */

function progress(percent) {

    progressBar.style.width =
        percent + "%";

}


/* ======================================================
   RESET
====================================================== */

function resetScene() {

    bee.style.left =
        "17%";

    bee.style.bottom =
        "48%";

    fly.style.right =
        "12%";

    fly.style.bottom =
        "47%";

    honey.classList.remove(
        "show"
    );

    poop.classList.remove(
        "show"
    );

    quote.classList.remove(
        "show"
    );

    ending.classList.remove(
        "show"
    );

    hideSceneText();

    progress(0);

}


/* ======================================================
   ABEJA SE MUEVE
====================================================== */

function moveBeeToHoney() {

    bee.style.left =
        "40%";

    bee.style.bottom =
        "38%";

    bee.style.transform =
        "scale(1.1) rotate(5deg)";

    beeSound();

}


/* ======================================================
   MOSCA SE ACERCA
====================================================== */

function moveFlyCloser() {

    fly.style.right =
        "29%";

    fly.style.bottom =
        "39%";

}


/* ======================================================
   MOSCA SE SACUDE
====================================================== */

function shakeFly() {

    fly.animate(

        [

            {
                transform:
                    "translateX(0) rotate(0)"
            },

            {
                transform:
                    "translateX(-15px) rotate(-8deg)"
            },

            {
                transform:
                    "translateX(15px) rotate(8deg)"
            },

            {
                transform:
                    "translateX(-8px) rotate(-4deg)"
            },

            {
                transform:
                    "translateX(0) rotate(0)"
            }

        ],

        {
            duration:
                800,

            easing:
                "cubic-bezier(.2,.8,.2,1)"
        }

    );

}


/* ======================================================
   BURBUJAS
====================================================== */

function showBubbles() {

    const bubbles =
        document.querySelectorAll(
            ".bubble"
        );

    bubbles.forEach(
        bubble => {

            bubble.classList.remove(
                "active"
            );

            void bubble.offsetWidth;

            bubble.classList.add(
                "active"
            );

        }
    );

}


/* ======================================================
   MOSCA HUYE
====================================================== */

function flyAway() {

    fly.animate(

        [

            {
                transform:
                    "translate(0,0) scale(1)"
            },

            {
                transform:
                    "translate(100px,-100px) scale(.7)"
            },

            {
                transform:
                    "translate(450px,-350px) scale(.1)"
            }

        ],

        {

            duration:
                1500,

            easing:
                "cubic-bezier(.1,.8,.2,1)"

        }

    );

}


/* ======================================================
   ABEJA VUELA
====================================================== */

function beeLeave() {

    bee.animate(

        [

            {
                transform:
                    "translate(0,0) rotate(0)"
            },

            {
                transform:
                    "translate(100px,-40px) rotate(10deg)"
            },

            {
                transform:
                    "translate(500px,-250px) rotate(15deg)"
            }

        ],

        {

            duration:
                1800,

            easing:
                "cubic-bezier(.2,.8,.2,1)"

        }

    );

}


/* ======================================================
   FLASH
====================================================== */

function flash() {

    const flash =
        document.createElement("div");

    flash.style.position =
        "absolute";

    flash.style.inset =
        "0";

    flash.style.zIndex =
        "500";

    flash.style.background =
        "white";

    flash.style.pointerEvents =
        "none";

    movie.appendChild(
        flash
    );

    flash.animate(

        [
            {
                opacity: 0
            },

            {
                opacity: .7
            },

            {
                opacity: 0
            }

        ],

        {
            duration:
                600
        }

    );

    setTimeout(
        () => flash.remove(),
        700
    );

}


/* ======================================================
   FRASE PRINCIPAL
====================================================== */

async function showQuote() {

    hideSceneText();

    quote.classList.remove(
        "show"
    );

    void quote.offsetWidth;

    quote.classList.add(
        "show"
    );

    beep(
        500,
        .15,
        "sine",
        .04
    );

    await wait(4500);

}


/* ======================================================
   PELÍCULA
====================================================== */

async function playMovie() {

    if (running) {
        return;
    }

    running = true;

    resetScene();

    initAudio();

    intro.classList.add(
        "hide"
    );

    movie.classList.add(
        "active"
    );

    await wait(1000);


    /* ==============================================
       ESCENA 1
    ============================================== */

    progress(8);

    await showSceneText(
        "🌅 Un nuevo día comienza..."
    );

    await wait(1500);


    /* ==============================================
       ESCENA 2
    ============================================== */

    progress(18);

    await showSceneText(
        "🐝 Y la abeja sale a trabajar."
    );

    beeSound();

    bee.style.left =
        "25%";

    await wait(1700);


    /* ==============================================
       ESCENA 3
    ============================================== */

    progress(28);

    await showSceneText(
        "🐝 Tiene algo mejor que hacer..."
    );

    await wait(1200);

    await showSceneText(
        "🍯 ...que perder el tiempo."
    );

    moveBeeToHoney();

    await wait(1700);


    /* ==============================================
       ESCENA 4
    ============================================== */

    progress(40);

    honey.classList.add(
        "show"
    );

    flash();

    beep(
        650,
        .25,
        "sine",
        .05
    );

    await showSceneText(
        "🍯 Crear algo bueno."
    );

    await wait(1700);


    /* ==============================================
       ESCENA 5
    ============================================== */

    progress(50);

    await showSceneText(
        "🪰 Pero entonces aparece una mosca..."
    );

    await wait(900);

    moveFlyCloser();

    await wait(1600);


    /* ==============================================
       ESCENA 6
    ============================================== */

    progress(60);

    poop.classList.add(
        "show"
    );

    showBubbles();

    beep(
        160,
        .3,
        "square",
        .04
    );

    await showSceneText(
        "💩 Muy orgullosa de lo suyo."
    );

    shakeFly();

    await wait(1800);


    /* ==============================================
       ESCENA 7
    ============================================== */

    progress(68);

    await showSceneText(
        "🪰 La mosca quiere discutir."
    );

    await wait(1400);

    await showSceneText(
        "🐝 Pero la abeja no pierde su tiempo."
    );

    await wait(1600);


    /* ==============================================
       ESCENA 8
    ============================================== */

    progress(76);

    flyAway();

    beep(
        220,
        .2,
        "square",
        .03
    );

    await showSceneText(
        "💨 La mosca se va."
    );

    await wait(1500);


    /* ==============================================
       ESCENA 9
    ============================================== */

    progress(82);

    beeLeave();

    await showSceneText(
        "🐝 La abeja continúa con su trabajo."
    );

    await wait(1600);


    /* ==============================================
       ESCENA 10
       FRASE
    ============================================== */

    progress(90);

    await showQuote();

    await wait(800);


    /* ==============================================
       FINAL
    ============================================== */

    progress(100);

    quote.classList.remove(
        "show"
    );

    flash();

    await wait(500);

    ending.classList.add(
        "show"
    );

    beep(
        520,
        .2,
        "sine",
        .05
    );

    running = false;

}


/* ======================================================
   BOTÓN INICIAR
====================================================== */

startBtn.addEventListener(
    "click",
    () => {

        playMovie();

    }
);


/* ======================================================
   REPETIR
====================================================== */

replayBtn.addEventListener(
    "click",
    async () => {

        if (running) {
            return;
        }

        ending.classList.remove(
            "show"
        );

        await wait(800);

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
                .1
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

        if (!running) {
            return;
        }

        running = false;

        progress(100);

        hideSceneText();

        quote.classList.remove(
            "show"
        );

        ending.classList.add(
            "show"
        );

    }
);


/* ======================================================
   PARALLAX CON EL RATÓN
====================================================== */

movie.addEventListener(
    "mousemove",
    event => {

        const x =
            event.clientX /
            window.innerWidth -
            .5;

        const y =
            event.clientY /
            window.innerHeight -
            .5;

        const sun =
            document.querySelector(
                ".sun"
            );

        sun.style.marginLeft =
            `${x * 15}px`;

        sun.style.marginTop =
            `${y * 10}px`;

    }
);


/* ======================================================
   PARALLAX EN MÓVIL
====================================================== */

window.addEventListener(
    "deviceorientation",
    event => {

        if (!movie.classList.contains(
            "active"
        )) {
            return;
        }

        const sun =
            document.querySelector(
                ".sun"
            );

        const x =
            (event.gamma || 0) / 45;

        const y =
            (event.beta || 0) / 90;

        sun.style.marginLeft =
            `${x * 15}px`;

        sun.style.marginTop =
            `${y * 10}px`;

    }
);
