var c = document.getElementById("crossSection");
var ctx = c.getContext("2d");
function drawDisplay() {
    ctx.beginPath();
    ctx.arc(250,250,225,0,2*Math.PI);
    ctx.closePath();
    ctx.stroke();
}
function drawTrack(angle, length) {
    ctx.moveTo(250,250);
    ctx.lineTo(250+length*Math.cos(angle),250-length*Math.sin(angle));
    ctx.stroke();
}
drawDisplay();
drawTrack(-3.061, 150);