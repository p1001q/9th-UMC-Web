import React from "react";

type Task = {
  id: number;
  text: string;
};

type Props = {
  task: Task;
  onAction: (task: Task) => void;
  actionLabel: string;
  actionColor: string;
};

function TaskItem({ task, onAction, actionLabel, actionColor }: Props) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button
        className="render-container__item-button"
        style={{ backgroundColor: actionColor }}
        onClick={() => onAction(task)}
      >
        {actionLabel}
      </button>
    </li>
  );
}

export default TaskItem;
