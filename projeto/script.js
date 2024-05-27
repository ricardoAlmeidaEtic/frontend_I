import TODOModel from "./model.js";

window.onload = async () => {
    const tasksContainer = document.querySelector("#tasks");
    const itemsContainer = document.querySelector("#items");   
    const listsContainer = document.querySelector("#lists-container");
    let currentIndexItem = null;
    
    const model  = new TODOModel();
    
    const todoHeader = document.querySelector("todo-header");
    todoHeader.state="tasks"

    todoHeader.addEventListener("clicked", () => {
        listsContainer.style.transform = "translateX(0)";
        todoHeader.state = "tasks";
        buildTasksList(model.getTasks());
    });

    const addModal = document.querySelector("add-modal");
    addModal.addEventListener("confirm", (event) => {
        console.log("event",event.detail.value)
        if(todoHeader.state == "tasks"){
            model.addTask(event.detail.value);
            buildTasksList(model.getTasks());
            addModal.hide();
        } else {
            console.log("currentIndexItem",currentIndexItem)
            model.addItem(currentIndexItem,event.detail.value);
            console.log("currentIndexItem",currentIndexItem)
            buildItemsList(currentIndexItem,model.getItems(currentIndexItem))
            addModal.hide();
        }
    });

    const footer = document.querySelector("footer");
    footer.onclick = () => {
        console.log("clicou")
        addModal.show(todoHeader.state);
    };
    
    const buildTasksList = (tasks) => {
        tasksContainer.innerHTML="" //clear tasks list
        tasks.forEach((task, indexElement) => {
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
                currentIndexItem = indexElement;
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