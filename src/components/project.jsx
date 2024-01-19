import { useEffect } from 'react';

export default function Project({ entry }) {
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
      </div>
    </>
  );
}
