from pydantic import BaseModel


class Error(BaseModel):
    message: str


class TeamOut(BaseModel):
    """
    Represents the data needed to create an instance of teams
    """

    team_name: str
    full_name: str
    color: str
    alternate_color: str
    logo: str
    location: str
    record: str
    standing: str


class ListTeamOut(BaseModel):
    """
    Represents the data that is shown in the list of teams
    """

    id: int
    full_name: str
    logo: str
