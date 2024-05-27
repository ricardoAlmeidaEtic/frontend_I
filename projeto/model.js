export default class TodoModel {
    #tasks = [
    ];

    constructor() {

        if(!localStorage.getItem("todos")){
            localStorage.setItem("todos", JSON.stringify(this.#tasks));
        } else{
            this.#tasks = JSON.parse(localStorage.getItem("todos"))
        }
    }

    addTask(task) {
        this.#tasks.push({title:task, checked:"false"});
        this.#updateLocalStorage();
    }

    deleteTask(index) {
        console.log("this.#tasks",this.#tasks)
        this.#tasks.splice(index, 1);
        this.#updateLocalStorage();
    }
    
    addItem(taskIndex, item) {
        console.log("taskIndex",taskIndex)
        console.log("this.#tasks[taskIndex]",this.#tasks)
        this.#tasks[taskIndex].items.push({title:item, checked:"false"});
        this.#updateLocalStorage();
    }
    
    deleteItem(task, index) {
        this.#tasks[task].items.splice(index, 1);
        this.#updateLocalStorage();
    }

    getTasks() {
        return JSON.parse(localStorage.getItem("todos"));
    }

    getItems(taskIndex) {
        return this.#tasks[taskIndex].items;
    }

    #updateLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(this.#tasks));
    }

    get data(){
        return this.#tasks
    }
}