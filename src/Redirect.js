import { FBApp } from "./firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const db = getFirestore(FBApp);
function Redirect() {
  const [oldlink, setOldlink] = useState("");
  const srtLink = useParams().srtlink;
  useEffect(() => {
    const getLink = async () => {
      const querySnapshot = await getDocs(collection(db, "Links"));
      if (querySnapshot.empty == false) {
        querySnapshot.forEach((doc) => {
          if (doc.data().srtLink == srtLink) {
            console.log(doc.data().Link);
            setOldlink(doc.data().Link);
            window.location.href = doc.data().Link;
          }
        });
      }
    };
    getLink();
  }, [srtLink]);

  return (
    <>
      <div>You are Currently being Redirected to : {oldlink}</div>
    </>
  );
}

export default Redirect;
