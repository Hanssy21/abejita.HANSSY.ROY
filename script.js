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

let running = false;
let sound = true;
let audio = null;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

function beep(freq = 440, duration = .15) {

    if (!sound) return;

    try {

        if (!audio) {
            audio = new (window.AudioContext || window.webkitAudioContext)();
        }

        if (audio.state === "suspended") {
            audio.resume();
        }

        const osc = audio.createOscillator();
        const gain = audio.createGain();

        osc.frequency.value = freq;
        osc.type = "sine";

        gain.gain.setValueAtTime(.04, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            .001,
            audio.currentTime + duration
        );

        osc.connect(gain);
        gain.connect(audio.destination);

        osc.start();
        osc.stop(audio.currentTime + duration);

    } catch(e) {}

}

function text(message) {

    sceneText.textContent = message;
    sceneText.classList.remove("show");

    void sceneText.offsetWidth;

    sceneText.classList.add("show");
}

function hideText() {
    sceneText.classList.remove("show");
}

function progress(value) {
    progressBar.style.width = value + "%";
}

function reset() {

    bee.style.left = "16%";
    bee.style.bottom = "48%";

    fly.style.right = "10%";
    fly.style.bottom = "48%";

    honey.classList.remove("show");
    poop.classList.remove("show");
    quote.classList.remove("show");
    ending.classList.remove("show");

    hideText();
    progress(0);
}

function beeToHoney() {

    bee.style.left = "42%";
    bee.style.bottom = "37%";

    beep(180,.3);
}

function flyFollowBee() {

    fly.style.right = "36%";
    fly.style.bottom = "43%";

}

function flyToPoop() {

    fly.style.right = "8%";
    fly.style.bottom = "27%";

}

function showQuote() {

    quote.classList.remove("show");

    void quote.offsetWidth;

    quote.classList.add("show");

    beep(520,.2);
}

async function playMovie() {

    if (running) return;

    running = true;

    reset();

    if (sound && !audio) {
        try {
            audio = new (window.AudioContext || window.webkitAudioContext)();
        } catch(e) {}
    }

    intro.classList.add("hide");
    movie.classList.add("active");

    await wait(1000);

    /* ESCENA 1 */

    progress(8);

    text("🌅 Un nuevo día comienza...");

    await wait(1800);

    /* ESCENA 2 */

    progress(18);

    text("🐝 La abeja sale a trabajar.");

    await wait(800);

    bee.style.left = "24%";

    await wait(1800);

    /* ESCENA 3 */

    progress(30);

    text("🍯 La abeja encuentra algo bueno.");

    honey.classList.add("show");

    await wait(700);

    beeToHoney();

    await wait(2200);

    /* ESCENA 4 */

    progress(45);

    text("🐝 La abeja se concentra en su trabajo.");

    await wait(1600);

    /* ESCENA 5 */

    progress(57);

    text("🪰 Una mosca aparece...");

    await wait(1000);

    /*
       LA MOSCA PERSIGUE A LA ABEJA
       PERO NO LLEGA A LA MIEL
    */

    flyFollowBee();

    await wait(2200);

    text("🪰 La mosca intenta llamar su atención.");

    await wait(1300);

    /* ESCENA 6 */

    progress(68);

    text("🐝 La abeja simplemente continúa.");

    bee.style.left = "47%";
    bee.style.bottom = "35%";

    await wait(1300);

    /*
       LA MOSCA CAMBIA DE OBJETIVO
       Y SE VA A LA MIERDA
    */

    progress(76);

    poop.classList.add("show");

    await wait(700);

    text("💩 La mosca encuentra algo más interesante.");

    await wait(900);

    flyToPoop();

    await wait(2200);

    /* ESCENA 7 */

    progress(84);

    text("💨 Cada uno termina donde quiere estar.");

    await wait(1600);

    hideText();

    /* FRASE */

    progress(91);

    showQuote();

    await wait(5000);

    /* FINAL */

    progress(100);

    quote.classList.remove("show");

    await wait(500);

    ending.classList.add("show");

    beep(520,.25);

    running = false;
}

/* INICIAR */

startBtn.addEventListener("click", function() {
    playMovie();
});

/* REPETIR */

replayBtn.addEventListener("click", function() {

    if (running) return;

    playMovie();

});

/* SONIDO */

soundBtn.addEventListener("click", function() {

    sound = !sound;

    soundBtn.textContent = sound ? "🔊" : "🔇";

    if (sound) {
        beep(600,.1);
    }

});

/* SALTAR */

skipBtn.addEventListener("click", function() {

    if (!running) return;

    running = false;

    hideText();

    quote.classList.remove("show");

    progress(100);

    ending.classList.add("show");

});

/* PARALLAX */

movie.addEventListener("mousemove", function(e) {

    const x = e.clientX / window.innerWidth - .5;
    const y = e.clientY / window.innerHeight - .5;

    const sun = document.querySelector(".sun");

    sun.style.marginLeft = x * 15 + "px";
    sun.style.marginTop = y * 10 + "px";

});

/* PARALLAX CELULAR */

window.addEventListener("deviceorientation", function(e) {

    if (!movie.classList.contains("active")) return;

    const sun = document.querySelector(".sun");

    const x = (e.gamma || 0) / 45;
    const y = (e.beta || 0) / 90;

    sun.style.marginLeft = x * 12 + "px";
    sun.style.marginTop = y * 8 + "px";

});