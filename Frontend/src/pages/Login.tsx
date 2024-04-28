import { useNavigate } from "react-router-dom";
import { createUser, getUsers } from "../DatabaseCommands";

export default function Login() {
  const navigate = useNavigate();

  var users: User[];
  getUsers()
    .then((_users) => {
      users = _users;
    })
    .catch((error) => {
      console.error("Failed to fetch users:", error);
    });

  const login = (_name: string, _password: string) => {
    users.forEach((user) => {
      if (user.name == _name && user.password == _password) {
        navigate("/home", { state: { name: _name, id: user.id } });
      }
    });
    throwError("Neplatné jméno nebo heslo.");
  };

  const register = (_name: string, _password: string) => {
    if (_name.length == 0 || _password.length == 0) return;
    var failed = false;
    users.forEach((user) => {
      console.log(user.name);
      if (user.name == _name) {
        throwError("Uživatel s tímto jménem již existuje.");
        failed = true;
        return;
      }
    });
    if (!failed) {
      createUser({
        name: _name,
        password: _password,
      });
      navigate("/home", { state: { name: _name } });
    }
  };

  const throwError = (text: string) => {
    document.getElementsByClassName("error")[0].textContent = text;
  };

  return (
    <>
      <div className="menuContainer">
        <div>
          <p>
            <b>Jméno</b>
          </p>
          <input type="text" id="name"></input>
        </div>
        <div>
          <p>
            <b>Heslo</b>
          </p>
          <input type="password" id="password"></input>
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              login(
                (
                  document.getElementById("name") as HTMLInputElement
                )?.value.trim(),
                (
                  document.getElementById("password") as HTMLInputElement
                )?.value.trim()
              );
            }}
          >
            Přihlásit
          </button>
          <button
            type="button"
            onClick={() => {
              register(
                (
                  document.getElementById("name") as HTMLInputElement
                )?.value.trim(),
                (
                  document.getElementById("password") as HTMLInputElement
                )?.value.trim()
              );
            }}
          >
            Registrovat
          </button>
        </div>
        <p className="error"></p>
      </div>
    </>
  );
}
