"""
User Authentication API Router
"""

from fastapi import (
    Depends,
    Request,
    Response,
    HTTPException,
    status,
    APIRouter,
)
from queries.user_queries import (
    UserQueries,
)

from utils.exceptions import UserDatabaseException
from models.users import (
    UserRequest,
    UserResponse,
    UserRequestIn,
    UserResponseOut,
    UserWithPw,
)

from utils.authentication import (
    try_get_jwt_user_data,
    hash_password,
    generate_jwt,
    verify_password,
)

# Note we are using a prefix here,
# This saves us typing in all the routes below
router = APIRouter(tags=["Authentication"], prefix="/api/auth")


@router.post("/signup")
async def signup(
    new_user: UserRequest,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
) -> UserResponse:
    """
    Creates a new user when someone submits the signup form
    """
    # Hash the password the user sent us
    hashed_password = hash_password(new_user.password)

    # Create the user in the database
    try:
        user = queries.create_user(new_user, hashed_password)
    except UserDatabaseException as e:
        print(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)

    # Generate a JWT token
    token = generate_jwt(user)

    # Convert the UserWithPW to a UserOut
    user_out = UserResponse(**user.model_dump())

    # Secure cookies only if running on something besides localhost
    secure = True if request.headers.get("origin") == "localhost" else False

    # Set a cookie with the token in it
    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )
    return user_out


@router.post("/signin")
async def signin(
    user_request: UserRequestIn,
    request: Request,
    response: Response,
    queries: UserQueries = Depends(),
) -> UserResponseOut:
    """
    Signs the user in when they use the Sign In form
    """

    # Try to get the user from the database
    user = queries.get_by_username(user_request.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    # Verify the user's password
    if not verify_password(user_request.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )

    # Generate a JWT token
    token = generate_jwt(user)

    # Secure cookies only if running on something besides localhost
    secure = True if request.headers.get("origin") == "localhost" else False

    # Set a cookie with the token in it
    response.set_cookie(
        key="fast_api_token",
        value=token,
        httponly=True,
        samesite="lax",
        secure=secure,
    )

    # Convert the UserWithPW to a UserOut
    return UserResponseOut(id=user.id, username=user.username)


@router.get("/authenticate")
async def authenticate(
    user: UserResponseOut = Depends(try_get_jwt_user_data),
    repo: UserQueries = Depends(),
) -> UserWithPw|None:
    """
    This function returns the user if the user is logged in.

    The `try_get_jwt_user_data` function tries to get the user and validate
    the JWT

    If the user isn't logged in this returns a 404

    This can be used in your frontend to determine if a user
    is logged in or not
    """
    if not user:
        return None
    user = repo.get_by_username(user.username)
    return user

@router.delete("/signout")
async def signout(
    request: Request,
    response: Response,
):
    """
    Signs the user out by deleting their JWT Cookie
    """
    # Secure cookies only if running on something besides localhost
    secure = True if request.headers.get("origin") == "localhost" else False

    # Delete the cookie
    response.delete_cookie(
        key="fast_api_token", httponly=True, samesite="lax", secure=secure
    )

    # There's no need to return anything in the response.
    # All that has to happen is the cookie header must come back
    # Which causes the browser to delete the cookie
    return


@router.put("/user/edit")
def edit_user(
    user: UserRequest,
    repo: UserQueries = Depends(),
    old_user: UserQueries = Depends(try_get_jwt_user_data)
) -> UserRequest:
    if len(user.password) > 0:

        hashed_password = hash_password(user.password)
        user.password = hashed_password
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    return repo.edit_user(old_user.id, user)


@router.delete("/user/delete")
def delete_user(
    repo: UserQueries = Depends(),
    user: UserQueries = Depends(try_get_jwt_user_data)
):
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not logged in"
        )
    return repo.delete_user(user.id)
