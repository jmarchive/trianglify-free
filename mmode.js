//globals

var resbox = document.getElementById("result");
var pw = document.getElementById("pw");

//setup

document.getElementById("seed").value = new Date().getTime();
var variance = 0.75;
var cellsize = 75;
var pattern = trianglify({
    width: document.getElementById("width").value,
    height: document.getElementById("height").value,
    cellSize: cellsize,
    variance: variance,
    seed: document.getElementById("seed").value,
    xColors: 'random',
    yColors: 'match',
    colorFunction: trianglify.colorFunctions.interpolateLinear(0.5),
    strokeWidth: 0,
    points: null
});
resbox.appendChild(pattern.toCanvas());

//functions

function update(){
    pattern = trianglify({
        width: document.getElementById("width").value,
        height: document.getElementById("height").value,
        cellSize: cellsize,
        variance: variance,
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
function dl(){
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
function varange(){
    variance = document.getElementById("variance").value;
    document.getElementById("variance-text").value = document.getElementById("variance").value;
    update();
}
function vatext(){
    if(document.getElementById("variance-text").value > 2){
        document.getElementById("variance").value = 2;
    }
    else if(document.getElementById("variance-text").value == 0){
        document.getElementById("variance").value = 0;
    }
    else{
        document.getElementById("variance").value = document.getElementById("variance-text").value;
    }
    variance = document.getElementById("variance-text").value;
    update();
}
function seedupdate(){
    document.getElementById("seed").value = new Date().getTime();
    update();
}
function csupdate(){
    var temp = document.getElementById("cellsize").value;
    var newsize = temp;
    if(temp.search(/[^-][^0-9]/) == -1){
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
    else{
        document.getElementById("cellsize").value = cellsize;
    }
}
function pwopen(xory){
    pw.hidden = false;
}