import React from 'react'
import ValidationError from '../ValidationError'
import Context from '../Context'

export default class AddFolder extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        name: '',
        formValid: false,
        validationMessages: {
            name: ''
          }
      }
  }
  static defaultProps ={
      onAddFolder: () => {},
    }
  updateName(name) {
      this.setState({name}, () => {this.validateName(name)});
    }

  handleSubmit(event) {
    event.preventDefault();        
    const note = {
      name: this.state.name
    }
    fetch(`${this.context.BASE_URL}/folders/`, {
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
        this.context.handleAddFolder(data)
        this.props.history.push(`/`)
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

  validateForm = () => {
    this.setState({
        formValid: this.state.nameValid
    });
  }

  static contextType = Context;

  render() {
    return (
      <form className="add_note" onSubmit={e => this.handleSubmit(e)}>
        <h2>Add Folder</h2>
        <div className="name-group">
          <p>
            <label htmlFor="name">Folder Name</label>
            {' '}
            <input type="text" className="note__control"
            name="name" id="name" onChange={e => this.updateName(e.target.value)}/>
          </p>
          <button disabled={!this.state.formValid} type="submit">Add Folder</button>
        </div>
        <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name}/>  
      </form>
    )
  }
}