import React, { Component } from 'react'


class UserForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username: '',
    }
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.handleCreateUser()
  }
  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }

  render () {
    return (
      <div className="user-form">
        <form>
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
