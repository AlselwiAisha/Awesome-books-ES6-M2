import AwesomeBooks from './Modules/books.js';
import showTime from './Modules/datetime.js';

window.onload = () => {
  showTime();
};

const showPopWin = () => {
  const popWin = document.createElement('div');
  popWin.className = 'pop-win';
  document.querySelector('body').appendChild(popWin);

  popWin.innerHTML = `
      <div class="msg-win">
        <h4>New book successfully added</h4>
      </div>
      `;
  setTimeout(() => popWin.remove(), 2000);
};

const book = new AwesomeBooks('User', '#books');

const bookContainer = document.getElementById('book-container');
const form = document.getElementById('myForm');
const formValues = document.getElementById('form');
const contact = document.getElementById('contact-container');

const toggleNav = (target) => {
  const children = [...document.querySelectorAll('.nav-link')];
  const index = children.indexOf(target);

  if (target.parentNode.id === 'nav-links') {
    children.forEach((item) => {
      item.classList.remove('active');
    });
    children[index].classList.add('active');
    bookContainer.classList.add('hidden');
    form.classList.add('hidden');
    contact.classList.add('hidden');
  }

  if (target.id === 'list') {
    bookContainer.classList.remove('hidden');
  } else if (target.id === 'addNew') {
    form.classList.remove('hidden');
  } else if (target.id === 'contact') {
    contact.classList.remove('hidden');
  }
};

const handleBookStorage = (e) => {
  const { target } = e;
  if (target.matches('.remove')) {
    target.parentNode.classList.add('fade-out');
    const index = [...(document.querySelectorAll('.remove'))].indexOf(target);
    setTimeout(() => {
      book.delete(index);
    }, 200);
  } else if (target.matches('#submit')) {
    e.preventDefault();
    const formData = new FormData(formValues);
    const title = formData.get('title');
    const author = formData.get('author');
    book.store(title, author);
    formValues.reset();
    if (title && author) {
      showPopWin();
    }
  }
  toggleNav(target);
};

const init = () => {
  document.addEventListener('click', handleBookStorage);
  book.display();
};

const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 2023 00:00:00 UTC; path=/; domain=https://sagieramos.github.io/Awesome-books/;`;
};

deleteCookie('myCookie');

document.addEventListener('DOMContentLoaded', init);
