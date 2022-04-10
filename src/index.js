import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD6NVGvqE9w5yUd745aGpieGk34sAcmm0k",
  authDomain: "scam-form-firebase-9.firebaseapp.com",
  projectId: "scam-form-firebase-9",
  storageBucket: "scam-form-firebase-9.appspot.com",
  messagingSenderId: "269036197931",
  appId: "1:269036197931:web:78f8a85ada87719ba5726e",
};

//init firebase app
firebase.initializeApp(firebaseConfig);

//init service
const db = getFirestore();

//colection ref
const colRef = collection(db, "information");
// get collection data
getDocs(colRef).then((snapshot) => {
  console.log(snapshot.docs);
});
// get collection data
getDocs(colRef)
  .then((snapshot) => {
    let information = [];
    snapshot.docs.forEach((doc) => {
      information.push({ ...doc.data(), id: doc.id });
    });
    console.log(information);
  })
  .catch((err) => {
    console.log(err.message);
  });

// adding documents
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    // title: addBookForm.title.value,
    // author: addBookForm.author.value,
  }).then(() => {
    addBookForm.reset();
  });
});
// deleting documents
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "books", deleteBookForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});
