import axios from "axios";

const API_URL = "api/tickets";

//Get ticket notes
const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`/${API_URL}/${ticketId}/notes`, config);
  return response.data;
};

//Create new note
const createNote = async (noteText, ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  let newNote = {
    text: noteText,
  };
  const response = await axios.post(
    `/${API_URL}/${ticketId}/notes`,
    newNote,
    config
  );
  return response.data;
};

const noteService = { getNotes, createNote };

export default noteService;
