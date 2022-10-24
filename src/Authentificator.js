import {FirebaseApp} from "./FirebaseApp";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

class Authenticator{
    _app;
    _user;
    constructor(app = null) {
        // Initialize Firebase
        this._app = app ?? new FirebaseApp();
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
        this.setUser(response.user);
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
        this.setUser(response.user);
        return response.user;
    }

    /**
     * @private
     */
    setUser(user){
        this._user = user;
    }

    getUser(){
        return this._user;
    }
}

export {Authenticator}