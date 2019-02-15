import React, { Component } from 'react';
import FormsList from "./FormsList";

class App extends Component {
  state = {
    database: [],
  };

  handleOnClickAdd = () => {
    const tempDatabase = [...this.state.database];
    const tempId = Date.now();
    tempDatabase.push({questionText: '', inputType: 'text', children: [], id: tempId});
    this.setState( {
      database: tempDatabase
    })
  };

  handleOnClickDelete(event, id){
    event.preventDefault();
    if(!this.state.database[id].children.length) {
      const elements = [...this.state.database];
      elements.splice(id, 1);
      this.setState({
        database: elements
      })
    }else{
        alert('You can not changed this field if existing any sub-forms!');
      }
  };

  updateDatabase = (updatedElement, id) => {
    const elements = [...this.state.database];
    elements.splice(id, 1, updatedElement);
    this.setState({
      database: elements,
    })
  };


  render() {
    return (
      <main className={'wrapper'}>
        <h1 className={'app-title'}>Form Builder</h1>
        <FormsList
            database={this.state.database}
            updateDatabase={this.updateDatabase}
            handleOnClickDelete={this.handleOnClickDelete.bind(this)}
        />
        <button onClick={this.handleOnClickAdd}
                className={'app-btn app-btn--main'}
                data-content={'Add Input'}
        >Add Input</button>
      </main>
    );
  }

  componentWillMount() {
    this.requestOpenDatabase = window.indexedDB.open("data", 1);

    this.requestOpenDatabase.onerror = () => {
      console.log("Error loading IndexedDB!");
    };
    this.requestOpenDatabase.onsuccess = event => {
      console.log("IndexedDB is loaded!");
      this.databaseIDB = this.requestOpenDatabase.result;
      this.transaction = this.databaseIDB.transaction(['database'], 'readwrite');
      this.store = this.transaction.objectStore('database');
      this.request = this.store.get(1);
      this.request.onsuccess = event => {
        if(this.request.result !== undefined){
          this.setState({
            database: this.request.result,
          })
        }
      }
    };

    this.requestOpenDatabase.onupgradeneeded = event => {
      console.log("Created new IndexedDB database!");
      this.requestOpenDatabase.result.createObjectStore('database');
    };
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.databaseIDB = this.requestOpenDatabase.result;
    this.transaction = this.databaseIDB.transaction(['database'], 'readwrite');
    this.store = this.transaction.objectStore('database');
    this.store.put(nextState.database, 1);
  }
}

export default App;
