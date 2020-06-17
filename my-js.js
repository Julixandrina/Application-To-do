'use strict';

document.addEventListener("DOMContentLoaded", onPageLoaded);

function onPageLoaded() {


    let createTask = document.querySelector(".create-task");
    let boxTasks = document.querySelector(".box-tasks");
    let btnClearFinished = document.querySelector('.btn-clear-finished');
    let btnAddTask = document.querySelector('.btn-add-task');


    function createTodo(newTodo) {




        let task = document.createElement("div");//создание блока для нового таска
        task.classList.add('task');
        task.classList.add('list-group-item');



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

        inputTextTask.addEventListener('keydown', function(event) {
            if (event.code === 'Enter') {
                let task = createTodo("");
                event.target.closest('.task').after(task);
                task.querySelector('.text-task').focus()
            }
        })



        groupContainerTask.append(inputTextTask);
        groupContainerTask.insertAdjacentHTML('afterbegin', '<div class="input-group-prepend">\n' +
            '        <div class="custom-control custom-checkbox">\n' +
            '            <input type="checkbox" class="checkbox custom-control-input" id="">\n' +
            '            <label class="custom-control-label label-checkbox" for=""></label>\n' +
            '        </div>\n' +
            '    </div>')

        groupContainerTask.insertAdjacentHTML('beforeend', '<div class="input-group-append">\n' +
            '                           <button class="btn btn-outline-primary remove-btn btn-view" type="button"><img src="image/del.svg" alt=""></button>\n' +
            '                       </div>')







      /*if (inputTextTask.value  === "") {
          let task = createTodo("");
            inputTextTask.setAttribute('tabindex', '0');
            let ret = inputTextTask.closest('.task');
            let ter = ret.querySelector('.text-task');
            if (ret) {
                console.log(1)
                ter.focus()
                task.querySelector('.text-task').focus()
            }

            console.log(ter)

        }*/






        let deleteBtn = groupContainerTask.querySelector('button.remove-btn');
        listenDeleteTodo(deleteBtn);


        let checkBox = groupContainerTask.querySelector('.checkbox');
        taskCheckboxBindEventClick(checkBox);

        let allCreatedTask = boxTasks.querySelectorAll('.task');

        let checkBoxes = groupContainerTask.querySelector('.checkbox');
        let labelCheck = task.querySelector('.label-checkbox');

        let lengthBox = allCreatedTask.length + 1;

        let uniqueLabelID = 'check' + lengthBox;
        let uniqueLabelFor = 'check' + lengthBox;

        checkBoxes.id = uniqueLabelID;
        labelCheck.setAttribute('for', uniqueLabelFor);

        return task;
    }






    createTask.addEventListener('keydown', function(event) {
        if (event.code === 'Enter') {

            let newTodo = createTask.value;//значение введённое в главный инпут
           if (!newTodo) return;

            let task = createTodo(newTodo);
            boxTasks.append(task);
        }

    });


    btnClearFinished.addEventListener('click', function (event) {
        clearTaskFinished(event);
    })
    /*btnAddTask.addEventListener('click', function (event) {

       /!* let newTodo = createTask.value;
        let task = createTodo(newTodo);
        boxTasks.append(task);*!/


    })*/
    btnAddTask.addEventListener('click', function(event) {

        let task = createTodo("");
        boxTasks.append(task);
        task.querySelector('.text-task').focus();

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




