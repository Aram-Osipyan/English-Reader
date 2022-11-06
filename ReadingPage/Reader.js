import {WordTranslator} from "../src/WordTranslator";

const textDiv = document.getElementById('textDiv');

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
                const content = await generateTranslationContent(x);
                dropdown_item.innerHTML = '';
                dropdown_item.appendChild(content);
                const addToDicBtn = document.createElement('button');
                addToDicBtn.classList.add('button');
                addToDicBtn.setAttribute('style', 'background-color:#D3D3D3;');
                addToDicBtn.innerText = 'add';

                dropdown_item.appendChild(addToDicBtn);
                //dropdown_item.appendChild()
                //console.log();
                console.log('x', x)
            }
            return elem;
        });

    document.body.addEventListener('click', (event) => {
        console.log(event.target,"target");
        if (!event.target.matches('.button')) {
            var dropdowns = document.getElementsByClassName("dropdown");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('is-active')) {
                    //openDropdown.classList.remove('is-active');
                }
            }
        }

    });
    textDiv.append(...splittedText);
    console.log(splittedText);
}
async function generateTranslationContent(word){
    const translator = new WordTranslator();
    const translation = await translator.translate(word);
    console.log(translation);
    const p = document.createElement('p');
    const translationText = translation.def[0].tr[0].text;
    const transcriptionText = translation.def[0].ts;
    const text = translation.def[0].text;
    p.innerHTML =  `<b>${text}</b> [${transcriptionText}] - ${translationText}`;
    return p;
}
/**
 *
 * @param word{string}
 * @returns {HTMLParagraphElement}
 */
function generateDropdownContent(word){
    const p = document.createElement('p');
    p.innerHTML = `dictionary result of <b>${word}</b>`;
    return p;

}
//textDiv.appendChild(document.createElement('div.classname'));
generateReader('Lorem Ipsum is simply dummy text of the printing and typesetting industry.');

const textDiv2 = document.getElementById('test');

const textButton = document.getElementById('testButton');
textButton.onclick = function (){
    console.log("log");
    textDiv2.classList.toggle('is-active', textDiv2.classList.length === 1);
}
