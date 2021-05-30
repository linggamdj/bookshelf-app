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

  const book = makeBook(judulBuku, penulisBuku, tahunBuku);

  if (statusBaca == false) {
    uncompletedBookList.append(book);
  } else {
    completedBookList.append(book);
  }
  
};

function makeBook(dataJudul, dataPenulis, timestamp, isCompleted) {
  const textJudul = document.createElement("h3");
  textJudul.innerText = dataJudul;

  const textPenulis = document.createElement("p");
  textPenulis.innerText = dataPenulis;

  const textTahun = document.createElement("p");
  textTahun.innerText = timestamp;

  const textContainer = document.createElement("article");
  textContainer.classList.add("book_item");

  textContainer.append(textJudul, textPenulis, textTahun);

  if (isCompleted) {
    textContainer.append(createUndoButton(), createDeleteButton());
  } else {
    textContainer.append(createCheckButton(), createDeleteButton());
  }

  return textContainer;
};

// function to make button tag
function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");

  if (buttonTypeClass == "green") {
    button.innerText = "Selesai Dibaca";
  } else if (buttonTypeClass == "green-undo") {
    button.innerText = "Belum Selesai Dibaca";
  } else {
    button.innerText = "Hapus Buku";
  }
  
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function(e) {
    eventListener(e);
  });

  return button;
};

function createCheckButton() {
  return createButton("green", function(e) {
    addBookToCompleted(e.target.parentElement);
  });
};


function createUndoButton() {
  return createButton("green-undo", function(e) {
    undoBookFromCompleted(e.target.parentElement);
  });
};

function createDeleteButton() {
  return createButton("red", function(e) {
    removeBookFromCompleted(e.target.parentElement);
    
  });
};

function addBookToCompleted(taskElement) {
  const bookJudul = taskElement.querySelector("h3").innerText;

  const p = taskElement.querySelectorAll("p");
  const bookPenulis = p[0].innerText;
  const bookTahun = p[1].innerText;

  const newBook = makeBook(bookJudul, bookPenulis, bookTahun, true);
  const listCompleted = document.getElementById(COMPLETED_BOOK_LIST_ID);
  listCompleted.append(newBook);
  taskElement.remove();
};

function undoBookFromCompleted(taskElement) {
  const bookJudul = taskElement.querySelector("h3").innerText;

  const p = taskElement.querySelectorAll("p");
  const bookPenulis = p[0].innerText;
  const bookTahun = p[1].innerText;

  const newBook = makeBook(bookJudul, bookPenulis, bookTahun, false);
  const listUncompleted = document.getElementById(UNCOMPLETED_BOOK_LIST_ID);
  listUncompleted.append(newBook);
  taskElement.remove();
};

function removeBookFromCompleted(taskElement) {
  taskElement.remove();
};

