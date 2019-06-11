import React, { Component } from 'react'
import CountryItem from './CountryItem'

class CountryList extends Component {
	render () {
		return (
			<div className="country-list">



				{ this.props.listView === 'trip' ?
					<div className="trip-lists">
						<button className="close-btn" onClick={()=> this.props.handleChangeListView('')}>
							X
						</button>
						<h2>Countries Visited</h2>
						{this.props.visitedCountries.map( (country, index) => {
							return (
								< CountryItem
									key={index}
									index={index}
									currArray='visitedCountries'
									handleListChange={this.props.handleListChange}
									handleListDelete={this.props.handleListDelete}
									// Method for delete
									country={country}
								/>
							)
						})}
					</div> : ''
				}
				{ this.props.listView === 'wish' ?
					<div className="trip-lists">
						<button className="close-btn" onClick={()=> this.props.handleChangeListView('')}>
							X
						</button>
						<h2>Countries on Wish List</h2>
						{this.props.wishlistCountries.map( (country, index) => {
							return (
								< CountryItem
									key={index}
									index={index}
									currArray='wishlistCountries'
									handleListChange={this.props.handleListChange}
									handleListDelete={this.props.handleListDelete}
									country={country}
								/>
							)
						})}
					</div>: ''
				}
			</div>
		)
	}
}


export default CountryList
