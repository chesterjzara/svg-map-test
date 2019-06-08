import React, { Component } from 'react'
// import logo from './logo.svg'
import world from './world-low.svg'
import ReactSVG from 'react-svg'
import Modal from 'react-modal'
import UserForm from './components/UserForm'
import CountryList from './components/CountryList'

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
			currentCountry: '',
			currentCountryId: '',
			visitedCountries: [],
			wishlistCountries: [],
			modalIsOpen: false
		}
		this.click = this.click.bind(this)
		this.openModal = this.openModal.bind(this)
		this.afterOpenModal = this.afterOpenModal.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.fetchUsers = this.fetchUsers.bind(this)
		this.setUsers = this.setUsers.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.fetchUserCountries = this.fetchUserCountries.bind(this)
		this.sortUserCountryData = this.sortUserCountryData.bind(this)

  	}
  	openModal() {
		this.setState({
			modalIsOpen: true
		})
  	}
  	afterOpenModal() {

  	}
  	closeModal() {
		this.setState({
	  		modalIsOpen: false
		})
  	}
	  
	click(event) {
		this.openModal()
		let countryTitle = event.target.getAttribute('title')
		let countrySvgId = event.target.id
		if (countryTitle) {
	  		event.target.setAttribute('class', 'clicked-country')
	  		this.setState((prevState) => {
				if (prevState.currentCountryId) {
		  			let lastCountry = document.querySelector('#' + prevState.currentCountryId)
			  		lastCountry.classList.remove('clicked-country')
				}
				return {
					currentCountry: countryTitle,
					currentCountryId: countrySvgId
				}
	  		})
		}
	}
	handleSelect(event, selectVariable) {
		let selectedValue = event.target.value
		debugPrint('Select Change:','var -',selectVariable,'val -',selectedValue,)
		
		this.setState( (prevState) => { 
			if(selectVariable = 'currentUser') {
				this.fetchUserCountries(selectedValue)
			}
			
			return{
				[selectVariable] : selectedValue
			}
		})
	}
	fetchUserCountries(userId) {
		debugPrint('test',1,2)
		fetch(baseAPI + `countries/user/${userId}`)
			.then(data => data.json())
			.then(jsonRes => {
				debugPrint(jsonRes)
				this.sortUserCountryData(jsonRes)
				
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
				</header>
				<div onClick={this.click}>
					<ReactSVG src={world} />
					<Modal
						modalIsOpen={this.state.modalIsOpen}
						closeModal={this.closeModal}
						currentCountry={this.state.currentCountry}
						/>
				</div>
				<h1>Country Clicked: {this.state.currentCountry}</h1>
			</div>
		)
  	}
}

export default App
