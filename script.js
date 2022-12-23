"use strict";
import books from "./books.json" assert { type: "json" };
const admin = {
  email: "admin@gmail.com",
  password: "1234",
};
const admin_login = document.querySelector(".admin_login");
const login_email = document.querySelector("[name=login_email]");
const login_password = document.querySelector("[name=login_password]");
const login_page = document.querySelector(".login_page");
const admin_page = document.querySelector(".admin_page");
const admin_nav = document.querySelector(".admin_nav");
const admin_logout = document.querySelector(".admin_logout");
const saveBook = document.querySelector(".saveBook");
const bookname = document.getElementById("bookname");
const authorname = document.getElementById("authorname");
const imageurl = document.getElementById("imageurl");
const genre = document.getElementById("Genre");
const newbookname = document.getElementById("newbookname");
const newauthorname = document.getElementById("newauthorname");
const newimageurl = document.getElementById("newimageurl");
const newgenre = document.getElementById("newGenre");
const search = document.querySelector(".Search");
const checkAdmin = function () {
  const email = login_email.value.trim();
  const password = login_password.value.trim();

  if (email === "") {
    login_email.classList.add("red");
    login_email.nextElementSibling.classList.add("empty");
    login_email.nextElementSibling.nextElementSibling.classList.remove(
      "invalid"
    );
    login_email.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
      "dismatch"
    );
  } else if (
    !login_email.value.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    )
  ) {
    login_email.classList.add("red");
    login_email.nextElementSibling.classList.remove("empty");
    login_email.nextElementSibling.nextElementSibling.classList.add("invalid");
    login_email.nextElementSibling.nextElementSibling.nextElementSibling.classList.remove(
      "dismatch"
    );
  }
  if (password === "") {
    login_password.classList.add("red");
    login_password.nextElementSibling.classList.add("empty");
  } else {
    login_password.classList.remove("red");
    login_password.nextElementSibling.classList.remove("empty");
  }
  if (email.length > 0 && password.length > 0) {
    if (email !== admin["email"] || password !== admin["password"]) {
      login_email.classList.add("red");
      login_email.nextElementSibling.classList.remove("empty");
      login_email.nextElementSibling.nextElementSibling.classList.remove(
        "invalid"
      );
      login_email.nextElementSibling.nextElementSibling.nextElementSibling.classList.add(
        "dismatch"
      );
      login_password.classList.add("red");
      login_password.nextElementSibling.classList.remove("empty");
    } else {
      const myModalEl = document.getElementById("LoginModal");
      const modal = bootstrap.Modal.getInstance(myModalEl);
      modal.hide();
      login_page.style.display = "none";
      admin_page.style.display = "block";
    }
  }
};
const html =
  "<div class='d-flex align-items-center justify-content-center flex-wrap books_container text-center'></div>";
admin_nav.insertAdjacentHTML("afterend", html);
const books_container = document.querySelector(".books_container");

const createCard = function (b) {
  const HTML = `<div class='card ms-3 me-3 mt-5' style='width: 10rem' data-id=${
    b.id
  }>
  <img src=${
    b.url
  } class='card-img-top' /><div class='card-body'><h5 class='card-title'>${
    b.title
  }</h5>
  <p class='card-text'>${
    b.author
  }</p><div class='d-flex align-items-center justify-content-between card_icons' ><img src=${"images/trash-solid.svg"} class="bin"><p class="card-text">${
    b.genre
  }</p><img src=${"images/pen-to-square-solid.svg"} class="edit"></div>
  </div></div>`;
  books_container.insertAdjacentHTML("beforeend", HTML);
};
const editBook = function (e) {
  const myEditModalEl = new bootstrap.Modal(
    document.getElementById("editBookModal")
  );
  myEditModalEl.show();
  const parent = e.target.closest(".card");
  const id = parent.dataset.id;
  let allBooks = JSON.parse(localStorage.getItem("books"));
  const target = allBooks.find((elem) => elem.id == id);
  newbookname.value = target.title;
  newauthorname.value = target.author;
  newimageurl.value = target.url;
  newgenre.value = target.genre;
  const editBook = document.querySelector(".editBook");
  editBook.addEventListener("click", function () {
    const index = allBooks.indexOf(target);
    const editedBook = {
      title: newbookname.value,
      author: newauthorname.value,
      id: target.id,
      genre: newgenre.value,
      url: newimageurl.value,
    };
    allBooks[index] = editedBook;
    localStorage.setItem("books", JSON.stringify(allBooks));
    books_container.innerHTML = "";
    allBooks.forEach((elem) => {
      createCard(elem);
    });
    delListener();
    editListener();
    const myEditModalEl = document.getElementById("editBookModal");
    const modal = bootstrap.Modal.getInstance(myEditModalEl);
    modal.hide();
  });
};
const deleteBook = function (e) {
  const myDelModalEl = new bootstrap.Modal(
    document.getElementById("deleteBookModal")
  );
  myDelModalEl.show();
  const yes = document.querySelector(".yes");
  yes.addEventListener("click", function () {
    const parent = e.target.closest(".card");
    const id = parent.dataset.id;
    let allBooks = JSON.parse(localStorage.getItem("books"));
    allBooks = allBooks.filter((elem) => elem.id != id);
    localStorage.setItem("books", JSON.stringify(allBooks));
    books_container.innerHTML = "";
    allBooks.forEach((elem) => {
      createCard(elem);
    });
    delListener();
    editListener();

    const myDelModalEl = document.getElementById("deleteBookModal");
    const modal = bootstrap.Modal.getInstance(myDelModalEl);
    modal.hide();
  });
};

const delListener = function () {
  const bin = document.querySelectorAll(".bin");
  bin.forEach((ele) => ele.addEventListener("click", deleteBook));
};
delListener();
const editListener = function () {
  const edit = document.querySelectorAll(".edit");
  edit.forEach((elem) => elem.addEventListener("click", editBook));
};
editListener();
admin_login.addEventListener("click", checkAdmin);
admin_logout.addEventListener("click", function (e) {
  e.preventDefault();
  admin_page.style.display = "none";
  login_page.style.display = "block";
});
const addBook = function () {
  const newBook = {
    title: bookname.value,
    author: authorname.value,
    id: Date.now(),
    genre: genre.value,
    url: imageurl.value,
  };
  let lsbooks = [];
  if (localStorage.getItem("books")) {
    lsbooks = JSON.parse(localStorage.getItem("books"));
  }
  lsbooks.push(newBook);
  localStorage.setItem("books", JSON.stringify(lsbooks));
  books_container.innerHTML = "";
  lsbooks.forEach((elem) => {
    createCard(elem);
  });
  delListener();
  editListener();

  bookname.value = "";
  authorname.value = "";
  imageurl.value = "";
  const myAddModalEl = document.getElementById("addBookModal");
  const modal = bootstrap.Modal.getInstance(myAddModalEl);
  modal.hide();
};
saveBook.addEventListener("click", addBook);
if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(books));
}
const BOOKS = JSON.parse(localStorage.getItem("books"));
BOOKS.forEach((b) => {
  createCard(b);
});
delListener();
editListener();
const searchBook = function (e) {
  e.preventDefault();
  const regex = new RegExp(search.value, "gi");
  const allBooks = JSON.parse(localStorage.getItem("books"));

  books_container.innerHTML = "";
  allBooks.forEach((b) => {
    if (regex.test(b.title)) {
      createCard(b);
    }
  });
};
window.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    books_container.innerHTML = "";
    const BOOKS = JSON.parse(localStorage.getItem("books"));
    BOOKS.forEach((b) => {
      createCard(b);
    });
    delListener();
    editListener();
    e.preventDefault();
  }
  if (search.value.trim() === "") return;
  if (search.value !== "" && e.key === "Enter") {
    searchBook(e);
  }
});
