(function() {

  // создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // создаем и возвращаем форму ввода для создания дела и кнопку "добавить дело"
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.disabled = true;
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };
  }

  // создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group', 'mb-3');
    return list;
  }

  // создаем и возвращаем кнопку очистки списка дел и из localStorage. навешиваем на нее события при нажатии
  function createBlankListBtn() {
    let blankListButtonWrapper = document.createElement('div');
    let blankListButton = document.createElement('button');
    blankListButton.classList.add('btn', 'btn-info', 'btn-lg', 'btn-block');
    blankListButton.textContent = 'Очистить список дел';

    blankListButtonWrapper.append(blankListButton);
    return {
      blankListButton,
      blankListButtonWrapper
    };
  }

  // создаем область для дела и две кнопки
  function createTodoItem(work) {
    let item = document.createElement('li');
    // кнопки помещаем в элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    // устанавливаем стили для элемента списка, а также для размещения кнопок
    // в его правой части с помощью Flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', "align-items-center");


    // проверяем выполнено ли уже это дело, и если выполнено красим его в зеленый
    if (work.done == true) {
      item.classList.add('list-group-item-success');
    }

    item.textContent = work.name; //+ '   Id:' + work.id + '   done: ' + work.done;

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    // вкладываем кнопки в отдельный элемент, чтобы они объединилвись в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    // приложению нужет доступ к самому жлементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  // создаем функцию для добавления дел в localStorage
  function saveTodoList(todoList, listName) {
    localStorage.setItem(listName, JSON.stringify(todoList));
  }

  //
  function createTodoApp(container, title, listName) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();
    let todoBlankListBtn = createBlankListBtn();
    let allTasks = [];

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);
    container.append(todoBlankListBtn.blankListButtonWrapper);

    todoBlankListBtn.blankListButton.addEventListener('click', function() {
      if (confirm('Вы уверены, что хотите удалить весь список дел?')) {
        while (todoList.firstChild) {
          todoList.removeChild(todoList.firstChild);
        }
      }
        //удаляем все дела из массива дел
      allTasks.splice(0);
      saveTodoList(allTasks, listName);
    });

    // проверяем есть ли в localStorage данные, если есть то генерим из него список
    if (localStorage.getItem(listName)) {
      allTasks = JSON.parse(localStorage.getItem(listName));
      allTasks.forEach(name => {
        console.log(name);
        // let oldWork = name;
        let oldTodoItem = createTodoItem(name);

        // добавляем обработчики на кнопки
        oldTodoItem.doneButton.addEventListener('click', function() {
          oldTodoItem.item.classList.toggle('list-group-item-success');
          let task = allTasks.findIndex(item => item.id == name.id);
          if (allTasks[task].done == true) {
            allTasks[task].done = false;
          } else {
            allTasks[task].done = true;
          }
          saveTodoList(allTasks, listName);
        });

        oldTodoItem.deleteButton.addEventListener('click', function() {
          if (confirm('Вы уверены?')) {
            oldTodoItem.item.remove();
            // ищем и удаляем дело из массива дел
            let task = allTasks.findIndex(item => item.id == name.id);
            allTasks.splice(task, 1);
          }
          saveTodoList(allTasks, listName);
        });

        todoList.append(oldTodoItem.item);
      });
    }

    // делаем кнопку ввода активной, при появлении в полее ввода сивмоволов, и наоборот
    todoItemForm.input.addEventListener('input', function disableBtn() {
      if (!todoItemForm.input.value) {
        todoItemForm.button.disabled = true;
      } else {
        todoItemForm.button.disabled = false;
      }
    });

    // браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function(e) {
      // эта строчка необходима, чтобы предотвратить стандартное действие браузера
      // в данном случае мы не хотим, чтбы страница перезагружалась при отправке формы
      e.preventDefault();

      // игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      // добавляем то, что написано в форме и кнопки
      let work = {id: Math.random(), name: todoItemForm.input.value, done: false};
      let todoItem = createTodoItem(work);

      // добавляем обработчики на кнопки
      todoItem.doneButton.addEventListener('click', function() {
        todoItem.item.classList.toggle('list-group-item-success');
        let task = allTasks.findIndex(item => item.id == work.id);
        if (allTasks[task].done == true) {
          allTasks[task].done = false;
        } else {
          allTasks[task].done = true;
        }
        saveTodoList(allTasks, listName);
      });

      todoItem.deleteButton.addEventListener('click', function() {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          // ищем и удаляем дело из массива дел
          let task = allTasks.findIndex(item => item.id == work.id);
          allTasks.splice(task, 1);
        }
        saveTodoList(allTasks, listName);
      });

      // создаем и добавляем в список новое дело с названием из поля для ввода
      allTasks.push(work);
      saveTodoList(allTasks, listName);
      todoList.append(todoItem.item);
      console.log(allTasks);
      console.log(JSON.parse(localStorage.getItem(listName)));


      // обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = '';

      // деалаем кнопку неактивной, так как все содержимое инпута стерлось
      todoItemForm.button.disabled = true;
    });
  }
  window.createTodoApp = createTodoApp;
})();
