import React from 'react'
import ValidationError from '../ValidationError'
import Context from '../Context'

export default class AddNote extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '',
        content: '',
        folderId: '',
        formValid: false,
        validationMessages: {
            name: '',
            content: '',
            folder: ''
          }
      }
  }
  static defaultProps ={
      onAddNote: () => {},
  }

  componentDidMount() {
    this.setState({
      folderId: this.context.folders[0].id
    });
  }

  updateName(name) {
    this.setState({name}, () => {this.validateName(name)});
  }

  updateContent(content) {
    this.setState({content}, () => {this.validateContent(content)});
  }

  updateFolder(folderId) {
    this.setState({
      folderId: folderId
    });
  }

  handleSubmit(event) {
    event.preventDefault();        
    const note = {
      name: this.state.name,
      content: this.state.content,
      modified: new Date(),
      folderId: this.state.folderId
    }
    fetch(`${this.context.BASE_URL}/notes/`, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
            'content-type': 'application/json'
        }    
    })
    .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(data => {
        this.context.handleAddNote(data)
        this.props.history.push(`/folder/${data.folderId}`)
      })
      .catch(error => {
      })
  }
  
  validateName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.name = 'Name must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.name = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError
    }, () => {
      this.validateForm();
    });
  }

  validateContent(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    fieldValue = fieldValue.trim();
    if (fieldValue.length === 0) {
      fieldErrors.content = 'Content is required';
      hasError = true;
    } else {
      if (fieldValue.length < 3) {
        fieldErrors.content = 'Content must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.content = '';
        hasError = false;
      }
    }

    this.setState({
      validationMessages: fieldErrors,
      contentValid: !hasError
    }, () => {
      this.validateForm();
    });
  }

  validateForm = () => {
    this.setState({
        formValid: this.state.nameValid && this.state.contentValid
    });
  }

  static contextType = Context;

  render() {
    const folders = this.context.folders;
    return (
      <form className="add_note" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Note</h2>
        <div className="name-group">
          <p>
            <label htmlFor="name">Select Folder</label>
            {' '}
            <select name='folder-select' id='folder-select' onChange={e => this.updateFolder(e.target.value)} value={this.state.folderId}>
            {folders.map(folder => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
          </select>
          </p>
          <p>
            <label htmlFor="name">Note Name</label>
            {' '}
            <input type="text" className="note__control"
            name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
          </p>
          <p>
            <label htmlFor="content">Note Content</label>
            {' '}
            <textarea
            name="note-content" id="content" onChange={e => this.updateContent(e.target.value)}/>
          </p>
          <button disabled={!this.state.formValid} type="submit">Add note</button>
        </div>
        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>  
        <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.content}/>  
      </form>
    )
  }
}