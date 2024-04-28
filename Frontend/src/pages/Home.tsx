// import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.state.name == undefined) navigate("/home");

  return (
    <>
      <h1>Vítej {location.state.name}</h1>
      <button
        type="button"
        onClick={() => {
          navigate("/addbook", {
            state: { name: location.state.name, id: location.state.id },
          });
        }}
      >
        Přidat knihy do databáze
      </button>
      {/* {users.map((user) => (
        <h1 key={user.id}>{user.name + user.password + user.books}</h1>
      ))} */}
    </>
  );
}
