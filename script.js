const canvas = document.getElementById("canvas");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

//ctx is the context of our canvas
//we use ctx to draw on the canvas
const ctx = canvas.getContext("2d");

//lets create a rectangle for testing purposes
//ctx.fillStyle = "red";
//ctx.fillRect(100, 100, 100, 100);

//get the mouse position whenever the user moves the mouse
/*
window.addEventListener("mousemove", (e) => {
    console.log("Mouse X: " + e.clientX);
    console.log("Mouse Y: " + e.clientY);
});
*/
//previous mouce positions, will be null initially
let prevX = null;
let prevY = null;

//how thick the line should be
ctx.lineWidth = 5;

let draw = false; //we will draw only when draw = true

//select all the div that has a class of clr
let clrs = document.querySelectorAll(".clr");
//converting NodeList to Array
clrs = Array.from(clrs);

clrs.forEach( clr => {
    clr.addEventListener("click", () => {
        ctx.strokeStyle = clr.dataset.clr;
    })
});

let clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    //clearing the entire canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

//saving drawing as image
let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click", () => {
    let data = canvas.toDataURL("image/png");
    let a = document.createElement("a");
    a.href = data;
    //whatever name you specify here the image will be saved as that name
    a.download = "sketch.png";
    a.click();
});

//set draw to true when mouse is pressed
window.addEventListener("mousedown", (e) => draw = true);

//set draw to false when mouse is released
window.addEventListener("mouseup", (e) => draw = false);

window.addEventListener("mousemove", (e) => {
    //initially previous mouse positions are null so we can't draw a line
    if(prevX == null || prevY == null || !draw){
        // Set the previous mouse position to the current mouse 
        prevX = e.clientX;
        prevY = e.clientY;
        return;
    }
    // current mouse position
    let currentX = e.clientX;
    let currentY = e.clientY;

    // Drawing a line from the previous mouse position to the current
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    //update previous mouse position
    prevX = currentX;
    prevY = currentY;
});


