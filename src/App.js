import React, {Component} from 'react'
import './App.css';
import background from './background.png';
import ETModal from './ETModal.js';

import e0 from './assets/e0.png';
import e1 from './assets/e1.png';
import e2 from './assets/e2.png';
import e3 from './assets/e3.png';

var sectionStyle = {
  width: "100vw",
  height: "100vh",
  backgroundImage: `url(${ background })`,
  backgroundSize: "cover",
  margin: "0",
  padding: "0",
};

class App extends Component {
  constructor(props){ 
    super(props)

    this.openModal = this.openModal.bind(this) 
    this.closeModal = this.closeModal.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.getImage = this.getImage.bind(this)
  } 

  state = {
    isModalOpen: false,
    aliens: [ {name: "Judy", character: "3"}],
    isEditing: false
  } 

  componentDidMount() {
    const apiUrl = 'https://crudcrud.com/api/834b4bf37db14260a7d3b13277f499e0/et';
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({aliens: data})
        console.log(this.state.aliens)
      });
  }

  openModal() {
    this.setState({ isModalOpen: true})
  }

  closeModal() {
    this.setState({ isModalOpen: false})
  }

  getImage(value) {
    if (value == "0") {
      return e0
    } else if (value == "1") {
      return e1
    } else if (value == "2") {
      return e2
    } else {
      return e3
    }
  }
  
  deleteAlien(alien){
    const apiUrl = `https://crudcrud.com/api/834b4bf37db14260a7d3b13277f499e0/et/${alien._id}`;
    fetch(apiUrl, {
     method: 'DELETE'
    })
  }

  render() {
    return (
      <div className="App">
        <section style={sectionStyle}>
          <h1 > Aliens CRUD </h1>

          <div className="charactersColumn">
          {this.state.aliens.map((alien) => {
              return (
                <div className="characterBox">
                  <h2 className="aliensName"> {alien.name} </h2>
                  <img className="aliensPicture" src={this.getImage(alien.character)} onClick={() => this.setState({isEditing: true})}/>
                  <button className="aliensDeleteButton" onClick={() => this.deleteAlien(alien)}> Deletar </button>
                  {this.state.isEditing ? <ETModal clickHandler={() => this.setState({isEditing: false})} aliens={this.state.aliens} id={alien.id}/> : null}
                </div>
            )})}
            <div className="characterBox">
              <h2 className="aliensName"> Novo </h2>
              <button onClick={this.openModal} className="newCharacterButton"> + </button>
            </div>
          </div>

          { this.state.isModalOpen ? <ETModal clickHandler={this.closeModal} aliens={this.state.aliens}/> : null}
        </section>
      </div>
    );
  }
}

export default App;
