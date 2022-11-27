import {WordTranslator} from "../src/WordTranslator";
import {BookRepository} from "../src/BookRepository";
import {FirebaseApp} from "../src/FirebaseApp";
import {WordRepository} from "../src/WordRepository";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {Authenticator} from "../src/Authentificator";
import {fetchComponent} from "../src/ComponentFetching";

const header = document.getElementById('header');
fetchComponent(header, '../NavMenu/NavMenu.html');
/**
 *
 * @param text{string}
 */
function generateReader(text){
    const splittedText = text.split(/[ .:;?!~,`"&|()<>{}\[\]\r\n/\\]+/).filter(x => x !== '')
        .map(x => {
            const elem = document.createElement('div');
            elem.classList.add('dropdown');
            const dropdown_trigger = document.createElement('div');
            dropdown_trigger.classList.add('dropdown-trigger');

            const button = document.createElement('div');
            button.classList.add('button', 'is-inverted', 'is-primary');
            button.setAttribute('aria-haspopup', 'true');
            button.setAttribute('aria-controls', 'dropdown-menu2');
            const span = document.createElement('span');
            span.innerText = x;


            button.appendChild(span);
            dropdown_trigger.appendChild(button);
            elem.appendChild(dropdown_trigger);

            const dropdown_menu = document.createElement('div');
            dropdown_menu.classList.add('dropdown-menu');
            dropdown_menu.setAttribute('role', 'menu');

            const dropdown_content = document.createElement('div');
            dropdown_content.classList.add('dropdown-content');

            const dropdown_item = document.createElement('div');
            dropdown_item.classList.add('dropdown-item');

            //dropdown_item.appendChild(generateDropdownContent(x))
            dropdown_content.appendChild(dropdown_item);
            dropdown_menu.appendChild(dropdown_content);
            elem.appendChild(dropdown_menu);
            const lenWords = 0.5;
            button.setAttribute("style",`padding-right: 2px; padding-left:1px`);
            //span.setAttribute('style', "color:black");
            span.classList.add('has-text-black');

            button.onclick = async function (){
                elem.classList.toggle('is-active',elem.classList.length !== 2);
                const translation = await getTranslation(x);
                const content = await generateTranslationContent(translation);
                dropdown_item.innerHTML = '';
                dropdown_item.appendChild(content);
                const addToDicBtn = document.createElement('button');
                addToDicBtn.classList.add('button', 'is-primary');
                addToDicBtn.setAttribute('style', 'background-color:#D3D3D3;');
                addToDicBtn.innerText = 'add to dictionary';
                addToDicBtn.onclick = async function (){
                    if (!addToDicBtn.classList.contains('is-loading')){
                        addToDicBtn.classList.add('is-loading');
                        await addToDictionary(translation);
                        addToDicBtn.classList.remove('is-loading');
                        elem.classList.toggle('is-active',elem.classList.length !== 2);
                    }
                }
                dropdown_item.appendChild(addToDicBtn);
                //dropdown_item.appendChild()
                //console.log();
                console.log('x', x)
            }
            return elem;
        });

    return splittedText;
}

/**
 *
 * @param translation {{transcription : string, translation : string, text : string}}
 * @returns {Promise<HTMLParagraphElement>}
 */
async function generateTranslationContent(translation){
    const p = document.createElement('p');
    p.innerHTML =  `<b>${translation.text}</b> [${translation.transcription}] - ${translation.translation}`;
    return p;
}

/**
 *
 * @param word {string}
 * @returns {Promise<{transcription: *, translation, text}>}
 */
async function getTranslation(word){
    const translator = new WordTranslator();
    const translation = await translator.translate(word);

    return {
        translation : translation.def[0].tr[0].text,
        transcription : translation.def[0].ts,
        text : translation.def[0].text,
    }
}

function getBookIdFromPath(){
    const search = document.location.search.substring(1);
    const params = search.split('&').map(param => {
        const splitted = param.split('=');
        return {key : splitted[0], value : splitted[1]};
    });
    const bookId = params.filter(x => x.key === 'book-id')[0];
    console.log('bookId', bookId);
    if (bookId !== undefined){
        return bookId.value;
    }
}

async function addToDictionary(translation){
    const app = new FirebaseApp();
    const wordRepository = new WordRepository(app);
    await wordRepository.add(translation.text, translation.translation, translation.transcription);
}

window.onload = (event) => {
    const bookId = getBookIdFromPath();
    const app = new FirebaseApp();
    const bookRepository = new BookRepository(app);
    const auth = getAuth(app.getApp());
    const textDiv = document.getElementById('textDiv');
    const titleNode = document.getElementById('title');
    const subtitleNode = document.getElementById('subtitle');
    onAuthStateChanged(auth, async (user) => {
        if (user){
            const book = await bookRepository.getSingle(bookId);
            if(book.data){
                const text = generateReader(book.data.text);
                textDiv.append(...text);
                titleNode.innerText = book.data.name;
                subtitleNode.innerText = book.data.author;
            }

        }
    })
};

document.addEventListener('click', (event) => {
    const dropdowns = document.getElementsByClassName('dropdown');
    for (const dropdown of dropdowns) {
        if (!event.composedPath().includes(dropdown)){
            dropdown.classList.remove('is-active')
        }
    }
})


