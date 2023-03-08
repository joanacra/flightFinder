// https://react-redux.js.org/tutorials/connect
// https://www.ryanair.com/api/views/locate/5/airports/en/active
// https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/OPO
// https://www.realpythonproject.com/how-to-use-apis-with-react-functional-components/
// https://axios-http.com/docs/example

import axios from "axios";

class RyanairService {
    constructor() {}

    private getAirports(url: string) {
        return axios
            .get(url)
            .then(function (response) {
                const airports = response.data.map(
                    (airport: {
                        code: string;
                        name: string;
                        country: { name: string };
                    }) => ({
                        airportCode: airport.code,
                        airportName: airport.name,
                        airportCountry: airport.country.name,
                    })
                );

                return airports;
            })
            .catch(function (error) {
                console.log(error);
                return [];
            });
    }

    public getDepartureAirports() {
        const url =
            "https://www.ryanair.com/api/views/locate/5/airports/en/active";
        return this.getAirports(url);
    }

    public getArrivalAirports(departureAirportCode: string) {
        const url = `https://www.ryanair.com/api/views/locate/searchWidget/routes/en/airport/${departureAirportCode}`;
        return this.getAirports(url);
    }
}

export default RyanairService;
