import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
//Split its a component to split the screen
import Split from "react-split";
//Nanoid creates a unique ID
import { nanoid } from "nanoid";
import "./styles.css";

export default function App() {
  //try to recovered saved notes from local storage.
  //parse the recovered string as JSON
  //if not, initialize as empty array
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );

  //if notes[0] is true, localStorage at least recovered one note...
  //if false, initialize as empty string
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  // Everytime -notes- changes, save them to localStorage as string
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# New Note " + (notes.length + 1)
    };
    //add newNote first, the the rest of the notes and
    //assign it to notes (with setNotes)
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    //set the currentNoteId with the new note id
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // Put the most recently-modified note at the top
    setNotes((oldNotes) => {
      const newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          //if we find the selected id
          //unshift adds data at the begining of the array
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  function deleteNote(event, noteId) {
    //stop propagation so after executing delete won't try to select the note
    event.stopPropagation();
    //if (note.id !== noteId) expression returns false inside filter, it will filter it...
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
  }

  function findCurrentNote() {
    //returns the selected note as an object
    //if none selected, selects the first one
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      <div className="appBorder">
        {notes.length > 0 ? (
          <Split sizes={[30, 70]} direction="horizontal" className="split">
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote() /* assing value of function */}
              setCurrentNoteId={
                setCurrentNoteId /* assing function to dispatch */
              }
              newNote={createNewNote /* assing function to dispatch */}
              deleteNote={
                deleteNote /* assing function to dispatch | this function receives values back */
              }
            />
            {currentNoteId && notes.length > 0 && (
              <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
            )}
          </Split>
        ) : (
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button className="first-note" onClick={createNewNote}>
              Create one now
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
