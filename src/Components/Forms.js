import React, {Component} from "react"
import InputField from "./InputField";
import Field from "./Field"
import formData from "./../file";
import Form from "./Form";



class Forms extends Component{
    constructor(props){
        super(props)
        this.state = {
            forma: "",
            apiResponse: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
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
                form: "request"
            })
        })
            .then(res => res.text())
            .then(res => this.setState({apiResponse: res}))
    }

    handleSubmit(event) {
        this.sendData()
    }

    render(){
        return (
            <main className="App-header">
                <Form data={formData}/>
            </main>
        )
    }
}

export default Forms