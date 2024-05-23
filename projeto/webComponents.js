const itemTemplate = document.createElement('template');
itemTemplate.innerHTML = `
    <style>
        * {
            margin: 0;
            padding: 0;
            font-family: 'system-ui', 'sans-serif';
            box-sizing: border-box;
        }

        .button {
            position: relative;
            overflow: hidden;
            width: 500px;
            cursor: pointer;
        }

        .button:active .front label,
        .button:active .front .icon {
            transform: scale(0.9);
        }

        .front {
            position: absolute;
            display: flex;
            inset: 0;
            gap: 10px;
            justify-content: space-between;
            align-items: center;
            background-color: #ddd;
            padding: 20px;
            transition: transform 0.3s ease-in-out;
        }

        .back {
            display: flex;
            justify-content: flex-end;
            background-color: red;
            padding: 20px;
        }

        label {
            font-size: 36px;
            line-height: 36px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            user-select: none;
        }

        .icon {
            width: 46px;
            height: 46px;
            min-width: 46px;
            min-height: 46px;
        }
    </style>

    <div id="item-element">
        <div class="button">
            <div class="front">
                <label></label>
                <div class="icon">
                    <svg width="100%" height="100%" version="1.1" viewBox="0 0 24.342 24.342" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                        <path d="m12.164 3.25e-7 12.177 12.171-12.177 12.171-3.6954-3.6954 5.8624-5.8624h-14.331v-5.226h14.331l-5.8624-5.8624z" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" stroke-width=".26458"/>
                    </svg>
                </div>
            </div>
            <div class="back">
                <div class="icon">
                    <svg width="100%" height="100%" version="1.1" viewBox="0 0 24.342 24.342" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                        <path d="m12.171 8.4754-8.4754-8.4754-3.6954 3.6954 8.4754 8.4754-8.4754 8.4754 3.6954 3.6954 8.4754-8.4754 8.4754 8.4754 3.6954-3.6954-8.4754-8.4754 8.4754-8.4754-3.6954-3.6954z" clip-rule="evenodd" fill="#b00" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" stroke-width=".26458"/>
                    </svg>
                </div>
            </div>
        </div>
    </div>
`;

class TaskItem extends HTMLElement {

    #front;
    #touchX;
    #maxX = 84;
    #currentX;
    #callback;
    #taskData;

    constructor(cb) {
        super();
        this.#callback = cb;

        this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(itemTemplate.content.cloneNode(true));
        this.#front = this.shadowRoot.querySelector(".front");
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector(".button");

        this.mouseUp = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);

        button.onmousedown = (ev) => this.#mouseDown(ev);

        button.onclick = () => {
            if (this.#currentX === 0) {
                this.#callback("clicked");
                const customEvent = new CustomEvent("item-clicked", {
                    detail: {
                        data: this.#taskData
                    }
                });
                this.dispatchEvent(customEvent);
            }
        };
    }

    get data(){
        return this.#taskData;
    }

    set data(value) {
        console.log("this.#taskData",this.#taskData)
        this.#taskData = value;
        this.#render();
    }

    #render() {
        if (this.#taskData) {
            const label = this.shadowRoot.querySelector("label");
            label.innerText = this.#taskData.name; // Adjust this based on your task data structure
        }
    }

    #mouseDown(ev) {
        this.#touchX = ev.x;
        document.addEventListener("mouseup", this.mouseUp);
        document.addEventListener("mousemove", this.mouseMove);
        this.#front.style.transition = 'none';
        this.#currentX = 0;
    }

    mouseUp() {
        document.removeEventListener("mouseup", this.mouseUp);
        document.removeEventListener("mousemove", this.mouseMove);

        if (this.#currentX === this.#maxX) this.#callback("delete!");

        this.#front.style.transition = 'transform .15s ease-in-out';
        this.#front.style.transform = 'translateX(0)';
        this.#touchX = 0;
    }

    mouseMove(ev) {
        this.#currentX = this.#touchX - ev.x;
        if (this.#currentX < 0) this.#currentX = 0;
        if (this.#currentX > this.#maxX) this.#currentX = this.#maxX;

        this.#front.style.transform = `translateX(-${this.#currentX}px)`;
    }
}

customElements.define('task-item', TaskItem);