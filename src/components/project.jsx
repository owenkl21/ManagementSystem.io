import { useState, useEffect } from 'react';

export default function Project({ entry }) {
  const [showTask, setShowTask] = useState(false);
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
    message = `Days left until deadline: ${daysLeft}`;
  }
  function taskShow() {
    setShowTask(true);
  }
  return (
    <>
      <div className="flex flex-col justify-start items-center  md:w-full  m-0 w-screen">
        <h1 className="md:text-[3rem] font-bold text-stone-700 mt-[4rem] lg:mt-8 md:mt-0 mb-8  underline text-[2.5rem]">
          {entry.title}
        </h1>
        <div className="flex flex-col items-center bg-stone-600 p-8 text-stone-200 rounded md:w-[20rem] lg:w-[60rem]">
          <div className="flex flex-row bg-stone-200  mb-8 rounded">
            <p className="text-2xl  text-center text-stone-700 p-3">
              {entry.description}
            </p>
          </div>

          <p className="text-xl"> {message} </p>
        </div>
        <div className="flex justify-end mt-8 md:w-[20rem] lg:w-[60rem]">
          <button
            onClick={taskShow}
            className="px-4 py-2 justify-center  lg:text-base md:text-base sm:text-base w-[8rem] rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 flex flex-row space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
              />
            </svg>

            <p> Add Task</p>
          </button>
        </div>
        {showTask && (
          <div className="p-8 h-screen">
            <div className=" bg-stone-400 md:w-[20rem] lg:w-[60rem] p-2 max-h-[70vh] overflow-y-auto   rounded">
              <ul>
                <li>3</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
