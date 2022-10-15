import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";

class FirebaseApp{
    _app;
    _analytics;
    _firebaseConfig = {
        apiKey: "api key",
        authDomain: "auth dpmain",
        projectId: "project id",
        storageBucket: "storage bucket",
        messagingSenderId: "id",
        appId: "app id",
        measurementId: "id"
    };
    constructor() {
        // Initialize Firebase
        this._app = initializeApp(this._firebaseConfig);
        this._analytics = getAnalytics(this._app);
    }

    getApp(){
        return this._app;
    }
    getAnalytics(){
        return this._analytics;
    }
}
export {FirebaseApp}