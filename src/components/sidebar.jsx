import { forwardRef } from 'react';

export default function SideBar({ change, closeSide, entries }) {
  function handleChange() {
    change(true);
    closeSide(false);
  }
  function handleClose() {
    closeSide(false);
  }

  return (
    <>
      <aside className="lg:w-1/5 px-8 py-8 bg-stone-900 text-stone-50 md:w-2/3 rounded-r-xl h-screen ">
        <div className="flex flex-row  justify-center items-center gap-1 pb-4 mb-4 border-b-2 sm:pb">
          <img
            src="../../src/assets/compLogo.png"
            alt="companyLogo"
            className="w-10 rounded-full"
          ></img>
          <header className=" border-stone-300 font-bold text-xl uppercase md:text-md ">
            Company Projects
          </header>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 lg:hidden md:hidden"
            onClick={handleClose}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>

        <button
          onClick={handleChange}
          className="px-4 py-2 justify-center  lg:text-base md:text-base sm:text-base w-full rounded-md bg-stone-700 text-stone-400 hover:bg-stone-600 hover:text-stone-100 flex flex-row space-x-1"
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
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <p> Add Project</p>
        </button>
        {entries.length > 0 && (
          <ul className="p-4 mt-4 rounded-md bg-stone-100">
            {entries.map((entry) => {
              return (
                <li
                  className="flex justify-between my-4 font-semibold text-stone-600 hover:bg-stone-600 hover:text-stone-50 hover:rounded p-3"
                  key={entry.id}
                >
                  {entry.title}
                </li>
              );
            })}
          </ul>
        )}
      </aside>
    </>
  );
}
