### TicketHound Journal

#### W14 D1

Started wrapping up planning and adding docs we'd written up into the files for the project. Started setting up our database so that the user table would have the fields we required

#### W14 D2

Worked on SQL and setting up the tables and database structure as we're actually going to use it. I started prototyping an API call/polling script.

#### W14 D3

Well after talking it over with Riley we decided to scrap the poller idea and not put any of the games data in our database but rather rely on ESPN's API for all of it. We got that set up and I wrote the router for it.

#### W14 D4

Worked on continuing to refine the database schema and updating and creating pydantic models.

#### W15 D1

I spent some of today digging into Gitlab's CI/CD pipeline stuff and was able to make flake8 be a little happier about stuff. We worked on the delete user, the edit user, game details, and list games route.

#### W15 D2

Created back-end routers and queries for both the Vividseats and Seatgeek routes and set up API keys for Seatgeek. Got the pipelines to pass!

#### W15 D3

Started looking into web-scraping and started prototyping some scripts on that. Went through the program and added more rebust error handling with FastAPI's HTTPException function.

#### W15 D4

Spent most of today working on web-scraping, got a decent working model with a lot of Delonte's help. I hadn't really played around with Beautiful Soup before so it was a good learning experience. If they don't have an api, just make one.

#### W15 D5

Removed the original front-end authentication components and hooks to prepare for initializing redux. We went through various portions of our back-end and fixed bugs to attempt to get the pipelines to pass. Started setting up the redux auth routes.

#### W16 D1

Started really working on front-end REACT components. We made the Input Box component because we're going to want to be able to style and adjust all of that in one place. Also continued working on the apiSlice file and working on getting auth working.

#### W16 D2

Made a front-end component to allow the user to edit their profile using the built in `<InputBox>` sub-components we created yesterday. We also created a page for the user to view their profile information. The hard part here was implementing a redux lazyQuery for the first time.

#### W16 D3

Started working on the navbar. The primary hurdle was getting navbar links and items to render based on whether or not the user is logged in and getting the sign out functionality to work properly.

#### W16 D4

Worked on the GamesSchedule component. We made two sub-components one for the input form for the data required to query the games and the other to list the games. [Used this stackover-flow](https://stackoverflow.com/questions/42173786/react-router-pass-data-when-navigating-programmatically) article to figure out how to pass state through the useNavigate hook to enable the user to click on a specific game and go to it's details page.

#### W16 D5

Technically had off today but the gang wanted to get some work done. I drove and we finished the games details page including the displays for the ticket prices working. The TickPick scrapper is being a little flaky, but we'll get it figured.

#### W17 D1

Spent the morning on the practice exam and got back late because I ran three fire calls over lunch. Today we implemented the homepage and started looking into the CSS. We also did 4 unit tests for FastAPI.

#### W17 D2

Worked on implementing CSS across the majority of the components of the front-end of the application. Most of the day was spent setting up and implementing and adjusting bootstrap. One thing I re-learned was how to use `!important` tags in CSS and how to host images.

#### W17 D3

Continued to work on CSS, did some fun stuff like imported fonts and color gradients. Overall just styling stuff.

#### W17 D4

Still fighting with the footer. Spent the morning tweaking more CSS stuff, and then segwaying into the README.md and api-routes.md for documentation. Had to add in a filter so that the ListGames component won't display games that have already happened.
