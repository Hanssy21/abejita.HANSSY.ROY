const intro=document.getElementById("intro");
const movie=document.getElementById("movie");
const startBtn=document.getElementById("startBtn");
const replayBtn=document.getElementById("replayBtn");
const soundBtn=document.getElementById("soundBtn");
const skipBtn=document.getElementById("skipBtn");

const bee=document.getElementById("bee");
const fly=document.getElementById("fly");
const honey=document.getElementById("honey");
const poop=document.getElementById("poop");
const quote=document.getElementById("quote");
const ending=document.getElementById("ending");
const sceneText=document.getElementById("sceneText");
const progressBar=document.getElementById("progressBar");

let running=false;
let sound=true;

const wait=ms=>new Promise(r=>setTimeout(r,ms));

function text(t){
    sceneText.classList.remove("show");

    setTimeout(()=>{
        sceneText.textContent=t;
        sceneText.classList.add("show");
    },100);
}

function progress(n){
    progressBar.style.width=n+"%";
}

function reset(){

    bee.style.left="17%";
    bee.style.bottom="48%";

    fly.style.right="10%";
    fly.style.bottom="48%";

    bee.getAnimations().forEach(a=>a.cancel());
    fly.getAnimations().forEach(a=>a.cancel());

    honey.classList.remove("show");
    poop.classList.remove("show");
    quote.classList.remove("show");
    ending.classList.remove("show");
    sceneText.classList.remove("show");

    document.querySelectorAll(".bubble").forEach(b=>{
        b.classList.remove("active");
    });

    progress(0);
}

/* ABEJA: VUELO SUAVE */

function beeMove(x,y,time=2000){

    bee.animate([
        {
            transform:"translate(0,0) rotate(-3deg)"
        },
        {
            transform:`translate(${x*.45}px,${y*.45}px) rotate(5deg)`
        },
        {
            transform:`translate(${x*.8}px,${y*.8}px) rotate(-4deg)`
        },
        {
            transform:`translate(${x}px,${y}px) rotate(2deg)`
        }
    ],{
        duration:time,
        easing:"cubic-bezier(.25,.7,.25,1)",
        fill:"forwards"
    });
}

/* MOSCA: PERSIGUE A LA ABEJA */

function flyChase(){

    fly.animate([

        {
            transform:"translate(0,0) rotate(-3deg)"
        },

        {
            transform:"translate(-35px,-15px) rotate(5deg)"
        },

        {
            transform:"translate(-75px,-5px) rotate(-5deg)"
        },

        {
            transform:"translate(-105px,20px) rotate(4deg)"
        },

        {
            transform:"translate(-130px,5px) rotate(-2deg)"
        }

    ],{

        duration:3000,
        easing:"cubic-bezier(.2,.7,.2,1)",
        fill:"forwards"

    });
}

/* MOSCA: CAMBIA DE RUMBO Y VA A LA MIERDA */

function flyToPoop(){

    fly.animate([

        {
            transform:"translate(-130px,5px) rotate(0)"
        },

        {
            transform:"translate(-100px,35px) rotate(10deg)"
        },

        {
            transform:"translate(-55px,80px) rotate(-8deg)"
        },

        {
            transform:"translate(0,120px) rotate(6deg)"
        }

    ],{

        duration:2400,
        easing:"cubic-bezier(.2,.8,.2,1)",
        fill:"forwards"

    });
}

/* ABEJA VA HACIA LA MIEL */

function beeToHoney(){

    bee.animate([

        {
            transform:"translate(0,0) rotate(0)"
        },

        {
            transform:"translate(45px,-25px) rotate(7deg)"
        },

        {
            transform:"translate(90px,0) rotate(-5deg)"
        },

        {
            transform:"translate(120px,20px) rotate(3deg)"
        }

    ],{

        duration:2500,
        easing:"cubic-bezier(.2,.8,.2,1)",
        fill:"forwards"

    });
}

/* BURBUJAS */

function bubbles(){

    document.querySelectorAll(".bubble").forEach(b=>{

        b.classList.remove("active");

        void b.offsetWidth;

        b.classList.add("active");

    });
}

/* ANIMACIÓN PRINCIPAL */

async function play(){

    if(running)return;

    running=true;

    reset();

    intro.classList.add("hide");
    movie.classList.add("active");

    await wait(900);

    /* ESCENA 1 */

    progress(8);
    text("🌅 Un nuevo día comienza...");

    await wait(1500);

    /* ESCENA 2 */

    progress(18);
    text("🐝 La abeja sale a trabajar.");

    beeMove(70,-15,1800);

    await wait(1800);

    /* ESCENA 3 */

    progress(30);
    text("🍯 Su objetivo es simple: crear algo bueno.");

    honey.classList.add("show");

    beeToHoney();

    await wait(2300);

    /* ESCENA 4 */

    progress(43);
    text("🪰 Pero alguien la está observando...");

    await wait(1000);

    /* MOSCA APARECE Y PERSIGUE */

    progress(52);
    text("🪰 La mosca comienza a seguirla.");

    flyChase();

    await wait(3000);

    /* MOSCA CAMBIA DE OBJETIVO */

    progress(63);
    text("🪰 Hasta que encuentra algo que le interesa más...");

    poop.classList.add("show");

    await wait(600);

    flyToPoop();

    await wait(2400);

    /* MOSCA SE QUEDA EN LA MIERDA */

    progress(72);
    text("💩 Y ahí decide quedarse.");

    bubbles();

    await wait(1800);

    /* ABEJA CONTINÚA */

    progress(82);
    text("🐝 La abeja simplemente continúa con su trabajo.");

    beeMove(45,-15,1800);

    await wait(1900);

    /* FRASE */

    progress(90);

    sceneText.classList.remove("show");

    await wait(400);

    quote.classList.add("show");

    await wait(4500);

    /* FINAL */

    progress(100);

    quote.classList.remove("show");

    await wait(500);

    ending.classList.add("show");

    running=false;
}

/* BOTONES */

startBtn.onclick=play;

replayBtn.onclick=()=>{

    if(running)return;

    play();

};

skipBtn.onclick=()=>{

    if(!running)return;

    running=false;

    progress(100);

    sceneText.classList.remove("show");
    quote.classList.remove("show");

    ending.classList.add("show");

};

soundBtn.onclick=()=>{

    sound=!sound;

    soundBtn.textContent=sound?"🔊":"🔇";

};

/* PARALLAX SUAVE */

movie.addEventListener("mousemove",e=>{

    if(!movie.classList.contains("active"))return;

    const sun=document.querySelector(".sun");

    const x=(e.clientX/window.innerWidth-.5)*12;
    const y=(e.clientY/window.innerHeight-.5)*8;

    sun.style.marginLeft=x+"px";
    sun.style.marginTop=y+"px";

});

