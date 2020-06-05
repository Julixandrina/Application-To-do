'use strict';
/*let tasksForm = document.querySelector('#tasks-form');
let formInputTask = document.querySelector('#input-task');
let boxLiTasks = document.querySelector('list-tasks');
formInputTask.addEventListener('input', getNewTask);

function getNewTask() {
    let form = document.forms.formBox;
    let inputTextForm = formBox.elements.task;
    let valueText = inputTextForm.value;
    /!*inputTextForm.value = '';*!/

    form.onsubmit = function (event) {
        valueText = inputTextForm.value;
        event.preventDefault();
        if (!valueText) {
            inputTextForm.focus();
            return false;
        }
        let newTask = document.createElement('li');


        newTask.classList.add('list-group-item');
        newTask.innerHTML = formBox.elements.task.value;

    }

}*/
document.addEventListener("DOMContentLoaded", onPageLoaded);

function onPageLoaded() {
    const createTask = document.querySelector("#input-task");
    const boxTasks = document.querySelector(".box-tasks");

    function createTodo() {

        const task = document.createElement("div");
        task.classList.add('task');
        boxTasks.append(task);






        task.insertAdjacentHTML('afterbegin', '<div class="list-group-item">\n' +
                '                   <div class="input-group">\n' +
                '                       <div class="input-group-prepend">\n' +
                '                           <div class="input-group-text">\n' +
                '                               <input type="checkbox" aria-label="Checkbox for following text input" >\n' +
                '                           </div>\n' +
                '                       </div>\n' +
                '                       <input id="input" type="text" class="form-control new-task" aria-label="Text input with checkbox" aria-describedby="remove-btn">\n' +
                '                       <div class="input-group-append">\n' +
                '                           <button class="btn btn-outline-secondary" type="button" id="remove-btn"><img src="image/del.svg" alt=""></button>\n' +
                '                       </div>\n' +
                '                   </div>\n' +
                '               </div>');
            let inputNewTask = document.querySelector('.new-task');


            const newTodo = createTask.value;
            inputNewTask.value = newTodo;

            inputNewTask.append(newTodo);


            createTask.value = '';
    }


    createTask.addEventListener('keydown', function(event) {
        if (event.code === 'Enter') {
            createTodo();
        }
    });

}

