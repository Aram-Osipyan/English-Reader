import {FirebaseApp} from "./FirebaseApp";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

class Authenticator{
    _app;

    constructor() {
        // Initialize Firebase
        this._app = new FirebaseApp();
    }

    /**
     *
     * @param email {string}
     * @param password {string}
     * @returns {Promise<User>}
     */
    async signInWithEmailAndPassword(email, password){
        const auth = getAuth(this._app.getApp());
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response.user;
    }

    /**
     *
     * @param email {string}
     * @param password {string}
     * @returns {Promise<User>}
     */
    async createUserWithEmailAndPassword(email, password){
        const auth = getAuth(this._app.getApp());
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response.user;
    }
}

export {Authenticator}