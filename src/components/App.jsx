import { useContext, useState, useRef, useId } from "react";
import { TaskContext } from "../context/TaskContext";

const App = () => {
  const { tasks, addTask, toggleTask } = useContext(TaskContext);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);
  const taskInputId = useId();

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Task Manager</h1>

      {/* Search Input */}
      <div className="search-section">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          id={taskInputId}
          type="text"
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Task List */}
      <div className="task-list">
        {filteredTasks.map((task) => (
          <div key={task.id} className="task-item">
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}
            </span>
            <button
              data-testid={task.id}
              onClick={() => toggleTask(task.id)}
            >
              {task.completed ? "Undo" : "Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;