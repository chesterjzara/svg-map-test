import React, { Component } from 'react'


class UserForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.handleCreateUser(this.state)
    this.props.mainPage()
  }
  handleChange(event) {
    this.setState({
      username: event.target.value
    })
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
            />
          <button className="button" type="submit">Create New User!</button>
        </form>
        <img src="https://www.whatsuplife.in/kolkata/blog/wp-content/uploads/2017/08/E9E66935-5465-4B64-BB64-27424044FFF3-1201-00000105B6269EBB.jpeg" alt="ocean" />
      </div>
    )
  }
}


export default UserForm
