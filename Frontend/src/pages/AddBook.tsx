import { useLocation } from "react-router-dom";
import {
  createAuthor,
  createBook,
  createUserBookConnection,
} from "../DatabaseCommands";

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
  return (
    <>
      <p>{location.state.name}</p>
      <div className="menuContainer">
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
    </>
  );
}
