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
        if(todoHeader.state === "tasks"){
            model.addTask(event.detail.value);
            buildTasksList(model.getTasks());
            addModal.hide();
        } else {
            model.addItem(currentIndexItem,event.detail.value);
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
        console.log("tasks",tasks)
        console.log("tasks.length",tasks.length)
        tasksContainer.innerHTML="" //clear tasks list

        if(tasks.length !== 0){
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
                }

                tasksContainer.appendChild(taskElement);
            });
        }else{
            console.log("clear")
            const text = document.createElement("h1");
            text.innerText ="Não existem tasks/items criados"
            text.style.display = "flex"
            text.style.justifyContent="center";
            text.style.marginTop="50%"
            tasksContainer.appendChild(text);
        }
    }

    const buildItemsList = (indexElement,items) => {
        currentIndexItem = indexElement;
        itemsContainer.innerHTML="" //clear items list

        if(items.length !== 0){
            items.forEach((task,index) => {
                const taskItem = new TaskItem(checkItemTemplate);
                taskItem.data = task;

                taskItem.addEventListener("delete", () => {
                    model.deleteItem(indexElement, index)
                    buildItemsList(indexElement,model.getItems(indexElement));
                })

                taskItem.addEventListener("checked", (ev) => {
                    console.log("checked2",ev.detail.checked)
                    model.updateItem(indexElement, index, ev.detail.checked);
                });
                
                itemsContainer.appendChild(taskItem);
            });
        } else{
            console.log("clear")
            const text = document.createElement("h1");
            text.innerText ="Não existem tasks/items criados"
            text.style.display = "flex"
            text.style.justifyContent="center";
            text.style.marginTop="50%"
            itemsContainer.appendChild(text);
        }

    }

    buildTasksList(model.getTasks());
};