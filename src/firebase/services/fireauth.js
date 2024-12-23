import { auth } from '@/firebase/firebase';

export class Fireauth{

     //Sign In existing user
     async signIn(email, password) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            throw error;
        }
    }

    //Sign Up new user
    async signUp(email, password) {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            throw error;
        }
    }

    //Sign in using Google
    async signInWithGoogle() {
        try {
            const provider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(userCredential);
            const token = credential.accessToken; //Use for google api calls???
            const user = userCredential.user;
            console.log(user);
        } catch (error) {
            throw error;
        }
    }
}

const fireauth = new Fireauth();

export default fireauth;