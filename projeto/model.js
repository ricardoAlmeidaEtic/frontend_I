export default class TODOModel{
    #modelData
    constructor(){

    }

    async initialize(url){
        const storageData = JSON.parse(localStorage.getItem('todo-list'));

        if(storageData){
            this.#modelData = storageData;
        }else{
            const req = await fetch(url)
            this.#modelData = await req.json();
        }

        window.localStorage.setItem('todo-list', JSON.stringify(this.#modelData))
    }

    addItem(obj){
        this.#modelData.push(obj)
        console.log(this.#modelData)
        window.localStorage.setItem('todo-list', JSON.stringify(this.#modelData))
    }

    get data(){
        return this.#modelData;
    }
}