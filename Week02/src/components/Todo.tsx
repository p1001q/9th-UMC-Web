import { useEffect, type JSX } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useTodo } from "../context/TodoContext";
import { useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

const Todo = (): JSX.Element => {
  const { todos, completeTodo, deleteTodo, doneTodos } = useTodo();
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className =
      theme === "LIGHT"
        ? "bg-gray-100 transition-colors duration-300"
        : "bg-gray-900 transition-colors duration-300";
  }, [theme]);

  return (
    <div
      className={clsx(
        "todo-container shadow-md rounded-lg p-4 transition-colors",
        theme === "LIGHT" ? "bg-white text-black" : "bg-gray-800 text-white"
      )}
    >
      <h1 className="todo-container__header font-bold text-2xl mb-4">YONG TODO</h1>
      <TodoForm />
      <div className="render-container grid grid-cols-2 gap-4">
        <TodoList
          title="할 일"
          todos={todos}
          buttonLabel="완료"
          buttonColor="#28a745"
          onClick={completeTodo}
        />
        <TodoList
          title="완료"
          todos={doneTodos}
          buttonLabel="삭제"
          buttonColor="#dc3545"
          onClick={deleteTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
