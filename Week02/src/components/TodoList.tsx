import type { JSX } from "react";
import type { TTodo } from "../types/todo";
import { useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

interface TodoListProps {
  title: string;
  todos: TTodo[];
  buttonLabel: string;
  buttonColor: string;
  onClick: (todo: TTodo) => void;
}

const TodoList = ({
  title,
  todos,
  buttonLabel,
  buttonColor,
  onClick,
}: TodoListProps): JSX.Element => {
  const { theme } = useTheme();

  return (
    <div
      className={clsx(
        "render-container__section p-4 rounded-lg transition-colors",
        theme === "LIGHT" ? "text-black" : "bg-gray-700 text-white"
      )}
    >
      <h2 className="render-container__title font-semibold mb-2">{title}</h2>
      <ul className="render-container__list space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={clsx(
              "render-container__item flex justify-between items-center p-2 rounded transition-colors",
              theme === "LIGHT"
                ? "bg-white text-black"
                : "bg-gray-600 text-white"
            )}
          >
            <span className="render-container__item-text">{todo.text}</span>
            <button
              onClick={(): void => onClick(todo)}
              style={{ backgroundColor: buttonColor }}
              className="render-container__item-button px-2 py-1 rounded text-white"
            >
              {buttonLabel}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
