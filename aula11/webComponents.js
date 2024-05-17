const template = document.createElement('template');
template.innerHTML = `
    <style>

        /*ELEMENTS*/
        * {
            font-family: system-ui, sans-serif;
        }
        button {
            border: none;
            background-color: green;
            padding: 10px 20px;
            cursor: pointer;
        }

        /*CLASSES*/
        .gallery {
            position: relative;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            gap: 10px;
        }

        /*IDS*/
        #images-container {
            position: relative;
            display: flex;
            flex: 1;
            background-color: red;
        }
        #controls {
            display: flex;
            justify-content: space-between;
            background-color: blue;
        }
        #play-pause {
            position: absolute;
            top: 10px;
            left: 10px;
        }
    </style>
    <div class="gallery">

        <div id="images-container"></div>

        <div id="controls">
            <button id="previous">Previous</button>
            <button id="next">Next</button>
        </div>

        <web-toggle-button id="play-pause"></web-toggle-button>
        
    </div>
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
        <div class="item"></div>
`
class WebGallery extends HTMLElement {

    static observedAttributes = ['data-url', 'current-item'];

    shadowRoot = null;
    #galleryData = null;
    #imagesContainer = null;
    #intervalID = null;
    #items = [];
    #currentItemIndex = 0;

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.#imagesContainer = this.shadowRoot.querySelector("#images-container");
    }

    connectedCallback() {

        this.shadowRoot.querySelector('#previous').onclick = () => {
            console.log('previous clicked');
            this.#currentItemIndex--;
            if(this.#currentItemIndex < 0) this.#currentItemIndex = this.#items.length -1;
            this.#render();
            this.#playPause();
        }

        this.shadowRoot.querySelector('#next').onclick = () => {
            console.log('next clicked');
            this.#currentItemIndex++;
            this.#render();
            this.#playPause();
        }

        this.shadowRoot.querySelector('#play-pause').onclick = (ev) => {
            console.log('play pause clicked');
            this.#playPause();

            if(this.#intervalID) ev.target.innerText = "STOP";
            else ev.target.innerText = "PLAY";

            const event = new CustomEvent('play-pause', {detail: {
                    isPlaying: this.#intervalID !== null 
                }});
            this.dispatchEvent(event);
        }

    }

    async attributeChangedCallback(attrName, oldVal, newVal) {

        if(attrName == 'data-url'){
                const req = await fetch(this.getAttribute(attrName));
                this.#galleryData = await req.json();
                this.#render();

                const event = new CustomEvent('ready',{detail: {
                    numberofImages: this.#items.length
                }})

                this.dispatchEvent(event);
            }else if(attrName == 'current-item'){
                this.#currentItemIndex = parseInt(newVal);
                this.#render();
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
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(toggleTemplate.content.cloneNode(true));
        this.#iconsContainer = this.shadowRoot.querySelector("#icons-container");
    }

    connectedCallback() {

    }

    attributeChangedCallback() {

    }
}
customElements.define('web-toggle-button', WebToggleButton);