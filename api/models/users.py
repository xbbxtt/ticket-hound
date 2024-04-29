"""
Pydantic Models for Users.
"""
from datetime import date
from pydantic import BaseModel


class UserRequest(BaseModel):
    """
    Represents a the parameters needed to create a new user
    """

    username: str
    first_name: str
    last_name: str
    address: str
    birthday: date
    password: str
    favorite_team_id: int


class UserRequestIn(BaseModel):
    """
    Represents the parameters needed to let a user sign in
    """

    username: str
    password: str


class UserResponse(BaseModel):
    """
    Represents a user, with the password not included
    """

    id: int
    username: str
    first_name: str
    last_name: str
    birthday: date
    favorite_team_id: int


class UserResponseOut(BaseModel):
    """
    Represents a user's id and username which is returned
    when they sign in.
    """

    id: int
    username: str


class UserWithPw(BaseModel):
    """
    Represents a user with password included
    """

    id: int
    username: str
    first_name: str
    last_name: str
    address: str
    birthday: date
    password: str
    favorite_team_id: int
