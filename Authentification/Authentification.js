import {Authenticator} from "../src/Authentificator";
import {FirebaseApp} from "../src/FirebaseApp";

const email = document.getElementById("email");
const password = document.getElementById("password");
const emailRightIcon = document.getElementById("emailRightI");
const emailLogText = document.getElementById("emailLogText");

const createAccountButton = document.getElementById("createAccount");
const signInButton = document.getElementById("signIn");

const app = new FirebaseApp();
const authenticator = new Authenticator(app);

reset();
createAccountButton.onclick = function (){
    authenticator.createUserWithEmailAndPassword(email.value, password.value)
        .then(res => {
            console.log(res,"res");
            reset();
            createSuccessText();
        })
        .catch(err => {
            console.log(`${err.message} ${err.code}`);
            email.classList.add("is-danger");

            emailRightIcon.classList.remove("fa-check");
            emailRightIcon.classList.add("fa-exclamation-triangle");
            createEmailLog(err.code);
        });
}

signInButton.onclick = function (){
    authenticator.signInWithEmailAndPassword(email.value, password.value)
        .then(res => {
            reset();
            createSuccessText();
        })
        .catch(err => {
            createEmailLog(err.code);
        });
}

function createEmailLog(errCode){
    let text = '';
    switch (errCode){
        case 'auth/email-already-exists':
            text = 'email already exists';
            break;
        case 'auth/invalid-email':
            text = 'invalid email value'
            break;
        case 'auth/internal-error':
            text = 'internal error'
            break;
        case 'auth/email-already-in-use':
            text = 'email already in use'
            break;
        default:
            text = errCode;
    }
    emailLogText.innerHTML = '';
    const logElem = document.createElement("p");
    logElem.appendChild(document.createTextNode(text));
    logElem.classList.add('help', 'is-danger');
    emailLogText.appendChild(logElem);
}
//emailRightIcon.classList.add("fa-exclamation-triangle");
function reset(){
    email.value = "";
    password.value = "";
    email.classList.remove("is-danger");
    emailRightIcon.classList.remove("fa-exclamation-triangle");

    emailRightIcon.classList.add("fa-check");
}

function createSuccessText(){
    const text = 'success';
    emailLogText.innerHTML = '';
    const logElem = document.createElement("p");
    logElem.appendChild(document.createTextNode(text));
    logElem.classList.add('help', 'is-success');
    emailLogText.appendChild(logElem);
}