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
// const baseAPI = 'http://localhost:3000/'


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
			loggedInUser: '',
			loginError: '',
			userCreateMessage: ''
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
		this.handleCreateUser = this.handleCreateUser.bind(this)
		this.handleUserLogin = this.handleUserLogin.bind(this)
		this.handleLoggedInUser = this.handleLoggedInUser.bind(this)
		this.handleLogOut = this.handleLogOut.bind(this)
		this.openCreateUser = this.openCreateUser.bind(this)
	}

  toggleModal() {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

	closeWelcome() {
		this.setState({
			welcomeOpen: !this.state.welcomeOpen,
			listView: '',
			modalIsOpen: false
		})
	}

	createUser() {
		this.setState({
			welcomeOpen: !this.state.welcomeOpen,
			userForm: !this.state.userForm
		})
	}

	openCreateUser() {
		this.setState({
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
				console.log(userJson);
				this.fetchUsers()
				this.setState({
					userCreateMessage: 'Success, user created!',
					loginError: ''
				})
			})
			.catch(err => {
				console.log(err)
				this.setState({
					userCreateMessage: 'Failure - user not created!',
					loginError: ''
				})
			})
	}

	handleUserLogin (loginParams) {
		console.log('login', loginParams);
		fetch(baseAPI + `auth`, {
			method: 'POST',
			// credentials: 'include',
			body: JSON.stringify(loginParams),
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			}
		})
			.then(loginRes => loginRes.json())
			.then(jsonLogin => {
				console.log('Post user login fetch:',jsonLogin)
				if(!jsonLogin.error) {
					console.log('no error path')
					localStorage.setItem('jwt', jsonLogin.jwt)
					this.setState({
						loggedInUser: jsonLogin.user_id,
						userCreateMessage: '',
						loginError: ''
					})
					this.fetchUserCountries(jsonLogin.user_id)
					this.mainPage()
				}
				else {
					console.log(jsonLogin.error)
					this.setState({
						loginError: jsonLogin.error,
						userCreateMessage: ''
					})
				}
			})
	}

	handleLoggedInUser() {
		console.log('handleLoggedInUser')
		fetch(baseAPI + 'current_user', {
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'Authorization': localStorage.getItem('jwt')
			}
		})
			.then(userRes => userRes.json())
			.then(jsonUser => {
				console.log('Prev user:',jsonUser)
				this.setState({
					loggedInUser: jsonUser.user_id,
					currentUser: jsonUser.user_id,
					welcomeOpen: false,
				})
				this.fetchUserCountries(jsonUser.user_id)
			})

	}

	handleLogOut() {
		localStorage.removeItem('jwt')
		this.setState({
			loggedInUser: '',
			currentUser: '',
			welcomeOpen: true,
			visitedCountries: [],
			wishlistCountries: [],
			listView: '',
			loginError: '',
			userCreateMessage: ''
		})
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
		if (localStorage.getItem('jwt') !== null) {
			console.log('Found localStorage user on load...')
			this.handleLoggedInUser()
		}
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
						handleUserLogin={this.handleUserLogin}
						mainPage={this.mainPage}
						welcomeOpen={this.state.welcomeOpen}
						userForm={this.state.userForm}
						users={this.state.users}
						currentUser={this.state.currentUser}
						fetchUsers={this.fetchUsers}
						loginError={this.state.loginError}
						userCreateMessage={this.state.userCreateMessage}
						closeWelcome={this.closeWelcome}
						/>
            		: '' }
				<header>
					<h1 onClick={this.closeWelcome}>World Map App</h1>
          			{this.state.loggedInUser
								?
								<div>
									<button onClick={this.handleLogOut}>Log Out</button>
								</div>
								:
						<div className="user-select-container">
							{this.state.currentUser ? '' :
						 	<button onClick={this.openCreateUser}>Register</button> }
							<select className="select-css"
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
					}

					{/* <button onClick={this.toggleModal}>Open Modal</button> */}
					{(this.state.currentUser) ?
					<div className="list-button-container">
						<button
							onClick={()=> {this.handleChangeListView('trip')}} >
							Trip
						</button>
						<button
							onClick={()=> {this.handleChangeListView('wish')}} >
							Wish
						</button>
					</div>
					: '' }

				</header>
				<div >
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
							loggedInUser={this.state.loggedInUser}
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
					loggedInUser={this.state.loggedInUser}
				/>
		</div>
		)
  	}
}

export default App;
