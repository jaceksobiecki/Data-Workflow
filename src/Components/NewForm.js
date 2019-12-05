import React, {Component} from "react"
import InputField from "./InputField";
import Field from "./Field"


class NewForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputFields : [],
            apiResponse: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.addField = this.addField.bind(this)
        this.deleteField = this.deleteField.bind(this)
        this.addField()
    }

    componentDidMount() {
    }

    addField() {
        const updatedFields = this.state.inputFields
        updatedFields.push(new Field())
        this.setState({
            inputFields: updatedFields
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

    sendData(){
        fetch('http://localhost:9000/testAPI', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form: this.state.inputFields
            })
        })
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}));
    }

    handleSubmit(event) {
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

    render(){
        const fieldList =
            this.state.inputFields.map((item, index) =>
                <InputField id={index} field={item} handleChange={this.handleChange} deleteField={this.deleteField}/>)
        return (
            <main className="App-header">
                <p>Server>>>>>>>>>>>>>>> {this.state.apiResponse}</p>
                <p>Nowy formularz</p>
                    {fieldList}
                <button onClick={this.addField}>Add field</button>
                <button onClick={this.handleSubmit}>Submit</button>
            </main>
        )
    }
}

export default NewForm