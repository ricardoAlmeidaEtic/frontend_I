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
            width: 500px;
            height: 500px;
            gap: 10px;
        }

        /*IDS*/
        #images-container {
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

        <button id="play-pause">STOP</button>
        
    </div>
`;
const itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
        <style>
            .item {
                opacity:0;
                max-height:455px;
                position:absolute;
                inset:0;
                background-position: center;
                background-size: cover;

            }
        </style>
        <div class="item"></div>
`
class WebGallery extends HTMLElement {

    static observedAttributes = ['data-url'];
    shadowRoot = null;
    #galleryData = null;
    #imagesContainer = null;
    #intervalID = null;
    #currentItemIndex = 0;
    #items = [];

    constructor() {
        super();

        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        
        this.#imagesContainer = this.shadowRoot.querySelector("#images-container");
        console.log(this.#imagesContainer);

        this.shadowRoot.querySelector('#previous').onclick = () => {
            console.log('previous clicked');
        }

        this.shadowRoot.querySelector('#next').onclick = () => {
            console.log('next clicked');
        }

        this.shadowRoot.querySelector('#play-pause').onclick = () => {
            console.log('play pause clicked');
        }
    }
    
    async attributeChangedCallback(attrName, oldVal, newVal){
        const req = await fetch(this.getAttribute(attrName))
        this.#galleryData = await req.json();
        console.log(this.#galleryData);
        this.#render();
    }
    
    #render(){

        this.#items = [];
        this.#galleryData.forEach((item,index) => {
            
            const clone = itemTemplate.content.cloneNode(true)
            const element = clone.querySelector('.item')
            element.style.backgroundImage = `url(${item.imageUrl})`
            if(index == 0)
                element.style.opacity = 1;
            this.#items.push(element)
            this.#imagesContainer.appendChild(clone)
        });

        this.#playPause();
    }

    #playPause(){
        if(this.#intervalID !== null){
            clearInterval(this.#intervalID);
            this.#intervalID = null;
        }else{
            setInterval(() =>{
                this.#items[this.#currentItemIndex].style.opacity = 0;
                this.#currentItemIndex += 1;
                if(this.#currentItemIndex >= this.#items.length)
                    this.#currentItemIndex = 0;
                this.#items[this.#currentItemIndex].style.opacity = 1;
                console.log(this.#items[this.#currentItemIndex])
            },1000);
        }
    }

    get dataURL(){
        return this.getAttribute('data-url');
    }

    set dataURL(value){
        this.setAttribute('data-url',value);
    }
}
customElements.define('web-gallery', WebGallery);