import React, { useEffect, useState, useRef } from 'react';

export default function InputScreen({ close, mobile, onAdd }) {
  // Step 1: Create a state variable for validation
  const [showValidationError, setShowValidationError] = useState(false);

  const title = useRef();
  const description = useRef();
  const date = useRef();

  // Load entries from localStorage when component mounts

  function handleChange() {
    close(false);
  }

  function handleSubmit() {
    // Step 2: Check if any input field is empty
    if (
      !title.current.value ||
      !description.current.value ||
      !date.current.value
    ) {
      // Step 3: Set the validation error state to true
      setShowValidationError(true);
      return; // Prevent further execution
    }
    // Prevent the default form submission behavior
    // e.preventDefault();
    // Add the new entry to the array of entries
    const newEntry = {
      id: Math.floor(Math.random() * 1000),
      title: title.current.value,
      description: description.current.value,
      date: date.current.value,
    };

    // Use onAdd to add the new entry to the entries in the parent component
    onAdd(newEntry);
    // Optionally, reset the input fields
    title.current.value = '';
    description.current.value = '';
    date.current.value = '';
  }

  function dialogClose() {
    setShowValidationError(false);
  }

  return (
    <>
      {showValidationError && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-stone-800 bg-opacity-90 text-stone-50">
          <div className="bg-white p-4 rounded-md">
            <h1 className="text-stone-700 flex items-center justify-center text-2xl">
              Validation Alert
            </h1>
            <p className="text-stone-500 flex items-center justify-center mt-4 mb-4">
              Please fill in all fields.
            </p>
            <div className="w-full flex justify-end">
              <button
                onClick={dialogClose}
                className="text-stone-500 flex  hover:bg-stone-700 hover:text-stone-50  rounded p-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {mobile ? (
        <>
          <div className="flex flex-col justify-center items-center gap-4 w-screen ">
            <div className="flex w-full  items-center justify-center ">
              <div className="flex flex-col gap-4 p-3 items-center justify-center w-full">
                <div className="lg:w-1/3 md:w-1/2 w-full">
                  <label className="text-sm font-bold uppercase text-stone-500">
                    Title
                  </label>
                  <input
                    className="w-full px-2 py-1 rounded-sm bg-stone-200"
                    type="text"
                    ref={title}
                  />
                </div>
                <div className="lg:w-1/3 md:w-1/2 w-full ">
                  <label className="text-sm font-bold uppercase text-stone-500">
                    Description
                  </label>
                  <textarea
                    className="w-full px-2 py-1 rounded-sm bg-stone-200"
                    ref={description}
                  ></textarea>
                </div>
                <div className="lg:w-1/3 md:w-1/2 w-full">
                  <label className="text-sm font-bold uppercase text-stone-500">
                    Due Date
                  </label>
                  <input
                    className="w-full px-2 py-1 rounded-sm bg-stone-200"
                    type="date"
                    ref={date}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-row  items-end lg:justify-end w-1/3 gap-2 md:justify-center">
              <button
                onClick={handleChange}
                className="relative overflow-hidden px-2 py-1 rounded-sm my-1 hover:text-stone-950 flex items-center justify-center"
              >
                <span>Cancel</span>
                <span className="underline-span"></span>
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-md  bg-stone-800 text-stone-50 hover:bg-stone-600 flex items-center justify-center"
              >
                Save
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center gap-4 w-screen ">
            <div className="flex flex-row  items-end lg:justify-end w-1/3 gap-2 md:justify-center">
              <button
                onClick={handleChange}
                className="relative overflow-hidden px-2 py-1 rounded-sm my-1 hover:text-stone-950 flex items-center justify-center"
              >
                <span>Cancel</span>
                <span className="underline-span"></span>
              </button>

              <button
                onClick={handleSubmit}
                className="px-6 py-2 rounded-md  bg-stone-800 text-stone-50 hover:bg-stone-600 flex items-center justify-center"
              >
                Save
              </button>
            </div>
            <div className="flex w-full  items-center justify-center ">
              <div className="flex flex-col gap-4 p-3 items-center justify-center w-full">
                <div className="lg:w-1/3 md:w-1/2 w-full">
                  <label className="text-sm font-bold uppercase text-stone-500">
                    Title
                  </label>
                  <input
                    className="w-full px-2 py-1 rounded-sm bg-stone-200"
                    type="text"
                    ref={title}
                  />
                </div>
                <div className="lg:w-1/3 md:w-1/2 w-full ">
                  <label className="text-sm font-bold uppercase text-stone-500">
                    Description
                  </label>
                  <textarea
                    ref={description}
                    className="w-full px-2 py-1 rounded-sm bg-stone-200"
                  ></textarea>
                </div>
                <div className="lg:w-1/3 md:w-1/2 w-full">
                  <label className="text-sm font-bold uppercase text-stone-500">
                    Due Date
                  </label>
                  <input
                    className="w-full px-2 py-1 rounded-sm bg-stone-200"
                    type="date"
                    ref={date}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
