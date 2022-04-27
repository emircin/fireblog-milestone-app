import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onValue, remove, update } from "firebase/database";
import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { noatifyDelete, noatifyNewTag, noatifySuccess } from "./toastNotify";

const app = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  databaseURL: process.env.REACT_APP_FIREBASE_databaseURL,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,

});

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const signup = async (email, password, navigate) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/")
    console.log(userCredential);
  } catch (err) {
    alert(err.message);
  }
};


export const login = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/")
    console.log(userCredential);
    noatifySuccess("Logged in Successfully")
  } catch (err) {
    alert(err.message);
  }
};


export const signOutUser = (navigate) => {

  signOut(auth)
  .then(() => { 
    navigate("/login")
    noatifyDelete("Logged out")
   })
  .catch((error) => {
  console.log(error);
  });
};

export const loginWithGoogle = (navigate) => {

  
  googleProvider.setCustomParameters({ prompt: "select_account" });
  signInWithPopup(auth, googleProvider)
    .then(() => {
       navigate("/")
       noatifySuccess("Logged in Successfully")
       })
    .catch((error) => {
      console.log(error);
    });
};
export const SendInfo = (initialTag) => {
  
  const db = getDatabase();
  const userRef = ref(db, "tags");
  const newUserRef = push(userRef);
  set(newUserRef, {
    title: initialTag.title,
    userEmail: initialTag.userEmail,
    imageUrl: initialTag.imageUrl,
    contentText: initialTag.contentText,
    date: initialTag.date,
  });
  noatifyNewTag("New Blog Added")
};

export const useFetch = () => {

  const [isLoading, setIsLoading] = useState();
  const [tagList, setTagList] = useState();
  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();
    const userRef = ref(db, "tags");

    onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        const tagsArr=[]
        for(let id in data) {
            tagsArr.push({id, ...data[id]})
        }
        setTagList(tagsArr);
        setIsLoading(false);
  });
}, []);
return{isLoading, tagList}

};

export const UserDelete = (id) => {
  const db = getDatabase();
  const userRef = ref(db, "tags");
  console.log(userRef)
  remove(ref(db, `tags/${id}`))
  noatifyDelete("Blog is Deleted")
}

export const EditUser = (tag) =>{
  console.log(tag.id)
  const db = getDatabase();
  const updates = {};

  updates[`tags/${tag.id}`]=tag;
  noatifyNewTag("Blog is Updated")
  return update(ref(db),updates);
  
}
