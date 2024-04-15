| Action         | Method | URL                                                                  |
| -------------- | ------ | -------------------------------------------------------------------- |
| List Teams     | GET    | http://localhost:8000/api/teams/                                     |
| Team Details   | GET    | http://localhost:8000/api/teams/{team_id}/                           |
| Get Games      | GET    | http://localhost:8000/api/games/{query_params}                       |
| Game Details   | GET    | http://localhost:8000/api/games/{team_id}/                           |
| Show Profile   | GET    | http://localhost:8000/api/users/{user_id}/                           |
| Login          | POST   | [http://localhost:8000/api/token/](http://localhost:8000/api/token/) |
| Logout         | DELETE | [http://localhost:8000/api/token/](http://localhost:8000/api/token/) |
| Edit Profile   | UPDATE | http://localhost:8000/api/users/{user_id}/                           |
| Create Account | POST   | [http://localhost:8000/api/users/](http://localhost:8000/api/users/) |

## Stretch Goals

| Action          | Method | URL                                                    |
| --------------- | ------ | ------------------------------------------------------ |
| Star a Game     | POST   | http://localhost:8000/api/users/{user_id}/saved_games/ |
| Get Saved Games | GET    | http://localhost:8000/api/users/{user_id}/saved_games/ |

### Get the list of Teams

-   Endpoint path: /teams
-   Endpoint method: GET

-   Headers:

    -   Authorization: Bearer token

-   Response: A list of MLB teams
-   Response shape:
    ```json
    {
      "teams": [
        {
        "id": int,
          "team_name": string,
          "city": string,
          "record": string
        }
      ]
    }
    ```

### Get a Team's details

-   Endpoint path: /teams/{team_id}/
-   Endpoint method: GET

-   Headers:

    -   Authorization: Bearer token

-   Response: A specific MLB team
-   Response shape:
    ```json
    {
      "team": {
        "id": int,
          "team_name": string,
          "team_full_name": string,
          "city": string,
          "logo": string,
          "color": string,
          "alternate_color": string,
          "standing": string
        }
    }
    ```
