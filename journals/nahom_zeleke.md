### Project Journal


#### April 15
Created the basic layout of the application on excalidraw and briefly designed the tables for our sql database.
Made the API routes for the different page applications.


#### April 16
Made the teams table for the database with each entry defined with the type of value it expects
Made the users table for the database with each entry defined with the type of value it expects


#### April 17
Designed the pydantic models for Teams
Created class containing queries for the teams table
Wrote the code to retrieve the list of teams and their details from ESPN API


#### April 18
Edited the user model to add the parameters required for our application
Edited the sign in model and queries to satisfy the requirements for our application


#### April 22
Created get games route
Made the pydantic models for Games
Created class containing queries for the games table
Wrote the code to retrieve the game schedule and their detail from the MLB API


#### April 23
Figured out a way to sign up and get API keys for SeatGeek
Wrote the code to retrieve the game price and url from SeatGeek API


#### April 24
Added error handling for the codes we wrote for the different APIs
Started researching web scraping


#### April 25
Researched more into Beautiful Soup and how to integrate it into our project
Web scraped TickPick.com to get a specific games price and url


#### April 26
Started the Frontend and fixed some redux issues after watching lecture videos
Started the authentication portion of the FrontEnd


#### April 29
Continued to work on setting up redux auth
Wrote the auth portion in our api slice to allow login, sign up, and sign out


#### April 30
Started to integrate the user model with authentication
Wrote the wrapper that checks if a user is logged in or not for the different components
Made the User profile Component


#### May 01
Created the navigation bar
Fixed some issues with spacing and logo on nav bar
Make buttons appear depending on if a user is logged in or not


#### May 02
Created list of games component
Changed our home and away team to be represented by an int instead of str in query
Added game query in api slice and wrote the game schedule component


#### May 03
Created the game details component
Fixed the web scraping code for TickPick due to new changes to their site


#### May 06
Edited the homepage for our application
Added the five upcoming games to be displayed instead of being empty
Wrote unit tests
#### May 07
Edited the profile page to allow a user to delete their profile
Wrote the code to delete a profile
Started to look into bootstrap for css
#### May 09
Started integrating css into application
Worked on finalizing our application's look
Fixed issues with spacing with multiple components


#### May 10
Went through the application and removed dead and unused code
Fixed last issues the application has before submitting
