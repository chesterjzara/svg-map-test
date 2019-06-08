import React, { Component } from 'react'


class Country extends Component {
  render () {
    return (
      <React.Fragment>
        <div className="modal">
            <h1>{this.props.currentCountry.title}</h1>
            <img src={`https://www.countryflags.io/${this.props.currentCountry.country_code}/shiny/64.png`} />
          <button onClick={this.props.toggleModal}>Close Modal</button>
        </div>
        </React.Fragment>
    )
  }
}


export default Country
