import React, { Component } from 'react'


class Country extends Component {
  render () {
    return (
      <React.Fragment>
        <div className="modal">
            <h2>{this.props.currentCountry.country_title}</h2>
            <img src={`https://www.countryflags.io/${this.props.currentCountry.country_code}/shiny/64.png`} />
            <br />
          <button onClick={this.props.toggleModal}>Close Modal</button>
          <button>Add to Trips</button>
          <button>Add to Wishlist</button>
        </div>
        </React.Fragment>
    )
  }
}


export default Country
