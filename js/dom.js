const UNCOMPLETED_BOOK_LIST_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_LIST_ID = "completeBookshelfList";
const BOOK_ITEMID = "bookId";

function addBook() {
  const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
  const completedBookList = document.getElementById(COMPLETED_BOOK_LIST_ID);

  const judulBuku = document.getElementById("inputBookTitle").value;
  const penulisBuku = document.getElementById("inputBookAuthor").value;
  const tahunBuku = parseInt(document.getElementById("inputBookYear").value);
  const statusBaca = document.getElementById("inputBookIsComplete").checked;
//   console.log({judulBuku, penulisBuku, tahunBuku, statusBaca});

  const book = makeBook(judulBuku, penulisBuku, tahunBuku, statusBaca);
  const bookObject = composeBookObject(judulBuku, penulisBuku, tahunBuku, statusBaca);

  book[BOOK_ITEMID] = bookObject.id;
  books.push(bookObject);

  if (statusBaca == true) {
    completedBookList.append(book);
  } else {
    uncompletedBookList.append(book);
  }

  updateDataToStorage();
};

function makeBook(title, author, year, isCompleted) {
  const textJudul = document.createElement("h3");
  textJudul.innerText = title;

  const textPenulis = document.createElement("p");
  textPenulis.innerHTML = `Penulis: <span id="author">` + author + `</span>`;

  const textTahun = document.createElement("p");
  textTahun.innerHTML = `Tahun: <span id="year">` + year + `</span>`;

  const div = document.createElement("div");
  div.classList.add("action");

  if (isCompleted) {
    div.append(
      createUndoButton(),
      createDeleteButton()
    );
  } else {
      div.append(
        createCheckButton(),
        createDeleteButton()
    );
  }

  const textContainer = document.createElement("article");
  textContainer.classList.add("book_item");

  textContainer.append(textJudul, textPenulis, textTahun, div);

  return textContainer;
};

// function to make button tag
function createButton(buttonTypeClass, buttonText, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = buttonText;
  button.addEventListener("click", function(e) {
    eventListener(e);
    e.stopPropagation();
  });

  return button;
};

function createCheckButton() {
  return createButton("green", "Selesai Dibaca", function(e) {
    addBookToCompleted(e.target.parentElement.parentElement);
  });
};

function createUndoButton() {
  return createButton("green-undo", "Belum Selesai Dibaca", function(e) {
    undoBookFromCompleted(e.target.parentElement.parentElement);
  });
};

function createDeleteButton() {
  return createButton("red", "Hapus Buku", function(e) {
    removeBookFromCompleted(e.target.parentElement.parentElement);
  });
};

function addBookToCompleted(taskElement) {
  const listCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);

  const bookJudul = taskElement.querySelector("h3").innerText;
//   const p = taskElement.querySelectorAll("p");
//   const bookPenulis = p[0].innerText;
//   const bookTahun = p[1].innerText;
  const bookPenulis = taskElement.querySelector("span#author").innerText;
  const bookTahun = taskElement.querySelector("span#year").innerText;

  const newBook = makeBook(bookJudul, bookPenulis, bookTahun, true);

  const book = findBook(taskElement[BOOK_ITEMID]);
  book.isCompleted = true;
  newBook[BOOK_ITEMID] = book.id;
  
  listCompleted.append(newBook);
  taskElement.remove();

  updateDataToStorage();
};

function undoBookFromCompleted(taskElement) {
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);

  const bookJudul = taskElement.querySelector("h3").innerText;

//   const p = taskElement.querySelectorAll("p");
//   const bookPenulis = p[0].innerText;
//   const bookTahun = p[1].innerText;
  const bookPenulis = taskElement.querySelector("span#author").innerText;
  const bookTahun = taskElement.querySelector("span#year").innerText;

  const newBook = makeBook(bookJudul, bookPenulis, bookTahun, false);

  const book = findBook(taskElement[BOOK_ITEMID]);
  book.isCompleted = false;  
  newBook[BOOK_ITEMID] = book.id;

  listUncompleted.append(newBook);
  taskElement.remove();

  updateDataToStorage();
};

function removeBookFromCompleted(taskElement) {
  const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);

  taskElement.remove();

  updateDataToStorage();
};

function searchBook(e) {
  const userInput = document.querySelector("#searchBookTitle");
  const filter = userInput.value.toUpperCase();
//   const completedBooks = document.querySelector("#completeBookshelfList");
//   const unCompletedBooks = document.querySelector("#incompleteBookshelfList");
  const bookItems = document.querySelectorAll(".book_item");
//   const bookAuthor = document.querySelector(".book_item > #author")

  for (let i = 0; i < bookItems.length; i++) {
    const book = bookItems[i].querySelector("#author");
    authorName = book.innerText;
    if (authorName.toUpperCase().indexOf(filter) > -1) {
      bookItems[i].style.display = "";
    } else {
      bookItems[i].style.display = "none";
    }
  }

  e.preventDefault();
};