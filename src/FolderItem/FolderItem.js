import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class FolderItem extends Component {
  render() {
    return (
      <div className='element' id={this.props.folder.id}>
          <Link to={`/folder/${this.props.folder.id}`}>
            { this.props.folder.name }
          </Link>
      </div>
    )
  }
}

FolderItem.propTypes = {
  folder: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default FolderItem;
