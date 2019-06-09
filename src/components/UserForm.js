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
      <h1>Create a Username!</h1>
      <p>Once you create a username, you can start tracking the countries you have been and the ones you want to go!</p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Username..."
            onChange={this.handleChange}
            value={this.state.username}
            />
          <button type="submit">Create New User!</button>
        </form>
      </div>
    )
  }
}


export default UserForm
