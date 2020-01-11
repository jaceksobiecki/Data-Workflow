import React, {Component} from "react"
import InputField from "./InputField";
import Field from "./Field"
//import formData from "./../file";
import Form from "./Form";
import FormListElem from "./FormListElem";
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import NewForm from "./NewForm";



class Forms extends Component{
    constructor(props){
        super(props)
        this.state = {
            username: this.props.username,
            forms: [],
            edit: false,
            editedForm: []
        }
        this.updateState = this.updateState.bind(this)
        this.revertState = this.revertState.bind(this)
        this.editForm = this.editForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveForm = this.saveForm.bind(this)
        this.deleteForm = this.deleteForm.bind(this)
        this.setState({edit: props.edit})
    }

    componentDidMount() {
        this.getData()
    }


    getData(){
        fetch('http://localhost:9000/FormsRequest', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username
            })
        })
            .then(res => res.text())
            .then(res => this.setState({forms: JSON.parse(res)}))
    }

    sendData(){
        fetch('http://localhost:9000/saveFormReq', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reqType: "update",
                form: this.state.editedForm
            })
        })
            .then(res => res.text())
    }

    deleteForm(){
        fetch('http://localhost:9000/saveFormReq', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                reqType: "delete",
                form: this.state.editedForm
            })
        })
            .then(res => res.text())

        this.setState({
            edit: false
        });
    }

    handleChange(event) {
        const updatedFields = this.state.editedForm.inputFields
        const {id, name, value} = event.target
        const newField = updatedFields[id];
        newField[name] = value;
        updatedFields[id] = newField
        let updatedForm = this.state.editedForm
        updatedForm.inputFields = updatedFields
        this.setState({
            editedForm: updatedForm
        });
    }

    updateState() {

        for (let i=0;i<this.state.editedForm.stateFields.length;i++){
            if(this.state.editedForm.stateFields[i].name.localeCompare(this.state.editedForm.currentState.name)===0){
                if(i+1<this.state.editedForm.stateFields.length){
                    let newState = this.state.editedForm.stateFields[i+1]
                    let updatedForm = this.state.editedForm
                    updatedForm.currentState=newState
                    this.setState({
                        editedForm: updatedForm
                    })
                    break;
                }

            }
        }
        //this.sendData()
    }

    revertState() {

        for (let i=0;i<this.state.editedForm.stateFields.length;i++){
            if(this.state.editedForm.stateFields[i].name.localeCompare(this.state.editedForm.currentState.name)===0){
                if(i-1>=0){
                    let newState = this.state.editedForm.stateFields[i-1]
                    let updatedForm = this.state.editedForm
                    updatedForm.currentState=newState
                    this.setState({
                        editedForm: updatedForm
                    })
                    break;
                }

            }
        }
        //this.sendData()
    }

    editForm(event){
        const id = event.target.id
        let editedF = this.state.forms[id]
        this.setState({
            edit: true,
            editedForm: editedF
        });
    }

    saveForm(){
        this.setState({
            edit: false
        });
        this.sendData()
    }

    render(){
        const formsList = this.state.forms.map((item, index) => <FormListElem id={index} form={item} editForm={this.editForm}/>)

        if(this.state.edit===false){
            return (
                <main className="App-header">
                    {formsList}
                </main>
            )
        } else {
            return (
                <main className="App-header">
                    <Form form={this.state.editedForm} handleChange={this.handleChange} updateState={this.updateState}
                          saveForm={this.saveForm} deleteForm={this.deleteForm} revertState={this.revertState}/>
                </main>
            )
        }
    }
}

export default Forms