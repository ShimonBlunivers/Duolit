import { useLocation } from "react-router-dom";
import {
  createAuthor,
  createBook,
  createUserBookConnection,
  getUserBooks,
} from "../DatabaseCommands";
import { useState } from "react";

var user_id = -1;

const addToDatabase = (
  book_name: string,
  author_name: string,
  genre: string,
  add_to_account: boolean
) => {
  createAuthor({
    name: author_name,
  });
  createBook({
    name: book_name,
    genre: genre,
    author: author_name,
  });

  if (add_to_account) {
    createUserBookConnection(
      {
        id: user_id,
      },
      {
        name: book_name,
      },
      {
        name: author_name,
      }
    );
  }
};

const handleInput = () => {
  const book_name = (
    document.getElementById("book_name") as HTMLInputElement
  )?.value.trim();
  const author_name = (
    document.getElementById("author_name") as HTMLInputElement
  )?.value.trim();
  const genre = (
    document.getElementById("genre") as HTMLSelectElement
  )?.value.trim();

  const addToAccount = (
    document.getElementById("add_to_account") as HTMLInputElement
  )?.checked;

  if (book_name.length == 0 || author_name.length == 0) return;

  addToDatabase(book_name, author_name, genre, addToAccount);
};
// navigate("/addbook", { state: { name: location.state.name } }) BACK
export default function AddBook() {
  const location = useLocation();

  user_id = location.state.id;

  const updateUserBooks = () => {
    getUserBooks(user_id)
      .then((_user_books) => {
        let books: Book[] = [];
        _user_books.forEach(
          (user_book: {
            id: number;
            name: string;
            genre_name: string;
            author_name: string;
          }) => {
            books.push({
              id: user_book.id,
              name: user_book.name,
              genre: user_book.genre_name,
              author: user_book.author_name,
            });
          }
        );

        setUserBooks(books);
      })
      .catch((error) => {
        console.error("Failed to fetch user_books:", error);
      });
  };
  const [userBooks, setUserBooks] = useState<Book[]>([]);

  console.log(userBooks);
  return (
    <>
      <p>{location.state.name}</p>
      <div className="row">
        <div className="column">
          <div>
            <p>Přidat do svých knih</p>
            <input type="checkbox" id="add_to_account" />
          </div>
          <div>
            <p>
              <b>Název knihy</b>
            </p>
            <input type="text" id="book_name"></input>
          </div>
          <div>
            <p>
              <b>Jméno autora</b>
            </p>
            <input type="text" id="author_name"></input>
          </div>
          <div>
            <p>
              <b>Žánr</b>
            </p>
            <select id="genre">
              <option value="Próza">Próza</option>
              <option value="Poezie">Poezie</option>
              <option value="Drama">Drama</option>
            </select>
          </div>
          <button
            type="button"
            onClick={() => {
              handleInput();
            }}
          >
            Přidat knihu do databáze
          </button>
        </div>

        <div className="column">
          <div className="bookList">
            <table border={1}>
              <tr>
                <td className="bookListItem">Číslo</td>
                <td className="bookListItem">Kniha</td>
                <td className="bookListItem">Autor</td>
              </tr>
              {userBooks.map((book, index) => (
                <tr>
                  <td className="bookListItem">{index + 1 + "."}</td>
                  <td className="bookListItem">{book.name}</td>
                  <td className="bookListItem">{book.author}</td>
                </tr>
              ))}
            </table>
          </div>
          <button
            type="button"
            onClick={() => {
              updateUserBooks();
            }}
          >
            Obnovit knihy
          </button>
        </div>
      </div>
    </>
  );
}
