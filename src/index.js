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
initializeApp(firebaseConfig);

//init service
const db = getFirestore();
console.log("DB", db);
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
    console.log("information", information);
  })
  .catch((err) => {
    console.log(err.message);
  });

// adding documents
const addInforForm = document.querySelector(".add");
addInforForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    account_number: addInforForm.account_number.value,
    email: addInforForm.email.value,
    name: addInforForm.name.value,
    phone_number: addInforForm.phone_number.value,
    year_of_birth: addInforForm.year_of_birth.value,
  }).then(() => {
    alert("Thành công");
    addInforForm.reset();
  });
});

// upload image

function uploadImage() {
  const ref = firebase.storage().ref();
  const file = document.querySelector("#photo").files[0];
  const name = new Date() + "-" + file.name;
  const metadata = {
    contentType: file.type,
  };

  const task = ref.child(name).put(file, metadata);
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      console.log("URL:", url);
      alert("Image Upload Successful");
      const image = document.querySelector("#image");
      image.src = url;
    });
}

// deleting documents
// const deleteInforForm = document.querySelector(".delete");
// deleteInforForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   const docRef = doc(db, "information", deleteInforForm.id.value);
//   deleteDoc(docRef).then(() => {
//     deleteInforForm.reset();
//   });
// });
