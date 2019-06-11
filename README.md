# World Map App
Full CRUD Application built with React frontend and Rails API server.

Built by CJ Zara and Sara Wegmann

Link to the project: https://shielded-taiga-28162.herokuapp.com/

## Description

World Map App is an interactive application that allows a user to view the world by country and track where they have been or where they want to go. The application has authentication, but can also be used by guest users to view the map and countries. When a country is clicked on a user is displayed the country's flag. 

## Technologies Used

- React
- Ruby on Rails
- PostgreSQL
- SVG
- CSS 

## Approach Taken

Before starting to develop the architecture for the app, CJ explored SVGs and found one that would work for the project. Once we decided it would be a good fit for our project, we moved on to set up the React architecture. We walked through how we wanted the app the function and set up components for each part. We then determined state for the App, and the methods that we would need. Through the process we added to state, props, and methods to expand the functionality of the app. 

We kept track of our progress using a GitHub Projects board. 

## User Stories

- A user has the ability to view the app as a guest user. Can navigate through other user's saved maps and can view the countries.
- A user has the ability to register for the app to begin saving their own trips.
- Once registered and logged in, a user can add a country to their list of countries that they have visited before. 
- A logged in user can add a country that they want to visit to their "wish list".
- A logged in user can move a country from their wish list to their visited list.
- A logged in user can delete a country from their wish list or their visited list.

## Unsolved Problems

If we had more time to work on this app, we would incorporate a third party API to pull in facts and pictures of the countries. When the user clicked on a country, it would display pictures, the flag, and some interested facts. 
