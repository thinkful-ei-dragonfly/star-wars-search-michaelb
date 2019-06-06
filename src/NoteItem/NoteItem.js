import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Note from '../Note/Note';
import Context from '../Context';

class NoteItem extends Component {
  static contextType = Context;
  render() {
    const note = this.context.notes.find(note => note.id === this.props.noteId)
    return (
      <div>
        <Note
          noteId = {note.id}
        />
        <div>
          <div className='content'>
            { note.content }
          </div>
        </div>
      </div>
    )
  }
}

NoteItem.propTypes = {
  noteId: PropTypes.string.isRequired
};

export default NoteItem;
