const MANUAL = 0;
const AUTO = 1;

const pictureCarouselConfig = {
    currentShowingPicture: {},
    carouselLoadingMode: MANUAL,
    intervalMethod: null
};

// TODO: -1
function renderUI(data) {
    let listItemPictureHTML = "";
    data.forEach(val => {
        listItemPictureHTML += `
        <div class='carouselListItemPicture' onclick='changeCurrentShowingPicture(${val.id})'>
            <img id='pic${val.id}' src='${val.linkPicture}' alt='pic${val.id}' />
        </div>
    `;
    });
    document.getElementById("listItemPicture").innerHTML = listItemPictureHTML;
}

//TODO: -1
function changeCurrentShowingPicture(id) {
    const newPictureData = getCurrentPictureData(id);

    changeCurrentShowingPictureWithNewData(newPictureData);
    setCurrentShowingPictureActive(newPictureData[0]);
    restartCurrentShowingPictureInConfig(newPictureData[0]);

    triggerTransitionAnimation();
    resetIntervalModeAuto();
}

function movePicture(direction) {
    const pictureId = handleEndlessPicture(pictureCarouselConfig.currentShowingPicture.id + direction);
    changeCurrentShowingPicture(pictureId);
}

// MAXIMUM LIST ITEM PICTURE: data.length
function handleEndlessPicture(id) {
    if (id < 0) return data.length - 1;
    if (id > data.length - 1) return 0;
    return id;
}

function getCurrentPictureData(id) {
    return data.filter(val => val.id === id);
}

function changeCurrentShowingPictureWithNewData(data) {
    document.getElementById("currentShowingPicture").src = data[0].linkPicture;
    document.getElementById("currentShowingPicture").alt = data[0].caption.toLowerCase();
    document.getElementById("currentShowingPictureCaption").innerHTML = data[0].caption;
    document.getElementById("currentShowingPictureContent").innerHTML = data[0].content;
}

function setCurrentShowingPictureActive(picture) {
    const oldPicture = document.getElementById("pic" + pictureCarouselConfig.currentShowingPicture.id);
    oldPicture.classList.remove("active");

    const newPicture = document.getElementById("pic" + picture.id);
    newPicture.classList.add("active");
}

function restartCurrentShowingPictureInConfig(picture) {
    pictureCarouselConfig.currentShowingPicture = {
        ...pictureCarouselConfig.currentShowingPicture,
        ...picture
    };
}

function triggerTransitionAnimation() {
    const element = document.getElementById("currentShowingPictureArea");
    element.classList.remove("animationCurrentShowingPicture");
    void element.offsetWidth;
    element.classList.add("animationCurrentShowingPicture");
}

function resetIntervalModeAuto() {
    if (pictureCarouselConfig.carouselLoadingMode === AUTO) setModeAuto();
}

function setModeManual() {
    pictureCarouselConfig.carouselLoadingMode = MANUAL;
    clearInterval(pictureCarouselConfig.intervalMethod);
}

function setModeAuto() {
    clearInterval(pictureCarouselConfig.intervalMethod);
    pictureCarouselConfig.carouselLoadingMode = AUTO;
    pictureCarouselConfig.intervalMethod = setInterval(function() {
        movePicture(1);
    }, 3000);
}

function setCarouselLoadingMode(mode) {
    if (mode === MANUAL) setModeManual();
    if (mode === AUTO) setModeAuto();
}

function setKeyDown(event) {
    if (event.keyCode === 37) {
        movePicture(-1);
    }
    if (event.keyCode === 39) {
        movePicture(1);
    }
}

// START
(function startPictureCarousel() {
    document.addEventListener("keydown", setKeyDown, false);
    renderUI(data);
    restartCurrentShowingPictureInConfig(data[0]);
    changeCurrentShowingPicture(data[0].id);
})();