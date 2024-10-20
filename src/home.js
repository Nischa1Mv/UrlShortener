import { useState } from "react";
import { FBApp } from "./firebase";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { Codec } from "./shorturl";
const db = getFirestore(FBApp);

function Home() {
  const [link, setLink] = useState("");
  const [newlink, setNewlink] = useState("");
  const [copied, setcopied] = useState(false);
  const [hovered, setHovered] = useState(false);
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
      <div className="w-screen h-screen  flex lg:pt-0 pt-20 flex-col">
        <div className="text-3xl lg:text-6xl lg:mt-0 mt-10 font-bold text-center py-6">
          Url Shortener
        </div>
        <form
          onSubmit={handlesubmit}
          className="flex flex-col w-full justify-center items-center gap-5 lg:flex-1"
        >
          <div className="lg:w-[85%] w-full px-4">
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
              <div className="flex gap-2 lg:flex-row flex-col  lg:mt-6 mt-4  ">
                <div className="mb-2 lg:text-xl text-md font-semibold  ">
                  Shortened Link :{" "}
                </div>
                <div style={{ position: "relative", display: "inline-block" }}>
                  {copied && (
                    <div
                      className="lg:flex hidden"
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
                      if (event.ctrlKey) {
                        window.open(
                          `https://smolurll.vercel.app/${newlink}`,
                          "_blank"
                        );
                      } else {
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
                      }
                    }}
                    className="text-amber-600 font-bold lg:font-bold text-base lg:text-lg cursor-pointer hover:underline"
                    onMouseEnter={() => {
                      setHovered(true);
                    }}
                    onMouseLeave={() => {
                      setHovered(false);
                    }}
                  >
                    https://smolurll.vercel.app/{newlink}
                  </a>
                  {hovered && (
                    <>
                      <div
                        className="absolute px-4 font-medium text-white py-1 lg:flex hidden  rounded-lg"
                        style={{
                          background: "rgba(0, 0, 0, 0.2)",
                          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
                          backdropFilter: "blur(5.5px)",
                          WebkitBackdropFilter: "blur(5.5px)",
                          borderRadius: "4px",
                          border: "1px solid rgba(255, 255, 255, 0.18)",
                        }}
                      >
                        {" "}
                        Go to Link (ctrl+click){" "}
                      </div>
                    </>
                  )}
                </div>
                <div className="flex gap-4">
                  <button
                    className="px-2 py-1 border-black border-2 shadow lg:hidden"
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
                  >
                    Click to Copy
                  </button>
                  <svg
                    className="flex justify-center items-center"
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
                <div className="relative">
                  {copied && (
                    <div
                      className="flex lg:hidden text-nowrap text-white w-[80%] justify-center items-center"
                      style={{
                        position: "absolute",
                        top: "0",
                        left: "0",
                        backgroundColor: "rgba(128, 128, 128, 0.8)",
                        padding: "2px",
                        borderRadius: "3px",
                      }}
                    >
                      Link is copied to Clipboard!
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default Home;
