import { FBApp } from "./firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const db = getFirestore(FBApp);
function Redirect() {
  const srtLink = useParams().srtlink;
  useEffect(() => {
    const getLink = async () => {
      const querySnapshot = await getDocs(collection(db, "Links"));
      if (querySnapshot.empty == false) {
        querySnapshot.forEach((doc) => {
          if (doc.data().srtLink == srtLink) {
            console.log(doc.data().Link);
            window.location.href = doc.data().Link;
          }
        });
      }
    };
    getLink();
  }, [srtLink]);

  return <></>;
}

export default Redirect;
