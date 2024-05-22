window.onload = async() => {
    new Item ((message) =>{
        console.log(message)
    })
}

class Item{
    view;
    #front;
    #touchX;
    #maxX;
    #mouseUp;
    #mouseMove;
    #mouseDown;
    #currentX;
    #callback;

    constructor(cb){
        this.#callback = cb;

        this.view = document.querySelector(".button")
        this.front = document.querySelector(".front")

        this.mouseUp = this.mouseUp.bind(this)
        this.mouseMove = this.mouseMove.bind(this)
        this.view.onmousedown = (ev) => this.#mouseDown(ev)
        this.view.onclick = () =>{
            if(this.#currentX == 0) this.#callback('clicked');
        }
    }

    #mouseDown(){
        console.log(ev)

        this.#touchX = ev.x
        document.addEventListener("mouseup",this.#mouseUp)
        document.addEventListener("mousemove",this.#mouseMove)

        if(this.#currentX === this.#maxX) this.#callback("delete!")

        this.#front.style.transition = "transform .15s ease-in-out"
        this.#front.style.transform = "translateX(0)"

        this.#touchX = 0;
    }

    #mouseMove(ev){
        
    }
}