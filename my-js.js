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
            '                           <div class="input-group-text">\n' +
            '                               <input type="checkbox" class="checkbox">\n' +
            '                           </div>\n' +
            '                       </div>')

        groupContainerTask.insertAdjacentHTML('beforeend', '<div class="input-group-append">\n' +
            '                           <button class="btn btn-outline-primary remove-btn btn-view" type="button"><img src="image/del.svg" alt=""></button>\n' +
            '                       </div>')

       /* inputTextTask.onkeydown = function (event) {
            if (inputTextTask ===  document.activeElement) {
                if (event.code === 'Enter') {
                    console.log('enter');
                    inputTextTask.blur()

                }
            }
        }*/
       /* inputTextTask.addEventListener('keydown', function (event) {
            if (event.code === 'Enter') {
                /!*console.log('enter');
                inputTextTask.blur()*!/
                event.target.closest()

            }

        })*/
        /*createNewTaskAfter(inputTextTask);*/


        let deleteBtn = document.querySelectorAll('button.remove-btn');
        for (let btn of deleteBtn) {
            listenDeleteTodo(btn);
        }

        let checkBox = groupContainerTask.querySelector('.checkbox');
        taskCheckboxBindEventClick(checkBox);

        return task;
    }

    createTask.addEventListener('keydown', function(event) {
        if (event.code === 'Enter') {
            /*let curTask = document.querySelector('.text-task');

            if (curTask === document.activeElement) {
                curTask.addEventListener('keydown', function (event) {
                    if (event.code === 'Enter') {
                        console.log(curTask);
                        createTodo();
                    }

                })

            }*/

            let newTodo = createTask.value;//значение введённое в главный инпут
            if (!newTodo) return;

            let task = createTodo(newTodo);
            boxTasks.append(task);
        }


    });
   /* function createNewTaskAfter() {
        document.body.addEventListener('keydown', function (event) {
            if (document.activeElement.closest('.text-task')) {

                if (event.code === 'Enter') {
                        function test() {
                            console.log(document.activeElement);
                            createTodo();
                        }
                        test();
                    }

            }




        });
    }*/

/*
    function createNewTaskAfter(elem) {
        elem.addEventListener('keydown', function (event) {
            /!*if (event.code === 'Enter') {
                createTodo();
            }*!/
            console.log(elem);


        })
    }
*/

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




