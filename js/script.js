const bookShelf = document.getElementById('book-shelf');
const form = document.getElementById('book-form');

// let storage = [];
let storage = JSON.parse(localStorage.getItem('books')) || [];

function Book(title, author, pages, read, image) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.image = image;
}

Book.prototype.toggleRead = function () {
  console.log('hello');
};

console.log(storage[0])

bookShelf.addEventListener('click', (e) => {
  const bookId = e.target.dataset.id;
  if (e.target.classList.contains('delete-book')) {
    // console.log(`${storage[bookId].title} has been deleted.`);
    storage.splice(bookId, 1);
    localStorage.setItem('books', JSON.stringify(storage));
    displayBooks();
  } else if (e.target.classList.contains('toggle-read')) {
    storage[bookId].read = !storage[bookId].read;
    console.log('book read status', storage[bookId].read);
    localStorage.setItem('books', JSON.stringify(storage));

    storage[bookId].toggleRead();
    displayBooks();
  }
});

function displayBooks() {
  let output = '';
  storage.forEach((item, index) => {
    output += `<div class="book-card">
      <h1>${item.title}</h1>
      <h2>${item.author}</h2>
      <img src='${item.image}' alt="${item.title}">
      <p>Pages: ${item.pages}</p>
      <p>Status: ${item.read ? 'Read' : 'Not Yet Read'}</p> 
      <button class="toggle-read" data-id="${index}">Toggle read status</button>
      <button class="delete-book" data-id="${index}">Remove</button>
    </div>`;
    console.log(item.read);
  });

  bookShelf.innerHTML = output;
}
// document.getElementById('delete-book').addEventListener('click', (e) => {
//   console.log(e.dataset.id);
// });

// storage.splice(bookId);
// displayBooks();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const file = formData.get('image');
  const image = { image: null };
  const title = formData.get('title');
  const author = formData.get('author');
  const pages = formData.get('pages');
  const read = document.getElementById('read').checked;

  const newBook = new Book(title, author, pages, read, image);

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      newBook.image = reader.result;
      storage.push(newBook);
      localStorage.setItem('books', JSON.stringify(storage));
      displayBooks();
      document.getElementById('form-dialog').close();
    };
  } else {
    storage.push(newBook);
    localStorage.setItem('books', JSON.stringify(storage));
    document.getElementById('form-dialog').close();
  }
  document.getElementById('form-dialog').close();
  displayBooks();
  console.log(newBook);
  // storage = JSON.parse(localStorage.getItem('books')) || [];
});

document.getElementById('clear-storage').addEventListener('click', () => {
  localStorage.clear();
  storage = [];
  displayBooks();
  console.log('Book Cleared', JSON.parse(localStorage.getItem('books')));
});

displayBooks();
