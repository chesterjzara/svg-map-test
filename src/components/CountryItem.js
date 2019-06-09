import React, { Component } from 'react'


class CountryItem extends Component {
  render () {
    return (
      <div className="country-item">
        {this.props.country.country_code} 
        <button onClick={() => this.props.handleListChange(this.props.country, this.props.index, this.props.currArray)}> {this.props.currArray === 'wishlistCountries' ? 'Add to trips' : 'Add to Wishlist' } </button>
        <button onClick={()=> this.props.handleListDelete(this.props.country, this.props.index, this.props.currArray)}>Remove</button>
      </div>
    )
  }
}

export default CountryItem;
