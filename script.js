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
const progressBar = document.getElementById("progressBar");

const sun = document.querySelector(".sun");

let running = false;
let sound = true;
let audio = null;


/* =========================================================
   UTILIDADES
========================================================= */

const wait = ms =>
    new Promise(resolve => setTimeout(resolve, ms));


function beep(freq = 440, duration = .15) {

    if (!sound) return;

    try {

        if (!audio) {
            audio = new (
                window.AudioContext ||
                window.webkitAudioContext
            )();
        }

        if (audio.state === "suspended") {
            audio.resume();
        }

        const osc = audio.createOscillator();
        const gain = audio.createGain();

        osc.frequency.value = freq;
        osc.type = "sine";

        gain.gain.setValueAtTime(
            .04,
            audio.currentTime
        );

        gain.gain.exponentialRampToValueAtTime(
            .001,
            audio.currentTime + duration
        );

        osc.connect(gain);
        gain.connect(audio.destination);

        osc.start();

        osc.stop(
            audio.currentTime + duration
        );

    } catch (e) {}

}


/* =========================================================
   TEXTO
========================================================= */

function text(message) {

    sceneText.textContent = message;

    sceneText.classList.remove("show");

    void sceneText.offsetWidth;

    sceneText.classList.add("show");
}


function hideText() {

    sceneText.classList.remove("show");
}


/* =========================================================
   PROGRESO
========================================================= */

function progress(value) {

    progressBar.style.width =
        Math.max(0, Math.min(100, value)) + "%";
}


/* =========================================================
   RESET
========================================================= */

function reset() {

    bee.style.left = "15%";
    bee.style.bottom = "47%";

    fly.style.right = "9%";
    fly.style.bottom = "47%";

    honey.classList.remove("show");
    poop.classList.remove("show");

    quote.classList.remove("show");
    ending.classList.remove("show");

    hideText();

    progress(0);

    if (sun) {

        sun.style.marginLeft = "0px";
        sun.style.marginTop = "0px";
    }
}


/* =========================================================
   MOVIMIENTO DE LA ABEJA
========================================================= */

async function beeToHoney() {

    /*
       PRIMER ACERCAMIENTO
    */

    bee.style.left = "28%";
    bee.style.bottom = "42%";

    await wait(700);


    /*
       SEGUNDO ACERCAMIENTO
       Más cerca del frasco
    */

    bee.style.left = "38%";
    bee.style.bottom = "38%";

    await wait(700);


    /*
       LLEGADA A LA MIEL
    */

    bee.style.left = "46%";
    bee.style.bottom = "34%";

    beep(180, .3);

}


/* =========================================================
   MOVIMIENTO NATURAL DE ABEJA
========================================================= */

async function beeWorkMovement() {

    /*
       La abeja se mueve ligeramente
       alrededor de la miel.
    */

    bee.style.left = "43%";
    bee.style.bottom = "39%";

    await wait(650);

    bee.style.left = "48%";
    bee.style.bottom = "36%";

    await wait(650);

    bee.style.left = "45%";
    bee.style.bottom = "34%";

}


/* =========================================================
   MOSCA SE ACERCA A LA ABEJA
========================================================= */

async function flyApproachBee() {

    /*
       La mosca empieza lejos.
    */

    fly.style.right = "30%";
    fly.style.bottom = "49%";

    await wait(800);


    /*
       Se acerca desde un ángulo diferente.
    */

    fly.style.right = "24%";
    fly.style.bottom = "44%";

    await wait(850);


    /*
       Se acerca bastante a la abeja.
    */

    fly.style.right = "20%";
    fly.style.bottom = "40%";

    await wait(800);


    /*
       Último acercamiento.
    */

    fly.style.right = "18%";
    fly.style.bottom = "38%";

}


/* =========================================================
   MOSCA INTENTA LLAMAR LA ATENCIÓN
========================================================= */

async function flyBotherBee() {

    /*
       La mosca pasa cerca de la abeja.
    */

    fly.style.right = "24%";
    fly.style.bottom = "35%";

    await wait(550);


    /*
       Cruza delante.
    */

    fly.style.right = "31%";
    fly.style.bottom = "33%";

    await wait(550);


    /*
       Vuelve hacia la abeja.
    */

    fly.style.right = "23%";
    fly.style.bottom = "40%";

    await wait(550);


    /*
       Finalmente se aleja.
    */

    fly.style.right = "28%";
    fly.style.bottom = "46%";

}


/* =========================================================
   MOSCA VUELA HACIA LA MIERDA
========================================================= */

async function flyToPoop() {

    /*
       Primero se aleja de la abeja.
    */

    fly.style.right = "35%";
    fly.style.bottom = "42%";

    await wait(650);


    /*
       Empieza a bajar.
    */

    fly.style.right = "45%";
    fly.style.bottom = "34%";

    await wait(650);


    /*
       Se dirige hacia el lado derecho.
    */

    fly.style.right = "58%";
    fly.style.bottom = "29%";

    await wait(650);


    /*
       Último tramo.
    */

    fly.style.right = "75%";
    fly.style.bottom = "25%";

    await wait(500);


    /*
       Llega finalmente al lugar.
    */

    fly.style.right = "8%";
    fly.style.bottom = "28%";

}


/* =========================================================
   FRASE PRINCIPAL
========================================================= */

function showQuote() {

    quote.classList.remove("show");

    void quote.offsetWidth;

    quote.classList.add("show");

    beep(520, .2);
}


/* =========================================================
   ANIMACIÓN PRINCIPAL
========================================================= */

async function playMovie() {

    if (running) return;

    running = true;

    reset();


    /* AUDIO */

    if (sound && !audio) {

        try {

            audio = new (
                window.AudioContext ||
                window.webkitAudioContext
            )();

        } catch (e) {}

    }


    /* ENTRADA */

    intro.classList.add("hide");

    movie.classList.add("active");


    await wait(1000);


    /* =====================================================
       ESCENA 1
    ===================================================== */

    progress(8);

    text("🌅 Un nuevo día comienza...");

    await wait(1800);


    /* =====================================================
       ESCENA 2
    ===================================================== */

    progress(18);

    text("🐝 La abeja sale a trabajar.");

    await wait(700);


    /*
       SALE DE LA COLMENA
    */

    bee.style.left = "20%";
    bee.style.bottom = "45%";

    await wait(900);


    /*
       VUELA HACIA EL CAMPO
    */

    bee.style.left = "28%";
    bee.style.bottom = "40%";

    await wait(1000);


    /* =====================================================
       ESCENA 3
    ===================================================== */

    progress(30);

    text("🍯 La abeja encuentra algo bueno.");

    honey.classList.add("show");

    await wait(800);


    /*
       ACERCAMIENTO REAL A LA MIEL
    */

    await beeToHoney();

    await wait(1300);


    /* =====================================================
       ESCENA 4
    ===================================================== */

    progress(45);

    text("🐝 La abeja se concentra en su trabajo.");

    await beeWorkMovement();

    await wait(1300);


    /* =====================================================
       ESCENA 5
    ===================================================== */

    progress(57);

    text("🪰 Una mosca aparece...");

    await wait(900);


    /*
       LA MOSCA SE ACERCA
    */

    await flyApproachBee();


    await wait(700);


    text("🪰 La mosca intenta llamar su atención.");

    await wait(700);


    /*
       LA MOSCA MOLESTA A LA ABEJA
    */

    await flyBotherBee();

    await wait(500);


    /* =====================================================
       ESCENA 6
    ===================================================== */

    progress(68);

    text("🐝 La abeja simplemente continúa.");

    /*
       La abeja ignora completamente
       a la mosca.
    */

    bee.style.left = "48%";
    bee.style.bottom = "35%";

    await wait(1300);


    /*
       LA MOSCA CAMBIA DE OBJETIVO
    */

    progress(76);

    poop.classList.add("show");

    await wait(700);

    text("💩 La mosca encuentra algo más interesante.");

    await wait(900);


    /*
       VUELO HACIA LA MIERDA
    */

    await flyToPoop();


    await wait(1200);


    /* =====================================================
       ESCENA 7
    ===================================================== */

    progress(84);

    text("💨 Cada uno termina donde quiere estar.");

    await wait(1600);

    hideText();


    /* =====================================================
       FRASE
    ===================================================== */

    progress(91);

    showQuote();

    await wait(5000);


    /* =====================================================
       FINAL
    ===================================================== */

    progress(100);

    quote.classList.remove("show");

    await wait(500);

    ending.classList.add("show");

    beep(520, .25);

    running = false;
}


/* =========================================================
   INICIAR
========================================================= */

startBtn.addEventListener(
    "click",
    function() {

        playMovie();

    }
);


/* =========================================================
   REPETIR
========================================================= */

replayBtn.addEventListener(
    "click",
    function() {

        if (running) return;

        intro.classList.remove("hide");

        movie.classList.remove("active");

        setTimeout(() => {

            playMovie();

        }, 400);

    }
);


/* =========================================================
   SONIDO
========================================================= */

soundBtn.addEventListener(
    "click",
    function() {

        sound = !sound;

        soundBtn.textContent =
            sound ? "🔊" : "🔇";

        if (sound) {

            beep(600, .1);

        }

    }
);


/* =========================================================
   SALTAR
========================================================= */

skipBtn.addEventListener(
    "click",
    function() {

        if (!running) return;

        running = false;

        hideText();

        quote.classList.remove("show");

        progress(100);

        ending.classList.add("show");

    }
);


/* =========================================================
   PARALLAX PC
========================================================= */

movie.addEventListener(
    "mousemove",
    function(e) {

        if (!movie.classList.contains("active")) return;

        const x =
            e.clientX / window.innerWidth - .5;

        const y =
            e.clientY / window.innerHeight - .5;

        if (sun) {

            sun.style.marginLeft =
                x * 15 + "px";

            sun.style.marginTop =
                y * 10 + "px";
        }

    }
);


/* =========================================================
   PARALLAX CELULAR
========================================================= */

window.addEventListener(
    "deviceorientation",
    function(e) {

        if (!movie.classList.contains("active")) return;

        const x =
            (e.gamma || 0) / 45;

        const y =
            (e.beta || 0) / 90;

        if (sun) {

            sun.style.marginLeft =
                x * 12 + "px";

            sun.style.marginTop =
                y * 8 + "px";
        }

    }
);


/* =========================================================
   SOPORTE PARA TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    function(e) {

        if (e.code === "Space") {

            if (!running) {

                playMovie();

            }

        }

        if (e.key === "Escape") {

            if (running) {

                running = false;

                hideText();

                quote.classList.remove("show");

                progress(100);

                ending.classList.add("show");

            }

        }

    }
);


/* =========================================================
   EVITAR PROBLEMAS AL CAMBIAR DE PESTAÑA
========================================================= */

document.addEventListener(
    "visibilitychange",
    function() {

        if (!audio) return;

        if (document.hidden) {

            try {
                audio.suspend();
            } catch(e) {}

        } else if (sound) {

            try {
                audio.resume();
            } catch(e) {}

        }

    }
);
