from pydantic import BaseModel


class TeamOut(BaseModel):
    """
    Represents the data needed to create an instance of teams
    """
    id: int
    team_name: str
    full_name: str
    color: str
    alternate_color: str
    logo: str
    location: str
    record: str
    standing: str

class ListTeamOut(BaseModel):
    id: int
    full_name: str
    logo: str
