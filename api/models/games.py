from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional


class GameIn(BaseModel):
    """
    Represents the data we get from the MLB API to get the schedule of games
    """

    start_date: date
    end_date: date
    home_team: Optional[str]
    away_team: Optional[str]


class GameOut(BaseModel):
    """
    Represents the data that will be returned within a game instance
    """
    id: int
    date_time: datetime
    home_team: str
    away_team: str
    location: str





#Example url: http://localhost:8000/api/games?startDate=2024-05-06&endDate=2024-05-06&awayTeam="Baltimore_Orioles"&homeTeam="New York YAnkees"
