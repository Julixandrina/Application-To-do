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

        let parentContainerTaxtareaDiv = document.createElement('div');
        parentContainerTaxtareaDiv.classList.add('parent-container-for-textarea');



        let divTextarea = document.createElement('div');
        divTextarea.classList.add('autogrow-textarea-mirror');
        divTextarea.classList.add('form-control');
        divTextarea.innerHTML = newTodo;

        /*let groupContainerTask = document.createElement("div");//создание контейнера для внутринних блоков таска
        groupContainerTask.classList.add('task-group');*/



        let inputTextTask = document.createElement('textarea');//создание инпута для записи значения из формы ввода нового таска
        inputTextTask.classList.add('form-control');
        inputTextTask.classList.add('text-task');
        /*inputTextTask.classList.add('form-input-task');*/
        inputTextTask.setAttribute('type', 'text');
        inputTextTask.value = divTextarea.innerHTML;




        /*divTextarea.innerHTML = inputTextTask.value;*/






       /* task.append(groupContainerTask);*/
        createTask.value = '';

        inputTextTask.addEventListener('keydown', function(event) {

            if (event.code === 'Enter') {
                let task = createTodo("");
                event.target.closest('.task').after(task);
                task.querySelector('.text-task').focus();
                event.preventDefault();
                return false;
            }
        })
        inputTextTask.addEventListener('input', function (event) {
            let parentThisElement = event.target.closest('.task');
            let inputDiv = parentThisElement.querySelector('.autogrow-textarea-mirror');
            inputDiv.innerHTML = inputTextTask.value;

            let scrollHeight = Math.max(
                inputDiv.scrollHeight,
                inputDiv.offsetHeight,
                inputDiv.clientHeight
            );
            /*event.target.style.height = scrollHeight  + 'px';*/


        })

        parentContainerTaxtareaDiv.append(inputTextTask);
        parentContainerTaxtareaDiv.append(divTextarea);
        task.append(parentContainerTaxtareaDiv);
        task.insertAdjacentHTML('afterbegin', '<div class="input-group-prepend">\n' +
            '        <div class="custom-control custom-checkbox">\n' +
            '            <input type="checkbox" class="checkbox custom-control-input" id="">\n' +
            '            <label class="custom-control-label label-checkbox" for=""></label>\n' +
            '        </div>\n' +
            '    </div>')

        task.insertAdjacentHTML('beforeend', '<div class="input-group-append">\n' +
            '                           <button class="btn btn-outline-primary remove-btn btn-view" type="button"><img src="image/del.svg" alt=""></button>\n' +
            '                       </div>')


        let deleteBtn = task.querySelector('button.remove-btn');
        listenDeleteTodo(deleteBtn);


        let checkBox = task.querySelector('.checkbox');
        taskCheckboxBindEventClick(checkBox);

        let allCreatedTask = boxTasks.querySelectorAll('.task');

        let checkBoxes = task.querySelector('.checkbox');
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


            let textareaMirror = task.querySelector('.autogrow-textarea-mirror');
            textareaMirror.innerHTML = newTodo;

            let scrollHeight = Math.max(
                textareaMirror.scrollHeight,
                textareaMirror.offsetHeight,
                textareaMirror.clientHeight
            );
            console.log(scrollHeight);

            let topLevelTask = textareaMirror.closest('.task');

            let textareaText = topLevelTask.querySelector('.text-task');
            /*let coordsTextarea = textareaText.getBoundingClientRect().left;
            let coordsTextareaMirror = textareaMirror.getBoundingClientRect().left;
            console.log(coordsTextarea)
            console.log(coordsTextareaMirror)
            textareaMirror.style.marginLeft = -coordsTextarea + 'rem';
            /!*coordsTextareaMirror = coordsTextarea;*!/*/

            /*textareaText.style.height = scrollHeight  + 'px';*/


        }
    });


    btnClearFinished.addEventListener('click', function (event) {
        clearTaskFinished(event);
    })
    btnAddTask.addEventListener('click', function(event) {

        let task = createTodo("");
        boxTasks.append(task);
        task.querySelector('.text-task').focus();

    })
}
function taskCheckboxBindEventClick(checkboxElement) {
    checkboxElement.addEventListener('change', function (event) {
        let parentThisElement = event.target.closest('.task');
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





