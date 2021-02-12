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
    var date = new Date();
    var temp = document.createElement("a");
    temp.download = "trianglify-free-" + date.getFullYear() + "." + date.getMonth() + "." + date.getDay() + "_" + date.getHours() + date.getMinutes() + date.getSeconds() + ".png";
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
    const head = "data:text/plain;charset=utf-8,<svg xmlns='http://www.w3.org/2000/svg'";
    var date = new Date();
    var timestamp = date.getFullYear() + "." + date.getMonth() + "." + date.getDay() + "_" + date.getHours() + date.getMinutes() + date.getSeconds();
    if(res){
        tempa.download = "trianglify-free-res-" + timestamp + ".svg";
        tempa.href = head + " width='" + document.getElementById("width").value + "' height='" + document.getElementById("height").value + "'>" + tempsvg.innerHTML + "</svg>";
    }
    else{
        tempa.download = "trianglify-free-nores-" + timestamp + ".svg";
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
//drag windows
function drag(){
    var drag = document.getElementById("drag");
    var toolbox = document.getElementById("mainwindow");
    var mox, moy, dragable = false;
    var bleft = parseInt(getComputedStyle(toolbox)["left"]);
    var btop = parseInt(getComputedStyle(toolbox)["top"]);
    drag.addEventListener("mousedown",function(event){
        dragable = true;
        mox = event.clientX;
        moy = event.clientY;
        drag.style.cursor = "grabbing";
    },false);
    document.addEventListener("mousemove",function(event){
        if(dragable){
            toolbox.style.left = bleft + event.clientX - mox + "px";
            toolbox.style.top = btop + event.clientY - moy + "px";
        }
    });
    document.addEventListener("mouseup",function(){
        dragable = false;
        drag.style.cursor = "grab";
        bleft = parseInt(getComputedStyle(toolbox)["left"]);
        btop = parseInt(getComputedStyle(toolbox)["top"]);
    },false);
}
//mouse changes value
function mouse(targetid){
    var step;
    if(target == "variance"){
        step = 10;
    }
    else{
        step = 4;
    }
    var target = document.getElementById(targetid);
    var targeted = false;
    var moy, temp = parseInt(target.value);
    target.addEventListener("mousedown",function(event){
        targeted = true;
        moy = event.clientY;
    },false);
    document.addEventListener("mousemove",function(event){
        if(targeted){
            if(moy - event.clientY == 10){
                temp++;
                target.value = temp;
                moy = event.clientY;
            }
            else if(event.clientY - moy == 10){
                temp--;
                target.value = temp;
                moy = event.clientY;
            }
        }
    });
    document.addEventListener("mouseup",function(event){
        if(targeted){
            targeted = false;
            target.oninput();
        }
    },false);
}