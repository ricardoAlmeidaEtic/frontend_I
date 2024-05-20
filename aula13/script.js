window.onload = () => {
    const webGallery = document.querySelector("web-gallery");
    const webGalleryDetail = document.querySelector("web-gallery-detail");

    webGallery.addEventListener("item-clicked", (event) => {
        webGalleryDetail.data = event.detail.data;
    })

    webGallery.currentItem = 2;
    webGallery.dataURL = "assets/gallery_data.json";
}