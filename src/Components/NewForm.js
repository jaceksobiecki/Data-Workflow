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
            currentState: -1,
            history: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleStateChange = this.handleStateChange.bind(this)
        this.handleNextStateChange = this.handleNextStateChange.bind(this)
        this.handleFormNameChange = this.handleFormNameChange.bind(this)
        this.addField = this.addField.bind(this)
        this.addState = this.addState.bind(this)
        this.deleteField = this.deleteField.bind(this)
        this.deleteState = this.deleteState.bind(this)
        this.setFirstState = this.setFirstState.bind(this)
        this.addField()
        this.addState()
    }

    componentDidMount() {
        if(this.props.mode==="edit"){
            this.setState({
                _id: this.props.form._id,
                formName: this.props.form.formName,
                inputFields: this.props.form.inputFields,
                stateFields: this.props.form.stateFields
            })
        }
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
        let reqType
        if(this.props.mode==="edit"){
            reqType="update"
        } else {
            reqType="save"
        }
        fetch('http://localhost:9000/saveFormReq', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reqType: reqType,
                form: this.state
            })
        })
            .then(res => res.text())
    }

    handleSubmit(event) {
        let newCooperators=[];
        newCooperators.push(this.state.owner)
        for (let i=0;i<this.state.stateFields.length;i++){
            newCooperators.push(this.state.stateFields[i].assignedTo)
        }
        this.setState({
            cooperators: newCooperators
        }, function () {
            this.sendData()
        });
        window.location.hash="forms"
    }

    setFirstState(){
        this.setState({
            currentState: 0
        })
        this.handleSubmit()
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

    handleNextStateChange(value, action) {
        let updatedStates = this.state.stateFields
        let newState = updatedStates[action.name];
        newState["nextState"] = value;
        updatedStates[action.name] = newState
        this.setState({
            stateFields: updatedStates,
        });
    }
    render(){
        const fieldsList =
            this.state.inputFields.map((item, index) =>
                <InputField id={index} field={item} handleChange={this.handleInputChange} deleteField={this.deleteField}/>)
        const statesList =
            this.state.stateFields.map((item, index) =>
                <StateField id={index} field={item} fieldsCount={this.state.stateFields.length}
                            handleChange={this.handleStateChange} handleNextChange={this.handleNextStateChange}
                            deleteState={this.deleteState}/>)
        return (
            <main className="App-form">
                    <p className="Document-header">Nowy dokument</p>
                <input type="text"
                       value={this.state.formName}
                       name="formName"
                       placeholder="Nazwa dokumentu"
                       onChange={this.handleFormNameChange}
                />
                <p className="Def-doc-header">Pola:</p>
                <ol>
                    {fieldsList}
                </ol>
                <button onClick={this.addField}>Dodaj pole</button>
                <p className="Def-doc-header">Przepływ:</p>
                <ol>
                    {statesList}
                </ol>
                <button onClick={this.addState}>Dodaj stan</button>

                <div>
                    <button onClick={this.handleSubmit}>Zapisz</button>
                    <button onClick={this.setFirstState}>Zatwierdź pierwszy stan</button>
                </div>
            </main>
        )
    }
}

export default NewForm