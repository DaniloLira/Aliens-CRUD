import  React, {Component} from "react";
import background from './background.png';
import bigPictureGreenET from './assets/bigPictureGreenET.png';
import bigPictureYellowET from './assets/bigPictureYellowET.png';
import bigPicturePurpleET from './assets/bigPicturePurpleET.png';
import bigPictureAstronaut from './assets/bigPictureAstronaut.png';

import "./ETModal.css";

class ETModal extends Component {
    constructor(props) {
        super(props);
        this.state = {name: props.name, character: props.character, id: props.id, backgroundURL: bigPictureGreenET};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeCharacter = this.changeCharacter.bind(this);
      }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    changeCharacter(changeEvent){
        let value = changeEvent.target.value 
        if (value == "0") {
            this.setState({backgroundURL: bigPictureGreenET, character: value})
        } else if (value == "1") {
            this.setState({backgroundURL: bigPicturePurpleET, character: value})
        } else if (value == "2") {
            this.setState({backgroundURL: bigPictureYellowET, character: value})
        } else if (value == "3") {
            this.setState({backgroundURL: bigPictureAstronaut, character: value})
        }
    }

    handleSubmit(event) {
        let et = {
            name: this.state.name, 
            character: this.state.character,
        }
        console.log(this.state.id)
        const requestOptions = {
            method: this.state.id == null ? 'POST' : 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(et)
        };

        fetch('https://crudcrud.com/api/834b4bf37db14260a7d3b13277f499e0/et', requestOptions)
            .then(response => response.json())
            .then( data => {
                this.props.aliens.push(data)
            })
        
        alert( this.state.id == null ? 'Um novo ET foi criado' : 'O ET foi atualizado');
        
        this.props.clickHandler()
        event.preventDefault();
      }
    render () {
        return(
            <div className="ETModal">
                <div className="ETBigPicture">
                    <img src={this.state.backgroundURL}/>
                </div>

                <div className="ChooseCharacter" >
                    <div className="column">
                        <input type="radio" id="GreenET" name="ETPicture"  value="0" onChange={this.changeCharacter} checked={this.changeCharacter}/>
                        <label htmlFor="GreenET" id="GreenETLabel"></label>
                    </div>

                    <div className="column" >
                        <input type="radio" id="PurpleET" name="ETPicture" value="1" onChange={this.changeCharacter} checked={this.changeCharacter}/>
                        <label htmlFor="PurpleET" id="PurpleETLabel"></label>
                    </div>

                    <div className="column" >
                        <input type="radio" id="YellowET" name="ETPicture"  value="2" onChange={this.changeCharacter} checked={this.changeCharacter}/>
                        <label htmlFor="YellowET" id="YellowETLabel"></label>
                    </div>

                    <div className="column" >
                        <input type="radio" id="Astronaut" name="ETPicture"  value="3" onChange={this.changeCharacter} checked={this.changeCharacter}/>
                        <label htmlFor="Astronaut" id="AstronautLabel"></label>
                    </div>

                </div>
                
                <input type="text" value={this.state.name} placeholder="Nome do seu ET" onChange={this.handleChange} className="nameInput"/> 
                
                <button onClick={this.handleSubmit} className="submitButton"> {this.state.id == undefined ? "Criar" : "Editar"}</button>

            </div>
        )
    }
}

export default ETModal