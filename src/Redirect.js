import { FBApp } from "./firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useParams } from "react";

const db = getFirestore(FBApp);
function Redirect() {
  const srtlink = useParams();
  useEffect(() => {
    const getLink = async () => {
      const querySnapshot = await getDocs(collection(db, "Links"));
      if (querySnapshot.empty == false) {
        querySnapshot.forEach((doc) => {
          if (doc.data().srtLink == srtlink) {
            window.location.href = doc.data().Link;
          }
        });
      }
    };
    getLink();
  }, [srtlink]);

  return <div>{srtlink}</div>;
}

export default Redirect;
