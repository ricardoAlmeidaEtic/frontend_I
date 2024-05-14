window.onload = async() =>{
}

const template = document.createElement('template')
template.innerHTML = `
    <style>
        .carousel {
            background-color: #eee;
            max-width: 900px;
        }

        .carousel .carousel-inner {
            position: relative;
        }

        .carousel .carousel-controls {
            background-color:darkblue;
            height:22px;
        }

        .carousel .carousel-item {
            display: none;
            max-height: 400px;
            max-width: 900px;
            position: relative;
            overflow: hidden;
            width: 100%;
        }

        .carousel .carousel-item.active {
            display: block;
        }

        .carousel .carousel-item .carousel-image img {
            height: 100%;
            width: 100%;
        }

        .carousel .carousel-item .carousel-caption {
            position: absolute;
            right: 15%;
            bottom: 0;
            left: 15%;
            padding-top: 20px;
            padding-bottom: 20px;
            color: #fff;
            text-align: center;
        }

        .carousel .controls {
            box-sizing: border-box;
            position: absolute;
            top: 1em;
            z-index: 10;
            display: flex;
            width: 100%;
            padding: 0.25em 1.25em 0;
        }

        .carousel .controls button {
            position: absolute;
            z-index: 10;
            flex: 0 0 auto;
            padding: 5px;
            border-radius:5px;
        }

        button.previous {
            float:left;
        }

        button.next {
            float:right;
        }

        .carousel .controls button.pause {
            left: 18px;
            top:18px;
        }

        .carousel .controls svg polygon {
            fill: white;
            stroke: white;
        }
        
        .carousel .controls button:focus svg .background,
        .carousel .controls button:hover svg .background,
        .carousel .controls button:hover svg .border {
            fill: #005a9c;
            stroke: #005a9c;
            opacity: 1;
        }
        
        .carousel .controls button:focus svg .border {
            stroke: white;
        }

        .carousel .controls button:focus svg .border {
            stroke: white;
        }
    </style>
    <section id="myCarousel" class="gallery carousel" >
        <div class="carousel-inner">
            <div class="controls">
                <button type="button" class="pause">
                    PAUSE
                </button>
            </div>
            <div id="myCarousel-items" class="carousel-items" >
                <div class="carousel-item active">
                    <div class="carousel-image">
                        <img src="image1.png">
                    </div>
                </div>

                <div class="carousel-item">
                    <div class="carousel-image">
                        <img src="image2.jpg">
                    </div>
                </div>

                <div class="carousel-item">
                    <div class="carousel-image">
                        <img src="image3.jpg">
                    </div>
                </div>
            </div>
        </div>
        <div class="carousel-controls">
            <button type="button" class="previous">
                PREVIOUS
            </button>

            <button type="button" class="next">
                NEXT
            </button>
        </div>
    </section>`

    template.innerHTML = `
    <style>
        .item {
            width:100%;
            height:100%;
            background-image:ur('image1.png')
            background-position:center;
            background-repeat:no-repeat;
            background-size: cover;
        }
    </style>
    <div class="item"></div>`
class WebGallery extends HTMLElement{
    shadowRoot = null;
    constructor(){
        super();
        this.shadowRoot = this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback(){
        this.shadowRoot.querySelector("#previous").onclick = () =>{
            console.log("previous clicked");
        }

        this.shadowRoot.querySelector("#next").onclick = () =>{
            console.log("next clicked");
        }

        this.shadowRoot.querySelector("#play-pause").onclick = () =>{
            console.log("play-pause clicked");
        }

        //this.shadowRoot.querySelector('.previous').addEventListener('click', this.previousSlide.bind(this));
        //this.shadowRoot.querySelector('.next').addEventListener('click', this.nextSlide.bind(this));

        console.log("connected")
    }

    /*previousSlide() {
        const currentSlide = this.shadowRoot.querySelector('.carousel-item.active');
        const previousSlide = currentSlide.previousElementSibling || currentSlide.parentNode.lastElementChild;
        currentSlide.classList.remove('active');
        previousSlide.classList.add('active');
    }

    nextSlide() {
        const currentSlide = this.shadowRoot.querySelector('.carousel-item.active');
        const nextSlide = currentSlide.nextElementSibling || currentSlide.parentNode.firstElementChild;
        currentSlide.classList.remove('active');
        nextSlide.classList.add('active');
    }*/
}

customElements.define('web-gallery', WebGallery)