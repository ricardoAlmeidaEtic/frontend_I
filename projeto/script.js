import TODOModel from "./model.js";

window.onload = async () => {
    const tasksContainer = document.querySelector("#tasks");
    const itemsContainer = document.querySelector("#items");   
    const listsContainer = document.querySelector("#lists-container");

    const todoModel = new TODOModel();

    const todoHeader = document.querySelector("todo-header");
    todoHeader.addEventListener("clicked", () => {
        listsContainer.style.transform = "translateX(0)";
        todoHeader.state = "tasks";
    });
    
    todoModel.data.forEach(task => {
        const taskItem = new TaskItem(itemTemplate);
        taskItem.data = task;

        taskItem.onclick = () =>{
            itemsContainer.innerHTML="" //clear items list
            todoHeader.state = "items"; //set header state to items
            todoHeader.taskName = task.title; //set header label to task title
            listsContainer.style.transform = "translateX(-100%)"; //slide list-container to items

            task.items.forEach((task,index) => {
                const taskItem = new TaskItem(checkItemTemplate);
                taskItem.data = task;
                taskItem.addEventListener("delete", (event) => {
                    todoModel.deleteTask(index)
                })
                itemsContainer.appendChild(taskItem);
            });
        }

        tasksContainer.appendChild(taskItem);
    });
};