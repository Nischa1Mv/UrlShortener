import { useState } from "react";
import { FBApp } from "./firebase";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { Codec } from "./shorturl";
const db = getFirestore(FBApp);

function Home() {
  const [link, setLink] = useState("");
  const [newlink, setNewlink] = useState("");
  const [copied, setcopied] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    let isfound = false;
    const querySnapshot = await getDocs(collection(db, "Links"));
    if (querySnapshot.empty == false) {
      querySnapshot.forEach((doc) => {
        if (doc.data().Link == link) {
          setNewlink(doc.data().srtLink);
          console.log("found");
          isfound = true;
          return;
        }
      });
    }
    if (!isfound) {
      console.log("not found");

      const codec = new Codec();
      const srtLink = codec.encode(link).slice(-6);

      // console.log(codec.encode(link));
      // console.log(codec.decode(codec.encode(link)));

      try {
        const newDocRef = await addDoc(collection(db, "Links"), {
          Link: link,
          srtLink: srtLink,
          timestamp: new Date(),
        });
        setLink("");
        setNewlink(srtLink);
        // console.log(srtLink);

        // console.log(newDocRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
          {newlink ? (
            <>
              {" "}
              <div className="flex gap-2">
                <div className="mb-2 text-xl font-semi ">Shortened Link : </div>
                <div style={{ position: "relative", display: "inline-block" }}>
                  {copied && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-30px",
                        left: "0",
                        backgroundColor: "rgba(128, 128, 128, 0.8)",
                        padding: "2px",
                        borderRadius: "3px",
                      }}
                    >
                      Link copied!
                    </div>
                  )}
                  <a
                    onClick={(event) => {
                      event.preventDefault();
                      navigator.clipboard
                        .writeText(`https://smolurll.vercel.app/${newlink}`)
                        .then(() => {
                          setcopied(true);
                          setTimeout(() => {
                            setcopied(false);
                          }, 2000);
                        })
                        .catch((error) => {
                          console.error("Failed to copy: ", error);
                        });
                    }}
                    className="text-amber-600 font-bold text-lg"
                    href={`https://smolurll.vercel.app/${newlink}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://smolurll.vercel.app/{newlink}
                  </a>
                </div>
                <svg
                  cursor={"pointer"}
                  onClick={(event) => {
                    event.preventDefault();
                    navigator.clipboard
                      .writeText(`https://smolurll.vercel.app/${newlink}`)
                      .then(() => {
                        setcopied(true);
                        setTimeout(() => {
                          setcopied(false);
                        }, 2000);
                      })
                      .catch((error) => {
                        console.error("Failed to copy: ", error);
                      });
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
                </svg>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default Home;
