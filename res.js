var b = document.getElementById("result");
var pattern = trianglify({
    width: 1920,
    height: 1080
});
b.appendChild(pattern.toCanvas());
function update(){
    pattern = trianglify({
        width: document.getElementById("width").value,
        height: document.getElementById("height").value
    });
    b.appendChild(pattern.toCanvas());
    var a = document.getElementById("result");
    a.removeChild(a.childNodes[0]);
}