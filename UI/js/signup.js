/* eslint-disable camelcase */
const firstName = document.querySelector('#firstName');

const firstNameError = document.querySelector('#firstnameError');

const lastName = document.querySelector('#lastName');

const lastNameError = document.querySelector('#lastnameError');

const userEmail = document.querySelector('#email');

const emailError = document.querySelector('#emailError');

const username = document.querySelector('#userName');

const usernameError = document.querySelector('#usernameError');

const userPassword = document.querySelector('#password');

const passwordError = document.querySelector('#passwordError');

const confirmPassword = document.querySelector('#confirmPassword');

const confirmPasswordError = document.querySelector('#confirmPasswordError');

const myForm = document.querySelector('#myForm');

const url = 'https://hng-authentication.herokuapp.com/api/v1/auth/signup';

const displayErrorMessage = (dataSource) => {
  dataSource.error.forEach(error => {
    if (error === 'Input an email to continue' || 
    error === 'Invalid email supplied' || error === 'Email already exists') {
      emailError.textContent = error;
    } 
    if (error === 'Input a password to continue' || 
    error === 'Password must contain at least one lower case character' ||
    error === 'Password must contain at least one upper case character' ||
    error === 'Password must contain at least one number' ||
    error === 'Password must contain at least one special case character' ||
    error === 'Password must contain at least 8 characters' ||
    error === 'Password must not contain whitesepace') {
      passwordError.textContent = error;
    }
    if (error === 'Username can only contain a combination of numbers and alphabets' || 
    error === 'Username already exists' || error === 'Input a username to continue') {
      usernameError.textContent = error;
    } 
    if (error === 'Invalid first name supplied' || error === 'Input a firstname to continue') {
      firstNameError.textContent = error;
    }  
    if (error === 'Invalid last name supplied' || error === 'Input a last name to continue') {
      lastNameError.textContent = error;
    } 
    if (error === 'Password and Confirm password do not match' || error === 'Confirm Password is required') {
      confirmPasswordError.textContent = error;
    }
  })
};

const signupUser = (e) => {
  firstNameError.textContent = '';
  lastNameError.textContent = '';
  usernameError.textContent = '';
  passwordError.textContent = '';
  confirmPasswordError.textContent = '';
  emailError.textContent = '';
  e.preventDefault();
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName.value,
      lastName: lastName.value,
      userName: username.value,
      email: userEmail.value,
      confirmPassword: confirmPassword.value,
      password: userPassword.value,
    }),
  })
    .then(res => res.json())
    .then((data) => {
      if (data.error)displayErrorMessage(data);
      if (!data.error) {
        window.location.href = './dashboard/teamMajor.html';
      }
    })
    // eslint-disable-next-line no-console
    .catch(error => console.log(error.message));
};
myForm.addEventListener('submit', signupUser);
