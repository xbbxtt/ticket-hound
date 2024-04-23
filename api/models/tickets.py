from pydantic import BaseModel

class TicketOut(BaseModel):
    """
    Represent the data that a ticket website has
    """
    min_price: str
    url: str
    logo: str
    provider_name: str
