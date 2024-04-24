from fastapi import APIRouter, Depends, HTTPException
from queries.ticket_queries import (
    SeatgeekTicketQueries,
    VividseatsTicketQueries,
)
from models.tickets import TicketOut

router = APIRouter()

@router.get("/api/tickets/seatgeek")
def get_seatgeek_ticket(
    away_team: str,
    home_team: str,
    date_time: str,
    repo: SeatgeekTicketQueries = Depends()
):
    ticket = repo.get_ticket(away_team, home_team, date_time)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not available")
    return ticket

@router.get("/api/tickets/vividseats")
def get_vividseats_ticket(
    away_team: str,
    home_team: str,
    date_time: str,
    repo: VividseatsTicketQueries = Depends()
) -> TicketOut:
    ticket = repo.get_ticket(away_team, home_team, date_time)
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not available")
    return ticket
