export const createUser = async (user: User) => {
  fetch("http://192.168.0.169:8081/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export const createBook = async (book: Book) => {
  fetch("http://192.168.0.169:8081/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export const createUserBookConnection = async (
  user: User,
  book: Book,
  author: Author
) => {
  fetch("http://192.168.0.169:8081/user_has_books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: user.id,
      book_name: book.name,
      author_name: author.name,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export const createAuthor = async (author: Author) => {
  fetch("http://192.168.0.169:8081/authors", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(author),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch("http://192.168.0.169:8081/users");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const users: User[] = await response.json();
    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await fetch("http://192.168.0.169:8081/books");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const books: Book[] = await response.json();
    return books;
  } catch (err) {
    throw err;
  }
};
