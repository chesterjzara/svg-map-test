import React, { Component } from 'react'


class CountryItem extends Component {
  render () {
    return (
      <div className="country-item">
        <span>{this.props.country.country_title} ({this.props.country.country_code})</span>
        {this.props.loggedInUser ?
          <div>
            <button className="country-btn"
              onClick={() => this.props.handleListChange(this.props.country, this.props.index, this.props.currArray)}>
                {this.props.currArray === 'wishlistCountries' ? 'Add to trips' : 'Add to Wishlist' }
            </button>

            <button className="country-btn"
              onClick={()=> this.props.handleListDelete(this.props.country, this.props.index, this.props.currArray)}>
              Remove
            </button>
        </div>
          : '' }

      </div>
    )
  }
}

export default CountryItem;
