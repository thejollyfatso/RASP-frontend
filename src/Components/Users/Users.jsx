import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddUserForm({ setError, fetchUsers }) {
  const [name, setName] = useState('');
  const [num, setNum] = useState(0);

  const changeName = (event) => { setName(event.target.value); };
  const changeNum = (event) => { setNum(event.target.value); };

  const addUser = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8000/games', { name: name, numPlayers: num })
      .then(() => {
        setError('');
        fetchUsers();
      })
      .catch( (error) => { setError(error.response.data.message); });
  }

  return (
    <form>
      <label htmlFor="name">
        Name
      </label>
      <input type="text" id="name" value={name} onChange={changeName}/>
      <label htmlFor="num">
        Number of players
      </label>
      <input type="number" id="number" value={num} onChange={changeNum}/>
      <button type="submit" onClick={addUser}>Submit</button>
    </form>
  );
}

function Users() {
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
      axios.get('http://localhost:8000/games')
        .then((response) => { 
          const usersObject = response.data.Data;
          const keys = Object.keys(usersObject);
          const usersArray = keys.map((key) => usersObject[key]);
          setUsers(usersArray);
        })
        .catch(() => { setError('Something went wrong'); });
  };

  useEffect(
    fetchUsers,
    [],
  );

  return (
    <div className="wrapper">
      <h1>
        Users p2
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
    <AddUserForm setError={setError} fetchUsers={fetchUsers} />
    {users.map((user) => (
      <div className="user-container">
        <h2>{user.name}</h2>
        <p>Players: {user.numPlayers}</p>
      </div>
    ))}
    </div>
  );
}

export default Users;
