from fastapi import APIRouter, Depends
from queries.ticket_queries import SeatgeekTicketQueries

router = APIRouter()

@router.get("/api/tickets/seatgeek")
def get_seatgeek_ticket(
    away_team: str,
    home_team: str,
    date_time: str,
    repo: SeatgeekTicketQueries = Depends()
):
    return repo.get_ticket(away_team, home_team, date_time)
