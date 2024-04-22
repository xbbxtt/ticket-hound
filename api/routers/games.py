from fastapi import APIRouter, Depends
from queries.game_queries import GameQueries
from typing import  Optional
from datetime import date


router = APIRouter()

@router.get("/api/games")
def get_list_of_games(
    start_date: date,
    end_date: date,
    away_team: Optional[str]= None,
    home_team: Optional[str]= None,
    repo: GameQueries = Depends(),
):
    return repo.get_list_games(start_date, end_date, away_team, home_team)


@router.get("/api/games/{id}")
def get_details_of_games(
    id: int,
    repo: GameQueries = Depends()
):
    return repo.get_game_details(id)
