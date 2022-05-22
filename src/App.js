import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { nanoid } from "nanoid"

import { useState, useEffect } from "react";

export default function App() {


  const [notes, setNotes] = useState(
    () => {
      // lazy loading notes array from local storage in first load
      const notesFromLocalStorage = JSON.parse(localStorage.getItem("notes"));
      return notesFromLocalStorage || []
    }
  )

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  )

  //saving notes in local storage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: `# Note ${notes.length + 1} title`
    }
    setNotes(prevNotes => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote(text) {

    setNotes(oldNotes => {

      // placing the current modified note at the top of the list
      // my way 
      const currentNote = oldNotes.find(note => note.id === currentNoteId);
      const otherNotes = oldNotes.filter(note => note.id !== currentNoteId);
      return [{ ...currentNote, body: text }, ...otherNotes]

    })

    // instructor's way
    // setNotes(oldNotes => {
    //   const newArray = []
    //   for (let i = 0; i < oldNotes.length; i++) {
    //     const oldNote = oldNotes[i]
    //     if (oldNote.id === currentNoteId) {
    //       newArray.unshift({ ...oldNote, body: text })
    //     } else {
    //       newArray.push(oldNote)
    //     }
    //   }
    //   return newArray
    // })


  }

  function deleteNote(event, noteId) {
    event.stopPropagation()
    setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId));
  }

  function findCurrentNote() {
    return notes.find(note => {
      return note.id === currentNoteId
    }) || notes[0]
  }

  return (
    <main>
      {
        notes.length > 0
          ?
          <Split
            sizes={[30, 70]}
            direction="horizontal"
            className="split"
          >
            <Sidebar
              notes={notes}
              currentNote={findCurrentNote()}
              setCurrentNoteId={setCurrentNoteId}
              newNote={createNewNote}
              deleteNote={deleteNote}
            />
            {
              currentNoteId &&
              notes.length > 0 &&
              <Editor
                currentNote={findCurrentNote()}
                updateNote={updateNote}
              />
            }
          </Split>
          :
          <div className="no-notes">
            <h1>You have no notes</h1>
            <button
              className="first-note"
              onClick={createNewNote}
            >
              Create one now
            </button>
          </div>
      }
    </main>
  )
}
