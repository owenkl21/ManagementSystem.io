export default function MainScreen({ change }) {
  function handleChange() {
    change(true);
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-screen">
        <img
          className="w-16 h-16 object-contain mx-auto"
          src="../assets/no-projects.png"
          alt="logo"
        ></img>
        <h1 className="text-3xl font-bold text-stone-600 mb-2 uppercase">
          No Project Selected
        </h1>
        <h2 className="mb-8 font-bold  md:text-xl text-stone-400">
          Select a project or get started with one
        </h2>
        <button
          onClick={handleChange}
          className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-600"
        >
          Create new project
        </button>
      </div>
    </>
  );
}
