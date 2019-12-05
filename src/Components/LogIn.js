import React from "react"

function LogIn (props) {
    const username = ""
    return (
        <div>
            <input type="text"
                   value={props.userData.username}
                   name="username"
                   placeholder="Username"
                   onChange={this.handleChange}
            />
        </div>
    )
}

export default LogIn