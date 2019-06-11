import React, { Component } from 'react'


class UserForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username: '',
        password: '',
        loginUsername: '',
        loginPassword: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.handleCreateUser({
      username: this.state.username,
      password : this.state.password
    })
    this.setState({
      username: '',
      password: '',
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  handleLoginSubmit(event) {
    event.preventDefault()
    let loginParams = {
      username: this.state.loginUsername,
      password: this.state.loginPassword
    }
    this.setState({
      loginUsername: '',
      loginPassword: ''
    })
    this.props.handleUserLogin(loginParams)
    //Redirect to main page or not based on success of login....
      // Might have to do this in the App.js where we call the fetch for this to check user credentials
  }
  render () {
    return (
      <div className="user-form">
      <header>
        <h1>World Map App</h1>
      </header>
      <main className="user-page">
      <h1>Create a Username!</h1>
      <p>Once you create a username, you can start tracking the countries you have been and the ones you want to go!</p>
      </main>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username..."
            onChange={this.handleChange}
            value={this.state.username}
            id='username'
            />
            <input
            type="text"
            placeholder="Password..."
            onChange={this.handleChange}
            value={this.state.password}
            id='password'
            />
          <button className="button" type="submit">Create New User!</button>
          <h2>{this.props.userCreateMessage}</h2>
        </form>
        <h1>Existing User Login:</h1>
        <form onSubmit={this.handleLoginSubmit}>
          <input
            type="text"
            placeholder="Username..."
            onChange={this.handleChange}
            value={this.state.loginUsername}
            id='loginUsername'
            />
            <input
            type="text"
            placeholder="Password..."
            onChange={this.handleChange}
            value={this.state.loginPassword}
            id='loginPassword'
            />
          <button className="button" type="submit">Login Existing User</button>
          <h2> {this.props.loginError} </h2>
        </form>
        <img src="https://www.whatsuplife.in/kolkata/blog/wp-content/uploads/2017/08/E9E66935-5465-4B64-BB64-27424044FFF3-1201-00000105B6269EBB.jpeg" alt="ocean" />
      </div>
    )
  }
}


export default UserForm
