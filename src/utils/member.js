import { storage, db } from "../firebase-config";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, Timestamp, doc, setDoc,collection, query, where,getDocs } from "firebase/firestore";
import { ulid } from "ulid";

//upload image
const ImageUploader = async (loc, file) => {
  const fileName = ulid();
  const storageRef = ref(
    storage,
    loc + "/" + fileName + "." + file.name.split(".").pop()
  );

  // upload file to firestore
  return await uploadBytes(storageRef, file, { contentType: file.type }).then(
    (snapshot) => {
      return getDownloadURL(storageRef).then((url) => {
        console.log(url);
        return url;
      });
    }
  );
};

// Adds members
export const addMember = async (memberValue, profilePic, transactionPic) => {
  try {
    console.log("trying to add member");
    const eId = ulid();
    const rgistrationRef = doc(db, "registrations", eId);
    var q = query(
      collection(db, "registrations"),
      where("email", "==", memberValue.email)
    );
    await getDocs(q)
      .then(async (snapshot) => {
        if (snapshot.empty) {
          var profileUrl = await ImageUploader("images", profilePic);
          var transactionUrl = await ImageUploader(
            "transaction-images",
            transactionPic
          );
          await setDoc(
            rgistrationRef,
            {
              createdAt: Timestamp.fromDate(new Date()),
              ...memberValue,
              id: eId,
              profilePic: profileUrl,
              transactionPic: transactionUrl,
              isVerified: false,
              cardGenerated: false,
            },
            { capital: true },
            { merge: true }
          );
          return true;
        } else {
          console.log("Document with the same email exists");
          return false;
        }
      })
      .catch((err) => {
        console.log("Error getting documents", err);
        return false;
      });
      return true;
  } catch (error) {
    return false;
  }
};
