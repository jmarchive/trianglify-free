var resbox = document.getElementById("result");
var seed = new Date().getTime();
document.getElementById("seed").value = seed;
var variance = 0.75;
var pattern = trianglify({
    width: document.getElementById("width").value,
    height: document.getElementById("height").value,
    cellSize: document.getElementById("cellSize").value,
    variance: variance,
    seed: seed,
    xColors: 'random',
    yColors: 'match',
    fill: true,
    colorSpace: 'lab',
    /*palette: trianglify.colorbrewer, 这个有问题*/
    colorFunction: trianglify.colorFunctions.interpolateLinear(0.5),
    strokeWidth: 0,
    points: null
});
resbox.appendChild(pattern.toCanvas());
function update(){
    pattern = trianglify({
        width: document.getElementById("width").value,
        height: document.getElementById("height").value,
        cellSize: document.getElementById("cellSize").value,
        variance: variance,
        seed: seed,
        xColors: 'random',
        yColors: 'match',
        fill: true,
        colorSpace: 'lab',
        /*palette: trianglify.colorbrewer, 这个有问题*/
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
function svg(){
    var temp = document.createElement("textarea");
    temp.download = 'trianglify-free';
    temp.value = pattern.toSVG().toString();
    document.body.appendChild(temp);
}
function variancerange(){
    variance = document.getElementById("variance").value;
    document.getElementById("variance-text").value = document.getElementById("variance").value;
    update();
}
function variancetext(){
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
    if(document.getElementById("seed").value == ""){
        document.getElementById("seed").value = new Date().getTime();
    }
    seed = document.getElementById("seed").value;
    update();
}