from ..routers.teams import ListTeamOut
from queries.team_queries import TeamQueries



def fake_get_list_teams():
    return [ListTeamOut(
        id=10,
        full_name="New York Yankees",
        logo="random string",
    )]


def test_get_list_of_teams():
    app.dependency_overrides[TeamQueries.get_list_teams()] = fake_get_list_teams
    response = client.get("/api/teams")

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == [
  {
    "id": 10,
    "full_name": "New York Yankees",
    "logo": "random string"
  }
]
