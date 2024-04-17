import requests
from queries.team_queries import TeamQueries
from models.teams import TeamOut, TeamIn

def get_teams():

    response = requests.get("https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams")
    print(response.status_code)

    json_data = response.json()
    result = []

    for team in json_data["sports"][0]["leagues"][0]["teams"]:
        this_id = team["team"]["id"]
        name = team["team"]["shortDisplayName"]
        full_name = team["team"]["displayName"]
        color = team["team"]["color"]
        alternate_color = team["team"]["alternateColor"]
        logo = team["team"]["logos"][0]["href"]
        detail_response = requests.get(f"https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/{this_id}/")
        detail_data = detail_response.json()
        location = detail_data["team"]["franchise"]["venue"]["address"]
        record = detail_data["team"]["record"]["items"][0]["summary"]
        standing = detail_data["team"]["standingSummary"]

        # print(this_id)
        # print("name: ", name)
        # print("full name", full_name)
        # print("color: " + color + " alternate color: " + alternate_color)
        # print("logo_url " + logo)
        # print(location)
        # print("record: " + record)
        # print("standing: " + standing)

        result.append({
            "this_id": this_id,
            "name": name,
            "full_name": full_name,
            "color": color,
            "alternate_color": alternate_color,
            "logo": logo,
            "location": f"{location["city"]} {location["state"]} {location["zipCode"]}",
            "record": record,
            "standing": standing
        })
    return result


def runner():
    list_of_teams = get_teams()
    for team in list_of_teams:
        TeamQueries.create_team(TeamIn(team))
