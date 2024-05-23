import TODOModel from "./model.js";

window.onload = async () => {
    const tasksContainer = document.querySelector("#tasks");

    tasksContainer.addEventListener("item-clicked", (event) => {
        const itemsContainer = document.querySelector("#items");
        itemsContainer.data = event.detail.data;
    });

    const todoModel = new TODOModel();
    await todoModel.initialize("data.json");
    
    todoModel.data.forEach(task => {
        const taskItem = document.createElement('task-item');
        taskItem.innerText = JSON.stringify(task);
        tasksContainer.appendChild(taskItem);
    });
};