import requests
from models.teams import TeamOut, ListTeamOut
from fastapi import HTTPException


class TeamQueries:
    """
    Class containing queries for the teams ESPN API

    Can be dependency injected into a route and fetches team data from the ESPN API
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

        except Exception:
            raise HTTPException(status_code=424, detail="Could not load list of teams from ESPN API")

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
            raise HTTPException(status_code=404, detail="Could not load game details from ESPN API")
