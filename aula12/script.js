window.onload = () => {
    const webGallery = document.querySelector("web-gallery");
    const webToggleButton = document.querySelector("web-toggle-button");
    
    webGallery.addEventListener("ready",(ev) =>{
        console.log("gallery ready",ev.detail.numberofImages)
    });

    webGallery.addEventListener("playPause",(ev) =>{
        console.log("playPause: ",ev.detail.playPause)
    });
    
    webGallery.currentItem = 2;
    webGallery.dataURL = "assets/gallery_data.json";
}