import {FirebaseApp} from "../src/FirebaseApp";
import {BookRepository} from "../src/BookRepository";
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {fetchComponent} from "../src/ComponentFetching";

const header = document.getElementById('header');
fetchComponent(header, '../NavMenu/NavMenu.html');

function generateBookList(bookArray){
    const app = new FirebaseApp();
    const bookRepository = new BookRepository(app);
    const res = bookArray.map(book => {
        const elem = document.createElement('div');
        elem.classList.add('column', 'is-4-widescreen', 'is-6-desktop', 'mb-5', 'card');
        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const title = document.createElement('p');
        title.classList.add('title');
        title.innerText = `”${book.data.name}”`;
        cardContent.appendChild(title);

        const subtitle = document.createElement('p');
        subtitle.classList.add('subtitle');
        subtitle.innerText = book.data.author;

        cardContent.appendChild(subtitle);

        const cardFooter = document.createElement('footer');
        cardFooter.classList.add('card-footer');

        const readButton = document.createElement('a');
        readButton.classList.add('card-footer-item');
        readButton.innerText = 'Read';
        readButton.onclick = function (){
            location.replace(`/ReadingPage/Reader.html?book-id=${book.id}`)
        }
        const deleteButton = document.createElement('a');
        deleteButton.classList.add('card-footer-item');
        deleteButton.onclick = async function (){
            console.log('book',book);
            deleteButton.classList.add('is-loading');
            await bookRepository.delete(book.id);
            deleteButton.classList.remove('is-loading');
            elem.remove();
        }
        deleteButton.innerText = 'Delete';

        cardFooter.appendChild(readButton);
        cardFooter.appendChild(deleteButton);
        elem.appendChild(cardContent);
        elem.appendChild(cardFooter);
        return elem;
    });
    return res;


}
window.onload = async(event) => {
    const app = new FirebaseApp();
    const bookRepository = new BookRepository(app);
    const auth = getAuth(app.getApp());
    onAuthStateChanged(auth, async (user) => {
        if (user){
            const bookList = await bookRepository.get();
            const bookContainer = document.getElementById('books-container');
            bookContainer.append(...generateBookList(bookList))
        }
    })
}