import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, handleTaskUpdate }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          dueDate={task.dueDate}
          handleCheckboxChange={() => handleTaskUpdate(task.id, !task.completed)}
        />
      ))}
    </div>
  );
};

export default TaskList;