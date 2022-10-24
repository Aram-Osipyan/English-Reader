import {WordTranslator} from "./WordTranslator";
import {Authenticator} from "./Authentificator";
import {FirebaseApp} from "./FirebaseApp";
import {BookRepository} from "./BookRepository";

const translator = new WordTranslator();
translator.translate('cat')
    .then( data => {
        console.log(data,'data');
    })
    .catch(ex => {
        console.log(ex,'ex');
    });
const app = new FirebaseApp();
const authenticator = new Authenticator(app);

authenticator.signInWithEmailAndPassword('osipyan.aram2017@ya.ru', '1810200Aram')
    .then(_=> {
        console.log('success');
        const bookRepository = new BookRepository(authenticator, app);

        bookRepository.get()
            .then(res => {
                console.log(res);
            });
        //bookRepository.add("Kings", "hello ww fkjgfj", "Author").then(_=>{});
        bookRepository.delete("5zSGlPQXUlwYB4jPeZ3S").then(_=>{console.log("book is deleted")});
    })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use'){
            console.log('email already in use');
        }
        console.log(error, 'error index.js');
    });

