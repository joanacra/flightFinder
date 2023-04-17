// https://react-redux.js.org/tutorials/connect
// https://www.ryanair.com/api/views/locate/5/airports/en/active
// https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/OPO
// https://www.realpythonproject.com/how-to-use-apis-with-react-functional-components/
// https://axios-http.com/docs/example

import axios from "axios";
import Airport from "../models/Airport";

class RyanairService {
    constructor() {}

    public getDepartureAirports() {
        const url =
            "https://www.ryanair.com/api/views/locate/5/airports/en/active";
        return axios
            .get(url)
            .then(function (response) {
                const airports = response.data.map(
                    (airport: {
                        code: string;
                        name: string;
                        country: { name: string };
                    }) =>
                        new Airport(
                            airport.code,
                            airport.name,
                            airport.country.name
                        )
                );

                return airports;
            })
            .catch(function (error) {
                console.log(error);
                return [];
            });
    }

    public getArrivalAirports(departureAirportCode: string) {
        const url = `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${departureAirportCode}`;
        return axios.get(url).then(function (response) {
            const airports = response.data.map(
                (airport: {
                    arrivalAirport: {
                        code: string;
                        name: string;
                        country: { name: string };
                    };
                }) =>
                    new Airport(
                        airport.arrivalAirport.code,
                        airport.arrivalAirport.name,
                        airport.arrivalAirport.country.name
                    )
            );

            return airports;
        });
    }
}

export default RyanairService;
