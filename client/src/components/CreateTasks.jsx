import React, { useState } from "react";

const CreateTasks = ({ onClose, columnId, addTask, taskToEdit }) => {
  const [formData, setFormData] = useState({
    title: taskToEdit ? taskToEdit.name : "",
    priority: taskToEdit ? taskToEdit.priority : "",
    description: taskToEdit ? taskToEdit.description : "",
  });

  // Handle changes to form fields
  const handleChange = (event) => {
    const { name, value } = event.target; // Use event.target.name instead of 'title'
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    const newTask = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority, // Use the mapped enum value
    };

    addTask(columnId, newTask);
    onClose();
  };
  return (
    <div
      id="crud-modal"
      className={`fixed top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50`}
    >
      <div className="relative w-full max-w-md mx-auto dark:bg-gray-700 bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold dark:text-white text-black">Create New Task</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="name" // Corrected htmlFor attribute
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type Board name..."
                required
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="priority" // Corrected htmlFor attribute
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value="">Select Priority</option>
                <option value="Immediate">Immediate</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="description" // Corrected htmlFor attribute
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Task Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write task description here"
              ></textarea>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-400 border border-transparent rounded-md shadow-sm text-base font-medium text-black hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Add new Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTasks;
