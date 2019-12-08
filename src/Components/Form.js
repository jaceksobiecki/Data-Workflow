import React, {Component} from "react"
import InputField from "./InputField";
import StateField from "./StateField";
import Field from "./Field"
import State from "./State"
import FillField from "./FillField";


class Form extends Component {
    constructor(props) {
        super(props)
        this.state = props.data.form
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
    }


    sendData() {
        fetch('http://localhost:9000/testAPI', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form: this.state
            })
        })
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}));
    }

    handleSave(event) {
        this.sendData()
    }

    handleSubmit(event) {

        for (var i=0;i<this.state.stateFields.length;i++){
            if(this.state.stateFields[i].name.localeCompare(this.state.formState)===0){
                if(i+1<this.state.stateFields.length){
                    var newState = this.state.stateFields[i+1]
                    this.setState({
                        formState: newState.name
                    })
                }

            }
        }
        this.sendData()
    }

    handleChange(event) {
        const updatedFields = this.state.inputFields
        const {id, name, value} = event.target
        const newField = updatedFields[id];
        newField[name] = value;
        updatedFields[id] = newField
        this.setState({
            inputFields: updatedFields
        });
    }

    render() {
        const fieldsList =
            this.state.inputFields.map((item, index) =>
                <FillField id={index} field={item} handleChange={this.handleChange}/>)
        return (
            <main className="App-header">
                <p>Wypełnij formularz</p>
                <p>Stan formularza: {this.state.formState}</p>
                {fieldsList}
                <button onClick={this.handleSave}>Zapisz</button>
                <button onClick={this.handleSubmit}>Zatwierdź</button>
            </main>
        )
    }
}

export default Form