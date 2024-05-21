export default class GalleryModel{
    #modelData
    constructor(){

    }

    async initialize(url){
        const storageData = JSON.parse(localStorage.getItem('web-gallery'));

        if(storageData){
            this.#modelData = storageData;
        }else{
            const req = await fetch(url)
            this.#modelData = await req.json();
        }

        window.localStorage.setItem('web-gallery', JSON.stringify(this.#modelData))
    }

    addItem(obj){
        this.#modelData.push(obj)
        console.log(this.#modelData)
        window.localStorage.setItem('web-gallery', JSON.stringify(this.#modelData))
    }

    get data(){
        return this.#modelData;
    }
}