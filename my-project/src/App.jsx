
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // GitHub API Connect
  const getUsers = async () => {
    try {
      const response = await fetch(
        "https://api.github.com/users?per_page=30"
      );

      if (!response.ok) {
        throw new Error("API data not found");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (loading) {
    return <h2 className="status">Loading Users...</h2>;
  }

  if (error) {
    return <h2 className="status">Error: {error}</h2>;
  }

  return (
    <div className="container">
      <h1>GitHub Users</h1>

      <div className="card-container">
        {users.map((user) => (
          <div className="profile-card" key={user.id}>
            <img
              src={user.avatar_url}
              alt={user.login}
            />

            <h2>{user.login}</h2>

            <p>ID: {user.id}</p>

            <p>Type: {user.type}</p>

            <p>Admin: {user.site_admin ? "Yes" : "No"}</p>

            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
