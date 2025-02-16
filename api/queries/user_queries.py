"""
Database Queries for Users
"""

import os
import psycopg
from psycopg_pool import ConnectionPool
from psycopg.rows import class_row
from typing import Optional
from models.users import UserRequest, UserWithPw
from utils.exceptions import UserDatabaseException

DATABASE_URL = os.environ.get("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set")

pool = ConnectionPool(DATABASE_URL)


class UserQueries:
    """
    Class containing queries for the Users table

    Can be dependency injected into a route like so

    def my_route(userQueries: UserQueries = Depends()):
        # Here you can call any of the functions to query the DB
    """

    def get_by_username(self, username: str) -> Optional[UserWithPw]:
        """
        Gets a user from the database by username

        Returns None if the user isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE username = %s
                            """,
                        [username],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user {username}")
        return user

    def get_by_id(self, id: int) -> Optional[UserWithPw]:
        """
        Gets a user from the database by user id

        Returns None if the user isn't found
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                            SELECT
                                *
                            FROM users
                            WHERE id = %s
                            """,
                        [id],
                    )
                    user = cur.fetchone()
                    if not user:
                        return None
        except psycopg.Error as e:
            print(e)
            raise UserDatabaseException(f"Error getting user with id {id}")

        return user

    def create_user(
        self,
        user_new: UserRequest,
        hashed_password: str,
    ) -> UserWithPw:
        """
        Creates a new user in the database

        Raises a UserInsertionException if creating the user fails
        """
        try:
            with pool.connection() as conn:
                with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                    cur.execute(
                        """
                        INSERT INTO users (
                            username,
                            password,
                            first_name,
                            last_name,
                            address,
                            birthday,
                            favorite_team_id
                        ) VALUES (
                            %s, %s, %s, %s, %s, %s, %s
                        )
                        RETURNING *;
                        """,
                        [
                            user_new.username,
                            hashed_password,
                            user_new.first_name,
                            user_new.last_name,
                            user_new.address,
                            user_new.birthday,
                            user_new.favorite_team_id,
                        ],
                    )
                    user = cur.fetchone()
                    if not user:
                        raise UserDatabaseException(
                            f"Could not create user with username {user_new.username}"
                        )
        except psycopg.Error:
            raise UserDatabaseException(
                f"Could not create user with username {user_new.username}"
            )
        return user


    def edit_user(self, id: int, user:UserRequest) -> UserWithPw:
        """
        Allows edits of user profile
        """
        if len(user.password) < 1:
            try:
                with pool.connection() as conn:
                    with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                        cur.execute(
                            """
                            UPDATE users
                            SET username = %s,
                            first_name = %s,
                            last_name = %s,
                            address = %s,
                            birthday = %s,
                            favorite_team_id = %s
                            WHERE id = %s
                            """,
                            [
                                user.username,
                                user.first_name,
                                user.last_name,
                                user.address,
                                user.birthday,
                                user.favorite_team_id,
                                id
                            ]
                        )
                        return UserRequest(id=id, **user.dict())
            except psycopg.Error:
                raise UserDatabaseException(
                    f"Could not edit user with username {user.username}"
                )
        else:
            try:
                with pool.connection() as conn:
                    with conn.cursor(row_factory=class_row(UserWithPw)) as cur:
                        cur.execute(
                            """
                            UPDATE users
                            SET username = %s,
                            first_name = %s,
                            last_name = %s,
                            address = %s,
                            birthday = %s,
                            password = %s,
                            favorite_team_id = %s
                            WHERE id = %s
                            """,
                            [
                                user.username,
                                user.first_name,
                                user.last_name,
                                user.address,
                                user.birthday,
                                user.password,
                                user.favorite_team_id,
                                id
                            ]
                        )
                        return UserRequest(id=id, **user.dict())
            except psycopg.Error:
                raise UserDatabaseException(
                    f"Could not edit user with username {user.username}"
                )

    def delete_user(self, id: int) -> bool:
        try:
            #connect to database
            with pool.connection() as conn:
                #get a cursor(something to run SQL with)
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [id]
                    )
                    return True
        except Exception as e:
            print (e)
            return False

