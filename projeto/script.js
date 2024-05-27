import TODOModel from "./model.js";

window.onload = async () => {
    const tasksContainer = document.querySelector("#tasks");
    const itemsContainer = document.querySelector("#items");   
    const listsContainer = document.querySelector("#lists-container");

    const model  = new TODOModel();

    const todoHeader = document.querySelector("todo-header");
    todoHeader.addEventListener("clicked", () => {
        listsContainer.style.transform = "translateX(0)";
        todoHeader.state = "tasks";
        buildTasksList(model.getTasks());
    });

    const addFooter = document.querySelector("footer");
    todoHeader.addEventListener("clicked", () => {
        listsContainer.style.transform = "translateX(0)";
        todoHeader.state = "tasks";
        buildTasksList(model.getTasks());
    });
    
    const buildTasksList = (tasks) => {
        tasksContainer.innerHTML="" //clear tasks list
        tasks.forEach((task,indexElement) => {
            const taskElement = new TaskItem(itemTemplate);
            taskElement.data = task;

            taskElement.addEventListener("delete", () => {
                model.deleteTask(indexElement)
                listsContainer.style.transform = "translateX(0)";
                todoHeader.state = "tasks";
                buildTasksList(model.getTasks());
            })

            taskElement.onclick = () =>{
                todoHeader.state = "items"; //set header state to items
                todoHeader.taskName = task.title; //set header label to task title
                listsContainer.style.transform = "translateX(-100%)"; //slide list-container to items
                buildItemsList(indexElement,task.items)
            }

            tasksContainer.appendChild(taskElement);
        });
    }

    const buildItemsList = (indexElement,items) => {
        itemsContainer.innerHTML="" //clear items list
        items.forEach((task,index) => {
            const taskItem = new TaskItem(checkItemTemplate);
            taskItem.data = task;

            taskItem.addEventListener("delete", () => {
                console.log(index)
                model.deleteItem(indexElement, index)
                buildItemsList(indexElement,model.getItems(indexElement));
            })
            
            itemsContainer.appendChild(taskItem);
        });
    }

    buildTasksList(model.getTasks());
};