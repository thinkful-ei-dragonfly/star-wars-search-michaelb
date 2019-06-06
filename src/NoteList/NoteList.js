import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Context from '../Context';
import Note from '../Note/Note';
import CircleButton from '../CircleButton/CircleButton'
import '../CircleButton/CircleButton.css'

class NoteList extends Component {
  static contextType = Context;
  render() {
    let notes = this.context.notes
    if (this.props.match) {
      const folderId = this.props.match.url.split('folder/')[1];
      notes = notes.filter(note => note.folderId === folderId);
    }
    return (
      <div>
        <div className='notes-list'>
          {notes.map(note =>
            <Note
              key={note.id}
              noteId={note.id}
            />
          )}
        </div>
        <div className='add-note'>
        <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='add-button'
          >
            <br />
            Add Note
          </CircleButton>
        </div>
      </div>
    )
  }
}

export default NoteList;
