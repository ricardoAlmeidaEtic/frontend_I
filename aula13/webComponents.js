const template = document.createElement('template');
template.innerHTML = `
    <style>

        * {
            font-family: system-ui, sans-serif;
        }

        button {
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            background-color: transparent;
            width: 90px;
            height: 64px;
        }

        button:active {
            transform: scale(0.9);
        }

        :host {
            display: block;
            width: 500px;
            height: 500px;
        }

        .gallery {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            gap: 10px;
        }

        #play-pause {
            position: absolute;
            top: 10px;
            left: 10px;
        }

        #images-container {
            position: relative;
            display: flex;
            flex: 1;
            background-color: black;
        }

        #controls {
            display: flex;
            justify-content: space-between;
        }

    </style>
    <div class="gallery">

        <div id="images-container"></div>
        <div id="play-pause">
            <slot name="toggle-button"></slot>
        </div>

        <div id="controls">
            <button id="previous">
                <svg width="100%" height="100%" version="1.1" viewBox="0 0 94 64" xmlns="http://www.w3.org/2000/svg">
                    <path d="m78.719 0-31.719 32.183 31.719 31.817 15.281-15.328-16.62-16.672 16.62-16.672z" fill="#a80000"/>
                    <path d="M 31.71889,0 0,32.18271 31.71889,64 47,48.672 30.37956,32 47,15.328 Z" fill="#a80000"/>
                </svg>
            </button>
            <button id="next">
                <svg style="transform: rotate(180deg)" width="100%" height="100%" version="1.1" viewBox="0 0 94 64" xmlns="http://www.w3.org/2000/svg">
                    <path d="m78.719 0-31.719 32.183 31.719 31.817 15.281-15.328-16.62-16.672 16.62-16.672z" fill="#a80000"/>
                    <path d="M 31.71889,0 0,32.18271 31.71889,64 47,48.672 30.37956,32 47,15.328 Z" fill="#a80000"/>
                </svg>
            </button>
        </div>
    </div>

    <div id="detail-container"></div>
`;
const itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
        <style>
            .item {
                position: absolute;
                inset: 0;
                opacity: 0;
                transition: opacity 0.8s;
                background-position: center;
                background-size: cover;

            }
        </style>
        <div class="item" id="image"></div>
`
class WebGallery extends HTMLElement {

    static observedAttributes = ['data-url', 'current-item'];

    shadowRoot = null;
    #galleryData = null;
    #imagesContainer = null;
    #playPauseButton = null;
    #intervalID = null;
    #items = [];
    #currentItemIndex = 0;
    #detailContainer = null;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.#imagesContainer = this.shadowRoot.querySelector("#images-container");
        this.#playPauseButton = this.shadowRoot.querySelector("#play-pause");
        this.#detailContainer = this.shadowRoot.querySelector("#detail-container");
    }

    connectedCallback() {

        this.shadowRoot.querySelector('#previous').onclick = () => {
            this.#currentItemIndex--;
            if(this.#currentItemIndex < 0) this.#currentItemIndex = this.#items.length -1;
            this.#render();
            this.#playPause();
        }

        this.shadowRoot.querySelector('#next').onclick = () => {
            this.#currentItemIndex++;
            this.#render();
            this.#playPause();
        }

        const slotElement = this.shadowRoot.querySelector('slot[name="toggle-button"');

        slotElement.addEventListener("slotchange", () => {

            const toggleButton = slotElement.assignedElements()[0];
            toggleButton.addEventListener("toggle", (ev) => {
                this.#playPause();
                const event = new CustomEvent('play-pause', {detail: {
                    isPlaying: this.#intervalID !== null 
                }});
                this.dispatchEvent(event);
            })
        });
    }

    async attributeChangedCallback(attrName, oldVal, newVal) {

        switch (attrName) {
            case 'data-url':
                const req = await fetch(this.getAttribute('data-url'));
                this.#galleryData = await req.json();
                this.#render();

                const event = new CustomEvent('ready', {detail: {
                    numberOfImages: this.#items.length
                }});
                this.dispatchEvent(event);

                break;
            case 'current-item':
                this.#currentItemIndex = parseInt(newVal);
                this.#render();
                break;
            
            default:
                break;
        }
    }

    //PRIVATE
    #render() {

        if(!this.#galleryData) return;

        this.#items = [];
        this.#imagesContainer.innerHTML = ''; 
        this.#galleryData.forEach((item, index) => {

            const clone = itemTemplate.content.cloneNode(true);
            const element = clone.querySelector(".item");

            element.onclick = () => {
                const customEvent = new CustomEvent("item-clicked", {detail: {
                    data: this.#galleryData[this.#currentItemIndex]
                }})
                this.dispatchEvent(customEvent);   
            }

            if(index === this.#currentItemIndex)  element.style.opacity = 1;
            this.#items.push(element);
            element.style.backgroundImage = `url(${item.imageUrl})`;

            this.#imagesContainer.appendChild(clone);
        });

        this.#playPause();
    }

    #playPause() {

        if(this.#intervalID !== null) {
            clearInterval(this.#intervalID);
            this.#intervalID = null;
        } else {

            if(this.#currentItemIndex >= this.#items.length || this.#currentItemIndex < 0) {
                this.#currentItemIndex = 0;
                this.#items[this.#currentItemIndex].style.opacity = 1;
            }

            this.#intervalID = setInterval(() => {
                this.#items[this.#currentItemIndex].style.opacity = 0;
                this.#currentItemIndex++;
                if(this.#currentItemIndex >= this.#items.length) this.#currentItemIndex = 0;
                this.#items[this.#currentItemIndex].style.opacity = 1;

               //...
            }, 2000);
        }
    }

    //SETTERS GETTERS
    get dataURL() {
        return this.getAttribute('data-url');
    }
    set dataURL(value) {
        this.setAttribute('data-url', value);
    }

    get currentItem() {
        return this.getAttribute('current-item');
    }
    set currentItem(value) {
        this.setAttribute('current-item', parseInt(value));
    }
}
customElements.define('web-gallery', WebGallery);

const toggleTemplate = document.createElement('template');
toggleTemplate.innerHTML = `
<style>

    #icons-container {
        position: relative;
        width: 98px;
        height: 98px;
    }

    #icons-container svg {
        position: absolute;
    }
</style>

<div id="icons-container">

    <svg width="58" height="64" version="1.1" viewBox="0 0 58 64" xmlns="http://www.w3.org/2000/svg">
        <path d="m58 0h-21.75v64h21.75z" fill="#a80000"/>
        <path d="m21.75 0h-21.75v64h21.75z" fill="#a80000"/>
    </svg>

    <svg width="58" height="64" version="1.1" viewBox="0 0 58 64" xmlns="http://www.w3.org/2000/svg">
        <path d="m0 0 58 32-58 32z" fill="#a80000"/>
    </svg>

</div>
`;
class WebToggleButton extends HTMLElement {

    static observedAttributes = [];

    shadowRoot;
    #iconsContainer = null;
    #toggled = true;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(toggleTemplate.content.cloneNode(true));
        this.#iconsContainer = this.shadowRoot.querySelector("#icons-container");
            
        this.toggle();
    }

    connectedCallback() {

        this.#iconsContainer.onclick = () => {

            this.#toggled = !this.#toggled;
            this.toggle();

            const event = new CustomEvent('toggle');
            this.dispatchEvent(event);
        }
    }

    toggle() {
        if(this.#toggled) {
            this.#iconsContainer.children[0].style.opacity = 1;
            this.#iconsContainer.children[1].style.opacity = 0;
        } else {
            this.#iconsContainer.children[0].style.opacity = 0;
            this.#iconsContainer.children[1].style.opacity = 1;
        }
    }

    attributeChangedCallback(attrName, oldVal, newVal) {


    }
}
customElements.define('web-toggle-button', WebToggleButton);



const WebGalleryDetailTemplate = document.createElement('template');
WebGalleryDetailTemplate.innerHTML = `
<style>
    #detail-container {
        font-family: 'Poppins', sans-serif; /* Use the Poppins font */
        width: 100%;
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #imageTitle {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 10px;
    }

    #imageDescription {
        font-size: 16px;
        color: #666666;
        margin-bottom: 20px;
    }

    #imageDetail {
        display: block;
        max-width: 100%;
        height:350px;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        margin-top:10px;
    }

    #imageDetail:hover {
        transform: scale(1.05);
    }

</style>


    <div id="detail-container">
        <h1 id="imageTitle"></h1>
        <span id="imageDescription"></span>
        <img id="imageDetail" src="assets/images/default.jpg">
    </div>
`;
class WebGalleryDetail extends HTMLElement {

    shadowRoot;
    #detailContainer = null;
    #detailData = null;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(WebGalleryDetailTemplate.content.cloneNode(true));
        this.#detailContainer = this.shadowRoot.querySelector("#detail-container");
    }

    connectedCallback() {

    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        console.log('oldVal', oldVal)
        console.log(newVal)
        this.#render(newVal);
    }

    #render() {
        this.#detailContainer.querySelector("#imageDetail").src=this.#detailData.imageUrl;
        this.#detailContainer.querySelector("#imageTitle").innerText=this.#detailData.title;
        this.#detailContainer.querySelector("#imageDescription").innerText=this.#detailData.description;
    }

    set data(value) {
        this.#detailData = value;
        this.#render();
    }
}
customElements.define('web-gallery-detail', WebGalleryDetail);