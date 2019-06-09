import React, { Component } from 'react'


class Welcome extends Component {
  render () {
    return (
      <div className="welcome-page">
        <header>
          <h1>World Map App</h1>
        </header>
        <main>
          <h2>Welcome to World Map App!</h2>
            <p>World Map App is an interactive world map that allows a user to view the world by country and track where you've been and where you want to go.</p>
            <br />
            <p>If you decide to create a username, you can color code the countries you've visited and the countries that are on your bucketlist!</p>
            <br />
            <p>Guest users have full access to the map, and can see other user's maps, but you won't be able to save your information. Create a username and track your journey to get started!</p>
          </main>
        <button onClick={this.props.createUser}>Create a Username</button>
        <button onClick={this.props.closeWelcome}>Continue as Guest</button>
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Mountain_Range_Banner.jpg/2560px-Mountain_Range_Banner.jpg" alt="mountains" />
      </div>
    )
  }
}


export default Welcome
