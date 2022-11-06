import {WordTranslator} from "./WordTranslator";
import {Authenticator} from "./Authentificator";
import {FirebaseApp} from "./FirebaseApp";
import {BookRepository} from "./BookRepository";
import {WordRepository} from "./WordRepository";

const translator = new WordTranslator();
translator.translate('hello')
    .then( data => {
        console.log(data,'data');
    })
    .catch(ex => {
        console.log(ex,'ex');
    });


(async function(){
    const app = new FirebaseApp();
    const authenticator = new Authenticator(app);
    await authenticator.signInWithEmailAndPassword('aosipyan@sfedu.ru', '1810200Aram');
    const bookRepository = new BookRepository(authenticator, app);
    const wordRepository = new WordRepository(authenticator, app);

    //await wordRepository.add("hello", "привет", "halou");
    //await wordRepository.add("hello1", "привет1", "halou1");
    console.log(await wordRepository.get());

})().then(_=>{});
