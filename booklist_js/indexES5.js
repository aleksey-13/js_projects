// Book constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("book-list");
  const row = document.createElement("tr");

  Object.keys(book).forEach(function (key) {
    const td = document.createElement("td");
    td.appendChild(document.createTextNode(book[key]));

    row.appendChild(td);
  });

  const tdDelBtn = document.createElement("td");
  tdDelBtn.innerHTML = "<a href='#' class='delete'>x</a>";
  row.appendChild(tdDelBtn);

  list.appendChild(row);
};

UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

UI.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");
  div.className = className;
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector(".container");
  const form = document.getElementById("book-form");

  container.insertBefore(div, form);

  setTimeout(function () {
    div.remove();
  }, 2000);
};

UI.prototype.deleteBook = function (item) {
  item.parentElement.parentElement.className = "item-book will-remove";
  setTimeout(function () {
    item.parentElement.parentElement.remove();
  }, 250);
};

// Event listener for add book
document.getElementById("book-form").addEventListener("submit", function (e) {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  const book = new Book(title, author, isbn);

  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    ui.addBookToList(book);

    ui.showAlert("Book added", "success");

    ui.clearFields();
  }

  e.preventDefault();
});

// Event listener for delete
document.getElementById("book-list").addEventListener("click", function (e) {
  if (e.target.className === "delete") {
    const ui = new UI();

    ui.deleteBook(e.target);

    ui.showAlert("Book removed", "success");
  }
});
