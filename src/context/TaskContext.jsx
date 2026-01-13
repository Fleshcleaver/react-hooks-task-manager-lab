import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Fetch initial tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async (title) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed: false }),
      });
      const newTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    try {
      const taskToToggle = tasks.find((task) => task.id === id);
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...taskToToggle,
          completed: !taskToToggle.completed,
        }),
      });
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};