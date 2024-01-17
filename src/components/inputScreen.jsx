export default function InputScreen({ close }) {
  function handleChange() {
    close(false);
  }
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-4 w-screen ">
        <div className="flex flex-row  items-end lg:justify-end w-1/3 gap-2 md:justify-center">
          <button
            onClick={handleChange}
            className=" px-2 py-1 rounded-sm my-1  hover:font-bold"
          >
            Cancel
          </button>
          <button className="px-6 py-2 rounded-md  bg-stone-800 text-stone-50 hover:bg-stone-950 hover:font-bold">
            Save
          </button>
        </div>
        <div class="flex w-full  items-center justify-center ">
          <div class="flex flex-col gap-4 items-center justify-center w-full">
            <div class="lg:w-1/3 md:w-1/2">
              <label class="text-sm font-bold uppercase text-stone-500">
                Title
              </label>
              <input
                class="w-full px-2 py-1 rounded-sm bg-stone-200"
                type="text"
              />
            </div>
            <div class="lg:w-1/3 md:w-1/2 sm:w-full ">
              <label class="text-sm font-bold uppercase text-stone-500">
                Description
              </label>
              <textarea class="w-full px-2 py-1 rounded-sm bg-stone-200"></textarea>
            </div>
            <div class="lg:w-1/3 md:w-1/2 ">
              <label class="text-sm font-bold uppercase text-stone-500">
                Due Date
              </label>
              <input
                class="w-full px-2 py-1 rounded-sm bg-stone-200"
                type="date"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
