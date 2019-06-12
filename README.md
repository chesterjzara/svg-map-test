# World Map App
Full CRUD Application built with React frontend and Rails API server.

Built by CJ Zara and Sara Wegmann

Link to the project: https://shielded-taiga-28162.herokuapp.com/

Link to API: https://afternoon-anchorage-81144.herokuapp.com/

## Description

World Map App is an interactive application that allows a user to view the world by country and track where they have been or where they want to go. The application has authentication, but can also be used by guest users to view the map and countries. When a country is clicked on a user is displayed the country's flag. 

## Technologies Used

- Javascript
  - React
  - [Hammer.js](https://hammerjs.github.io/)
  - [svg-pan-zoom](https://github.com/ariutta/svg-pan-zoom) - including example code for Hammer.js integration
- Ruby on Rails
  - [bcrypt](https://rubygems.org/gems/bcrypt/versions/3.1.12) and [jwt](https://rubygems.org/gems/jwt) gems for auth
- PostgreSQL
- SVG - map obtained from http://mapsvg.com.
- CSS 


## Approach Taken

Before starting to develop the architecture for the app, CJ explored SVGs and found one that would work for the project. Once we decided it would be a good fit for our project, we moved on to set up the React architecture. We walked through how we wanted the app the function and set up components for each part. We then determined state for the App, and the methods that we would need. Through the process we added to state, props, and methods to expand the functionality of the app. 

We kept track of our progress using a GitHub Projects board. 

### Architecture 

React Frontend Component Plan
![React Diagram](https://raw.githubusercontent.com/chesterjzara/world-travel-map/master/World%20Travel%20Map%20React%20Architecture.jpg)

Rails Backend w/ Postgres - The API has routes for users and countries (representing user trips). Authentication is done by using Bcrypt to compare hashed passwords and then sends a JSON Web Token to the client's browser to to save their session. 

## User Stories

- A user has the ability to view the app as a guest user. Can navigate through other user's saved maps and can view the countries.
- A user has the ability to register for the app to begin saving their own trips.
- Once registered and logged in, a user can add a country to their list of countries that they have visited before. 
- A logged in user can add a country that they want to visit to their "wish list".
- A logged in user can move a country from their wish list to their visited list.
- A logged in user can delete a country from their wish list or their visited list.

## Unsolved Problems

If we had more time to work on this app, we would incorporate a third party API to pull in facts and pictures of the countries. When the user clicked on a country, it would display pictures, the flag, and some interested facts. 

A advanced goal would be to aggregate information on user travels and use this to drive a suggestion engine of where users may want to visit next. Or use intelligent grouping based on commonalities between countries to suggest destinations a user would likely enjoy.
