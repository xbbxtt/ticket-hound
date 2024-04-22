from fastapi import APIRouter, Depends, Response
from queries.team_queries import TeamQueries
from models.teams import TeamOut, ListTeamOut, Error
from typing import List, Union


router = APIRouter()


@router.get("/api/teams", response_model=Union[List[ListTeamOut], Error])
def get_list_of_teams(repo: TeamQueries = Depends()) -> List[ListTeamOut]:
    return repo.get_list_teams()


@router.get("/api/teams/{id}", response_model=Union[TeamOut, Error])
def get_team_details(
    id: int,
    response: Response,
    repo: TeamQueries = Depends(),
) -> TeamOut:
    response = repo.get_team_details(id)
    print(response)
    return response
