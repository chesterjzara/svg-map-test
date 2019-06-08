import React, { Component } from 'react'


class Country extends Component {
  render () {
    return (
        <div className="modal">
        {(this.props.currentCountry) ? <h1>{this.props.currentCountry}</h1>
        : <h1>Click on a country to view!</h1>}
          <button onClick={this.props.toggleModal}>Close Modal</button>
        </div>
    )
  }
}


export default Country
