import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Context from '../Context';
import FolderItem from '../FolderItem/FolderItem';
import CircleButton from '../CircleButton/CircleButton'
import '../CircleButton/CircleButton.css'

class FolderList extends Component {
  static contextType = Context;
  render() {
    let folders = this.context.folders
    return (
      // <Context.Consumer>
      <div>
        <div className='folders'>
          {folders.map(folder =>
            <FolderItem
              key={folder.id}
              folder={folder}
            />
          )}
        </div>
        <div className='add-folder'>
          <CircleButton
              tag={Link}
              to='/add-folder'
              type='button'
              className='add-button'
            >
            <br />
            Add Folder
          </CircleButton>
        </div>
      </div>
      // </Context.Consumer>
    )
  }
}

export default FolderList;
