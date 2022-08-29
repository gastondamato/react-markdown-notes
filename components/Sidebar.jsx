import React from "react";
import { MdEditNote } from "react-icons/md";

export default function Sidebar(props) {
  const noteElements = props.notes.map((note, index) => (
    <div key={note.id}>
      <div
        className={`note title ${
          note.id === props.currentNote.id ? "selected-note" : ""
        }`}
        onClick={
          () =>
            props.setCurrentNoteId(
              note.id
            ) /* arrow function to pass argument back */
        }
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        <button
          className="delete-btn"
          onClick={
            (event) =>
              props.deleteNote(
                event,
                note.id
              ) /* arrow function with event to be able to send 2 arguments back including event as its needed to stopPropagation */
          }
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button
          className="new-note"
          onClick={props.newNote /* call function w/o argument */}
        >
          <MdEditNote size="25" />
        </button>
      </div>
      {noteElements}
    </section>
  );
}
