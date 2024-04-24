from fastapi import APIRouter, Depends, HTTPException
from queries.team_queries import TeamQueries
from models.teams import TeamOut, ListTeamOut
from typing import List, Union


router = APIRouter()


@router.get("/api/teams", response_model=Union[List[ListTeamOut]])
def get_list_of_teams(repo: TeamQueries = Depends()) -> List[ListTeamOut]:
    teams = repo.get_list_teams()
    if not teams:
        raise HTTPException(status_code=424, detail="Could not fetch teams")
    return teams


@router.get("/api/teams/{id}", response_model=Union[TeamOut])
def get_team_details(
    id: int,
    repo: TeamQueries = Depends(),
) -> TeamOut:
    team_details = repo.get_team_details(id)
    if not team_details:
        raise HTTPException(status_code=404, detail="Could not fetch team details")
    return team_details
