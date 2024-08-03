function App() {
  return (
    <>
      <div className="w-screen h-screen flex flex-col ">
        <div className="text-6xl font-bold text-center py-6 ">
          Url Shortener
        </div>

        <form
          type="submit"
          className="flex flex-col w-full  justify-center items-center gap-5  flex-1"
        >
          <div className="w-[85%] ">
            <input
              className="w-full border-black border rounded-lg px-2 py-4 focus:outline-none"
              placeholder="Paste Your Url Here"
              type="text"
            />
          </div>
          <div>
            <input
              className="border bg-red-300 px-4 py-2 rounded-full hover:bg-red-400 hover:text-white text-xl font-semibold"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
