import requests
import os
from models.tickets import TicketOut


class VividseatsTicketQueries:
    """
    Class containing the queries to the ESPN API to get vividseats tickets

    Can be dependency injected into a route
    """
    def get_ticket(self, away_team, home_team, date_time):
        # The first thing to do is get the team id from the ESPN
        # API that allows us to use the schedule route
        try:
            team_id_response = requests.get(
                "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams"
            )
            json_data = team_id_response.json()
            for team in json_data["sports"][0]["leagues"][0]["teams"]:
                if team["team"]["displayName"] == home_team:
                    team_id = team["team"]["id"]
            if not team_id:
                # We will need to raise some kind of 'team not found'
                # error here
                return None

            # Now that we have the id and verified it is not None, we
            # can proceed to finding the game which will have the ticket
            # price and link attached to it
            response = requests.get(
                f"https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/{team_id}/schedule"
            )

            json_data = response.json()

            for event in json_data["events"]:
                if (event["date"][:-1]) == (date_time[:-4]):
                    min_price = str(event["competitions"][0]["tickets"][0]["startingPrice"])
                    url = event["competitions"][0]["tickets"][0]["links"][0]["href"]
                    logo = "https://1000logos.net/wp-content/uploads/2023/11/Vivid-Seats-Logo.png"
                    provider_name = "VividSeats"
                    return TicketOut(
                        min_price=min_price,
                        url=url,
                        logo=logo,
                        provider_name=provider_name
                    )

            print("********* COULD NOT LOAD GAME")


        except Exception as e:
            print(e)




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
            date_time = date_time[:len(date_time) - 1]
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
