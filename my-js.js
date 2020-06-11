'use strict';

document.addEventListener("DOMContentLoaded", onPageLoaded);

function onPageLoaded() {


    let createTask = document.querySelector("#input-task");
    let boxTasks = document.querySelector(".box-tasks");
    let btnClearFinished = document.querySelector('.btn-clear-finished');
    let btnAddTask = document.querySelector('.btn-add-task');


    function createTodo() {
        let newTodo = createTask.value;//значение введённое в инпут
        if (!newTodo) return;

        let task = document.createElement("div");//создание блока для нового таска
        task.classList.add('task');
        task.classList.add('list-group-item');
        boxTasks.append(task);


        let groupContainerTask = document.createElement("div");//создание контейнера для внутринних блоков таска
        groupContainerTask.classList.add('input-group');
        task.append(groupContainerTask);

        let inputTextTask = document.createElement('input');//создание инпута для записи значения из формы ввода нового таска
        inputTextTask.classList.add('form-control');
        inputTextTask.classList.add('text-task');
        inputTextTask.classList.add('form-input-task');
        inputTextTask.setAttribute('type', 'text');
        inputTextTask.value = newTodo;
        createTask.value = '';


        groupContainerTask.append(inputTextTask);
        groupContainerTask.insertAdjacentHTML('afterbegin', '<div class="input-group-prepend">\n' +
            '                           <div class="input-group-text">\n' +
            '                               <input type="checkbox" class="checkbox">\n' +
            '                           </div>\n' +
            '                       </div>')

        groupContainerTask.insertAdjacentHTML('beforeend', '<div class="input-group-append">\n' +
            '                           <button class="btn btn-outline-primary remove-btn btn-view" type="button"><img src="image/del.svg" alt=""></button>\n' +
            '                       </div>')

        inputTextTask.onkeydown = function (event) {
            if (inputTextTask ===  document.activeElement) {
                if (event.code === 'Enter') {
                    console.log('enter');

                }


            }
        }


        let deleteBtn = document.querySelectorAll('button.remove-btn');
        for (let btn of deleteBtn) {
            listenDeleteTodo(btn);
        }

        let checkBox = groupContainerTask.querySelector('.checkbox');
        taskCheckboxBindEventClick(checkBox);
    }
    createTask.addEventListener('keydown', function(event) {
        if (event.code === 'Enter') {
            createTodo();
        }
    });
    btnClearFinished.addEventListener('click', function (event) {
        clearTaskFinished(event);
    })
    btnAddTask.addEventListener('click', function (event) {
        inputNewTaskFocus(event);
    })

}


function taskCheckboxBindEventClick(checkboxElement) {
    checkboxElement.addEventListener('change', function (event) {
        let parentThisElement = event.target.closest('.input-group');
        let inputText = parentThisElement.querySelector('.text-task');

        inputText.classList.toggle('checkedText');
    });

}
function listenDeleteTodo(element) {
    element.addEventListener("click", function (event) {
        event.target.closest('.task').remove();
        event.stopPropagation();
    });

}
function  clearTaskFinished(event) {
    let parentContainer = event.target.closest('.tasks-bord');
    let boxTasks = parentContainer.querySelectorAll('.task');
    for (let task of boxTasks) {
        let finishedTask = task.querySelector('.checkedText');
        if (finishedTask) {
            task.remove();
        }
    }

}
function inputNewTaskFocus(event) {
    let parentContainer = event.target.closest('.tasks-bord');
    parentContainer.querySelector('#input-task').focus();

}




