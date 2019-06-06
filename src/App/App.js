import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Context from '../Context';
import HandleError from '../HandleError/HandleError';
import FolderList from '../FolderList/FolderList';
import NoteList from '../NoteList/NoteList';
import NoteItem from '../NoteItem/NoteItem';
import NoteItemNav from '../NoteItemNav/NoteItemNav';
import AddFolder from '../AddFolder/AddFolder';
import AddNote from '../AddNote/AddNote';
import './App.css'; 

const BASE_URL = 'http://localhost:9090';

class App extends Component {
  state = {
    notes: [],
    folders: [],
  };

  componentDidMount() {
    fetch(`${BASE_URL}/db`)
    .then(res => res.json())
      .then(res => {this.setState(res)})
  }

  handleAddFolder = (folder) => {
    this.setState ({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddNote = (note) => {
    this.setState ({
      notes: [
        ...this.state.notes,
        note
      ]
    })
  }

  handleDelete = (noteId) => {
    this.setState ({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }

  render() {
    const value = {
      BASE_URL: BASE_URL,
      folders: this.state.folders,
      notes: this.state.notes,
      handleAddFolder: this.handleAddFolder,
      handleAddNote: this.handleAddNote,
      handleDelete: this.handleDelete
    }
    return (
      <HandleError>
        <Context.Provider value={value}>
          <div>
            <header>
              <Link to='/'>Noteful</Link>
            </header>
            <nav>
              <Route
                exact
                path="/"
                render={() => <FolderList />}
              />
              <Route
                exact
                path="/note/:noteId"
                render={routeProps => {
                  return (
                    <NoteItemNav
                      {...routeProps}
                    />
                  )
                }}
              />
              <Route
                exact
                path="/folder/:folderId"
                render={() => <FolderList />}
              />
            </nav>
            <main>
              <Route
                exact
                path="/"
                render={() =>
                  <NoteList />}
              />
              <Route
                exact
                path="/folder/:folderId"
                render={routeProps => {
                  return (
                    <NoteList
                      {...routeProps}
                    />
                  )
                }}
              />
              <Route
                exact
                path="/note/:noteId"
                render={routeProps => {
                  return (
                    <NoteItem
                      {...routeProps}
                      noteId={routeProps.match.params.noteId}
                    />
                  )
                }}
              />
              <Route
                exact
                path="/add-folder"
                render={routeProps => {
                  return (
                    <AddFolder
                      {...routeProps}
                    />
                  )
                }}
              />
              <Route
                exact
                path="/add-note"
                render={routeProps => {
                  return (
                    <AddNote
                      {...routeProps}
                    />
                  )
                }}
              />
            </main>
          </div>
        </Context.Provider>
      </HandleError>
    )
  }
}

export default App;
