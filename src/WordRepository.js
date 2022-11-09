import {FirebaseApp} from "./FirebaseApp";
import {Authenticator} from "./Authentificator";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import {getAuth} from "firebase/auth";

class WordRepository{
    _app;
    _db;
    _databasePath = "user-words";
    /**
     *
     * @param app {FirebaseApp}
     */
    constructor(app) {
        this._db = getFirestore(app.getApp());
    }

    async add(source, translation, transcription){
        const auth = getAuth();
        await setDoc(doc(this._db, this._databasePath, auth.currentUser.uid), {
            uid: auth.currentUser.uid,
        });
        const docRef = await addDoc(collection(this._db, this._databasePath, auth.currentUser.uid,`words`), {
            source: source,
            translation: translation,
            transcription: transcription,
        });
        console.log("Document written with ID: ", docRef.id);
    }

    async get(){
        const localDictionary = await getDocs(collection(this._db, this._databasePath, getAuth().currentUser.uid, `words`));
        //console.log(localDictionary.docs.map(x=>x.data()));
        return localDictionary.docs.map(x => x.data());
    }
}
export {WordRepository}