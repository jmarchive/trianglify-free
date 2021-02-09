const pattern = trianglify({
    width: window.innerWidth,
    height: window.innerHeight
});
document.body.appendChild(pattern.toCanvas());
var b = document.getElementsByTagName("canvas");
b.id = "result";