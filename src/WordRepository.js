import {FirebaseApp} from "./FirebaseApp";
import {Authenticator} from "./Authentificator";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";

class WordRepository{
    _app;
    _db;
    _authenticator;
    _databasePath = "user-words";
    /**
     *
     * @param auth {Authenticator}
     * @param app {FirebaseApp}
     */
    constructor(auth , app) {
        this._authenticator = auth ;
        this._db = getFirestore(app.getApp());
    }

    async add(source, translation, transcription){
        await setDoc(doc(this._db, this._databasePath,`${this._authenticator.getUser().uid}`), {
            uid: this._authenticator.getUser().uid,
        });
        const docRef = await addDoc(collection(this._db, this._databasePath, this._authenticator.getUser().uid,`words`), {
            source: source,
            translation: translation,
            transcription: transcription,
        });
        console.log("Document written with ID: ", docRef.id);
    }

    async get(){
        const localDictionary = await getDocs(collection(this._db, this._databasePath, this._authenticator.getUser().uid, `words`));
        //console.log(localDictionary.docs.map(x=>x.data()));
        return localDictionary.docs.map(x=>x.data());
    }
}
export {WordRepository}