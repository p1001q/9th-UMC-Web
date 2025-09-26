import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";
import { useTheme } from "../context/ThemeProvider";
import clsx from "clsx";

const TodoForm = () => {
  const [input, setInput] = useState<string>('');
  const { addTodo } = useTodo();
  const { theme } = useTheme();
  const isLight = theme === "LIGHT";

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();

    if (text) {
      addTodo(text);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className={clsx(
          "flex-1 px-3 py-2 rounded-md border transition-colors",
          isLight
            ? "bg-white text-black border-gray-300"
            : "bg-gray-700 text-white border-gray-600"
        )}
        placeholder="할 일 입력"
        required
      />
      <button
        type="submit"
        className={clsx(
          "px-4 py-2 rounded-md font-semibold transition-colors",
          isLight
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-green-700 text-white hover:bg-green-700"
        )}
      >
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;
