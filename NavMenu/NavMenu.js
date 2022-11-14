import {FirebaseApp} from "../src/FirebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const signButtons = document.getElementById('sign-buttons');
const userEmail = document.getElementById('user-email');
const app = new FirebaseApp();
const auth = getAuth(app.getApp());

onAuthStateChanged(auth, function(user) {
    if (user) {
        signButtons.style.display = 'none';
        const emailText = document.createElement('p');
        emailText.innerText = user.email;
        userEmail.innerHTML = '';
        userEmail.append(emailText);
    } else {
        signButtons.style.display = 'block';
    }
});