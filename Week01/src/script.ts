<<<<<<< HEAD
// 1. HTML 요소 선택 (핸드북 JS편 참고)
=======
// HTML 요소 선택
>>>>>>> 1b0ce6b ([Week03] 실습1 - 리액트 라우터 없이 SPA 제작 완료)
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

<<<<<<< HEAD
// 2. 할 일이 어떻게 생긴 애인지 type을 정의
type Todo = {
    id: number;
    text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

// - 할 일 목록 렌더링 하는 함수를 정의
const renderTasks = (): void => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo) : void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    })

    doneTasks.forEach((todo) : void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    })
};

// 3. 할 일 텍스트 입력 처리 함수 (공백 잘라줌) 사용자가 앞에 띄어쓰기를 쓴다면? 필요없는 공백 trim
const getTodoText = (): string => {
    return todoInput.value.trim();
}

// 4. 할 일 추가 처리 함수
const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text });
    todoInput.value = '';
    renderTasks();
}

// 5. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo: Todo) : void => {
    todos = todos.filter((t) : boolean => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
}

// 6. 완료된 할 일 삭제 함수
const deleteTodo = (todo: Todo) : void => {
    doneTasks = doneTasks.filter((t) : boolean => t.id !== todo.id);
    renderTasks();
}

// 7. 할 일 아이템 생성 함수 (완료 여부에 따라 버튼 텍스트나 색상 설정)
const createTodoElement = (todo: Todo, isDone: boolean) : HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent = todo.text;    

    const button = document.createElement('button');
    button.classList.add('render-container__item-button');

    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    } else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
    }

    button.addEventListener('click', ():void => {
        if (isDone) {
            deleteTodo(todo);
        } else {
            completeTodo(todo);
        }
    });

    li.appendChild(button);
    return li;
}

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event) : void => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
})

renderTasks();

 
=======
// 할 일 및 완료된 작업을 저장할 배열
type Task = {
  id: number;
  text: string;
};

let todos: Task[] = [];
let doneTasks: Task[] = [];

// 할 일 텍스트 입력 처리 함수
const getTodoText = (): string => {
  return todoInput.value.trim();
};

// 할 일 추가 함수
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  console.log(todos);
  todoInput.value = '';
  renderTasks();
};

// 할 일 상태 변경 (완료로 이동)
const completeTask = (task: Task): void => {
  todos = todos.filter((t) => t.id !== task.id);
  doneTasks.push(task);
  renderTasks();
};

// 완료된 할 일 삭제 함수
const deleteTask = (task: Task): void => {
  doneTasks = doneTasks.filter((t) => t.id !== task.id);
  renderTasks();
};

// 할 일 아이템 생성 함수
const createTaskElement = (task: Task, isDone: boolean): HTMLLIElement => {
  const li = document.createElement('li');
  li.classList.add('render-container__item');
  li.textContent = task.text;

  const button = document.createElement('button');
  button.classList.add('render-container__item-button');

  // 완료 여부에 따른 버튼 텍스트 및 색상 설정
  if (isDone) {
    button.textContent = '삭제';
    button.style.backgroundColor = '#dc3545'; // 빨간색 (삭제)
  } else {
    button.textContent = '완료';
    button.style.backgroundColor = '#28a745'; // 초록색 (완료)
  }

  button.addEventListener('click', () => {
    if (isDone) {
      deleteTask(task);
    } else {
      completeTask(task);
    }
  });

  li.appendChild(button);
  return li;
};

// 할 일 목록 렌더링 함수
const renderTasks = (): void => {
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  todos.forEach((task) => {
    const li = createTaskElement(task, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((task) => {
    const li = createTaskElement(task, true);
    doneList.appendChild(li);
  });
};

// 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

// 초기 렌더링
renderTasks();

>>>>>>> 1b0ce6b ([Week03] 실습1 - 리액트 라우터 없이 SPA 제작 완료)
