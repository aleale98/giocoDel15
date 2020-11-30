
function init(){
    var tiles = Array.from(document.getElementById("puzzlearea").querySelectorAll(".tile"));
    var ultimo = document.getElementById("puzzlearea").querySelector("#tile_4_4");
    for(let i = 0; i < tiles.length; i++){
            tiles[i].addEventListener("click", ev => cambia(tiles, tiles[i], ultimo));
            tiles[i].addEventListener("mouseover", ev => cambiaColore(tiles, tiles[i], ultimo));
            tiles[i].addEventListener("mouseout", ev => restore(tiles[i]));
            tiles[i].style.order = i;
            tiles[i].setAttribute("disabled", true);   
    }
    initBackground(tiles);
    document.getElementById("shufflebutton").addEventListener("click", ev => gioca(tiles));
   
}


function initBackground(tiles){
    let offsetX = 0;
    let offsetY = 0;
    for(let index = 0; index < tiles.length-1; index++){
        if(index != 15){
            tiles[index].style.backgroundImage = "url('background.jpg')";
            offsetX = (-1)*(((index)*100) % 400);
            if(index % 4 == 0 && index > 0){
                offsetY = offsetY - 100;
            } 
        tiles[index].style.backgroundPosition = offsetX+"px "+offsetY+"px";
        }
    }
}

function gioca(tiles){
    i = 0;
    while (i<15) {
        a = Math.random() * 15 >>> 0;
        b = Math.random() * 15 >>> 0;
        if (a==b) continue;
        scambia(tiles[a], tiles[b]);
        i++;
    }
}

function scambia({style: a}, {style: b}) {
	temp=a.order;
	a.order=b.order;
	b.order=temp;
}

function getX({style}) {
    return parseInt(style.order)%4;
}
function getY({style}) {
    return parseInt(style.order)/4 >>> 0;
}

function cambiaColore(tiles, tile, ultimo){
    xWhite = getX(ultimo);
    yWhite = getY(ultimo);
    x = getX(tile);
    y = getY(tile);
    dx=Math.abs(xWhite-x);
    dy=Math.abs(yWhite-y);
    if((dx == 0 && dy == 1) || (dx == 1 && dy == 0)){
        tile.setAttribute("disabled", false);
    }
}

function restore(tile){
    tile.setAttribute("disabled", true);
}

function cambia(tiles, tile, ultimo){
    xWhite = getX(ultimo);
    yWhite = getY(ultimo);
    x = getX(tile);
    y = getY(tile);
    dx=Math.abs(xWhite-x);
    dy=Math.abs(yWhite-y);
    if((dx == 0 && dy == 1) || (dx == 1 && dy == 0)){
        scambia(ultimo, tile);
        if (tiles.every((p, i) => i == getX(p) + getY(p) * 4)) {
            alert("Hai vinto!");
        }
    }  
}


window.onload = init;