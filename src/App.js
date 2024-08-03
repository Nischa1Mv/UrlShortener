
import { db } from "./firebase";
function App() {
  const Form = document.getElementById("Form");
  Form.addEventListener("submit", (event) => {
    event.preventDefault();
    const link = document.getElementById("link");
    db.collection("users")
      .add({
        Link: link,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  });

  return (
    <>
      <div className="w-screen h-screen flex flex-col ">
        <div className="text-6xl font-bold text-center py-6 ">
          Url Shortener
        </div>
        <form
          id="Form"
          className="flex flex-col w-full  justify-center items-center gap-5  flex-1"
        >
          <div className="w-[85%] ">
            <input
              id="link"
              className="w-full border-black border rounded-lg px-2 py-4 focus:outline-none"
              placeholder="Paste Your Url Here"
              type="text"
            />
          </div>
          <div>
            <button
              type="sumbit"
              className="border bg-red-300 px-4 py-2 rounded-full hover:bg-red-400 hover:text-white text-xl font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
export default App;
