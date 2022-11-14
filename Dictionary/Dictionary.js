import {fetchComponent} from "../src/ComponentFetching";
import {WordRepository} from "../src/WordRepository";
import {FirebaseApp} from "../src/FirebaseApp";
import {BookRepository} from "../src/BookRepository";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {WordTranslator} from "../src/WordTranslator";

const header = document.getElementById('header');
fetchComponent(header, '../NavMenu/NavMenu.html')

window.onload = async(event) => {
    const app = new FirebaseApp();
    const wordRepository = new WordRepository(app);
    const auth = getAuth(app.getApp());
    onAuthStateChanged(auth, async (user) => {
        if (user){
            const words = await wordRepository.get();
            const wordsContainer = document.getElementById('words-container');
            wordsContainer.append(...generateDictionaryNodes(words));
            console.log(words);
        }
    })
}

/*<div class="accordion-item">
    <h2 class="accordion-header" id="flush-headingOne">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            <div class="row">
                <div class="col align-self-start">
                    One of three columns
                </div>
                <div class="col align-self-center">
                    One of three columns
                </div>
                <div class="col align-self-end">
                    One of three columns
                </div>
            </div>
        </button>
    </h2>
    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
        <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
    </div>
</div>*/
function generateDictionaryNodes(words){
    const translator = new WordTranslator();
    const accordionItems = words.map((word, index) => {
        const headId = `flush-heading${index}`;
        const collapseId = `flush-collapse${index}`;
        const accordionItem = document.createElement('div');
        accordionItem.classList.add('accordion-item');

        const accordionHeader = document.createElement('h2');
        accordionHeader.classList.add('accordion-header');
        accordionHeader.setAttribute('id', headId);

        const accordionBody = document.createElement('div');
        accordionBody.classList.add('accordion-body');
        accordionBody.innerText = word.translation;

        const p = document.createElement('p');
        p.classList.add('fw-bold');
        p.innerText = 'Dictionary';
        accordionBody.append(p);

        const button = document.createElement('button');
        button.classList.add('accordion-button', 'collapsed');
        button.setAttribute('type', 'button');
        button.setAttribute('data-bs-toggle', 'collapse');
        button.setAttribute('data-bs-target', `#${collapseId}`);
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-controls', collapseId);
        button.innerHTML = generateHeaderTextContent(word);
        button.onclick = async function(){
            accordionBody.innerHTML = '';
            const translate = await translator.translate(word.source);
            //console.log(translate);
            const listGroup = document.createElement('ol');
            listGroup.classList.add('list-group', 'list-group-numbered');
            const translateList = translate.def;
            for (const tr of translateList) {
                //console.log('tr',tr)
                const li = document.createElement('li');
                li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0');
                const body = document.createElement('div');
                body.classList.add('ms-2', 'me-auto');
                const title = document.createElement('div');
                title.classList.add('fw-bold');
                title.innerText = tr.tr[0].text;

                body.append(title);
                if (tr.tr[0].ex){
                    const example = tr.tr[0].ex[0].text;
                    const exampleTranslation = tr.tr[0].ex[0].tr[0].text;
                    body.append(document.createTextNode(`${example} - ${exampleTranslation}`));
                }

                const span = document.createElement('span');
                span.classList.add('badge', 'bg-primary', 'rounded-pill');
                span.innerText = tr.pos;
                li.append(body);
                li.append(span);
                listGroup.append(li)
            }
            accordionBody.append(listGroup);
        }
        accordionItem.append(accordionHeader);
        accordionHeader.append(button);

        const accordionCollapse = document.createElement('div');
        accordionCollapse.classList.add('accordion-collapse', 'collapse');
        accordionCollapse.setAttribute('aria-labelledby', headId);
        accordionCollapse.setAttribute('data-bs-parent', '#accordionFlushExample');
        accordionCollapse.setAttribute('id', collapseId);

        accordionBody.append(p);
        accordionCollapse.append(accordionBody);
        accordionItem.append(accordionCollapse);
        return accordionItem;
    })
    return accordionItems;
}

function generateHeaderTextContent(word){
    return `
        <div class="container">
            <div class="row">
                <div class="col col-4 align-self-start">
                    ${word.source}
                </div>
                <div class="col col-4 align-self-center">
                    [${word.transcription}]
                </div>
                <div class="col col-4 align-self-end">
                    ${word.translation}
                </div>
            </div>
        </div>`;
}
