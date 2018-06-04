var backImg = document.getElementById("backDog");
var frontImg = document.getElementById("frontDog");
var dragArea = document.getElementById("contDivs");
var boundryElm = document.getElementById("infront");
var GlobalOffset = 35;
boundryElm = boundryElm.getBoundingClientRect();
var backImgOptions = backImg.getBoundingClientRect();

backImg.addEventListener("mousedown", fnMouseDown);
backImg.addEventListener("mousemove", fnMouseMove);
backImg.addEventListener("mouseup", fnMouseUp);

frontImg.addEventListener("mousedown", fnMouseDown);
frontImg.addEventListener("mousemove", fnMouseMove);
frontImg.addEventListener("mouseup", fnMouseUp);

document.addEventListener("mouseup", fnMouseUp);

var isMove = false;
var posX, posY, elmWidth; 
var currentMarginBack = {}
var curretnMarginFront = {}

function getIntValue(string){
    var arrValues = string.split("px")
    return parseInt(arrValues[0]);
}

function initMargins(){
    currentMarginBack.top = getIntValue(backImg.style.marginTop);
    currentMarginBack.left = getIntValue(backImg.style.marginLeft);
    currentMarginBack.right = getIntValue(backImg.style.marginRight);
    currentMarginBack.bottom = getIntValue(backImg.style.marginBottom);

    curretnMarginFront.top = getIntValue(frontImg.style.marginTop);
    curretnMarginFront.left = getIntValue(frontImg.style.marginLeft);
    curretnMarginFront.right = getIntValue(frontImg.style.marginRight);
    curretnMarginFront.bottom = getIntValue(frontImg.style.marginBottom);
}

function fnMouseDown(e){
    isMove = true;
    posX = e.clientX;
    posY = e.clientY;
    
    initMargins();
}

function fnMouseMove(e){
    if(isMove){
        var offsetX = posX - e.clientX; // left
        var offsetY = posY - e.clientY; //top

        //top Constraint
        if(currentMarginBack.top - offsetY < boundryElm.top){
            backImg.style.marginTop = (currentMarginBack.top - offsetY) + "px";
            frontImg.style.marginTop = (curretnMarginFront.top - offsetY) + "px";
        }else{
            backImg.style.marginTop = (boundryElm.top) + "px";
            frontImg.style.marginTop = "0px";
        }

        //left Constraint
        if(currentMarginBack.left - offsetX < boundryElm.left){
            backImg.style.marginLeft = (currentMarginBack.left - offsetX) + "px";
            frontImg.style.marginLeft = (curretnMarginFront.left - offsetX) + "px";
        } else {
            backImg.style.marginLeft = (boundryElm.left) + "px";
            frontImg.style.marginLeft = "0px";
        }

        //right Constraint
        if((currentMarginBack.left - offsetX) + backImgOptions.width < boundryElm.left + boundryElm.width){
            backImg.style.marginLeft = (boundryElm.width - backImgOptions.width) + GlobalOffset + "px";
            frontImg.style.marginLeft = (boundryElm.width - backImgOptions.width) + "px";
        }

        //bottom Constraint
        if((currentMarginBack.top - offsetY) + backImgOptions.height < boundryElm.top + boundryElm.height){
            backImg.style.marginTop = (boundryElm.height - backImgOptions.height) + GlobalOffset + "px";
            frontImg.style.marginTop = (boundryElm.height - backImgOptions.height) + "px";
        }
    }
}

function fnMouseUp(e){
    isMove = false;
}