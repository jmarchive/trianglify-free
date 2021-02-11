//globals

var resbox = document.getElementById("result");
var pw = document.getElementById("pw");

//setup

document.getElementById("seed").value = new Date().getTime();
var cellsize = 75;
var pattern = trianglify({
    width: document.getElementById("width").value,
    height: document.getElementById("height").value,
    cellSize: cellsize,
    variance: document.getElementById("variance").value,
    seed: document.getElementById("seed").value,
    xColors: 'random',
    yColors: 'match',
    colorFunction: trianglify.colorFunctions.interpolateLinear(0.5),
    strokeWidth: 0,
    points: null
});
resbox.appendChild(pattern.toCanvas());
drag();

//functions
//main function: update pattern
function update(){
    pattern = trianglify({
        width: document.getElementById("width").value,
        height: document.getElementById("height").value,
        cellSize: cellsize,
        variance: document.getElementById("variance").value,
        seed: document.getElementById("seed").value,
        xColors: 'random',
        yColors: 'match',
        colorFunction: trianglify.colorFunctions.interpolateLinear(0.5),
        strokeWidth: 0,
        points: null
    });
    resbox.appendChild(pattern.toCanvas());
    resbox.removeChild(resbox.childNodes[0]);
}
//download files
function png(){
    var temp = document.createElement("a");
    temp.download = 'trianglify-free';
    temp.href = resbox.childNodes[0].toDataURL("image/png");
    document.body.appendChild(temp);
    temp.click();
    temp.remove();
}
function svg(res){
    var tempsvg = document.createElement("svg");
    tempsvg.hidden = true;
    pattern.toSVG(tempsvg);
    var tempa = document.createElement("a");
    tempa.download = 'trianglify-free.svg';
    const head = "data:text/plain;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg'";
    if(res){
        tempa.href = head + " width='" + document.getElementById("width").value + "' height='" + document.getElementById("height").value + "'>" + tempsvg.innerHTML + "</svg>";
    }
    else{
        tempa.href = head + ">" + tempsvg.innerHTML + "</svg>";
    }
    document.body.appendChild(tempa);
    tempa.click();
    tempa.remove();
}
//updates
function vaupdate(){
    update();
}
function seedupdate(){
    document.getElementById("seed").value = new Date().getTime();
    update();
}
function csupdate(){
    var temp = document.getElementById("cellsize").value;
    var newsize = temp;
    if(Math.abs(temp) <= 20){
        newsize = prompt("WARNING: Cell size with small absolute value (-20~20) will probably cause a crash, and the generated photo will have almost no triangle visible. Do you really want this?\r\nPlease enter the value you want below.");
        while(newsize == 0 || newsize == null){
            newsize = prompt("Cell size can't be set to 0 or empty.\r\nEnter a new value below.");
        }
    }
    var nega = document.getElementById("negatip");
    if(newsize < 0){
        nega.hidden = false;
    }
    else{
        nega.hidden = true;
    }
    cellsize = newsize;
    document.getElementById("cellsize").value = newsize;
    update();
}
function fixnegacs(){
    document.getElementById("cellsize").value=-document.getElementById("cellsize").value;
    csupdate();
}
function pwopen(xory){
    pw.hidden = false;
}
function drag(){
    var drag = document.getElementById("drag");
    var toolbox = document.getElementById("toolbox");
    var mox, moy, dragable = false;
    var bleft = parseInt(window.getComputedStyle(toolbox)["left"]);
    var btop = parseInt(window.getComputedStyle(toolbox)["top"]);
    drag.addEventListener("mousedown",function(event){
        dragable = true;
        mox = event.clientX;
        moy = event.clientY;
    },false);
    document.addEventListener("mousemove",function(event){
        if(dragable){
            toolbox.style.left = bleft + event.clientX - mox + "px";
            toolbox.style.top = btop + event.clientY - moy + "px";
        }
    });
    document.addEventListener("mouseup",function(event){
        dragable = false;
        bleft = parseInt(window.getComputedStyle(toolbox)["left"]);
        btop = parseInt(window.getComputedStyle(toolbox)["top"]);
    },false);
}