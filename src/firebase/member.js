import { storage, firestore } from "./init";
import { doc, addDoc, collection, runTransaction } from "firebase/firestore";
import { ref } from "firebase/storage";

// Adds members
export const addMember = async (memberValue, profilePic, transactionPic) => {
  const email_id = memberValue.email;
  delete memberValue.email;
  const memberDoc = doc(firestore, "members", email_id);

  // Running transaction to check if member already exists
  await runTransaction(firestore, async (transaction) => {
    const member = await transaction.get(memberDoc);
    if (member.exists()) {
      throw new Error("Member already exists");
    }

    transaction.set(memberDoc, memberValue);
  }).then(async () => {
    // Upload Images:
    const memberImageRef = ref(storage, `members/profile/${email_id}`);
    const transactionImageRef = ref(storage, `members/transaction/${email_id}`);
    // Uploading
    await Promise.all([
      memberImageRef.put(profilePic),
      transactionImageRef.put(transactionPic),
    ]);
  });
};
