const UNCOMPLETED_BOOK_LIST_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_LIST_ID = "completeBookshelfList";

function addBook() {
  const uncompletedBookList = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
  const completedBookList = document.getElementById(COMPLETED_BOOK_LIST_ID);

  const judulBuku = document.getElementById("inputBookTitle").value;
  const penulisBuku = document.getElementById("inputBookAuthor").value;
  const tahunBuku = parseInt(document.getElementById("inputBookYear").value);
  const statusBaca = document.getElementById("inputBookIsComplete").checked;
//   console.log({judulBuku, penulisBuku, tahunBuku, statusBaca});

  const book = makeBook(judulBuku, penulisBuku, tahunBuku, statusBaca);

  if (statusBaca == true) {
    completedBookList.append(book);
  } else {
    uncompletedBookList.append(book);
  }
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
  const bookJudul = taskElement.querySelector("h3").innerText;

//   const p = taskElement.querySelectorAll("p");
//   const bookPenulis = p[0].innerText;
//   const bookTahun = p[1].innerText;
  const bookPenulis = taskElement.querySelector("span#author").innerText;
  const bookTahun = taskElement.querySelector("span#year").innerText;

  const newBook = makeBook(bookJudul, bookPenulis, bookTahun, true);
  const listCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);
  listCompleted.append(newBook);
  taskElement.remove();
};

function undoBookFromCompleted(taskElement) {
  const bookJudul = taskElement.querySelector("h3").innerText;

//   const p = taskElement.querySelectorAll("p");
//   const bookPenulis = p[0].innerText;
//   const bookTahun = p[1].innerText;
  const bookPenulis = taskElement.querySelector("span#author").innerText;
  const bookTahun = taskElement.querySelector("span#year").innerText;

  const newBook = makeBook(bookJudul, bookPenulis, bookTahun, false);
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
  listUncompleted.append(newBook);
  taskElement.remove();
};

function removeBookFromCompleted(taskElement) {
  taskElement.remove();
};

