import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class NoteItemNav extends Component {
  handleClick = (history) => {
    history.goBack();
  }
  render() {
    return (
      <div className='go-back'>
        <button  onClick={ () => this.handleClick(this.props.history)}>
          Back
        </button>
      </div>
    )
  }
}

export default withRouter(NoteItemNav);
