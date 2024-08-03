import { useState } from "react";
import { FBApp } from "./firebase";
import { getFirestore, collection, doc, addDoc } from "firebase/firestore";

const db = getFirestore(FBApp);

function App() {
  const [link, setLink] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const newDocRef = await addDoc(collection(db, "Links"), {
        Link: link,
        timestamp: new Date(),
      });
      setLink("");
      console.log(newDocRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <div className="text-6xl font-bold text-center py-6">Url Shortener</div>
        <form
          onSubmit={handlesubmit}
          className="flex flex-col w-full justify-center items-center gap-5 flex-1"
        >
          <div className="w-[85%]">
            <input
              value={link}
              className="w-full border-black border rounded-lg px-2 py-4 focus:outline-none"
              placeholder="Paste Your Url Here"
              type="url"
              onChange={(e) => setLink(e.target.value)}
              required
            />
          </div>
          <div>
            <button
              type="submit"
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
