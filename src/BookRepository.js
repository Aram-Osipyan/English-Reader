import {FirebaseApp} from "./FirebaseApp";
import {Authenticator} from "./Authentificator";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";

class BookRepository{
    _app;
    _db;
    _authenticator;
    _databasePath = "user-books";
    /**
     *
     * @param auth {Authenticator}
     * @param app {FirebaseApp}
     */
    constructor(auth , app) {
        this._authenticator = auth ;
        this._db = getFirestore(app.getApp());
    }


    generateBookObject(data, id) {
        return {data: data, id: id};
    }
    /**
     *
     * @returns {Promise<Array>}
     */
    async get(){
        const books = await getDocs(collection(this._db, this._databasePath, this._authenticator.getUser().uid, `books`));
        return books.docs.map(x => this.generateBookObject(x.data(), x.id));
    }

    /**
     *
     * @param name{string}
     * @param text{string}
     * @param author{string}
     * @returns {Promise<void>}
     */
    async add(name, text, author){
            await setDoc(doc(this._db, this._databasePath,`${this._authenticator.getUser().uid}`), {
               uid: this._authenticator.getUser().uid,
            });
            const docRef = await addDoc(collection(this._db, this._databasePath, this._authenticator.getUser().uid,`books`), {
                name: name,
                text: text,
                author: author,
            });
            console.log("Document written with ID: ", docRef.id);
    }

    async delete(bookId){
        const docRef = doc(this._db, this._databasePath, this._authenticator.getUser().uid, `books`, bookId);
        await deleteDoc(docRef);
    }
}
export {BookRepository}