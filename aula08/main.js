/*
class WordCounter{
    #view;

    constructor() {
        this.#view = document.querySelector("#word-counter")
        console.log(this.#view)
    }

    get numbWords(){
        return this.#view.innerText.split(/\b\w+\b/g).length;
    }

    set innerText(text){
        this.#view.querySelector("p").innerText = text;
    }

    get innerText(){
        return this.#view.querySelector("p").innerText
    }
}
*/

class WordCounter extends HTMLElement{
    constructor() {
        super();
        console.log("Component constructed.");
    }

    createElements(tag, text) {
        const newElement = document.createElement(tag);
        newElement.innerText = text;
        this.appendChild(newElement);
    }

    createAudio(url) {
        const newElement = document.createElement("audio");
        newElement.src = url;
        newElement.controls=true;
        newElement.style.marginTop="20px";
        this.appendChild(newElement);
    }

    get numbWords(){
        return this.querySelector("textarea").value.split(/\b\w+\b/g).length - 1;
    }

    connectedCallback(){
        console.log("Custom element added to page.");
    }

    disconnectedCallback(){
        console.log("Custom element removed from page.");
    }

    adoptedCallback(){
        console.log("Custom element nivel to new page.");
    }

    attributedCallback(){
        console.log(`Attribute ${name} has changed.`);
    }
}

customElements.define("word-counter", WordCounter)

window.onload = async() =>{
    const wordCounter = document.querySelector("word-counter");
    //document.querySelector("#result").innerText += "\n number of words: " + wordCounter.numbWords;

    console.log(wordCounter.numbWords);
    
    wordCounter.createElements("h1","cheio de moscas")
    wordCounter.createElements("small","cheio de moscas")
    //document.querySelector("#result").innerText += "\n number of words: " + wordCounter.numbWords;

    wordCounter.querySelector("button").onclick = () =>{
        console.log(wordCounter.numbWords);
    }

    wordCounter.createAudio("https://www.youtube.com/watch?v=TR_T5Z9fF_k")
}