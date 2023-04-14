const book3 = new Book(
  'Why Does the Other Line Always Move Faster?',
  'David Andrews',
  209,
  true
);
const book2 = new Book('The Ruins of Gorlan', 'John Flanagan', 274, true);
const book1 = new Book(
  'On the Edge of the Dark Sea of Darkness',
  'Andrew Peterson',
  306,
  true
);

const form = document.getElementById('form-container');
form.addEventListener('submit', handleSubmit);

let myLibrary = [book1, book2, book3];

const libraryContainer = document.querySelector('.library-container');

function updateLibrary() {
  while (libraryContainer.firstChild) {
    libraryContainer.removeChild(libraryContainer.firstChild);
  }
  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.dataset.index = i;

    const bookHtml = `
    <div class="title book-text">
    <h1>${book.title}</h1>
  </div>
  <div class="author book-text">
    <h2>${book.author}</h2>
  </div>
  <div class="pages book-text">
    <h3>Pages: ${book.pages}</h3>
  </div>
  <div class="book-btns">
  <div class="is-read book-text">
    <h3>Have you read the book?</h3>
    <div class="button r button-3">
      <input type="checkbox" onclick="changeReadStatus(event)" class="checkbox" ${
        book.read ? '' : 'checked'
      }>
      <div class="knobs"></div>
      <div class="layer"></div>
    </div>
  </div>
  <button class="remove-book" onclick="removeBook(event)">Remove Book</button>
  </div>
    `;

    bookDiv.innerHTML = bookHtml;
    libraryContainer.appendChild(bookDiv);
  }
}

function removeBook(event) {
  const div = event.target.parentNode;
  const bookIndex = div.dataset.index;
  myLibrary.splice(bookIndex, 1);
  updateLibrary();
}

function changeReadStatus(event) {
  const bookIndex = event.target.closest('.book').dataset.index;
  myLibrary[bookIndex].read = !myLibrary[bookIndex].read;
  console.log(myLibrary[bookIndex]);
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const error = document.getElementById('form-error');
  let bookTitle = form.elements['bookTitle'].value;
  let bookAuthor = form.elements['bookAuthor'].value;
  let bookPages = form.elements['bookPages'].value;
  let bookRead = checkRead();

  if (
    bookTitle === '' ||
    bookAuthor === '' ||
    bookPages === '' ||
    bookRead === ''
  ) {
    error.innerHTML = '*Please fill out all fields before submitting.';
    return;
  }

  console.log(
    bookTitle,
    bookAuthor,
    bookPages,
    bookRead,
    typeof bookPages,
    typeof bookRead
  );

  const newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  myLibrary.push(newBook);
  updateLibrary();
  closeForm();
  error.innerHTML = '';
  form.reset();
  console.log(myLibrary);
}

function checkRead() {
  const readRadio = form.elements['bookRead'];
  if (readRadio[0].checked) {
    return true;
  } else if (readRadio[1].checked) {
    return false;
  } else {
    return '';
  }
}

function openForm() {
  document.getElementById('myForm').style.display = 'flex';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
}

function handleSubmit(event) {
  event.preventDefault();
}

updateLibrary();
