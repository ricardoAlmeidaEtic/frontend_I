/**TODO HEADER */
const headerTemplate = document.createElement("template");
headerTemplate.innerHTML = `
<style>
    @import url("system.css");
    :host {
        background-color: var(--color-primary);
    }

    header {
        display: flex;
        align-items: center;
        gap: var(--gap);
        padding: var(--v-padding) var(--h-padding);
    }
    header * {
        padding: 0;
        margin: 0;
    }

    h1 {
        color: var(--color-text-light);
        font-size: clamp(32px, 4vw, 48px);
    }
    p {
        display: none;
        font-size: clamp(16px, 4vw, 24px);
        color: var(--color-text-dark);
        font-style: italic;
        text-transform: capitalize;
    }

    .icon {
        display: none;
        width: clamp(32px, 4vw, 48px);
        height: clamp(32px, 4vw, 48px);
        min-width: 32px;
        min-height: 32px;
        cursor: pointer;
        margin-left: auto
    }
</style>

<header>

    <h1>TODOs</h1>
    <p>Task name</p>
    <div class="icon">
        <svg width="100%" height="100%" viewBox="0 0 24.342 24.342" fill="var(--color-text-light)">
            <path d="m9.5578 24.342h-9.5578v-14.193l12.171-10.149 12.171 10.149v14.193h-9.5578v-7.5914h-5.226z" />
        </svg>
    </div>

</header>

`;
class TodoHeader extends HTMLElement {

    static observedAttributes = ['state', 'task-name'];
    shadowRoot;
    #taskName;
    #icon;
    constructor() {
        super();
        this.shadowRoot = this.attachShadow({mode: 'closed'});
        this.shadowRoot.append(headerTemplate.content.cloneNode(true));

        this.#taskName = this.shadowRoot.querySelector("p");
        this.#icon = this.shadowRoot.querySelector(".icon");

        this.#icon.onclick = () => this.dispatchEvent(new CustomEvent("clicked"));
    }

    attributeChangedCallback(attrName, oldVal, newVal) {

        switch (attrName) {
            case 'state':
                if(newVal === "tasks") {
                    this.#taskName.style.display = "none";
                    this.#icon.style.display = "none";
                } else {
                    this.#taskName.style.display = "initial";
                    this.#icon.style.display = "initial";
                }
                break;
            case 'task-name':
                this.#taskName.innerText = newVal;
                break;
        }
    }

    get state() {
        return this.getAttribute("state");
    }
    set state(val) {
        this.setAttribute("state", val);
    }

    get taskName() {
        return this.getAttribute("task-name");
    }
    set taskName(val) {
        this.setAttribute("task-name", val);
    }
}
customElements.define("todo-header", TodoHeader);

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

    <div id="task-element">
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

/**CHECK ITEM */
const checkItemTemplate = document.createElement("template");
checkItemTemplate.innerHTML = `
<style>
    @import url("system.css");

    .button {
        position: relative;
        overflow: hidden;
        width: 100%;
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
        background-color: var(--color-text-dark);
        padding: 20px;
        transition: transform 0.3s ease-in-out;
    }

    label {
        font-size: clamp(32px, 4vw, 48px);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
        color: var(--color-text-light);
    }

    .icon {
        width: clamp(32px, 4vw, 48px);
        height: clamp(32px, 4vw, 48px);
        min-width: 32px;
        min-height: 32px;
        background-color: var(--color-text-light);
    }

    .icon-red {
        width: clamp(32px, 4vw, 48px);
        height: clamp(32px, 4vw, 48px);
        min-width: 32px;
        min-height: 32px;
    }

    .back {
        display: flex;
        justify-content: flex-end;
        background-color: red;
        padding: 20px;
    }

</style>
<div id="item-element">
    <div class="button">
        <div class="front">
            <label></label>
            <div class="icon">
                <svg width="100%" height="100%"  viewBox="0 0 24.342 24.342" >
                    <path d="m20.497 2.6458 3.8447 3.865-15.105 15.185-9.2366-9.2856 3.8447-3.865 5.3919 5.4205z"/>
                </svg>
            </div>
        </div>

        <div class="back">
            <div class="icon-red">
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
    shadowRoot;
    #checked = false;
    #template;
    #id;

    constructor(template, cb) {
        super();
        this.#callback = cb;
        this.#template = template
        this.shadowRoot = this.attachShadow({ mode: 'closed' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.#front = this.shadowRoot.querySelector(".front");
    }

    connectedCallback() {
        const button = this.shadowRoot.querySelector(".button");

        this.mouseUp = this.mouseUp.bind(this);
        this.mouseMove = this.mouseMove.bind(this);

        button.onmousedown = (ev) => this.#mouseDown(ev);

        button.onclick = () => {
            if (this.#currentX === 0) {
                if(this.#template == checkItemTemplate){
                    this.#checked =! this.#checked;
                    console.log("this.#checked",this.#checked)
                    button.querySelector('svg').style.display = this.#checked ? 'block' : 'none';
                }
            }
        };
    }

    get data(){
        return this.#taskData;
    }

    set data(value) {
        this.#taskData = value;
        this.#render();
    }

    #render() {
        if (this.#taskData) {
            const label = this.shadowRoot.querySelector("label");
            label.innerText = this.#taskData.title;
            if(this.#template == checkItemTemplate){
                this.shadowRoot.querySelector("svg").style.display = this.#taskData.checked == "true" ? 'block' : 'none';
                this.#checked = this.#taskData.checked == "true" ? true : false;
            }
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

        if (this.#currentX === this.#maxX){
            this.dispatchEvent(new CustomEvent("delete"));
        }

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