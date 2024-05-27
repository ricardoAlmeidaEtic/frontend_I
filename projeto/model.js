export default class TodoModel {
    #tasks = [
        {
            title: "Task 1",
            items: [
                {
                    title: "Item 1",
                    checked: "false"
                },
                {
                    title: "Item 2",
                    checked: "false"
                },
                {
                    title: "Item 3",
                    checked: "true"
                }
            ]
        },
        {
            title: "Task 2",
            items: [
                {
                    title: "Item 4",
                    checked: "false"
                },
                {
                    title: "Item 5",
                    checked: "true"
                },
                {
                    title: "Item 6",
                    checked: "false"
                }
            ]
        }
    ];

    constructor() {

        if(!localStorage.getItem("todos")){ 
            localStorage.setItem("todos", JSON.stringify(this.#tasks));
        }
    }

    addTask(task) {
        this.#tasks.push(task);
        this.#updateLocalStorage();
    }

    deleteTask(index) {
        console.log("this.#tasks",this.#tasks)
        this.#tasks.splice(index, 1);
        this.#updateLocalStorage();
    }
    
    addItem(task, item) {
        this.#tasks[task].items.push(item);
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