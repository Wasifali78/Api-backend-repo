import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users?per_page=30")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <h1>GitHub Users Profile</h1>

      <div className="card-container">
        {users.map((user) => {
          return (
            <div className="card" key={user.id}>
              <img src={user.avatar_url} alt={user.login} />

              <h2>{user.login}</h2>

              <p>ID: {user.id}</p>

              <p>Type: {user.type}</p>

              <a href={user.html_url} target="_blank" rel="noreferrer">
                View Profile
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
