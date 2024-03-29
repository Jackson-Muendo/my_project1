var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

/* Creation of snow */

var particlesOnScreen = 245;
var particlesArray = [];
var w,h;

w = canvas.width = window.innerWidth;
h = canvas.height = window.innerHeight;

function random(min, max){
    return min + Math.random() * (max - min + 1);
}

function clientResize(ev){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", clientResize);

function createSnowFlakes(){
    for(var i = 0; i < particlesOnScreen; i++){
        particlesArray.push({
            x: Math.random() * w,
            y: Math.random() * h,
            opacity: Math.random(),
            speedX: random(-11, 11),
            speedY: random(5, 12),
            radius: random(0.5, 4.2),
        })
    }
};

function drawSnowFlakes(){
    for(var i = 0; i < particlesArray.length; i++){
        var gradient = ctx.createRadialGradient(
            particlesArray[i].x,
            particlesArray[i].y,
            0,
            particlesArray[i].x,
            particlesArray[i].y,
            particlesArray[i].radius
        );
            gradient.addColorStop(0, "rgba(255, 255, 255," + particlesArray[i].opacity + ")");
            gradient.addColorStop(.8, "rgba(210, 236, 242," + particlesArray[i].opacity + ")");
            gradient.addColorStop(1, "rgba(237, 247, 249," + particlesArray[i].opacity + ")");
        
            ctx.beginPath();
            ctx.arc(
                particlesArray[i].x,
                particlesArray[i].y,
                particlesArray[i].radius,
                0,
                Math.PI*2,
                false
            );

        ctx.fillStyle = gradient;
        ctx.fill();
    }
};

function moveSnowFlakes(){
    for(var i = 0; i < particlesArray.length; i++){
        particlesArray[i].x += particlesArray[i].speedX;
        particlesArray[i].y += particlesArray[i].speedY;

        if(particlesArray[i].y > h){
            particlesArray[i].x = Math.random() * w * 1.5;
            particlesArray[i].y = -50;
        }
    }
};

function updateSnowFall(){
    ctx.clearRect(0, 0, w, h);
    drawSnowFlakes();
    moveSnowFlakes();
}
setInterval(updateSnowFall, 50);
createSnowFlakes();

/* Count down */

function countDown(){
    var today = new Date();
    var year = today.getFullYear();
    var month = 11;
    var date = 25;
    var eventDate = new Date(year,month,date);

    var currentTime = today.getTime();
    var eventTime = eventDate.getTime();

    var remTime = eventTime - currentTime;

    var sec = Math.floor(remTime/1000);
    var mins = Math.floor(sec/60);
    var h = Math.floor(mins/60);
    var days = Math.floor(h/24);

    h = h % 24;
    mins%=60;
    sec%=60;

    h = (h < 10) ? "0"+h : h;
    mins = (mins < 10) ? "0"+mins : mins;
    sec = (sec < 10) ? "0"+sec : sec;

    document.getElementById("days").innerHTML =days;
    document.getElementById("h").innerHTML =h;
    document.getElementById("mins").innerHTML =mins;
    document.getElementById("sec").innerHTML =sec;

    setTimeout(countDown, 1000);
}

countDown();
