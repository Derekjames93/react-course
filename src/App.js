import React, { Component } from 'react';
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary'

class App extends Component {
  state = {
    persons: [
      {id:'asd2' ,name: 'Max', age: 28},
      {id:'sdasd1' ,name: 'Manu', age: 29},
      {id:'asds2',  name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value'
  }  

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    })

    const person = {
      ...this.state.persons[personIndex]}

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState( {persons:persons} )
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({
      // if doesShow is true set it to false vice versa
      showPersons: !doesShow
    })
  }

    deletePersonHandler = (personIndex) => {
      const persons = [...this.state.persons]
      persons.splice(personIndex, 1);
      this.setState({persons: persons})
    }

  render() {
    

    let persons = null
    let btnClass = [classes.Button]

    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <ErrorBoundary key={person.id}>

              <Person
              click= {() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              changed={event => this.nameChangedHandler(event, person.id)}
              />
              </ErrorBoundary>
            )
          })}
        </div>
      )
      btnClass.push(classes.Red);
    };
    


    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red) // classes = ['red']
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold) // classes = ['red', 'bold']
    }


    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button className={btnClass.join(' ')} onClick={this.togglePersonHandler}>
        Toggle Persons
        </button>
        {persons}
      </div>

    ); 
  }
}

export default App;
