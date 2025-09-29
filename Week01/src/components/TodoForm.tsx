import React, { useState } from "react";
import type { FormEvent } from "react";

type Props = {
  onAddTodo: (text: string) => void;
};

function TodoForm({ onAddTodo }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTodo(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
}

export default TodoForm;
