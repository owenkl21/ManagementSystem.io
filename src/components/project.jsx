import React, { useState, useEffect, useMemo } from 'react';

export default function Project({ entry, deleteProject, isMobile }) {
  const [showTask, setShowTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [editedContent, setEditedContent] = useState({});

  // Parse the entry date
  const entryDate = new Date(entry.date);

  // Get today's date
  const today = new Date();

  // Calculate the difference in time (milliseconds)
  const timeDiff = entryDate.getTime() - today.getTime();

  // Convert time difference from milliseconds to days
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // Check if the entry date is in the past
  let message;
  if (daysLeft < 0) {
    message = 'This project deadline has passed.';
  } else if (daysLeft === 0) {
    message = 'This project is due today!';
  } else {
    message = `Time left until deadline: ${daysLeft} days.`;
  }

  // Define a unique key for each entry's tasks in localStorage
  const localStorageKey = useMemo(() => `tasks_${entry.id}`, [entry.id]);

  useEffect(() => {
    const savedTasks = localStorage.getItem(localStorageKey);

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      setTasks(parsedTasks); // This sets the tasks state
      setShowTask(parsedTasks.length > 0);
    } else {
      setTasks([]); // Explicitly set to an empty array if no tasks found
      setShowTask(false);
    }
  }, [localStorageKey]);

  function addTask() {
    const newTaskId = tasks.length + 1;
    const newTask = { id: newTaskId, content: `Task ${newTaskId}` };
    const updatedTasks = [...tasks, newTask];

    // Update the state with the new tasks first
    setTasks(updatedTasks);

    // Show tasks when a new one is added
    setShowTask(true);

    // Save updated tasks to localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
  }

  function deleteTask(taskId) {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    // If there are no tasks left after deletion, set showTask to false
    if (updatedTasks.length === 0) {
      setShowTask(false);
    }
    // Save updated tasks to localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
  }

  // Function to toggle edit mode for a specific task
  const toggleEditMode = (taskId) => {
    setEditMode((prevEditMode) => ({
      ...prevEditMode,
      [taskId]: !prevEditMode[taskId],
    }));
  };

  // Function to handle editing a task
  const handleEditTask = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, content: editedContent[taskId] || task.content }
        : task
    );
    setTasks(updatedTasks);
    setEditedContent((prevEditedContent) => {
      const newEditedContent = { ...prevEditedContent };
      delete newEditedContent[taskId]; // Clear the edited content for this task
      return newEditedContent;
    });
    // Save updated tasks to localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
    // Exit edit mode
    toggleEditMode(taskId);
  };

  return (
    <>
      <div className="flex flex-col justify-start items-center md:w-full m-0 w-screen">
        <h1 className="md:text-[3rem] font-bold text-stone-700 mt-[4rem] lg:mt-8 md:mt-0 mb-8  text-[2.5rem]">
          {entry.title}
        </h1>
        <div className="flex flex-col items-center bg-stone-600 p-8 text-stone-200 rounded md:w-[20rem] lg:w-[60rem]">
          <div className="flex flex-row bg-stone-200 mb-8 rounded">
            <p className="text-2xl text-center text-stone-700 p-3">
              {entry.description}
            </p>
          </div>

          <p className="text-xl"> {message} </p>
        </div>
        <div className="flex justify-end mt-8 md:w-[20rem] lg:w-[60rem] gap-3">
          <button
            onClick={addTask}
            className="px-4 py-2 justify-center items-center lg:text-base md:text-base sm:text-base w-[8rem] rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 flex flex-row space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
            <p>Add Task</p>
          </button>
          <button
            onClick={deleteProject}
            className=" px-4 py-2 justify-center lg:text-base md:text-base sm:text-base w-[10.5rem] border-2 rounded-md border-stone-400 text-stone-600 hover:border-stone-600 hover:text-stone-600 flex flex-row space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>
            <p>Delete Project</p>
          </button>
        </div>
        {showTask && (
          <div className=" flex flex-1 overflow-y-auto mt-8 ">
            <div className="">
              <ul className="bg-stone-500 md:w-[30rem] lg:w-[60rem] p-2 overflow-y-auto rounded gap-2 w-[22rem]">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="flex justify-between items-center p-2"
                  >
                    {editMode[task.id] ? (
                      <div>
                        <input
                          className="lg:w-64 md:w-60 w-[9rem] px-2 py-1 rounded-sm bg-stone-200"
                          type="text"
                          value={editedContent[task.id] || task.content}
                          onChange={(e) =>
                            setEditedContent((prevEditedContent) => ({
                              ...prevEditedContent,
                              [task.id]: e.target.value,
                            }))
                          }
                        />
                      </div>
                    ) : (
                      <div className="text-stone-200 ">{task.content}</div>
                    )}
                    <div className=" flex gap-2">
                      {editMode[task.id] ? (
                        // Display a Save button in edit mode
                        <button
                          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                          onClick={() => handleEditTask(task.id)}
                        >
                          Save
                        </button>
                      ) : (
                        // Display an Edit button in non-edit mode
                        <button
                          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                          onClick={() => toggleEditMode(task.id)}
                        >
                          Edit
                        </button>
                      )}
                      {isMobile ? (
                        <>
                          <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={() => deleteTask(task.id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                              />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
