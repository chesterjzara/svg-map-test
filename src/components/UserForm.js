import React, { Component } from 'react'


class UserForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        username: '',
    }
  }

  render () {
    return (
      <div className="user-form">
        This is the user form.
      </div>
    )
  }
}


export default UserForm
