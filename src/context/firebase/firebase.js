import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  //*Register an User
  async register(name, email, password,prfileImage) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return await newUser.user.updateProfile({
      displayName: name,
      photoURL:prfileImage
    });
  }

  //*Login

  async login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async loginGoogle() {
    const provider = new app.auth.GoogleAuthProvider();

    await this.auth.signInWithPopup(provider);
  }
}

const firebase = new Firebase();

export default firebase;
