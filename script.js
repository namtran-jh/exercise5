const mainImage = {};
const modeSwitch = {
    type: 0
};

// Initial list pictures
let listPicHTML = "";
data.forEach(val => {
    listPicHTML += '<div class="carouselPic" onclick="changePic(' + val.id + ')">';
    listPicHTML += '<img id="pic' + val.id + '" src="' + val.linkImg + '" alt="pic' + val.id + '" />';
    listPicHTML += '</div>';
})
document.getElementById("listPics").innerHTML = listPicHTML;

// Change image
function changePic(id) {
    if (id < 1) id = 6;
    if (id > 6) id = 1;

    const image = data.filter(val => val.id === id);

    document.getElementById("mainPic").src = image[0].linkImg;
    document.getElementById("mainPic").alt = image[0].caption.toLowerCase();
    document.getElementById("caption").innerHTML = image[0].caption;
    document.getElementById("content").innerHTML = image[0].content;

    setActiveForMainImg(image[0]);
    restartMainImg(image[0]);

    const element = document.getElementById("main");
    element.classList.remove("animationMainPic");
    void element.offsetWidth;
    element.classList.add("animationMainPic");
}

// Restart main image
function restartMainImg(image) {
    mainImage.id = image.id;
    mainImage.linkImg = image.linkImg;
    mainImage.caption = image.caption;
    mainImage.content = image.content;
}

// Go backward and forward
function move(direction) {
    changePic(mainImage.id + direction);
    if (modeSwitch.type === 1) modeAuto();
}

// Set active class
function setActiveForMainImg(image) {
    let oldImg = document.getElementById("pic" + mainImage.id);
    oldImg.classList.remove("active");

    let newImg = document.getElementById("pic" + image.id);
    newImg.classList.add("active");
}

restartMainImg(data[0]);
changePic(data[0].id);

// Switch modes
let mode;

function modeManual() {
    modeSwitch.type = 0;
    clearInterval(mode);
}

function modeAuto() {
    clearInterval(mode);
    modeSwitch.type = 1;
    // let tmp = mainImage.id
    mode = setInterval(function() {
        move(1);
        //     console.log(tmp, mainImage.id)
        //     if (tmp !== mainImage.id) {
        //         clearInterval(mode);
        //         modeAuto();
        //     } else {
        //         move(1);
        //     }
    }, 3000)
}

// Set key down
document.addEventListener("keydown", setKeyDown, false);

function setKeyDown(event) {
    if (event.keyCode === 37) {
        move(-1);
    }
    if (event.keyCode === 39) {
        move(1);
    }
}