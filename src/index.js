import {WordTranslator} from "./WordTranslator";
import {Authenticator} from "./Authentificator";

const translator = new WordTranslator();
translator.translate('cat')
    .then( data => {
        console.log(data,'data');
    })
    .catch(ex => {
        console.log(ex,'ex');
    });

const authenticator = new Authenticator();

authenticator.signInWithEmailAndPassword('osipyan.aram2017@ya.ru', '1810200Aram')
    .then(_=> console.log('success'))
    .catch(error => {
        if (error.code === 'auth/email-already-in-use'){
            console.log('email already in use');
        }
    });

