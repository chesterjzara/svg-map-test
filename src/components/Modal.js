import React, { Component } from 'react'


class Modal extends Component {
  render () {
    return (
      <div className="modal">
        <h1>{this.props.currentCountry}</h1>
        <button onClick={this.props.closeModal}>Close Modal</button>
      </div>
    )
  }
}


export default Modal
