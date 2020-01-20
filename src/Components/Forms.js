import React, {Component} from "react"
import Form from "./Form";
import FormListElem from "./FormListElem";
import NewForm from "./NewForm";


class Forms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            forms: [],
            mode: "",
            editedForm: [],
            comment: ""
        }
        this.updateState = this.updateState.bind(this)
        this.revertState = this.revertState.bind(this)
        this.editForm = this.editForm.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveForm = this.saveForm.bind(this)
        this.deleteForm = this.deleteForm.bind(this)
        this.handleCommentChange= this.handleCommentChange.bind(this)
        this.setState({mode: props.mode})
    }

    componentDidMount() {
        this.getData()
    }


    getData() {
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

    sendData() {
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

    deleteForm() {
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
            mode: ""
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

    handleCommentChange(event) {
        this.setState({
            comment: event.target.value
        })
    }

    updateState(event) {
        let updatedForm = this.state.editedForm
        updatedForm.history.push({
            prevState: this.state.editedForm.stateFields[this.state.editedForm.currentState].name,
            nextState: this.state.editedForm.stateFields[event.target.id].name,
            username: this.state.username,
            comment: this.state.comment
        })
        updatedForm.stateFields[event.target.id].prevState = this.state.editedForm.currentState
        updatedForm.currentState = event.target.id
        this.setState({
            editedForm: updatedForm
        })
        //this.sendData()
        this.saveForm()
    }

    revertState() {
        let updatedForm = this.state.editedForm
        updatedForm.history.push({
            prevState: this.state.editedForm.stateFields[this.state.editedForm.currentState].name,
            nextState: this.state.editedForm.stateFields[this.state.editedForm.stateFields[this.state.editedForm.currentState].prevState].name,
            username: this.state.username,
            comment: this.state.comment
        })
        updatedForm.currentState = this.state.editedForm.stateFields[this.state.editedForm.currentState].prevState
        this.setState({
            editedForm: updatedForm
        })

        this.saveForm()
    }

    editForm(event) {
        const id = event.target.id
        let editedF = this.state.forms[id]
        if (editedF.currentState === -1) {
            this.setState({
                mode: "edit",
                editedForm: editedF
            })
        } else {
            this.setState({
                mode: "fill",
                editedForm: editedF
            });
        }
    }

    saveForm() {
        this.setState({
            mode: ""
        });
        this.sendData()
    }

    render() {
        const formsList = this.state.forms.map((item, index) =>
            <FormListElem id={index} form={item} username={this.state.username} editForm={this.editForm}/>)
        if (this.state.mode === "") {
            return (
                <main className="App-form">
                    <ol>
                        {formsList}
                    </ol>
                </main>
            )
        } else if (this.state.mode === "fill") {
            return (
                <main>

                    <Form form={this.state.editedForm} handleChange={this.handleChange} updateState={this.updateState}
                          saveForm={this.saveForm} deleteForm={this.deleteForm} revertState={this.revertState}
                          comment={this.state.comment} handleCommentChange={this.handleCommentChange}
                          user={this.state.username}
                    />
                </main>
            )
        } else {
            return (
                <main>
                    <NewForm username={this.state.username} form={this.state.editedForm} mode={"edit"}/>
                </main>
            )
        }
    }
}

export default Forms