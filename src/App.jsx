import SideBar from './components/sidebar';
import MainScreen from './components/mainScreen';
import InputScreen from './components/inputScreen';
import React, { useState, useEffect } from 'react';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [newProject, setNewProject] = useState(false);
  const [addProject, setAddProject] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  function openSide() {
    setShowSidebar(true);
  }
  return (
    <>
      <main className="h-screen flex gap-0">
        {isMobile ? (
          <>
            {!showSidebar ? (
              <button
                className="toggle-button fixed z-30 rounded-full bg-stone-800 text-stone-50 m-1 p-2 top-1 left-1"
                onClick={() => setShowSidebar(true)}
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
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </button>
            ) : (
              ''
            )}
            {/* <div
              className={`absolute inset-0 transition-opacity duration-300 ease-linear `}
              onClick={() => setShowSidebar(false)}
            ></div> */}
            <div
              className={`sidebar fixed inset-y-0 left-0 w-75  z-20 transform ${
                showSidebar ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out`}
            >
              {showSidebar && (
                <SideBar change={setNewProject} closeSide={setShowSidebar} />
              )}
            </div>
            <div className=" flex">
              {newProject ? (
                <InputScreen
                  className="relative z-0"
                  close={setNewProject}
                  add={setAddProject}
                />
              ) : (
                <MainScreen change={setNewProject} />
              )}
            </div>
          </>
        ) : (
          <>
            <SideBar change={setNewProject} />
            {newProject ? (
              <InputScreen close={setNewProject} add={setAddProject} />
            ) : (
              <MainScreen change={setNewProject} />
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
