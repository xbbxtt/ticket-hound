from fastapi import APIRouter, Depends, HTTPException
from queries.game_queries import GameQueries
from queries.team_queries import TeamQueries
from typing import  Optional
from datetime import date


router = APIRouter()

@router.get("/api/games")
def get_list_of_games(
    start_date: date,
    end_date: date,
    away_team: Optional[int]= None,
    home_team: Optional[int]= None,
    repo: GameQueries = Depends(),
    team_repo: TeamQueries = Depends()
):
    if away_team:
        away_team = team_repo.get_team_details(away_team).full_name
    if home_team:
        home_team = team_repo.get_team_details(home_team).full_name
    games = repo.get_list_games(start_date, end_date, away_team, home_team)
    if not games:
        raise HTTPException(status_code=404, detail="Could not fetch any games")
    return games

@router.get("/api/games/{id}")
def get_details_of_games(
    id: int,
    repo: GameQueries = Depends()
):
    game_details = repo.get_game_details(id)
    if not game_details:
        raise HTTPException(status_code=404, detail="Could not fetch any games")
    return game_details
