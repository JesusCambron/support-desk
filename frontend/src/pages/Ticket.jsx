import React, { useState } from "react";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getTicket, closeTicket } from "../features/tickets/ticketsSlice";
import {
  getNotes,
  reset as notesReset,
  createNote,
} from "../features/notes/noteSlice";
import NoteItem from "../components/NoteItem";

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function Ticket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { ticket, isLoading, isError, message } = useSelector(
    (state) => state.tickets
  );
  const {
    notes,
    isLoading: notesIsLoading,
    message: noteMessage,
  } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const { ticketId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [isError, message, ticketId, dispatch, noteMessage]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success("Ticket was closed");
    navigate("/tickets");
  };

  const modalAction = () => {
    setModalIsOpen(!modalIsOpen);
  };

  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    modalAction();
  };

  return (
    <>
      {isLoading || notesIsLoading ? (
        <>
          <Spinner />
        </>
      ) : isError ? (
        <>
          <h3>Something Went Wrong</h3>
        </>
      ) : (
        <>
          <div className="ticket-page">
            <header className="ticket-header">
              <BackButton url="/tickets" />
              <h2>
                Ticket Id: {ticket._id}
                <span className={`status status-${ticket.status}`}>
                  {ticket.status}
                </span>
              </h2>
              <h3>
                Date Submitted:{" "}
                {new Date(ticket.createdAt).toLocaleString("en-US")}
              </h3>
              <h3>Product: {ticket.product}</h3>
              <hr />
              <div className="ticket-desc">
                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
              </div>
              <h2>Notes</h2>
            </header>

            {ticket.status !== "closed" && (
              <button onClick={modalAction} className="btn">
                {" "}
                <FaPlus />
                Add Note
              </button>
            )}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={modalAction}
              style={customStyles}
              contentLabel="Add Note"
            >
              <h2>Add Note</h2>
              <button className="btn-close" onClick={modalAction}>
                X
              </button>
              <form onSubmit={onNoteSubmit}>
                <div className="form-group">
                  <textarea
                    name="noteText"
                    id="noteText"
                    className="form-control"
                    placeholder="Note text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <button className="btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </Modal>
            {notes.map((note) => (
              <NoteItem key={note._id} note={note} />
            ))}
            {ticket.status !== "closed" && (
              <button
                onClick={onTicketClose}
                className="btn btn-block btn-danger"
              >
                Close Ticket
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Ticket;
