import React, { Component } from 'react'
import Modal from 'react-modal'
import UserForm from './components/UserForm'
import CountryList from './components/CountryList'
import Country from './components/Country'
import Map from './components/Map'
import Welcome from './components/Welcome'

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
				country_title: '',
				country_code: ''
			},
			visitedCountries: [],
			wishlistCountries: [],
			modalIsOpen: false,
			listView: '',
			welcomeOpen: true,
			userForm: false,
		}
		this.click = this.click.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.fetchUsers = this.fetchUsers.bind(this)
		this.setUsers = this.setUsers.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.fetchUserCountries = this.fetchUserCountries.bind(this)
		this.sortUserCountryData = this.sortUserCountryData.bind(this)
		this.handleChangeListView = this.handleChangeListView.bind(this)
		this.handleListChange = this.handleListChange.bind(this)
		this.updateArray = this.updateArray.bind(this)
		this.removeFromArray = this.removeFromArray.bind(this)
		this.handleListDelete = this.handleListDelete.bind(this)
		this.closeWelcome = this.closeWelcome.bind(this)
		this.mainPage = this.mainPage.bind(this)
		this.createUser = this.createUser.bind(this)
		this.handleNewCountry = this.handleNewCountry.bind(this)
		this.handleCountryInList = this.handleCountryInList.bind(this)
  	}

  	toggleModal() {
      this.setState({
        modalIsOpen: !this.state.modalIsOpen
      })
  	}

		closeWelcome() {
			this.setState({
				welcomeOpen: !this.state.welcomeOpen
			})
		}

		createUser() {
			this.setState({
				welcomeOpen: !this.state.welcomeOpen,
				userForm: !this.state.userForm
			})
		}

		mainPage() {
			this.setState({
				welcomeOpen: false,
				userForm: false
			})
		}

	handleCreateUser(user) {
		fetch(baseAPI + `users`, {
			body: JSON.stringify(user),
			method: 'POST',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
			.then(createdUser => createdUser.json())
			.then(userJson => {
				this.users.push(userJson)
			})
			.catch(err => console.log(err))
	}

	click(event) {
		let countryTitle = event.target.getAttribute('title')
		let countrySvgId = event.target.id
		if (countryTitle) {
			this.toggleModal()
			this.setState((prevState) => {
				return {
					currentCountry: {
						country_title: countryTitle,
						country_code : countrySvgId
					}
				}
	  		})
		}
	}
	handleCountryInList(country, listToCheck) {
		let countryCode = country.country_code
		let inList = false;

		this.state[listToCheck].forEach( (checkCountry) => {
			if(checkCountry.country_code === countryCode) {
				inList = true;
			}
		})

		return inList
	}
	handleNewCountry(country, addToList) {
		country.user_id = this.state.currentUser
		country.type = addToList
		country.trip_date = '2019-06-08'
		let arrayToUpdate;

		if(addToList === 'trip') {
			arrayToUpdate = 'visitedCountries'
		}
		else if(addToList === 'wish') {
			arrayToUpdate = 'wishlistCountries'
		}

		if(this.state.currentUser) {
			fetch(baseAPI + `countries`, {
				body: JSON.stringify(country),
				method: 'POST',
				headers: {
					'Accept' : 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				}
			})
			.then(createdCountry => {
				return createdCountry.json()
			})
			.then(jsonCountry => {
				this.updateArray(jsonCountry[0], arrayToUpdate)
				//Any view changes here
					//Popup the trip added to?
			})
			.catch( err => console.log(err))

		}

	}
	handleSelect(event, selectVariable) {
		let selectedValue = event.target.value
		debugPrint('Select Change:','var -',selectVariable,'val -',selectedValue,)
		this.setState( (prevState) => {
			if(selectVariable === 'currentUser' && selectedValue) {
				this.fetchUserCountries(selectedValue)
			}
		})
	}
	handleChangeListView(view) {
		this.setState( (prevState) => {
			if(prevState.listView === view) {
				return {
					listView: ''
				}
			}
			else {
				return {
					listView: view
				}
			}
		})
	}
	handleListChange( country, removeIndex, removeArray) {
		if (removeArray === 'visitedCountries') {
			country.type = 'wish'
		}
		else if (removeArray === 'wishlistCountries') {
			country.type = 'trip'
		}

		//fetch here
		fetch(baseAPI + `countries/${country.trip_id}`, {
			body: JSON.stringify(country),
			method: 'PUT',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
		.then(updatedCountry => {
			return updatedCountry.json()
		})
		.then(jsonData => {
			//update React state arrays
			this.removeFromArray(removeArray, removeIndex)
			if (removeArray === 'visitedCountries') {
				this.updateArray(country,'wishlistCountries')
			}
			else if (removeArray === 'wishlistCountries') {
				this.updateArray(country,'visitedCountries')
			}
		})
	}
	handleListDelete(country, removeIndex, removeArray) {
		fetch(baseAPI + `countries/${country.trip_id}`, {
			method: 'DELETE'
		})
		.then(deletedCountry => {
			return deletedCountry.json()
		})
		.then(jsonData => {
			this.removeFromArray(removeArray, removeIndex)
		})
		.catch( err => console.log(err))

	}
	removeFromArray(array, arrayIndex) {
		this.setState( (prevState) => {
			prevState[array].splice(arrayIndex, 1)
			return {
				[array] : prevState[array]
			}
		})
	}
	updateArray( country, array) {
		this.setState( (prevState) => {
			prevState[array].push(country)
			return {
				[array] : prevState[array]
			}
		})
	}
	fetchUserCountries(userId) {
		debugPrint('Fetch country data for:',userId)
		fetch(baseAPI + `countries/user/${userId}`)
			.then(data => data.json())
			.then(jsonRes => {
				debugPrint(jsonRes)
				this.sortUserCountryData(jsonRes, userId)
				console.log('state after?',this.state.visitedCountries)

			})
	}
	sortUserCountryData(userCountries, userId) {
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
				wishlistCountries : userWishlist,
				currentUser : userId
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
	  		<div className="app-content">
          		{(this.state.welcomeOpen) ?
					<Welcome
						closeWelcome={this.closeWelcome}
						welcomeOpen={this.state.welcomeOpen}
						userForm={this.state.userForm}
						createUser={this.createUser}/>
					: '' }
          		{(this.state.userForm) ?
            		<UserForm
									handleCreateUser={this.handleCreateUser}
									mainPage={this.mainPage}
									welcomeOpen={this.state.welcomeOpen}
									userForm={this.state.userForm}
									users={this.state.users}
									currentUser={this.state.currentUser}
									fetchUsers={this.fetchUsers}
									/>
            		: '' }
				<header>
					<h1>World Map App</h1>
					<div className="user-select-container">
						<h4>User</h4>
						<select 
							onChange={(event) => this.handleSelect(event, 'currentUser')} 
							className="user-select"
							value={this.state.currentUser} >
							<option key='0' value="">Select User</option>
							{this.state.users.map( (user, index) => {
								return (
									<option key={user.user_id} value={user.user_id}> {user.username} </option>
								)
							})}
						</select>
					</div>
					{/* <button onClick={this.toggleModal}>Open Modal</button> */}
					<div className="list-button-container">
						<button
							onClick={()=> {this.handleChangeListView('trip')}}
							className={this.state.listView === 'trip'?'button-selected':''}>
							Trip
						</button>
						<button
							onClick={()=> {this.handleChangeListView('wish')}}className={this.state.listView === 'wish'?'button-selected':''}>
							Wish</button>
					</div>

				</header>
				<div onClick={this.click}>
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
							handleNewCountry={this.handleNewCountry}
							currentUser={this.state.currentUser}
							handleCountryInList={this.handleCountryInList}
						/>
						: ''
					}
				</div>


				< CountryList
					visitedCountries={this.state.visitedCountries}
					wishlistCountries={this.state.wishlistCountries}
					listView={this.state.listView}
					handleListChange={this.handleListChange}
					handleListDelete={this.handleListDelete}
					handleChangeListView={this.handleChangeListView}
				/>
		</div>
		)
  	}
}

export default App;
