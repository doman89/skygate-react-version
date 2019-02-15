import React, { Component } from 'react';
import FormsList from "./FormsList";

class App extends Component {
  state = {
    database: [],
  };

  handleOnClick = () => {
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
      <main>
        <p>Form Builder</p>
        <FormsList
            database={this.state.database}
            updateDatabase={this.updateDatabase}
            handleOnClickDelete={this.handleOnClickDelete.bind(this)}
        />
        <button onClick={this.handleOnClick}>Add Input</button>
      </main>
    );
  }
}

export default App;
