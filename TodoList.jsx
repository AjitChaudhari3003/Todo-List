import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function TodoList() {
  const [todos, setTodos] = useState([{ task: "sample-task", id: uuidv4(), done: false }]);
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    const trimmedTask = newTask.trim();
    if (trimmedTask !== "") {
      setTodos([...todos, { task: trimmedTask, id: uuidv4(), done: false }]);
      setNewTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleMarkAllDone = () => {
    setTodos(todos.map((todo) => ({ ...todo, done: true })));
  };

  return (
    <div>
      <input
        placeholder="Add a task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <br />
      <br />
      <br />
      <hr />
      <h4>Tasks Todo</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => handleToggleDone(todo.id)}
            />
            {todo.done ? <del>{todo.task}</del> : todo.task} &nbsp; &nbsp; &nbsp;
            <button onClick={() => handleDeleteTask(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <br />
      <button onClick={handleMarkAllDone}>Mark All Done</button>
    </div>
  );
}
