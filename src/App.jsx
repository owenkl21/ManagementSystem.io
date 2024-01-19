import React, { useState, useEffect } from 'react';
import SideBar from './components/sidebar';
import MainScreen from './components/mainScreen';
import InputScreen from './components/inputScreen';
import Project from './components/project';
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [newProject, setNewProject] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showProject, setShowProject] = useState(false);
  // Function to add new entries
  const onAdd = (newEntry) => {
    setEntries((prevEntries) => [...prevEntries, newEntry]);
  };

  useEffect(() => {
    if (entries.length > 0) {
      console.log('Saving to localStorage:', entries);
      localStorage.setItem('entries', JSON.stringify(entries));
    }
  }, [entries]);

  useEffect(() => {
    console.log('Attempting to retrieve entries from localStorage');
    const entriesString = localStorage.getItem('entries');
    console.log('Retrieved from localStorage:', entriesString); // Check what's actually retrieved
    if (entriesString) {
      setEntries(JSON.parse(entriesString));
    }
  }, []);

  useEffect(() => {
    console.log('Attempting to retrieve entries from localStorage');
    const entriesString = localStorage.getItem('entries');
    console.log('Retrieved from localStorage:', entriesString); // Check what's actually retrieved
    if (entriesString) {
      setEntries(JSON.parse(entriesString));
    }
  }, []);

  // Handle window resize to determine if the device is mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the state based on the current window size

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <main className="h-screen flex gap-0">
        {isMobile ? (
          <>
            {!showSidebar && (
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
            )}
            <div
              className={`sidebar fixed inset-y-0 left-0 w-75 z-20 transform ${
                showSidebar ? 'translate-x-0' : '-translate-x-full'
              } transition-transform duration-300 ease-in-out`}
            >
              {showSidebar && (
                <SideBar
                  entries={entries}
                  change={setNewProject}
                  closeSide={setShowSidebar}
                  setSelectedEntry={setSelectedEntry}
                  setShowProject={setShowProject}
                />
              )}
            </div>
            <div className="flex">
              {showProject ? (
                <>
                  <Project entry={selectedEntry} />
                </>
              ) : (
                <>
                  {newProject ? (
                    <InputScreen
                      onAdd={onAdd}
                      className="relative z-0"
                      close={setNewProject}
                      mobile={isMobile}
                    />
                  ) : (
                    <MainScreen change={setNewProject} />
                  )}
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <SideBar
              entries={entries}
              change={setNewProject}
              setSelectedEntry={setSelectedEntry}
              setShowProject={setShowProject}
            />
            {showProject ? (
              <>
                <Project entry={selectedEntry} />
              </>
            ) : (
              <>
                {newProject ? (
                  <InputScreen onAdd={onAdd} close={setNewProject} />
                ) : (
                  <MainScreen change={setNewProject} />
                )}
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default App;
