# Module3 Project Gamma

## TicketHound

-   Billy Berger-Bailey
-   Nahom Zeleke
-   Nathan Batten
-   Justin Cosby

## Intended Market

TicketHound is intended for the baseball fans and baseball watchers who wants to find the most affordable tickets for their pockets.

## Functionality

-   When users first land on the page, they will see the games for the following day
-   Users will need to create a profile to discover more to the website such as: profile, more games, game details, and access to the ticket websites
-   Users can create a profile and personalize their profile by adding birthdate, favorite team, etc.
-   Once logged in, they can edit profile or see additional games, favorite team's schedule and details of games
-   Games will provide the option of selecting future dates and teams, to see specific game(s) with location and time/date
-   Game Details will display minimum price, ticket provider, and link to ticket website

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

-   Clone the repository down to your local machine
-   CD into the new project directory
-   Run docker volume create pg-admin
-   Run docker volume create database volume
-   Run docker compose build
-   Run docker compose up
-   Obtain SeatGeek API Key(_ info here _)

Then SNIFF OUT THE BEST DEALS!!!

## Deliverables

-   [x] Wire-frame diagrams
-   [] API documentation
-   [] Project is deployed to Caprover (BE, DB) & GitLab-pages (FE)
-   [] GitLab issue board is setup and in use (or project management tool of choice)
-   [] Journals

## Project layout

File Diagram for TicketHound App

```
.
├── api
│   ├── migrations
│   ├── models
│   ├── __pycache__
│   ├── queries
│   ├── routers
│   ├── tests
│   └── utils
├── docs
├── ghi
│   ├── node_modules
│   ├── public
│   └── src
├── journals
└── ticket-hound
```

### Directories

-   API (Back-end, FastAPI, PostgresSQL, Docker)

    -   Migrations creates and configures tables for the database
    -   Models consists of games, teams, tickets, and user models. The models purpose is to define what information is received from the backend for later use. Some of the models(teams/tickets/games) are getting information from our 3rd party APIs, while users' model comes directly from user's input.
    -   Queries is the code that allows the models to fetch the data from 3rd party APIs or users. Game queries has the backend code for how to access the schedule of games and details for each game. Team queries objective is to gather all teams of the MLB and their details. Ticket queries stores the code that fetches the data collected from 3rd party APIs(VividSeats, TickPick, and SeatGeek). Each ticket provider's information was accessed differently, VividSeats was collected throught the ESPN API, SeatGeek was directly from its API, while TickPick was scraped from its website. User queries code allows the option to create, edit, and delete user info for user, while also allowing app to get user details by username or id.
    -   Routers _link to routers doc_
    -   Tests verifies the code written in routers is functional and diplays properly

-   Docs

    -   CRUD Routes
    -   3rd Party APIs docs

-   GHI (Front-end, Redux, React, Bootstrap)
    -   Src contains all of the front-end components and css that renders the information gathered on the backend, to then display it to the user on the frontend.

### Excalidraw

![alt text](Excalidraw.png)

## Issues Tracking

https://gitlab.com/tickethounds/ticket-hound/-/issues/?sort=created_date&state=all&first_page_size=20

## Unit Testing

-   Billy Berger-Bailey : test_get_list_of_teams
-   Justin Cosby : test_get_team_details
-   Nahom Zeleke : test_get_list_games
-   Nathan Batten : test_get_details_of_games

## Stretch Goals

-   Ability to save games
-   Search Bar
-   Team Profile Page
-   Deployment
-   Stats/Standings
-   Other Sports
-   Other Ticketing Sites
-   Uber or other Transportation apps
-   Weather
-   About Us Page

### Installing python dependencies locally

In order for VSCode's built in code completion and intelligence to
work correctly, it needs the dependencies from the requirements.txt file
installed. We do this inside docker, but not in the workspace.

So we need to create a virtual environment and pip install the requirements.

From inside the `api` folder:

```bash
python -m venv .venv
```

Then activate the virtual environment

```bash
source .venv/bin/activate
```

And finally install the dependencies

```bash
pip install -r requirements.txt
```

Then make sure the venv is selected in VSCode by checking the lower right of the
VSCode status bar

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/tickethounds/ticket-hound

<!-- then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME -->
