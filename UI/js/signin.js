const email = document.querySelector('#email');

const emailError = document.querySelector('#emailError');

const password = document.querySelector('#password');

const passwordError = document.querySelector('#passwordError');

const myForm = document.querySelector('#myForm');

const url = 'https://hng-authentication.herokuapp.com/api/v1/auth/signin';


const displayErrorMessage = (dataSource) => {
  console.log(dataSource.error);
  dataSource.error.forEach(error => {
    if (error === 'Input a password to continue' || 
    error === 'Password must contain at least one lower case character' ||
    error === 'Password must contain at least one upper case character' ||
    error === 'Password must contain at least one number' ||
    error === 'Password must contain at least one special case character' ||
    error === 'Password must contain at least 8 characters' ||
    error === 'Password must not contain whitesepace') {
      passwordError.textContent = error;
    }
    if (error === 'Input either a username or your email to continue' ||
    error === 'Email or Username not found' ||
    error === 'Invalid email or username supplied'||
    error ===  'Invalid login credentials') {
      emailError.textContent = error;
    }
  })
};

const signinUser = (e) => {
  e.preventDefault();
  passwordError.textContent = '';
  emailError.textContent = '';
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
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

myForm.addEventListener('submit', signinUser);