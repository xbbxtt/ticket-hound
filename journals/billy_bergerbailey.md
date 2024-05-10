### TicketHound Journal

##### April 15

As we wrap up the wire framing for Tickethound were adding the our documents into project files. We are beginning to establish our database and deciding on what fields we would like our users to input.

#### April 16

We are establishing our SQL and and getting our tables setup.

#### April 17

We are doing a lot of research on how to retrieve the MLB's schedule of games. It's looking like after stumbling upon ESPN's API, it has all of the information that we need.

#### April 18

We are creating our pydantic models to understand which bits of information were going to want to retrieve from the ESPN api.

#### April 23

Nathan was driving today and we created the logic to get ticket info from our seatgeeks API to make sure that when were creating our frontend we have the ability to show the lowest price on seatgeek for any given game. We worked in the newly created tickets.py file in routes. Then we went through the process of doing the same thing with the Espn vivid seats route. SOme challenges that we ran into were accessing the particular data in the JSON effectively as it was confusing seeing what data was a pat of a list in a dictionary and what data was stored in a dictionary of its own. Additionally i had some docker trouble but nothing else new there. Nothing to do but stop my containers and delete my containers and volumes and run docker volume create database_volume and dock volume create pg_admin and the run docker compose-up. This got me running again!

#### April 24

I was feeling a little under the weather again today but it was extremely important that we finished our backend. After reaching out to tick pick and realizing that they do not have an API, they lightly hinted that we would be able to scrape their website. We embarked on this project, heading to youtube and reading the docs to figure out how beautiful soup worked. we were not able to finish this issue though although be the end of the day we were able to dig into the JSON on tickpick and get some info to print in our terminal. More tomorrow.

#### April 26

write the new redux routes while figuring out how to pass queries with redux. Also setting up redux

#### April 30

Today we had to figure out how to edit users. This was challenging because we had to understand how to get the data that the user had already put in to populate so that they could edit it. additionally, this was a challenge because fo the way that the password is hashed. This took us quite a long time to figure out. Kyle was very helpful in helping us to figure out what our options were. We ended up letting the user keep their same password if they left the field blank, and changing it if the field had more that one character.

#### April 31

We worked on the games schedule compontent today and had to figure out how to pass state through the Usenavigate hook to enable the user to click on a specific game and be taken to its details

#### May 3

we voluntarily chose to meet up so we could complete the game details page and make sure the ticket prices were rendering for each game.

#### May 6

We had our practice test today which went okay and then we began exploring how to decorate our site with Css.

#### May 7

Spent the day exploring bootstrap and experimenting with it accross our components.

#### May 8

Css takes a really long time. Fine tuning...

#### May 9

We can not get the footer to stick to the bottom of the page and also have begun working on our Read me and api-routes.

#### May 10

Putting the finishing touches on today and submitting!~
