const User = document.querySelector('#nom');
const Email = document.querySelector('#email');
const Password = document.querySelector('#pass');
const CPassword = document.querySelector('#cpass');
const form = document.querySelector('#signup');

const required = value => value === '' ? false : true;
const MaxMin = (length, min, max) => length < min || length > max ? false : true;
const ValiderEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};
const isPasswordSecure = (pass) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(pass);
};
const CError = (input, message) => {
    const formField = input.parentElement;

    formField.classList.remove('success');
    formField.classList.add('error');


    const error = formField.querySelector('small');
    error.textContent = message;
};
const CSuccess = (input) => {
    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('success');

    const error = formField.querySelector('small');
    error.textContent = '';
}
const checkUsername = () => {

    let valid = false;
    const min = 3,
        max = 25;
    const username = User.value.trim();

    if (!required(username)) {
        CError(User, `Le nom d'utilisateur ne peut pas être vide`);
        User.style.border='red';
    } else if (!MaxMin(username.length, min, max)) {
        CError(User, `Le nom d'utilisateur doit être compris entre ${min} et ${max} caractères`)
    } else {
        CSuccess(User);
        valid = true;
    }
    return valid;
}
const checkEmail = () => {
    let valid = false;
    const email = Email.value.trim();
    if (!required(email)) {
        CError(Email, 'Email ne peut pas être vide');
    } else if (!ValiderEmail(email)) {
        CError(Email, `EmailL n'est pas valide`);
    } else {
        CSuccess(Email);
        valid = true;
    }
    return valid;
}
const checkPassword = () => {

    let valid = false;

    const password = pass.value.trim();

    if (!required(password)) {
        CError(pass, 'Le mot de passe ne peut pas être vide');
    } else if (!isPasswordSecure(password)) {
        CError(pass, 'Le mot de passe doit contenir au moins 8 caractères, dont au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial (!@#$%^&amp;*)');
    } else {
        CSuccess(pass);
        valid = true;
    }

    return valid;
};
const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassword = cpass.value.trim();
    const password = pass.value.trim();

    if (!required(confirmPassword)) {
        CError(cpass, 'Veuillez saisir à nouveau le mot de passe');
    } else if (password !== confirmPassword) {
        CError(cpass, 'Le mot de passe ne correspond pas');
    } else {
        CSuccess(cpass);
        valid = true;
    }

    return valid;
};
User.addEventListener('input',VaUser);
function VaUser(){
    if(User.value.length<3||User.value.length>25){
        User.style.color='#dc3545';
        User.style.border='#dc3545 solid 2px';
    }else{
        if(User.value.length<25||User.value.length>3){
            User.style.color='#28a745';
            User.style.border='#28a745 solid 2px';
        }
    }
}
Email.addEventListener('input',VaEmail);
function VaEmail(){
    const email = Email.value.trim();
    if (!ValiderEmail(email)) {
        Email.style.color='#dc3545';
        Email.style.border='#dc3545 solid 2px';
    } else {
        Email.style.color='#28a745';
        Email.style.border='#28a745 solid 2px';
    }
}
Password.addEventListener('input',VaPass);
function VaPass(){
    const pass = Password.value.trim();
    if (!isPasswordSecure(pass)) {
        Password.style.color='#dc3545';
        Password.style.border='#dc3545 solid 2px';
    } else {
        Password.style.color='#28a745';
        Password.style.border='#28a745 solid 2px';
    }
}
CPassword.addEventListener('input',VaCPass);
function VaCPass(){
    const cpass = CPassword.value.trim();
    const pass = Password.value.trim();
    if (pass !== cpass) {
        CPassword.style.color='#dc3545';
        CPassword.style.border='#dc3545 solid 2px';
    } else {
        CPassword.style.color='#28a745';
        CPassword.style.border='#28a745 solid 2px';
    }
}
form.addEventListener('submit', function (e) {

    e.preventDefault();


    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;


    if (isFormValid) {
        window.location="index.html";
    }

});
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'nom':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'pass':
            checkPassword();
            break;
        case 'cpass':
            checkConfirmPassword();
            break;
    }

}));
