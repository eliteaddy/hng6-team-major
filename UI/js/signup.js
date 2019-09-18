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
  if (dataSource.error === 'Email already exists') emailError.textContent = dataSource.error;
  const {
    first_name, last_name, email, phone_number, address, password,
  } = dataSource.error;
  if (first_name) firstNameError.textContent = first_name;
  if (!first_name) firstNameError.textContent = '';
  if (last_name) lastNameError.textContent = last_name;
  if (!last_name) lastNameError.textContent = '';
  if (email) emailError.textContent = email;
  if (!email && dataSource.error !== 'Email already exists') emailError.textContent = '';
  if (phone_number) phoneError.textContent = phone_number;
  if (!phone_number) phoneError.textContent = '';
  if (address) addressError.textContent = address;
  if (!address) addressError.textContent = '';
  if (password) passwordError.textContent = password;
  if (!password) passwordError.textContent = '';
};

const signupUser = (e) => {
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
        setSessionStorage(data);
        window.location.href = './Agent/dashboard.html';
      }
    })
    // eslint-disable-next-line no-console
    .catch(error => console.log(error.message));
};
myForm.addEventListener('submit', signupUser);
