import axios from "axios";
import Airport from "../models/Airport";
import Price from "../models/Price";
import OneWayFare from "../models/OneWayFare";
import RoundtripFare from "../models/RoundtripFare";

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

    public getExactOneWayFlights(
        departureAirportCode: string,
        arrivalAirportCode: string,
        departureDate: string
    ) {
        const url = `https://services-api.ryanair.com/farfnd/3/oneWayFares?departureAirportIataCode=${departureAirportCode}&arrivalAirportIataCode=${arrivalAirportCode}&outboundDepartureDateFrom=${departureDate}&outboundDepartureDateTo=${departureDate}`;
        return axios.get(url).then(function (response) {
            const oneWayFares = response.data.fares.map(
                (oneWayFare: {
                    outbound: {
                        departureAirport: Airport;
                        arrivalAirport: Airport;
                        departureDate: string;
                        arrivalDate: string;
                        price: Price;
                        flightNumber: string;
                    };
                }) =>
                    new OneWayFare(
                        oneWayFare.outbound.departureAirport,
                        oneWayFare.outbound.arrivalAirport,
                        oneWayFare.outbound.departureDate,
                        oneWayFare.outbound.arrivalDate,
                        oneWayFare.outbound.price,
                        oneWayFare.outbound.flightNumber
                    )
            );
            return oneWayFares;
        });
    }

    public getExactRoundtripFlights(
        departureAirportCode: string,
        arrivalAirportCode: string,
        departureDate: string, //outbound
        arrivalDate: string //inbound
    ) {
        const outboundFaresPromise = this.getExactOneWayFlights(
            departureAirportCode,
            arrivalAirportCode,
            departureDate
        );
        const inboundFaresPromise = this.getExactOneWayFlights(
            arrivalAirportCode,
            departureAirportCode,
            arrivalDate
        );

        return Promise.all([outboundFaresPromise, inboundFaresPromise]).then(
            ([outboundFares, inboundFares]) =>
                new RoundtripFare(outboundFares, inboundFares)
        );
    }
}

export default RyanairService;
