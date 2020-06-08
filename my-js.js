'use strict';

document.addEventListener("DOMContentLoaded", onPageLoaded);

function onPageLoaded() {
    const createTask = document.querySelector("#input-task");
    const boxTasks = document.querySelector(".box-tasks");

    function createTodo() {

        const newTodo = createTask.value;
        if (!newTodo) return;
        const task = document.createElement("div");
        task.classList.add('task');
        task.classList.add('list-group-item');


        boxTasks.append(task);
        let inputGroup = document.createElement("div");
        inputGroup.classList.add('input-group');

        task.append(inputGroup);

        let input = document.createElement('input');
        input.classList.add('form-control');
        input.classList.add('new-task');
        inputGroup.append(input);

        let inputTask = document.querySelector('input.new-task');
        inputTask.setAttribute('type', 'text');
        inputTask.setAttribute('aria-label', 'Text input with checkbox');
        inputTask.setAttribute('aria-describedby', 'remove-btn');


        input.value = newTodo;

        inputGroup.insertAdjacentHTML('afterbegin', '<div class="input-group-prepend">\n' +
            '                           <div class="input-group-text">\n' +
            '                               <input type="checkbox" aria-label="Checkbox for following text input" >\n' +
            '                           </div>\n' +
            '                       </div>')

        inputGroup.insertAdjacentHTML('beforeend', '<div class="input-group-append">\n' +
            '                           <button class="btn btn-outline-secondary remove-btn" type="button"><img src="image/del.svg" alt=""></button>\n' +
            '                       </div>')

        createTask.value = '';



}


    createTask.addEventListener('keydown', function(event) {
        if (event.code === 'Enter') {
            createTodo();
        }
    });





}


/*
document.body.addEventListener('click', removeContainer);
function removeContainer(event) {
    console.log('5');
    let ret = event.target.classList.contains('remove-btn');


    if (ret) {
        event.target.closest('div.task').remove();
    }


}*/
