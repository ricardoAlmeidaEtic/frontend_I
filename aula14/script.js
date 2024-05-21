import GalleryModel from "./model.js";

window.onload = async() => {
    const webGallery = document.querySelector("web-gallery");
    const webGalleryDetail = document.querySelector("web-gallery-detail");

    webGallery.addEventListener("item-clicked", (event) => {
        webGalleryDetail.data = event.detail.data;
    })

    const galleryModel = new GalleryModel();
    await galleryModel.initialize("assets/gallery_data.json");
    webGallery.data = galleryModel.data;

    webGallery.currentItem = 2;
}