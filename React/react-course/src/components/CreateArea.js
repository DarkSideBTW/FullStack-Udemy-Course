import React from 'react';
import { useState } from 'react';

const CreateArea = (props) => {
  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return { ...prevNote, [name]: value };
    });
  };

  const submitNote = (event) => {
    event.preventDefault();

    props.onAdd(note);
  };

  return (
    <div>
      <form>
        <input
          name="title"
          value={note.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={note.content}
          onChange={handleChange}
        ></textarea>
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
};

export default CreateArea;
