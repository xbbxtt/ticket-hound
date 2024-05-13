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


class DetailOut(BaseModel):
    """
    Represents the data that will be returned from the MLB API game details
    """
    id: int
    home_team: str
    away_team: str
    location: str
    game_date: datetime

class Record(BaseModel):
    """
    Represents the data that will be returned from the ESPN API game details
    """
    home_record: str
    away_record: str
    home_standings: str
    away_standings: str
