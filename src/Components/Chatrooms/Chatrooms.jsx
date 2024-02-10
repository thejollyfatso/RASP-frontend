import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddChatroomForm({ setError, fetchChatrooms }) {
  const [description, setDescription] = useState('');

  const changeDescription = (event) => { setDescription(event.target.value); };

  const addChatroom = (event) => {
    event.preventDefault();
    //axios.post('http://localhost:8000/users', { name: name })
    axios.post('http://thejollyfatso.pythonanywhere.com/get_chatrooms', { description: description })
      .then(() => {
        setError('');
        fetchChatrooms();
      })
      .catch( (error) => { setError(error.response.data.message); });
  }

  return (
    <form>
      <label htmlFor="chatroom">
        Chatroom
      </label>
      <input type="text" id="chatroom" value={description} onChange={changeDescription}/>
      <button type="submit" onClick={addChatroom}>Submit</button>
    </form>
  );
}

function Chatrooms() {
  const [error, setError] = useState('');
  const [chatrooms, setChatrooms] = useState([]);

  const fetchChatrooms = () => {
      //axios.get('http://localhost:8000/users')
      axios.get('http://thejollyfatso.pythonanywhere.com/get_chatrooms')
        .then((response) => { 
          const chatroomsObject = response.data;
          const keys = Object.keys(chatroomsObject);
          const chatroomsArray = keys.map((key) => ([ key, chatroomsObject[key].description ]));
          const chatroomsFetch = chatroomsArray.map(([name, description]) => ({
            name,
            description
          }));
          setChatrooms(chatroomsFetch); 
        })
        .catch(() => { setError('Something went wrong'); });
  };

  useEffect(
    fetchChatrooms,
    [],
  );

  return (
    <div className="wrapper">
      <h1>
        Chatrooms
      </h1>
      {error && (
        <div className="error-message">
        {error}
        </div>
      )}
    <AddChatroomForm setError={setError} fetchChatrooms={fetchChatrooms} />
    {chatrooms.map((chatroom) => (
      <div className="chatroom-container">
        <h2>{chatroom.name}</h2>
        <p>{chatroom.description}</p>
      </div>
    ))}
    </div>
  );
}

export default Chatrooms;
