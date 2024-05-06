from fastapi.testclient import TestClient
from models.games import DetailOut
from queries.game_queries import GameQueries
from main import app


client = TestClient(app)


class FakeGameQueries:
    def get_list_games(self, away_team, home_team, start_date, end_date):
        return [
            DetailOut(
                id=1,
                game_date="2024-05-08T16:35:00Z",
                home_team="string",
                away_team="string",
                location="string",
            )
        ]


def test_get_list_games():
    app.dependency_overrides[GameQueries] = FakeGameQueries
    response = client.get(
        "/api/games?start_date=2024-05-08&end_date=2024-05-09"
    )

    app.dependecny_overrides = {}

    assert response.status_code == 200
    assert response.json() == [
        {
            "id": 1,
            "game_date": "2024-05-08T16:35:00Z",
            "home_team": "string",
            "away_team": "string",
            "location": "string",
        }
    ]
