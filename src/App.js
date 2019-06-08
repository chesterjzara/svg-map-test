import React, { Component } from 'react'
// import logo from './logo.svg'
import world from './world-low.svg'
import ReactSVG from 'react-svg'
import Modal from 'react-modal'
import UserForm from './components/UserForm'
import CountryList from './components/CountryList'

const baseAPI = 'https://afternoon-anchorage-81144.herokuapp.com/'
let debug = true;

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
		console.log(event)
        console.log(event.target.value)
        let selectedValue = event.target.value
        this.setState( (prevState) => { 
			return{
				[selectVariable] : selectedValue
			}
		})
	}
	fetchUsers() {
		fetch(baseAPI + '/users')
			.then(data => data.json())
			.then(jsonRes => {
				console.log(jsonRes)
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
								<option key={user.id} value={user.id}> {user.username} </option>
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
