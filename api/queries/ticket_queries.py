import json
import os
from models.tickets import TicketOut
from fastapi import HTTPException
import requests
from bs4 import BeautifulSoup


class VividseatsTicketQueries:
    """
    Class containing the queries to the ESPN API to get vividseats tickets

    Can be dependency injected into a route
    """

    def get_ticket(self,home_team, date_time):
        try:
            team_id_response = requests.get(
                "https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams"
            )
            json_data = team_id_response.json()
            for team in json_data["sports"][0]["leagues"][0]["teams"]:
                if team["team"]["displayName"] == home_team:
                    team_id = team["team"]["id"]
            if not team_id:

                raise HTTPException(status_code=404, detail="Team not found")

            
            response = requests.get(
                f"https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams/{team_id}/schedule"
            )

            json_data = response.json()

            for event in json_data["events"]:
                if (event["date"][:-1]) == (date_time[:-4]):
                    min_price = str(
                        int(event["competitions"][0]["tickets"][0]["startingPrice"])
                    )
                    url = event["competitions"][0]["tickets"][0]["links"][0][
                        "href"
                    ]
                    logo = "https://i.postimg.cc/nh8WhhP7/Vivid-Seats-Logo.jpg"
                    provider_name = "VividSeats"
                    return TicketOut(
                        min_price=min_price,
                        url=url,
                        logo=logo,
                        provider_name=provider_name,
                    )

        except Exception as e:
            print(e)
            raise HTTPException(
                status_code=424, detail="Could not connect to VividSeats API"
            )


class SeatgeekTicketQueries:
    """
    Class containing queries to the seatgeek API

    Can be dependency injected into a route
    """

    def get_ticket(self, away_team, home_team, date_time):
        try:
            seatgeek_api = os.environ["SEATGEEK_API_KEY"]
            seatgeek_client_id = os.environ["SEATGEEK_CLIENT_ID"]
            away_team = away_team.lower().replace(" ", "-")
            home_team = home_team.lower().replace(" ", "-")
            response = requests.get(
                f"https://api.seatgeek.com/2/events?performers.slug={away_team}&performers.slug={home_team}&client_id={seatgeek_client_id}&client_secret={seatgeek_api}"
            )
            json_data = response.json()
            date_time = date_time[: len(date_time) - 1]
            for event in json_data["events"]:
                if event["datetime_utc"] == date_time:
                    min_price = str(event["stats"]["lowest_sg_base_price"])
                    url = event["url"]
                    logo = (
                        "https://i.postimg.cc/gjn7nXpy/logos-seatgeek-2x.jpg"
                    )
                    provider_name = "SeatGeek"
                    return TicketOut(
                        min_price=min_price,
                        url=url,
                        logo=logo,
                        provider_name=provider_name,
                    )

        except Exception as e:
            print("EXCEPTION: ", e)
            raise HTTPException(
                status_code=424, detail="Could not connect to SeatGeek API"
            )


class TickpickTicketQueries:
    """
    This class represents the data that was scraped from tickpick.com to get information about
    game tickets for a particular mlb team

    """

    def get_ticket(self, home_team, date_time):
        try:
            home_team = home_team.lower()
            home_team = home_team.replace(" ", "-")
            url = f"https://www.tickpick.com/mlb/{home_team}-tickets/"

            use_scraper_one = True
            page = requests.get(url)
            soup = BeautifulSoup(page.content, "lxml")
            soup = soup.find(id="events")
            results = soup.find_all(
                "div", class_="srItem active allE SPORTSE hasPromos"
            )

            results_without_promos = soup.find_all(
                "div", class_="srItem active allE SPORTSE"
            )
            for result in results_without_promos:
                results.append(result)

            if not results:
                use_scraper_one = False
                results = soup.find_all(
                    "script", type="application/ld+json"
                )

            for result in results:
                if use_scraper_one:
                    script_tag = result.find("script")
                    if script_tag:
                        script_content = (
                            script_tag.string.strip()
                        )
                        try:
                            data = json.loads(
                                script_content
                            )
                        except json.JSONDecodeError:
                            raise HTTPException(status_code = 404, detail="Error decoding JSON. The script might not contain valid JSON.")

                    else:
                        raise HTTPException(status_code = 404, detail="No script tag found or script tag is empty.")
                else:
                    result = str(result)
                    begin_index = result.find('{')
                    result = result[begin_index:]
                    reversed_result = result[::-1]
                    end_index = reversed_result.find('}')
                    reversed_result = reversed_result[end_index:]
                    script_content = reversed_result[::-1]

                    try:
                        data = json.loads(
                            script_content
                        )
                    except json.JSONDecodeError:
                            raise HTTPException(status_code = 404, detail="Error decoding JSON. The script might not contain valid JSON.")



                if data["startDate"][:10] == date_time[:10]:
                    min_price = str(data["offers"]["lowPrice"])
                    url = data["offers"]["url"]
                    logo = "https://i.postimg.cc/6qgmRW6k/Tick-Pick-Logo.jpg"
                    provider_name = "TickPick"

                    return TicketOut(
                        min_price=min_price,
                        url=url,
                        logo=logo,
                        provider_name=provider_name,
                    )

        except Exception as e:
            print("EXCEPTION: ", e)
            raise HTTPException(status_code=424, detail="Could not find game")
