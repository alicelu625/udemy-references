import React, { Component } from 'react'; //from react library
//React - responsible for rendering
import './App.css';
import Person from './Person/Person.js';

class App extends Component {
  //initial states
  state = {
    persons: [
      {id: 'asd1', name: 'Max', age: 28},
      {id: 'asd2', name: 'Manu', age:29},
      {id: 'asd3', name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  //Change name to user input
  nameChangedHandler = (event, id) => { //event - what the user entered
    const personIndex = this.state.persons.findIndex(p => { //p = person we're looking for
      return p.id === id; // return true if it is the person we're looking for
    });
    //create new JavaScript object
    const person = {
      ...this.state.persons[personIndex] //distribute properties of the object into new object
    }
    //Alternative: const person = Object.assign({}, this.state.persons[personIndex]);
    person.name = event.target.value; //update name
    //update array at position fetched
    const persons = [...this.state.persons];
    persons[personIndex]=person;

    this.setState({persons:persons});
  }

  //Removes person upon click on person
  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons.slice(); //copys array & returns new one - update immutably
    //Alternative (ES6): const persons = [...this.state.persons];
    persons.splice(personIndex, 1); //removes 1 element from array at index
    this.setState({persons: persons}) //update state
  }

  //Show/not show list of persons
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    // if doesShow = true, then showPersons = false (vise versa)
    this.setState({showPersons: !doesShow});
  }

  render() { //Reach calls this method to render something to screen
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };
    
    let persons = null;

    //if showPersons = true, then persons holds the JSX code
    if (this.state.showPersons) {
      persons = (
        <div>
          {/*Vanilla JavaScript, ES6*/}
          {/*method maps every single element in JavaScript array into JSX element*/}
          {this.state.persons.map((person, index) => { {/*takes element of array*/}
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hello World!</h1>
        <p>This is working</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>
          {persons}
      </div>
    );
    /*Alternative return:
    return(React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello World')));*/
  }
}

export default App;
