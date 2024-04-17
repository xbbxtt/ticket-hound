from fastapi import APIRouter, Depends, Response
from queries.team_queries import TeamOut, ListTeamOut, TeamQueries
from models.teams import TeamOut, ListTeamOut, Error
from typing import List, Union


router = APIRouter()


@router.get("/teams", response_model=Union[List[ListTeamOut],Error])
def get_list_of_teams(repo: TeamQueries = Depends()) -> List[ListTeamOut]:
    return repo.get_list_teams()
