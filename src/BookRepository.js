import {FirebaseApp} from "./FirebaseApp";
import {Authenticator} from "./Authentificator";
import { getFirestore, collection, addDoc, doc, setDoc, getDoc, getDocs, deleteDoc } from "firebase/firestore";
import {getAuth} from "firebase/auth";

class BookRepository{

    /**
     *
     * @private
     * @type{FirebaseApp}
     */
    _app;
    _db;
    _databasePath = "user-books";
    /**
     *
     * @param app {FirebaseApp}
     */
    constructor(app) {
        this._db = getFirestore(app.getApp());
        this._app = app;
    }


    generateBookObject(data, id) {
        return {data: data, id: id};
    }
    /**
     *
     * @returns {Promise<Array>}
     */
    async get(){
        const auth = getAuth(this._app.getApp());
        const books = await getDocs(collection(this._db, this._databasePath, auth.currentUser.uid, `books`));
        return books.docs.map(x => this.generateBookObject(x.data(), x.id));
    }

    async getSingle(bookId){
        const books = await this.get();
        console.log('books  tt',books);
        return books.filter(x => x.id === bookId)[0];
    }
    /**
     *
     * @param name{string}
     * @param text{string}
     * @param author{string}
     * @returns {Promise<void>}
     */
    async add(name, text, author){
        const auth = getAuth(this._app.getApp());
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