import React from "react"

export default function Sidebar(props) {



    const noteElements = props.notes.map((note, index) => {

        // making first line of note as the title of the note
        const noteBody = note.body;
        const bodyFirstLine = noteBody.split("\n")[0];

        return (<div key={note.id}>
            <div

                className={`title ${note.id === props.currentNote.id ? "selected-note" : ""
                    }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">{bodyFirstLine}</h4>

                <button
                    className="delete-btn"

                    // passing event to stop event propagation
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>)

    })

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Simple Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
