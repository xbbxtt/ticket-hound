import requests
import os
from models.tickets import TicketOut


class SeatgeekTicketQueries:
    """
    Class containing queries to the seatgeek API

    Can be dependency injected into a route
    """

    def get_ticket(self, away_team, home_team, date_time):
        try:
            seatgeek_api = os.environ['SEATGEEK_API_KEY']
            seatgeek_client_id = os.environ['SEATGEEK_CLIENT_ID']
            away_team = away_team.lower().replace(" ", "-")
            home_team = home_team.lower().replace(" ", "-")
            response = requests.get(
                f"https://api.seatgeek.com/2/events?performers.slug={away_team}&performers.slug={home_team}&client_id={seatgeek_client_id}&client_secret={seatgeek_api}"
            )
            json_data = response.json()
            date_time = date_time[0:len(date_time) - 1]
            for event in json_data["events"]:
                if event["datetime_utc"] == date_time:
                    min_price = str(event["stats"]["lowest_sg_base_price"])
                    url = event["url"]
                    logo = "https://hoodzpahdesign.com/wp-content/uploads/2021/07/SeatGeek-wordmark-BTS-01-2048x1152.png"
                    provider_name = "SeatGeek"
                    return TicketOut(
                        min_price=min_price,
                        url=url,
                        logo=logo,
                        provider_name=provider_name
                    )

            print("********* Could not find game!", "*********")

        except Exception as e:
            print("EXCEPTION: ", e)
