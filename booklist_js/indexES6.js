class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class Store {
  static getBooks() {
    let books = JSON.parse(localStorage.getItem("books"));
    if (books === null) {
      books = [];
    }
    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();
    const ui = new UI();
    books.forEach((book) => ui.addBookToList(book));
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    const newBooks = books.filter((item) => item.isbn !== isbn);
    localStorage.setItem("books", JSON.stringify(newBooks));
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");

    Object.keys(book).forEach((key) => {
      const td = document.createElement("td");
      td.appendChild(document.createTextNode(book[key]));

      row.appendChild(td);
    });

    const tdDelBtn = document.createElement("td");
    tdDelBtn.innerHTML = "<a href='#' class='delete'>x</a>";
    row.appendChild(tdDelBtn);

    list.appendChild(row);
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const form = document.getElementById("book-form");

    container.insertBefore(div, form);

    setTimeout(() => div.remove(), 2000);
  }

  deleteBook(element) {
    element.parentElement.parentElement.className = "item-book will-remove";
    setTimeout(() => element.parentElement.parentElement.remove(), 250);
  }
}

// DOM load event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

document.getElementById("book-form").addEventListener("submit", (e) => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBookToList(book);

    // Add to LS
    Store.addBook(book);

    ui.showAlert("Book added", "success");

    ui.clearFields();
  }

  e.preventDefault();
});

document.getElementById("book-list").addEventListener("click", (e) => {
  if (e.target.className === "delete") {
    const ui = new UI();
    const isbn = e.target.parentElement.previousElementSibling.textContent;

    ui.deleteBook(e.target);

    Store.removeBook(isbn);

    ui.showAlert("Book removed", "success");
  }
});
