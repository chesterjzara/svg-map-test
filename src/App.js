import React, { Component } from 'react'
import Modal from 'react-modal'
import UserForm from './components/UserForm'
import CountryList from './components/CountryList'
import Country from './components/Country'
import Map from './components/Map'

//Old SVG import method
import world from './world-low.svg'
// New SVG Import method
import { SvgLoader, SvgProxy } from 'react-svgmt'
import worldString from './world-low-test.js'

const baseAPI = 'https://afternoon-anchorage-81144.herokuapp.com/'
const debugPrint = (...args) => {
	if(true) {
		console.log(...args)
	}
}

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			currentUser: '',
			users: [],
			currentCountry: {
				title: '',
				country_code: ''
			},
			visitedCountries: [],
			wishlistCountries: [],
			modalIsOpen: false
		}
		this.click = this.click.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.fetchUsers = this.fetchUsers.bind(this)
		this.setUsers = this.setUsers.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.fetchUserCountries = this.fetchUserCountries.bind(this)
		this.sortUserCountryData = this.sortUserCountryData.bind(this)

  	}
  	toggleModal() {
		this.setState({
			modalIsOpen: !this.state.modalIsOpen
		})
  	}

	click(event) {
		let countryTitle = event.target.getAttribute('title')
		let countrySvgId = event.target.id
		if (countryTitle) {
	  		this.setState((prevState) => {
				return {
					currentCountry: {
						title: countryTitle,
						country_code : countrySvgId
					}
				}
	  		})
		}
	}
	handleSelect(event, selectVariable) {
		let selectedValue = event.target.value
		debugPrint('Select Change:','var -',selectVariable,'val -',selectedValue,)
		this.setState( (prevState) => { 
			if(selectVariable = 'currentUser' && selectedValue) {
				this.fetchUserCountries(selectedValue)
			}

			return{
				[selectVariable] : selectedValue
			}
		})
	}
	fetchUserCountries(userId) {
		debugPrint('Fetch country data for:',userId)
		fetch(baseAPI + `countries/user/${userId}`)
			.then(data => data.json())
			.then(jsonRes => {
				debugPrint(jsonRes)
				this.sortUserCountryData(jsonRes)
				console.log('state after?',this.state.visitedCountries)

			})
	}
	sortUserCountryData(userCountries) {
		let userTrips = []
		let userWishlist = []
		userCountries.forEach( (country) => {
			if(country.type === 'trip') {
				userTrips.push(country)
			}
			else if(country.type === 'wish') {
				userWishlist.push(country)
			}
		})
		this.setState( (prevState) => {
			return {
				visitedCountries : userTrips,
				wishlistCountries : userWishlist
			}
		}, () => {
			
		})
	}
	fetchUsers() {
		fetch(baseAPI + 'users')
			.then(data => data.json())
			.then(jsonRes => {
				debugPrint(jsonRes)
				this.setUsers(jsonRes)
			})
			.catch(err => console.log(err))
	}
	setUsers(jsonRes) {
		console.log('set users')
		this.setState( (prevState) => {
			return {
				users : jsonRes
			}
		})
	}

	componentDidMount() {
		this.fetchUsers()
	}
  	render() {
		return (
	  		<div>
				<header>
				<h1>World Map App</h1>
				<div className="user-select-container">
					<h4>User</h4>
					<select onChange={(event) => this.handleSelect(event, 'currentUser')} className="user-select">
						<option key='0' value="">Select User</option>
						{this.state.users.map( (user, index) => {
							return (
								<option key={user.user_id} value={user.user_id}> {user.username} </option>
							)
						})}
					</select>
				</div>
        <button onClick={this.toggleModal}>Open Modal</button>
				</header>
				<div onClick={this.click}>
          {/* <ReactSVG src={world} /> */}
					< Map 
						click={this.click}
						worldString={worldString} 
						visitedCountries={this.state.visitedCountries}
						wishlistCountries={this.state.wishlistCountries}
						currentCountry={this.state.currentCountry}
					/>
          {(this.state.modalIsOpen)
          ?
          <Country
              modalIsOpen={this.state.modalIsOpen}
              toggleModal={this.toggleModal}
              currentCountry={this.state.currentCountry}
          />
          : ''
        }
				</div>
				<h1>Country Clicked: {this.state.currentCountry.title} - {this.state.currentCountry.country_code}</h1>
			</div>
		)
  	}
}

export default App
