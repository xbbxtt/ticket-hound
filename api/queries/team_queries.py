import os
import requests
from psycopg_pool import ConnectionPool
from models.teams import TeamOut, ListTeamOut

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class TeamQueries:
    """
    Class containing queries for the teams table

    Can be dependancy injected into a route and is also used by the poller
    to populate the database
    """

    def get_list_teams(self):
        # Get the list of teams from ESPN API
        try:
            response = requests.get(
                "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams"
            )

            json_data = response.json()
            result = []

            for team in json_data["sports"][0]["leagues"][0]["teams"]:
                id = team["team"]["id"]
                full_name = team["team"]["displayName"]
                logo = team["team"]["logos"][0]["href"]

                result.append(
                    ListTeamOut(
                        id=id,
                        full_name=full_name,
                        logo=logo,
                    )
                )

            return result

        except Exception as e:
            return {"message": "Could not load teams"}

    def get_team_details(self, id):
        # Get the details for a specific team from the ESPN API
        try:
            url = f"https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/{id}/"
            response = requests.get(url)
            data = response.json()

            team_name = data["team"]["name"]
            full_name = data["team"]["displayName"]
            color = data["team"]["color"]
            alternate_color = data["team"]["alternateColor"]
            logo = data["team"]["logos"][0]["href"]
            location = data["team"]["location"]
            record = data["team"]["record"]["items"][0]["summary"]
            standing = data["team"]["standingSummary"]

            return TeamOut(
                team_name=team_name,
                full_name=full_name,
                color=color,
                alternate_color=alternate_color,
                logo=logo,
                location=location,
                record=record,
                standing=standing,
            )

        except Exception as e:
            print("********", e)
            return {"message": "Could not load team details"}
