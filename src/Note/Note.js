import React, { Component } from 'react';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import Context from '../Context';

class Note extends Component {
  static contextType = Context;

  deleteNote = noteId => {
    this.props.history.push(`/`)
    fetch(`${this.context.BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.handleDelete(noteId)
        
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const note = this.context.notes.find(note => note.id === this.props.noteId)
    return (
      <div className='element' id={note.id}>
        <div className='note'>
          <Link to={`/note/${note.id}`}>
            { note.name }
          </Link>
        </div>

        <button
          className='delete-note right'
          type='button'
          onClick={ () => this.deleteNote(note.id) }
        >
          Delete
        </button>
        <div className='date'>
          Modified
          {' '}
          {format(note.modified, 'Do MMM YYYY')}
        </div>
      </div>
    )
  }
}

Note.propTypes = {
  noteId: PropTypes.string.isRequired
};

export default withRouter(Note);
