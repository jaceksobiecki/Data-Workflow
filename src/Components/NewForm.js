import React, {Component} from "react"
import InputField from "./InputField";
import StateField from "./StateField";
import Field from "./Field"
import State from "./State"


class NewForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            formName: "",
            owner: this.props.username,
            cooperators: [],
            inputFields : [],
            stateFields: [],
            currentState: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleStateChange = this.handleStateChange.bind(this)
        this.handleFormNameChange = this.handleFormNameChange.bind(this)
        this.addField = this.addField.bind(this)
        this.addState = this.addState.bind(this)
        this.deleteField = this.deleteField.bind(this)
        this.deleteState = this.deleteState.bind(this)
        this.addField()
        this.addState()
    }

    addField() {
        const updatedFields = this.state.inputFields
        updatedFields.push(new Field())
        this.setState({
            inputFields: updatedFields
        });
    }

    addState() {
        const updatedStates = this.state.stateFields
        updatedStates.push(new State())
        this.setState({
            stateFields: updatedStates
        });
    }

    deleteField(event){
        const updatedFields = this.state.inputFields
        const id = event.target.id
        updatedFields.splice(id,1)
        this.setState({
            inputFields: updatedFields,
        });
    }

    deleteState(event){
        const updatedStates = this.state.stateFields
        const id = event.target.id
        updatedStates.splice(id,1)
        this.setState({
            stateFields: updatedStates,
        });
    }



    sendData(){
        fetch('http://localhost:9000/saveFormReq', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reqType: "save",
                form: this.state
            })
        })
            .then(res => res.text())
    }

    handleSubmit(event) {
        const newState = this.state.stateFields[0]
        let newCooperators=[];
        for (let i=0;i<this.state.stateFields.length;i++){
            newCooperators.push(this.state.stateFields[i].assignedTo)
        }
        this.setState({
            currentState: newState,
            cooperators: newCooperators
        }, function () {
            this.sendData()
        });
    }
    handleFormNameChange(event){
        const {value} = event.target
        this.setState({
            formName: value
        });
    }

    handleInputChange(event) {
        const updatedFields = this.state.inputFields
        const {id, name, value} = event.target
        const newField = updatedFields[id];
        newField[name] = value;
        updatedFields[id] = newField
        this.setState({
            inputFields: updatedFields
        });
    }

    handleStateChange(event) {
        const updatedStates = this.state.stateFields
        const {id, name, value} = event.target
        const newState = updatedStates[id];
        newState[name] = value;
        updatedStates[id] = newState
        this.setState({
            stateFields: updatedStates
        });
    }

    render(){
        const fieldsList =
            this.state.inputFields.map((item, index) =>
                <InputField id={index} field={item} handleChange={this.handleInputChange} deleteField={this.deleteField}/>)
        const statesList =
            this.state.stateFields.map((item, index) =>
                <StateField id={index} field={item} handleChange={this.handleStateChange} deleteState={this.deleteState}/>)
        return (
            <main className="App-header">
                <p>Nowy formularz</p>
                <input type="text"
                       value={this.state.formName}
                       name="formName"
                       placeholder="Nazwa formularza"
                       onChange={this.handleFormNameChange}
                />
                {fieldsList}
                <button onClick={this.addField}>Add field</button>
                <p>Define states:</p>
                {statesList}
                <button onClick={this.addState}>Add state</button>

                <button onClick={this.handleSubmit}>Submit</button>
            </main>
        )
    }
}

export default NewForm