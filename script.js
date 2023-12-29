document.addEventListener("DOMContentLoaded", function () {
    let books = [];

    document.getElementById("addBookForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let title = document.getElementById("bookTitle").value;
        let author = document.getElementById("author").value;

        if (title && author) {
            let newBook = { title: title, author: author };

            books.push(newBook);

            document.getElementById("bookTitle").value = '';
            document.getElementById("author").value = '';

            updateBookList();
        } else {
            alert("Please fill in both title and author.");
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-book")) {
            let index = event.target.getAttribute("data-index");
            books.splice(index, 1);
            updateBookList();
        } else if (event.target.classList.contains("edit-book")) {
            let index = event.target.getAttribute("data-index");
            let book = books[index];

            let updatedTitle = prompt("Enter updated title", book.title);
            let updatedAuthor = prompt("Enter updated author", book.author);

            if (updatedTitle && updatedAuthor) {
                book.title = updatedTitle;
                book.author = updatedAuthor;
                updateBookList();
            } else {
                alert("Please fill in both title and author.");
            }
        }
    });

    function updateBookList() {
        let bookList = document.getElementById("bookList");
        bookList.innerHTML = '';

        books.forEach(function (book, index) {
            let listItem = document.createElement("li");

            let bookInfo = document.createElement("span");
            bookInfo.textContent = `${book.title} by ${book.author}`;

            let editButton = document.createElement("button");
            editButton.className = "btn btn-info btn-sm float-right edit-book";
            editButton.setAttribute("data-index", index);
            editButton.textContent = "Edit";

            let removeButton = document.createElement("button");
            removeButton.className = "btn btn-danger btn-sm float-right remove-book";
            removeButton.setAttribute("data-index", index);
            removeButton.textContent = "Remove";

            listItem.appendChild(bookInfo);
            listItem.appendChild(editButton);
            listItem.appendChild(removeButton);

            bookList.appendChild(listItem);
        });
    }
});
