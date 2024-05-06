from fastapi.testclient import TestClient
from models.games import DetailOut, GameOut
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

    def get_game_details(self, id):
        return GameOut(
            id=0,
            date_time="2024-05-08T16:35:00Z",
            home_team="string",
            away_team="string",
            location="string",
        )


def test_get_list_games():
    app.dependency_overrides[GameQueries] = FakeGameQueries
    response = client.get(
        "/api/games?start_date=2024-05-08&end_date=2024-05-09"
    )

    app.dependency_overrides = {}

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

def test_get_details_of_games():
    app.dependency_overrides[GameQueries] = FakeGameQueries
    response = client.get(
        "/api/games/5"
    )

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json() == {
        "id": 0,
        "home_team": "string",
        "away_team": "string",
        "location": "string",
        "date_time": "2024-05-08T16:35:00Z"
    }
