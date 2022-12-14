import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditNote() {
  const [note, setNote] = useState({
    title: "",
    content: "",
    date: "",
    id: "",
  });
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem("tokenStore");
      if (id) {
        const res = await axios.get(`/api/notes/${id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [id]);

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("tokenStore");
      if (token) {
        const { title, content, date, id } = note;
        const newNote = {
          title,
          content,
          date,
        };

        await axios.put(`/api/notes/${id}`, newNote, {
          headers: { Authorization: token },
        });

        return history.push("/");
      }
    } catch (err) {
      window.location.href = "/";
    }
  };

  return (
    <div className="center">
      <h2>Create Note</h2>
      <form onSubmit={editNote} autoComplete="off">
        <div className="txt_field">
          <input
            type="text"
            value={note.title}
            id="title"
            name="title"
            required
            onChange={onChangeInput}
          />
          <label>Title</label>
        </div>

        <div className="row">
          <div className="txt_field1">
            <label>Content</label>
          </div>

          <textarea
            type="text"
            value={note.content}
            id="content"
            name="content"
            required
            rows="10"
            onChange={onChangeInput}
          />
        </div>

        <div className="txt_field">
          <input
            type="date"
            id="date"
            name="date"
            onChange={onChangeInput}
            value={note.date}
          />
          <label>Date </label>
        </div>

        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
export default EditNote;
