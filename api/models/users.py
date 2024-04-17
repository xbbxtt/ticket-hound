"""
Pydantic Models for Users.
"""
from datetime import datetime
from pydantic import BaseModel


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    first_name: str
    last_name: str
    address: str
    birthday: datetime
    password: str
    favorite_team_id: int



class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    username: str
    first_name: str
    last_name: str
    birthday: datetime
    favorite_team_id: int


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    first_name: str
    last_name: str
    address: str
    birthday: datetime
    password: str
    favorite_team_id: int
