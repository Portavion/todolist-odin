import { TodoItem } from "./todo";
import { Workspace } from "./workspace";

export { UIController };

const UIController = new class {
    constructor() {}

    displayTodos (project){
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = '';
        const projectNameDiv = document.createElement('div')
        const todoListContainer = document.createElement('ul');

        const todoArray = project.listTodos();

        projectNameDiv.textContent = project.name;
        projectNameDiv.className = 'project-name';
        todoListContainer.className = 'list-todo';
        todoContainer.appendChild(projectNameDiv);

        for (let todoId in todoArray) {
            let newListItem = document.createElement('li');
            newListItem.className = 'todo';

            let newCheckbox = document.createElement('input');
            newCheckbox.setAttribute('type', 'checkbox');
            newCheckbox.name = 'check';
            newCheckbox.checked = todoArray[todoId].checked;

            let titleDiv = document.createElement('div');
            titleDiv.appendChild(document.createTextNode(todoArray[todoId].title));

            let priorityDiv = document.createElement('div');
            priorityDiv.appendChild(document.createTextNode('p' + todoArray[todoId].priority));

            let dueDateDiv = document.createElement('div');
            dueDateDiv.appendChild(document.createTextNode(todoArray[todoId].dueDate));

            let deleteDiv = document.createElement('div');
            deleteDiv.appendChild(document.createTextNode('Delete'));

            deleteDiv.addEventListener('click', () => {
                project.removeTodo(todoArray[todoId]);
                localStorage.setItem('defaultProject', JSON.stringify(project));
                const taskContainer = deleteDiv.parentElement;
                taskContainer.innerHTML = '';

            });


            newListItem.appendChild(newCheckbox); 
            newListItem.appendChild(titleDiv);
            newListItem.appendChild(priorityDiv);
            newListItem.appendChild(dueDateDiv);
            newListItem.appendChild(deleteDiv);

            todoListContainer.appendChild(newListItem);
        }

        todoContainer.appendChild(todoListContainer);

    }

    displayProjects (projectList) {
        const projectContainer = document.querySelector('.my-projects');
        const projectListContainer = document.createElement('ul');

        for (let projectID in projectList) {
            let newListItem = document.createElement('li');

            newListItem.appendChild(document.createTextNode(projectList[projectID].name));

            newListItem.addEventListener('click', function () {
                UIController.displayTodos(projectList[projectID]);
            });

            projectListContainer.appendChild(newListItem);

        }

        projectContainer.appendChild(projectListContainer);
    }

    displayToday (projectList) {
        const todoContainer = document.querySelector('.todo-container');
        todoContainer.innerHTML = '';
        const projectNameDiv = document.createElement('div')
        const todoListContainer = document.createElement('ul');

        const todayDate = new Date().toISOString().split('T')[0];
        const todoDueTodayArray = [];

        for(let projectID in projectList){
            let todoArray = projectList[projectID].listTodos();
            for(let todoID in todoArray){
                let todoIteration = todoArray[todoID];
                if(todoIteration.dueDate === todayDate){
                    todoDueTodayArray.push(todoIteration);
                }
            }
        }

        projectNameDiv.textContent = 'Today';
        projectNameDiv.className = 'project-name';
        todoListContainer.className = 'list-todo';
        todoContainer.appendChild(projectNameDiv);

        for (let todoId in todoDueTodayArray) {
            let newListItem = document.createElement('li');
            newListItem.className = 'todo';

            let newCheckbox = document.createElement('input');
            newCheckbox.setAttribute('type', 'checkbox');
            newCheckbox.name = 'check';
            newCheckbox.checked = todoDueTodayArray[todoId].checked;

            let titleDiv = document.createElement('div');
            titleDiv.appendChild(document.createTextNode(todoDueTodayArray[todoId].title));

            let priorityDiv = document.createElement('div');
            priorityDiv.appendChild(document.createTextNode('p' + todoDueTodayArray[todoId].priority));

            let dueDateDiv = document.createElement('div');
            dueDateDiv.appendChild(document.createTextNode(todoDueTodayArray[todoId].dueDate));


            newListItem.appendChild(newCheckbox); 
            newListItem.appendChild(titleDiv);
            newListItem.appendChild(priorityDiv);
            newListItem.appendChild(dueDateDiv);

            todoListContainer.appendChild(newListItem);
        }

        todoContainer.appendChild(todoListContainer);
    }
}