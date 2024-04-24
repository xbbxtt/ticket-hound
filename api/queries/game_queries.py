import requests
from models.games import DetailOut, GameOut
from fastapi import HTTPException

class GameQueries:
    """
    Class containing all of the games a user could potentially attend

    """

    def get_list_games(self, start_date, end_date, away_team, home_team):
        try:
            response = requests.get(
                f"http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate={start_date}&endDate={end_date}"
            )

            data = response.json()
            ballgames = []

            if away_team is None and home_team is None:
                for date in data["dates"]:
                    for game in date["games"]:
                        id=game["gamePk"]
                        date_time = game["gameDate"]
                        home = game["teams"]["home"]["team"]["name"]
                        away = game["teams"]["away"]["team"]["name"]
                        location = game["venue"]["name"]

                        ballgames.append(
                            GameOut(
                                id=id,
                                date_time=date_time,
                                home_team=home,
                                away_team=away,
                                location=location
                            ) )

            elif away_team and home_team:
                for date in data["dates"]:
                    for game in date["games"]:
                        id=game["gamePk"]
                        date_time = game["gameDate"]
                        home = game["teams"]["home"]["team"]["name"]
                        away = game["teams"]["away"]["team"]["name"]
                        location = game["venue"]["name"]
                        if home == home_team and away == away_team:
                            ballgames.append(
                                GameOut(
                                    id=id,
                                    date_time=date_time,
                                    home_team=home,
                                    away_team=away,
                                    location=location
                                ) )
            elif away_team or home_team:
                for date in data["dates"]:
                    for game in date["games"]:
                        id=game["gamePk"]
                        date_time = game["gameDate"]
                        home = game["teams"]["home"]["team"]["name"]
                        away = game["teams"]["away"]["team"]["name"]
                        location = game["venue"]["name"]
                        if home == home_team or away == away_team:
                            ballgames.append(
                                GameOut(
                                    id=id,
                                    date_time=date_time,
                                    home_team=home,
                                    away_team=away,
                                    location=location
                                ) )
            return ballgames

        except Exception as e:
            print(e)
            raise HTTPException(status_code=404, detail="Could not load games from ESPN API")

    def get_game_details(self, id):
        try:
            response = requests.get(
                f"http://statsapi.mlb.com/api/v1/schedule/games/?gamePk={id}"
            )

            data = response.json()

            data = data["dates"][0]["games"][0]
            game_date = data["gameDate"]
            away_team = data["teams"]["away"]["team"]["name"]
            home_team = data["teams"]["home"]["team"]["name"]
            location = data["venue"]["name"]

            return DetailOut(
                            id=id,
                            game_date=game_date,
                            away_team=away_team,
                            home_team=home_team,
                            location=location)


        except Exception as e:
            print(e)
            raise HTTPException(status_code=404, detail="Could not load game details from ESPN API")
