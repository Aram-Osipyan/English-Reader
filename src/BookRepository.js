import {FirebaseApp} from "./FirebaseApp";
import {Authenticator} from "./Authentificator";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import {getAuth} from "firebase/auth";

class BookRepository{
    _app;
    _db;
    _databasePath = "user-books";
    /**
     *
     * @param app {FirebaseApp}
     */
    constructor(app) {
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
        const books = await getDocs(collection(this._db, this._databasePath, getAuth().currentUser.uid, `books`));
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
        const auth = getAuth();
        await setDoc(doc(this._db, this._databasePath, auth.currentUser.uid), {
           uid: auth.currentUser.uid,
        });
        const docRef = await addDoc(collection(this._db, this._databasePath, auth.currentUser.uid,`books`), {
            name: name,
            text: text,
            author: author,
        });
        console.log("Document written with ID: ", docRef.id);
    }

    async delete(bookId){
        const docRef = doc(this._db, this._databasePath, getAuth().currentUser.uid, `books`, bookId);
        await deleteDoc(docRef);
    }
}
export {BookRepository}