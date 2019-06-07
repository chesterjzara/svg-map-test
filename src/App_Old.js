import React, {Component} from 'react';
import logo from './logo.svg';
import world from './world-low.svg';
import ReactSVG from 'react-svg'

// import './App.css';

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lastClickedTitle : '',
			lastClickedId : ''
		}
		this.click = this.click.bind(this)
	}
	click(event) {
		console.log(event.currentTarget)
		let countryTitle = event.target.getAttribute('title')
		let countrySvgId = event.target.id
		console.log(countrySvgId)
		
		console.log(countryTitle)
		if(countryTitle) {
			event.target.setAttribute('class', 'clicked-country')
			this.setState((prevState)=> {
				if(prevState.lastClickedId) {
					console.log('#'+prevState.lastClickedId)
					let lastCountry = document.querySelector('#'+prevState.lastClickedId)
					console.log(lastCountry)
					lastCountry.classList.remove('clicked-country')
				}
				
				return {
					lastClickedTitle : countryTitle,
					lastClickedId : countrySvgId
				}
			})
		}
		
	}
	render() {
		return (
			<div>
				<div onClick={this.click}>
					<ReactSVG src={world} />
				</div>
				<h1>Last Country Clicked: {this.state.lastClickedTitle}</h1>
			</div>
		)
	}

}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
