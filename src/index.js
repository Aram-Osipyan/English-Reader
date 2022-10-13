import {WordTranslator} from "./WordTranslator";


const translator = new WordTranslator();
translator.translate('cat')
    .then( data => {
        console.log(data,'data');
    })
    .catch(ex => {
        console.log(ex,'ex');
    });