from fastapi.testclient import TestClient
from models.teams import ListTeamOut
from queries.team_queries import TeamQueries
from main import app

client = TestClient(app)

class FakeTeamQueries:
  def get_list_teams(self):
      return [ListTeamOut(
          id=10,
          full_name="New York Yankees",
          logo="random string",
      )]


def test_get_list_of_teams():
    app.dependency_overrides[TeamQueries] = FakeTeamQueries
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
