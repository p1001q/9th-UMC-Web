import React from "react";
import TaskItem from "./TaskItem";

type Task = {
  id: number;
  text: string;
};

type Props = {
  title: string;
  tasks: Task[];
  onAction: (task: Task) => void;
  actionLabel: string;
  actionColor: string;
};

function TaskList({ title, tasks, onAction, actionLabel, actionColor }: Props) {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onAction={onAction}
            actionLabel={actionLabel}
            actionColor={actionColor}
          />
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
