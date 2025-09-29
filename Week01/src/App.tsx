import React, { useState } from "react";
import "./style.css";
import TodoForm from "./components/TodoForm";
import TaskList from "./components/TaskList";

type Task = {
  id: number;
  text: string;
};

function App() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  //추가
  const addTodo = (text: string) => {
    setTodos([...todos, { id: Date.now(), text }]);
  };

  //완료
  const completeTask = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTasks([...doneTasks, task]);
  };

  //삭제
  const deleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>

      <TodoForm onAddTodo={addTodo} />

      <div className="render-container">
        <TaskList
          title="할 일"
          tasks={todos}
          onAction={completeTask}
          actionLabel="완료"
          actionColor="#28a745"
        />
        <TaskList
          title="완료"
          tasks={doneTasks}
          onAction={deleteTask}
          actionLabel="삭제"
          actionColor="#dc3545"
        />
      </div>
    </div>
  );
}

export default App;
