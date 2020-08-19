const showingPicture = {};

const MANUAL = 0;
const AUTO = 1;
const modeSwitch = {
    type: MANUAL
};

let mode; // variable hold interval method


let listPictureHTML = "";
data.forEach(val => {
    listPictureHTML += '<div class="carouselPicture" onclick="changePicture(' + val.id + ')">';
    listPictureHTML += '<img id="pic' + val.id + '" src="' + val.linkPicture + '" alt="pic' + val.id + '" />';
    listPictureHTML += '</div>';
})
document.getElementById("listPictures").innerHTML = listPictureHTML;


function changePicture(pictureId) {
    if (pictureId < 1) pictureId = 6; // when we move backward over the first picture, set showing state to the last picture
    if (pictureId > 6) pictureId = 1; // vice versa

    const picture = data.filter(val => val.id === pictureId);

    document.getElementById("showingPicture").src = picture[0].linkPicture;
    document.getElementById("showingPicture").alt = picture[0].caption.toLowerCase();
    document.getElementById("pictureCaption").innerHTML = picture[0].caption;
    document.getElementById("pictureContent").innerHTML = picture[0].content;

    setActiveForShowingPicture(picture[0]);
    restartShowingPicture(picture[0]);

    const element = document.getElementById("main");
    element.classList.remove("animationMainPicture");
    void element.offsetWidth;
    element.classList.add("animationMainPicture");
}

// Restart showingPicture global variable
function restartShowingPicture(picture) {
    showingPicture.id = picture.id;
    showingPicture.linkPicture = picture.linkImg;
    showingPicture.caption = picture.caption;
    showingPicture.content = picture.content;
}

// Go backward and forward
function movePicture(direction) {
    changePicture(showingPicture.id + direction);
    if (modeSwitch.type === AUTO) setModeAuto();
}


function setActiveForShowingPicture(picture) {
    let oldPicture = document.getElementById("pic" + showingPicture.id);
    oldPicture.classList.remove("active");

    let newPicture = document.getElementById("pic" + picture.id);
    newPicture.classList.add("active");
}

function setModeManual() {
    modeSwitch.type = MANUAL;
    clearInterval(mode);
}

function setModeAuto() {
    clearInterval(mode);
    modeSwitch.type = AUTO;
    mode = setInterval(function() {
        movePicture(1);
    }, 3000)
}

// Set key down for moving backward, forward
document.addEventListener("keydown", setKeyDown, false);

function setKeyDown(event) {
    if (event.keyCode === 37) {
        movePicture(-1);
    }
    if (event.keyCode === 39) {
        movePicture(1);
    }
}

restartShowingPicture(data[0]);
changePicture(data[0].id);